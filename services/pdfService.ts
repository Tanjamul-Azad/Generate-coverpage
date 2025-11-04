// @ts-nocheck
// This service uses global libraries loaded from CDN, so we disable TypeScript checks.

import { CoverData } from '../types';

export const generatePdfFromElement = async (
  elementId: string, 
  coverData: CoverData, 
  assignmentPdf: File | null,
  onProgress: (progress: { message: string, percentage: number }) => void
) => {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error(`Element with id "${elementId}" not found.`);
    alert('Error: Could not find the preview element to generate PDF.');
    return;
  }
  
  onProgress({ message: 'Initializing PDF generation...', percentage: 0 });

  // Use pdf-lib from the global scope
  const { PDFDocument } = window.PDFLib;

  // Create a clone of the element to render at full scale for the PDF
  const clone = originalElement.cloneNode(true) as HTMLElement;

  // A4 paper dimensions in pixels at 96 DPI
  const a4WidthPx = 794;
  const a4HeightPx = 1123;
  
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0px';
  clone.style.width = `${a4WidthPx}px`;
  clone.style.height = `${a4HeightPx}px`;
  clone.style.transform = 'none';
  clone.style.margin = '0';
  document.body.appendChild(clone);
  
  onProgress({ message: 'Preparing cover page preview...', percentage: 10 });

  try {
    const canvas = await html2canvas(clone, {
      scale: 3, // Increased scale for higher quality output
      useCORS: true,
      width: a4WidthPx,
      height: a4HeightPx,
      windowWidth: a4WidthPx,
      windowHeight: a4HeightPx,
    });
    onProgress({ message: 'Rendering cover page image...', percentage: 25 });
    
    const imgData = canvas.toDataURL('image/png');
    
    // Create cover page PDF with jsPDF
    const coverPdfDoc = new jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    onProgress({ message: 'Creating cover page PDF...', percentage: 40 });

    const pdfWidth = coverPdfDoc.internal.pageSize.getWidth();
    const pdfHeight = coverPdfDoc.internal.pageSize.getHeight();
    coverPdfDoc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Define filename
    const courseCode = coverData.course.split(' - ')[0] || 'COURSE';
    const studentName = coverData.submittedBy.replace(/\s+/g, '_') || 'Student';
    const fileName = `UIU_Assignment_${courseCode}_${studentName}.pdf`;

    // If no assignment PDF, just save the cover
    if (!assignmentPdf) {
      onProgress({ message: 'Saving cover page...', percentage: 90 });
      coverPdfDoc.save(fileName);
      onProgress({ message: 'Done! Cover page is downloading.', percentage: 100 });
      return;
    }

    // --- PDF MERGING LOGIC ---
    const coverPdfBytes = coverPdfDoc.output('arraybuffer');
    
    const friendlyFileSize = (assignmentPdf.size / 1024 / 1024).toFixed(2);
    onProgress({ message: `Loading assignment PDF (${friendlyFileSize} MB)...`, percentage: 50 });
    const assignmentPdfBytes = await assignmentPdf.arrayBuffer();

    onProgress({ message: 'Parsing PDF documents...', percentage: 60 });
    const coverPdf = await PDFDocument.load(coverPdfBytes);
    const assignmentDocument = await PDFDocument.load(assignmentPdfBytes);

    const mergedPdf = await PDFDocument.create();

    const [coverPage] = await mergedPdf.copyPages(coverPdf, [0]);
    mergedPdf.addPage(coverPage);
    
    const totalPages = assignmentDocument.getPageCount();
    onProgress({ message: `Merging ${totalPages} page(s)...`, percentage: 75 });
    const assignmentPages = await mergedPdf.copyPages(assignmentDocument, assignmentDocument.getPageIndices());
    assignmentPages.forEach(page => mergedPdf.addPage(page));

    onProgress({ message: 'Saving final PDF...', percentage: 90 });
    const mergedPdfBytes = await mergedPdf.save();
    
    onProgress({ message: 'Finalizing download...', percentage: 99 });
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    onProgress({ message: 'Done! Merged PDF is downloading.', percentage: 100 });

  } catch (error) {
    console.error('Error generating or merging PDF:', error);
    alert('An error occurred. Please ensure you uploaded a valid PDF file and try again.');
    throw error; // Re-throw to be caught by the caller
  } finally {
    document.body.removeChild(clone);
  }
};