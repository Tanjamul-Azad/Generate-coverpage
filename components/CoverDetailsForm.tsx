import React, { useRef } from 'react';
import type { CoverData } from '../types';
import { FACULTIES, DEPARTMENTS, PROGRAMS, COURSES, ASSIGNMENT_TITLES, SESSIONS, SECTIONS } from '../constants';

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
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-offset-1 transition-all duration-200 outline-none text-gray-800 text-sm placeholder-gray-400 ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'}`}
        />
    </div>
);

const SelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: readonly string[]; placeholder: string; required?: boolean; error?: boolean; }> = ({ label, name, value, onChange, options, placeholder, required, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full pl-4 pr-10 py-2.5 bg-gray-50 border rounded-lg appearance-none focus:ring-2 focus:ring-offset-1 transition-all duration-200 outline-none text-gray-800 text-sm ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'}`}
            >
                <option value="" className="text-gray-400">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option} title={option}>{option}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    </div>
);

const WritableSelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; options: readonly string[]; placeholder: string; required?: boolean; error?: boolean; }> = ({ label, name, value, onChange, options, placeholder, required, error }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative group">
                <input
                    type="text"
                    list={`${name}-list`}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-offset-1 transition-all duration-200 outline-none text-gray-800 text-sm placeholder-gray-400 ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100'}`}
                />
                <datalist id={`${name}-list`}>
                    {options.map((option) => (
                        <option key={option} value={option} />
                    ))}
                </datalist>

                {/* Visual indicator that it's a list */}
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export const CoverDetailsForm: React.FC<CoverDetailsFormProps> = ({ data, onDataChange, onGenerate, onTogglePreview, isPreviewVisible, errors, themeColor, onThemeChange, fontFamily, onFontChange, assignmentPdf, onFileChange, progress }) => {

    const departmentOptions = DEPARTMENTS[data.faculty as keyof typeof DEPARTMENTS] || [];
    const programOptions = PROGRAMS[data.department as keyof typeof PROGRAMS] || [];
    const courseOptions = COURSES[data.program as keyof typeof COURSES] || [];
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileChange(e.target.files[0]);
        }
        // Reset file input value to allow re-uploading the same file
        e.target.value = '';
    };

    const formatDateForInput = (dateString: string) => {
        if (!dateString) return 'Select Date'; // Placeholder text
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
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header Stripe */}
            <div className="h-2 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>

            <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Assignment Details</h2>
                    <div className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">Form</div>
                </div>

                <div className="space-y-6">
                    {/* Mode Selection */}
                    <div className="bg-gray-50 p-1.5 rounded-lg border border-gray-200 flex">
                        <button
                            type="button"
                            onClick={() => onDataChange({ target: { name: 'isGroup', value: false as any } } as any)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${!data.isGroup ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Individual Submission
                        </button>
                        <button
                            type="button"
                            onClick={() => onDataChange({ target: { name: 'isGroup', value: true as any } } as any)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${data.isGroup ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Group Submission
                        </button>
                    </div>

                    <div className="space-y-5">
                        <SelectField label="University" name="university" value={data.university} onChange={onDataChange} options={['United International University']} placeholder="Select University" required error={!!errors.university} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <SelectField label="School / Faculty" name="faculty" value={data.faculty} onChange={onDataChange} options={FACULTIES} placeholder="Select School" required error={!!errors.faculty} />
                            <SelectField label="Department" name="department" value={data.department} onChange={onDataChange} options={departmentOptions} placeholder="Select Department" required error={!!errors.department} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <SelectField label="Program" name="program" value={data.program} onChange={onDataChange} options={programOptions} placeholder="Select Program" required error={!!errors.program} />
                            <WritableSelectField label="Course" name="course" value={data.course} onChange={(e) => onDataChange(e as any)} options={courseOptions} placeholder="Type or Select Course" required error={!!errors.course} />
                        </div>

                        <SelectField label="Assignment Title" name="assignmentTitle" value={data.assignmentTitle} onChange={onDataChange} options={ASSIGNMENT_TITLES} placeholder="Select Type" required error={!!errors.assignmentTitle} />
                    </div>

                    <div className="border-t border-gray-100 my-6"></div>

                    {/* Instructor Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField label="Submitted To (Name)" name="submittedTo" value={data.submittedTo} onChange={onDataChange} placeholder="e.g. Dr. Rahman Khan" required error={!!errors.submittedTo} />
                        <InputField label="Instructor Designation" name="instructorDesignation" value={data.instructorDesignation} onChange={onDataChange} placeholder="e.g. Professor" required error={!!errors.instructorDesignation} />
                    </div>

                    {/* Student / Group Info */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        {data.isGroup ? (
                            <div className="space-y-5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Group Information</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const currentMembers = data.groupMembers || [];
                                            const newMembers = [...currentMembers, { name: '', id: '' }];
                                            onDataChange({ target: { name: 'groupMembers', value: newMembers as any } } as any);
                                        }}
                                        className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-black transition shadow-sm font-medium"
                                    >
                                        + Add Member
                                    </button>
                                </div>

                                <InputField label="Group Name / No." name="groupName" value={data.groupName || ''} onChange={onDataChange} placeholder="e.g., Group 6" required error={!!errors.groupName} />

                                <div className="space-y-3">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Members List</label>
                                    {(data.groupMembers || []).map((member, index) => (
                                        <div key={index} className="flex gap-3 items-start animate-fadeIn group">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    placeholder="Student Name"
                                                    value={member.name}
                                                    onChange={(e) => {
                                                        const newMembers = [...(data.groupMembers || [])];
                                                        newMembers[index].name = e.target.value;
                                                        onDataChange({ target: { name: 'groupMembers', value: newMembers as any } } as any);
                                                    }}
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <input
                                                    type="text"
                                                    placeholder="ID"
                                                    value={member.id}
                                                    onChange={(e) => {
                                                        const newMembers = [...(data.groupMembers || [])];
                                                        newMembers[index].id = e.target.value;
                                                        onDataChange({ target: { name: 'groupMembers', value: newMembers as any } } as any);
                                                    }}
                                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newMembers = (data.groupMembers || []).filter((_, i) => i !== index);
                                                    onDataChange({ target: { name: 'groupMembers', value: newMembers as any } } as any);
                                                }}
                                                className="text-gray-400 hover:text-red-500 p-2 opacity-50 group-hover:opacity-100 transition"
                                                title="Remove member"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    {(data.groupMembers?.length === 0) && (
                                        <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
                                            <p className="text-sm text-gray-400">No members added yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Student Information</h3>
                                <InputField label="Your Name" name="submittedBy" value={data.submittedBy} onChange={onDataChange} placeholder="e.g. Md. Tanzamul Azad" required error={!!errors.submittedBy} />

                                <div className="grid grid-cols-2 gap-5">
                                    <InputField label="Student ID" name="studentId" value={data.studentId} onChange={onDataChange} placeholder="e.g. 011..." required error={!!errors.studentId} />
                                    <SelectField label="Section" name="section" value={data.section} onChange={onDataChange} options={SECTIONS} placeholder="Select" required error={!!errors.section} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="grid grid-cols-2 gap-5">
                            <SelectField
                                label="Trimester"
                                name="session"
                                value={SESSIONS.includes((data.trimester || '').split(' ')[0]) ? (data.trimester || '').split(' ')[0] : ''}
                                onChange={(e) => {
                                    const yearPart = (data.trimester || '').split(' ').find(p => /^\d{4}$/.test(p)) || '';
                                    const newInternalTrimester = `${e.target.value} ${yearPart}`.trim();
                                    onDataChange({ target: { name: 'trimester', value: newInternalTrimester } } as any);
                                }}
                                options={SESSIONS}
                                placeholder="Session"
                                required
                                error={!!errors.trimester}
                            />
                            <SelectField
                                label="Year"
                                name="year"
                                value={(data.trimester || '').split(' ').find(p => /^\d{4}$/.test(p)) || ''}
                                onChange={(e) => {
                                    const sessionPart = SESSIONS.includes((data.trimester || '').split(' ')[0]) ? (data.trimester || '').split(' ')[0] : '';
                                    const newInternalTrimester = `${sessionPart} ${e.target.value}`.trim();
                                    onDataChange({ target: { name: 'trimester', value: newInternalTrimester } } as any);
                                }}
                                options={Array.from({ length: 12 }, (_, i) => String(new Date().getFullYear() + 1 - i))}
                                placeholder="Year"
                                required
                                error={!!errors.trimester}
                            />
                        </div>

                        <div>
                            <label htmlFor="submissionDate" className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">
                                Submission Date <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group" onClick={() => dateInputRef.current?.showPicker()}>
                                <div
                                    className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg flex justify-between items-center cursor-pointer group-hover:bg-white group-hover:border-indigo-300 transition-all duration-200 ${errors.submissionDate ? 'border-red-500' : 'border-gray-200'}`}
                                >
                                    <span className={`text-sm ${data.submissionDate ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {formatDateForInput(data.submissionDate)}
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm10 5H4v8h12V7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    id="submissionDate"
                                    name="submissionDate"
                                    value={data.submissionDate}
                                    onChange={onDataChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Customization & File Upload in a Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {/* Customization */}
                        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm space-y-4">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b pb-2 mb-2">Style Options</h3>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-2">THEME COLOR</label>
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-grow">
                                        <select
                                            value={themeColor}
                                            onChange={(e) => onThemeChange(e.target.value)}
                                            className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-indigo-500 appearance-none"
                                        >
                                            {THEME_COLORS.map(color => (
                                                <option key={color.name} value={color.hex}>{color.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div
                                        className="w-9 h-9 rounded-lg border-2 border-white shadow-sm ring-1 ring-gray-200 flex-shrink-0"
                                        style={{ backgroundColor: themeColor }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-2">FONT STYLE</label>
                                <select
                                    value={fontFamily}
                                    onChange={(e) => onFontChange(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-indigo-500 appearance-none"
                                    style={{ fontFamily: fontFamily }}
                                >
                                    {FONT_OPTIONS.map(font => (
                                        <option key={font.name} value={font.css} style={{ fontFamily: font.css }}>{font.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide border-b pb-2 mb-4">Merge PDF (Optional)</h3>
                            {assignmentPdf ? (
                                <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-lg mt-auto">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="p-2 bg-white rounded-md shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-xs font-semibold text-gray-500 uppercase">Selected File</span>
                                            <span className="text-sm text-gray-900 truncate font-medium" title={assignmentPdf.name}>{assignmentPdf.name}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => onFileChange(null)} type="button" className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center flex-grow w-full border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200 group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-3 text-gray-300 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="text-sm text-gray-500 font-medium">Click to upload PDF or DOCX</p>
                                    </div>
                                    <input type="file" className="hidden" accept=".pdf,.docx,.doc" onChange={handleFileSelect} />
                                </label>
                            )}
                        </div>
                    </div>


                    <div className="pt-6 space-y-3">
                        {progress ? (
                            <div className="w-full text-center p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                <p className="font-bold text-indigo-700 animate-pulse">{progress.message}</p>
                                <div className="w-full bg-indigo-200 rounded-full h-2 mt-3 overflow-hidden">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={onGenerate} className="w-full bg-gray-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-black hover:shadow-lg transform active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                <span>{assignmentPdf ? 'Generate & Merge PDF' : 'Download Cover Page'}</span>
                            </button>
                        )}
                        <button onClick={onTogglePreview} disabled={!!progress} className="w-full bg-white text-gray-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition duration-200 border border-gray-200 flex items-center justify-center gap-2 disabled:opacity-50">
                            {isPreviewVisible ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Hide Preview</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Show Preview</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};