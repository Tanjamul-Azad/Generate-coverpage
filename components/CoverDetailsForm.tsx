import React from 'react';
import type { CoverData } from '../types';
import { FACULTIES, DEPARTMENTS, PROGRAMS, COURSES, ASSIGNMENT_TITLES, TRIMESTERS, SECTIONS } from '../constants';

interface CoverDetailsFormProps {
  data: CoverData;
  onDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  onTogglePreview: () => void;
  isPreviewVisible: boolean;
  errors: Partial<Record<keyof CoverData, boolean>>;
  themeColor: string;
  onThemeChange: (color: string) => void;
  fontFamily: string;
  onFontChange: (font: string) => void;
  assignmentPdf: File | null;
  onFileChange: (file: File | null) => void;
  progress: { message: string; percentage: number } | null;
}

const THEME_COLORS = [
    { name: 'UIU Orange', hex: '#F97316' },
    { name: 'Royal Blue', hex: '#3B82F6' },
    { name: 'Forest Green', hex: '#16A34A' },
    { name: 'Deep Purple', hex: '#8B5CF6' },
    { name: 'Crimson Red', hex: '#DC2626' },
    { name: 'Navy Blue', hex: '#0F172A' },
    { name: 'Charcoal Gray', hex: '#4B5563' },
    { name: 'Maroon', hex: '#881337' },
    { name: 'Teal', hex: '#0D9488' },
];

const FONT_OPTIONS = [
    { name: 'Serif (Merriweather)', css: "'Merriweather', serif" },
    { name: 'Elegant Serif (Playfair Display)', css: "'Playfair Display', serif" },
    { name: 'Classic Serif (PT Serif)', css: "'PT Serif', serif" },
    { name: 'Sans-Serif (Roboto)', css: "'Roboto', sans-serif" },
    { name: 'Modern Sans-Serif (Lato)', css: "'Lato', sans-serif" },
    { name: 'Geometric Sans-Serif (Montserrat)', css: "'Montserrat', sans-serif" },
    { name: 'Monospace (Inconsolata)', css: "'Inconsolata', monospace" },
    { name: 'Code Monospace (Source Code Pro)', css: "'Source Code Pro', monospace" },
];


const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; required?: boolean; error?: boolean; }> = ({ label, name, value, onChange, placeholder, required, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
    </div>
);

const SelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: readonly string[]; placeholder: string; required?: boolean; error?: boolean; }> = ({ label, name, value, onChange, options, placeholder, required, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);

export const CoverDetailsForm: React.FC<CoverDetailsFormProps> = ({ data, onDataChange, onGenerate, onTogglePreview, isPreviewVisible, errors, themeColor, onThemeChange, fontFamily, onFontChange, assignmentPdf, onFileChange, progress }) => {
    
    const departmentOptions = DEPARTMENTS[data.faculty as keyof typeof DEPARTMENTS] || [];
    const programOptions = PROGRAMS[data.department as keyof typeof PROGRAMS] || [];
    const courseOptions = COURSES[data.program as keyof typeof COURSES] || [];

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileChange(e.target.files[0]);
        }
        // Reset file input value to allow re-uploading the same file
        e.target.value = '';
    };
    
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return 'mm/dd/yyyy'; // Placeholder text
        try {
            // A more readable format for the display once a date is selected
            const date = new Date(dateString + 'T00:00:00Z');
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(date);
        } catch (e) {
            // Fallback if the date string is somehow invalid
            return dateString;
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Cover Details</h2>
            <div className="space-y-4">
                <SelectField label="Select University" name="university" value={data.university} onChange={onDataChange} options={['United International University']} placeholder="Your university" required error={!!errors.university} />
                <SelectField label="Select School/Faculty" name="faculty" value={data.faculty} onChange={onDataChange} options={FACULTIES} placeholder="Choose your school" required error={!!errors.faculty} />
                <SelectField label="Select Department/Program" name="department" value={data.department} onChange={onDataChange} options={departmentOptions} placeholder="Choose your department" required error={!!errors.department} />
                <SelectField label="Select Program" name="program" value={data.program} onChange={onDataChange} options={programOptions} placeholder="Choose your program" required error={!!errors.program} />
                <SelectField label="Select Course" name="course" value={data.course} onChange={onDataChange} options={courseOptions} placeholder="Choose your course" required error={!!errors.course} />
                <SelectField label="Assignment Title" name="assignmentTitle" value={data.assignmentTitle} onChange={onDataChange} options={ASSIGNMENT_TITLES} placeholder="Select assignment type" required error={!!errors.assignmentTitle} />

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-800 mb-3">Customization</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <label htmlFor="theme-color-select" className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
                            <div className="flex items-center gap-3">
                                <select
                                    id="theme-color-select"
                                    value={themeColor}
                                    onChange={(e) => onThemeChange(e.target.value)}
                                    className="w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                >
                                    {THEME_COLORS.map(color => (
                                        <option key={color.name} value={color.hex}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                                <div
                                    className="w-8 h-8 rounded-full border border-gray-300 flex-shrink-0"
                                    style={{ backgroundColor: themeColor }}
                                    title={`Selected color: ${themeColor}`}
                                ></div>
                            </div>
                        </div>
                        <div>
                           <label htmlFor="font-style-select" className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                            <select
                                id="font-style-select"
                                value={fontFamily}
                                onChange={(e) => onFontChange(e.target.value)}
                                className="w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                style={{ fontFamily: fontFamily }}
                            >
                                {FONT_OPTIONS.map(font => (
                                    <option key={font.name} value={font.css} style={{ fontFamily: font.css }}>
                                        {font.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                
                <InputField label="Submitted To (Instructor)" name="submittedTo" value={data.submittedTo} onChange={onDataChange} placeholder="e.g., Dr. Rahman Khan" required error={!!errors.submittedTo} />
                <InputField label="Instructor's Designation" name="instructorDesignation" value={data.instructorDesignation} onChange={onDataChange} placeholder="e.g., Lecturer" required error={!!errors.instructorDesignation} />

                <InputField label="Submitted By (Your Name)" name="submittedBy" value={data.submittedBy} onChange={onDataChange} placeholder="e.g., Azizur Rahaman" required error={!!errors.submittedBy} />
                
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Student ID" name="studentId" value={data.studentId} onChange={onDataChange} placeholder="e.g., 111242167" required error={!!errors.studentId} />
                    <SelectField label="Section" name="section" value={data.section} onChange={onDataChange} options={SECTIONS} placeholder="Select section" required error={!!errors.section} />
                </div>
                
                <SelectField label="Trimester" name="trimester" value={data.trimester} onChange={onDataChange} options={TRIMESTERS} placeholder="Select trimester" required error={!!errors.trimester} />
                
                <div>
                    <label htmlFor="submissionDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Submission Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        {/* This div is for visual presentation only */}
                        <div
                            className={`w-full px-3 py-2 bg-white border rounded-md shadow-sm sm:text-sm flex justify-between items-center ${errors.submissionDate ? 'border-red-500' : 'border-gray-300'}`}
                            aria-hidden="true"
                        >
                            <span className={data.submissionDate ? 'text-gray-900' : 'text-gray-400'}>
                                {formatDateForInput(data.submissionDate)}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm10 5H4v8h12V7z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                        {/* The actual input is layered on top, invisible but fully interactive */}
                        <input
                            type="date"
                            id="submissionDate"
                            name="submissionDate"
                            value={data.submissionDate}
                            onChange={onDataChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Submission Date"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Merge with Assignment PDF (Optional)
                    </label>
                    {assignmentPdf ? (
                        <div className="flex items-center justify-between p-2.5 bg-gray-100 border border-gray-300 rounded-md">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-gray-800 truncate" title={assignmentPdf.name}>{assignmentPdf.name}</span>
                            </div>
                            <button onClick={() => onFileChange(null)} type="button" className="p-1 rounded-full hover:bg-gray-200" aria-label="Remove PDF file">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="pdf-upload" className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PDF only</p>
                                </div>
                                <input id="pdf-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={handleFileSelect} />
                            </label>
                        </div>
                    )}
                </div>

                <div className="pt-4 space-y-3">
                     {progress ? (
                        <div className="w-full text-center p-4 bg-gray-100 rounded-md border border-gray-200">
                            <p className="font-semibold text-gray-800 animate-pulse">{progress.message}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-linear" 
                                    style={{ width: `${progress.percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{progress.percentage}% Complete</p>
                        </div>
                    ) : (
                        <button onClick={onGenerate} className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>{assignmentPdf ? 'Generate & Merge PDF' : 'Generate Cover Page'}</span>
                        </button>
                    )}
                    <button onClick={onTogglePreview} disabled={!!progress} className="w-full bg-gray-100 text-gray-700 font-bold py-2.5 px-4 rounded-md hover:bg-gray-200 transition duration-300 border border-gray-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {isPreviewVisible ? 'Hide Preview' : 'Show Preview'}
                    </button>
                </div>
                 <p className="text-xs text-gray-500 text-center pt-2">
                    Please fill in all required fields marked with <span className="text-red-500">*</span>.
                </p>
            </div>
        </div>
    );
};