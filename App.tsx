import React, { useState, useCallback } from 'react';
import { CoverDetailsForm } from './components/CoverDetailsForm';
import { CoverPreview } from './components/CoverPreview';
import { UiuMonogramLogo } from './components/UiuMonogramLogo';
import { generatePdfFromElement } from './services/pdfService';
import type { CoverData } from './types';

function App() {
  const [coverData, setCoverData] = useState<CoverData>({
    university: 'United International University',
    faculty: '',
    department: '',
    program: '',
    course: '',
    assignmentTitle: '',
    submittedTo: '',
    instructorDesignation: '',
    submittedBy: '',
    studentId: '',
    section: '',
    trimester: '',
    submissionDate: '',
  });

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CoverData, boolean>>>({});
  const [themeColor, setThemeColor] = useState('#F97316'); // Default: UIU Orange
  const [fontFamily, setFontFamily] = useState("'Merriweather', serif"); // Default: Serif
  const [assignmentPdf, setAssignmentPdf] = useState<File | null>(null);
  const [progress, setProgress] = useState<{ message: string, percentage: number } | null>(null);


  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (errors[name as keyof CoverData]) {
        setErrors(prev => ({...prev, [name]: false}));
    }

    setCoverData(prev => {
      const newData = { ...prev, [name]: value };

      if (name === 'faculty') {
        newData.department = '';
        newData.program = '';
        newData.course = '';
      } else if (name === 'department') {
        newData.program = '';
        newData.course = '';
      } else if (name === 'program') {
        newData.course = '';
      }
      
      return newData;
    });
  };

  const handleThemeChange = (color: string) => {
    setThemeColor(color);
  };

  const handleFontChange = (font: string) => {
    setFontFamily(font);
  };

  const handleFileChange = (file: File | null) => {
    setAssignmentPdf(file);
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof CoverData)[] = ['faculty', 'department', 'program', 'course', 'assignmentTitle', 'submittedTo', 'instructorDesignation', 'submittedBy', 'studentId', 'section', 'trimester', 'submissionDate'];
    const newErrors: Partial<Record<keyof CoverData, boolean>> = {};
    
    requiredFields.forEach(field => {
        if (!coverData[field]) {
            newErrors[field] = true;
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePdf = useCallback(async () => {
    if (!isPreviewVisible) {
        alert("Please click 'Show Preview' first to ensure the cover page is ready.");
        return;
    }

    if (validateForm()) {
        try {
            await generatePdfFromElement('cover-preview-area', coverData, assignmentPdf, setProgress);
            
            // Wait a bit on 100% so the user can see the "Done" message
            setTimeout(() => {
                setProgress(null);
            }, 2000);

        } catch (error) {
            console.error("PDF Generation failed:", error);
            // Alert is already shown in the service, no need to show another one here.
            setProgress(null); // Reset on error
        }
    }
  }, [coverData, isPreviewVisible, assignmentPdf]);

  const togglePreview = () => {
    setIsPreviewVisible(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8 md:mb-12">
          <UiuMonogramLogo className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            United International University
          </h1>
          <p className="text-md md:text-lg text-gray-600 mt-2">
            Generate and merge professional cover pages for your assignments.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <CoverDetailsForm 
              data={coverData} 
              onDataChange={handleDataChange} 
              onGenerate={handleGeneratePdf}
              onTogglePreview={togglePreview}
              isPreviewVisible={isPreviewVisible}
              errors={errors}
              themeColor={themeColor}
              onThemeChange={handleThemeChange}
              fontFamily={fontFamily}
              onFontChange={handleFontChange}
              assignmentPdf={assignmentPdf}
              onFileChange={handleFileChange}
              progress={progress}
            />
          </div>
          <div className="lg:col-span-3">
             <CoverPreview 
              data={coverData} 
              isVisible={isPreviewVisible} 
              themeColor={themeColor} 
              fontFamily={fontFamily} 
             />
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} UIU Cover Page Generator by Md.Tanzamul Azad. All rights reserved.</p>
            <p className="mt-1">Designed to simplify your assignment submissions.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;