import { CoverData } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

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
    const coverPdfDoc = new jsPDF({
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
    let assignmentPdfBytes: ArrayBuffer;

    if (assignmentPdf.name.toLowerCase().endsWith('.docx') || assignmentPdf.name.toLowerCase().endsWith('.doc')) {
      onProgress({ message: `Converting Word document (${friendlyFileSize} MB)...`, percentage: 50 });
      try {
        assignmentPdfBytes = await convertDocxToPdf(assignmentPdf);
      } catch (e) {
        console.error("DOCX Conversion failed", e);
        alert("Could not convert the Word document. Please ensure it is a valid .docx file. .doc files are not fully supported.");
        onProgress({ message: 'Error', percentage: 0 });
        return;
      }
    } else {
      onProgress({ message: `Loading assignment PDF (${friendlyFileSize} MB)...`, percentage: 50 });
      assignmentPdfBytes = await assignmentPdf.arrayBuffer();
    }

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
    const blob = new Blob([mergedPdfBytes as BlobPart], { type: 'application/pdf' });
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
    alert('An error occurred. Please ensure you uploaded a valid file and try again.');
    throw error; // Re-throw to be caught by the caller
  } finally {
    document.body.removeChild(clone);
    // Explicitly nullify the variable to avoid any 'unused' warnings in some strict linters, though not strictly needed here.
    // clone = null; 
  }
};

const convertDocxToPdf = async (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;

        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        const html = result.value; // The generated HTML
        const messages = result.messages; // Any messages, such as warnings during conversion

        console.log("Mammoth HTML length:", html.length);
        if (messages.length > 0) {
          console.warn("Mammoth messages:", messages);
        }

        // Create a style element for proper document formatting
        const style = document.createElement('style');
        style.innerHTML = `
          #docx-container {
            font-family: "Times New Roman", serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            text-align: justify;
          }
          #docx-container p {
            margin: 0 0 10pt 0;
            widows: 2;
            orphans: 2;
          }
          #docx-container p:empty {
            display: none;
          }
           #docx-container h1, #docx-container h2, #docx-container h3, #docx-container h4 {
            font-weight: bold;
            margin-top: 24pt;
            margin-bottom: 12pt;
          }
          #docx-container ul, #docx-container ol {
            margin: 0 0 10pt 0;
            padding-left: 24pt;
          }
          #docx-container li {
            margin-bottom: 4pt;
          }
          #docx-container table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12pt;
            page-break-inside: auto;
          }
          #docx-container tr {
             page-break-inside: avoid;
             page-break-after: auto;
          }
          #docx-container th, #docx-container td {
            border: 1px solid #000;
            padding: 6pt;
            vertical-align: top;
            text-align: left;
          }
          #docx-container img {
            max-width: 100%;
            height: auto;
            margin: 10pt 0;
          }
        `;
        document.head.appendChild(style);

        // Create a container for the HTML
        const container = document.createElement('div');
        container.id = 'docx-container';
        container.style.width = '595pt'; // A4 width in points
        // Remove minHeight to avoid forcing blank space
        container.style.padding = '0 60pt'; // Horizontal padding only (Left/Right: ~0.85in). vertical handled by pdf margins
        container.style.boxSizing = 'border-box';
        container.style.backgroundColor = 'white';
        container.innerHTML = html;

        // Position fixed but behind everything so it's "visible" to html2canvas but not to user
        container.style.position = 'fixed';
        container.style.left = '0';
        container.style.top = '0';
        container.style.zIndex = '-1000';
        container.style.overflow = 'visible'; // Ensure content isn't clipped
        document.body.appendChild(container);

        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4'
        });

        // Use html method to render
        await doc.html(container, {
          callback: (doc) => {
            const output = doc.output('arraybuffer');
            document.body.removeChild(container);
            resolve(output);
          },
          x: 0,
          y: 0,
          width: 595, // A4 width
          windowWidth: 800, // Ensure window width is enough for the container
          margin: [36, 0, 36, 0], // Top, Right, Bottom, Left margins (in pt)
          autoPaging: 'text' // Try to avoid cutting text across pages
        });

      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};