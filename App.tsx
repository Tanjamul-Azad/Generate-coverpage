import React, { useState, useCallback } from 'react';
import { CoverDetailsForm } from './components/CoverDetailsForm';
import { CoverPreview } from './components/CoverPreview';
import { UiuMonogramLogo } from './components/UiuMonogramLogo';
import { ToastNotification, Toast } from './components/ToastNotification';
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
    isGroup: false,
    groupName: '',
    groupMembers: [],
  });

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CoverData, boolean>>>({});
  const [themeColor, setThemeColor] = useState('#F97316'); // Default: UIU Orange
  const [fontFamily, setFontFamily] = useState("'Merriweather', serif"); // Default: Serif
  const [assignmentPdf, setAssignmentPdf] = useState<File | null>(null);
  const [progress, setProgress] = useState<{ message: string, percentage: number } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };


  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (errors[name as keyof CoverData]) {
      setErrors(prev => ({ ...prev, [name]: false }));
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
    const fieldLabels: Record<keyof CoverData, string> = {
      university: 'University',
      faculty: 'School/Faculty',
      department: 'Department',
      program: 'Program',
      course: 'Course',
      assignmentTitle: 'Assignment Title',
      submittedTo: 'Submitted To (Instructor)',
      instructorDesignation: 'Instructor Designation',
      submittedBy: 'Student Name',
      studentId: 'Student ID',
      section: 'Section',
      trimester: 'Trimester',
      submissionDate: 'Date of Submission',
      isGroup: 'Group Submission',
      groupName: 'Group Name',
      groupMembers: 'Group Members',
    };

    // Common required fields
    const commonFields: (keyof CoverData)[] = ['faculty', 'department', 'program', 'course', 'assignmentTitle', 'submittedTo', 'instructorDesignation', 'trimester', 'submissionDate'];

    // Fields specific to Individual submission
    const individualFields: (keyof CoverData)[] = ['submittedBy', 'studentId', 'section'];

    // Fields specific to Group submission
    const groupFields: (keyof CoverData)[] = ['groupName'];

    let requiredFields = [...commonFields];
    if (coverData.isGroup) {
      requiredFields = [...requiredFields, ...groupFields];
    } else {
      requiredFields = [...requiredFields, ...individualFields];
    }

    const newErrors: Partial<Record<keyof CoverData, boolean>> = {};
    const missingFieldNames: string[] = [];

    requiredFields.forEach(field => {
      if (!coverData[field]) {
        newErrors[field] = true;
        missingFieldNames.push(fieldLabels[field]);
      }
    });

    // Validate group members if in group mode
    if (coverData.isGroup) {
      if (!coverData.groupMembers || coverData.groupMembers.length === 0) {
        // Technically strict validation might require members, but let's stick to fields for now
        // If we want to enforce it:
        // newErrors.groupMembers = true; 
        // missingFieldNames.push('Group Members');
      }
    }

    setErrors(newErrors);

    if (missingFieldNames.length > 0) {
      addToast(`Please fill in the following missing fields:\n• ${missingFieldNames.join('\n• ')}`, 'error');
      return false;
    }

    return true;
  };

  const handleGeneratePdf = useCallback(async () => {
    if (!isPreviewVisible) {
      addToast("Please click 'Show Preview' first to ensure the cover page is ready.", 'warning');
      return;
    }

    if (validateForm()) {
      try {
        await generatePdfFromElement('cover-preview-area', coverData, assignmentPdf, setProgress);

        // Wait a bit on 100% so the user can see the "Done" message
        setTimeout(() => {
          setProgress(null);
          addToast('Cover page generated successfully!', 'success');
        }, 2000);

      } catch (error) {
        console.error("PDF Generation failed:", error);
        addToast('Failed to generate PDF. Please try again.', 'error');
        setProgress(null); // Reset on error
      }
    }
  }, [coverData, isPreviewVisible, assignmentPdf]);

  const togglePreview = () => {
    setIsPreviewVisible(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900 font-sans">
      <ToastNotification toasts={toasts} removeToast={removeToast} />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <header className="text-center mb-10 md:mb-14">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
            <UiuMonogramLogo className="w-20 h-20 mx-auto" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            UIU <span className="text-orange-600">Cover Page</span> Generator
          </h1>
          <p className="text-md md:text-lg text-gray-500 mt-3 font-medium max-w-2xl mx-auto">
            Create standard, professional cover pages for your assignments in seconds.
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