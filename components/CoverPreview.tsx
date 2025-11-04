import React from 'react';
import type { CoverData } from '../types';
import { UiuMonogramLogo } from './UiuMonogramLogo';

interface CoverPreviewProps {
    data: CoverData;
    isVisible: boolean;
    themeColor: string;
    fontFamily: string;
}

const formatDate = (dateString: string) => {
    // The date from the input is in 'YYYY-MM-DD' format.
    if (!dateString) {
        return '___________';
    }
    
    try {
        // To reliably format and avoid timezone issues, treat the date as UTC.
        // The 'en-GB' locale consistently uses the dd/mm/yyyy format.
        const date = new Date(dateString + 'T00:00:00Z');
        return new Intl.DateTimeFormat('en-GB').format(date);
    } catch (e) {
        // Fallback for any unexpected format, though input[type="date"] is reliable.
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}/${month}/${year}`;
        }
        return dateString;
    }
};

const InitialPlaceholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-lg font-semibold">Your assignment cover page will appear here</h3>
        <p className="mt-2 text-sm">Fill in the details on the left and click "Show Preview" to see your cover page.</p>
    </div>
);


export const CoverPreview: React.FC<CoverPreviewProps> = ({ data, isVisible, themeColor, fontFamily }) => {
    const [courseCode, courseTitle] = data.course ? data.course.split(' - ') : ['', ''];

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Ready to Generate</h2>
            <div className="relative mx-auto aspect-[210/297] w-full max-w-full overflow-hidden rounded-md bg-gray-200">
                {isVisible ? (
                    // This outer div is the "page" that gets captured. Its padding creates the white margin.
                    <div id="cover-preview-area" className="w-full h-full p-8 bg-white" style={{ fontFamily }}>
                        {/* This inner div contains the border and all the content */}
                        <div 
                            className="w-full h-full p-8 bg-white text-black border-4 flex flex-col text-center"
                            style={{ borderColor: themeColor }}
                        >
                            {/* === HEADER === */}
                            <div className="w-full">
                                <UiuMonogramLogo className="w-28 h-auto mx-auto mb-4" />
                                <h1 
                                    className="text-4xl font-extrabold tracking-wide"
                                    style={{ color: themeColor }}
                                >
                                    {data.university || 'United International University'}
                                </h1>
                            </div>

                            {/* === SPACER & MAIN CONTENT WRAPPER === */}
                            <div className="flex-grow w-full flex flex-col justify-center items-center space-y-10 py-8">
                                
                                {/* --- Assignment Title --- */}
                                <div>
                                    <h2 className="text-3xl font-bold" style={{ color: themeColor }}>
                                        {data.assignmentTitle || 'Assignment Title'}
                                    </h2>
                                </div>
                                
                                {/* --- Course Details --- */}
                                <div className="text-lg space-y-2">
                                    <p><span className="font-semibold">Course Title:</span> {courseTitle || '________________'}</p>
                                    <p><span className="font-semibold">Course Code:</span> {courseCode || '________'}</p>
                                    <p><span className="font-semibold">Section:</span> {data.section || '____'}</p>
                                    <p><span className="font-semibold">Department:</span> {data.department || '________________'}</p>
                                </div>
                                
                                {/* --- Submission Info --- */}
                                <div className="w-full max-w-xl space-y-8">
                                    {/* Submitted To */}
                                    <div className="space-y-2">
                                        <p className="text-xl font-semibold">Submitted to</p>
                                        <div className="bg-gray-100 px-6 py-4 rounded-lg shadow-inner">
                                            <p className="text-2xl font-bold">{data.submittedTo || 'Instructor Name'}</p>
                                            <p className="text-base italic mt-1">{data.instructorDesignation || 'Instructor Designation'}</p>
                                        </div>
                                    </div>

                                    {/* Submitted By */}
                                    <div className="space-y-2">
                                        <p className="text-xl font-semibold">Submitted by</p>
                                        <div className="px-6 py-4">
                                            <p className="text-2xl font-bold">{data.submittedBy || 'Student Name'}</p>
                                            <p className="text-base">ID: {data.studentId || 'XXXXXXXXX'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* === FOOTER === */}
                            <div className="w-full">
                                 <p className="text-lg"><span className="font-semibold">Date of Submission:</span> {formatDate(data.submissionDate)}</p>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <InitialPlaceholder />
                    )
                }
            </div>
        </div>
    );
};