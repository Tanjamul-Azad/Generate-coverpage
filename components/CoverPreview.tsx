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
    const [scale, setScale] = React.useState(1);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const parentWidth = containerRef.current.offsetWidth;
                const A4_WIDTH_PX = 794; // 96 DPI
                const padding = 32; // Safety margin
                const newScale = Math.min(1, (parentWidth - padding) / A4_WIDTH_PX);
                setScale(newScale);
            }
        };

        window.addEventListener('resize', updateScale);
        updateScale(); // Initial call

        // Also update when visibility changes
        if (isVisible) {
            updateScale();
            // Slight delay to ensure DOM is ready if transitioning
            setTimeout(updateScale, 100);
        }

        return () => window.removeEventListener('resize', updateScale);
    }, [isVisible]);

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Ready to Generate</h2>

            <div
                ref={containerRef}
                className="flex-grow w-full relative flex justify-center bg-gray-200 rounded-md overflow-hidden min-h-[500px]"
            >
                {isVisible ? (
                    <div
                        className="origin-top transition-transform duration-200 ease-out mt-8"
                        style={{
                            transform: `scale(${scale})`,
                            width: '794px',
                            height: '1123px',
                            minWidth: '794px', // Prevent flex shrinking
                            minHeight: '1123px',
                        }}
                    >
                        {/* This outer div is the "page" that gets captured. Its padding creates the white margin. */}
                        <div id="cover-preview-area" className="w-full h-full p-8 bg-white shadow-lg" style={{ fontFamily }}>
                            {/* This inner div contains the border and all the content */}
                            <div
                                className="w-full h-full p-8 md:p-10 bg-white text-black border-[3px] flex flex-col items-center justify-between"
                                style={{ borderColor: themeColor }}
                            >
                                {/* === HEADER === */}
                                <div className="w-full text-center mt-2">
                                    <UiuMonogramLogo className="w-28 h-auto mx-auto mb-4" />
                                    <h1
                                        className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase leading-tight"
                                        style={{ color: themeColor }}
                                    >
                                        {data.university || 'United International University'}
                                    </h1>
                                </div>

                                {/* === MAIN CONTENT === */}
                                <div className="flex-grow w-full flex flex-col justify-center gap-10 py-4">

                                    {/* --- Assignment Title --- */}
                                    <div className="text-center px-4">
                                        <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-gray-800 break-words">
                                            {data.assignmentTitle || 'Assignment Title'}
                                        </h2>
                                    </div>

                                    {/* --- Course Details --- */}
                                    <div className="w-full max-w-2xl mx-auto px-6">
                                        <div className="flex flex-col gap-4 text-lg leading-relaxed">
                                            <div className="flex items-baseline gap-4">
                                                <span className="font-bold text-gray-700 min-w-[140px] text-right">Course Title :</span>
                                                <span className="font-medium text-gray-900 flex-1 border-b-[1.5px] border-gray-400 border-dotted pb-0.5">{courseTitle || ''}</span>
                                            </div>
                                            <div className="flex items-baseline gap-4">
                                                <span className="font-bold text-gray-700 min-w-[140px] text-right">Course Code :</span>
                                                <span className="font-medium text-gray-900 flex-1 border-b-[1.5px] border-gray-400 border-dotted pb-0.5">{courseCode || ''}</span>
                                            </div>
                                            <div className="flex items-baseline gap-4">
                                                <span className="font-bold text-gray-700 min-w-[140px] text-right">Section :</span>
                                                <span className="font-medium text-gray-900 flex-1 border-b-[1.5px] border-gray-400 border-dotted pb-0.5">{data.section || ''}</span>
                                            </div>
                                            <div className="flex items-baseline gap-4">
                                                <span className="font-bold text-gray-700 min-w-[140px] text-right">Department :</span>
                                                <span className="font-medium text-gray-900 flex-1 border-b-[1.5px] border-gray-400 border-dotted pb-0.5 leading-snug">{data.department || ''}</span>
                                            </div>
                                            <div className="flex items-baseline gap-4">
                                                <span className="font-bold text-gray-700 min-w-[140px] text-right">Trimester :</span>
                                                <span className="font-medium text-gray-900 flex-1 border-b-[1.5px] border-gray-400 border-dotted pb-0.5">{data.trimester || ''}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Submission Info --- */}
                                    <div className="w-full grid grid-cols-2 gap-8 px-8 mt-4 items-start">
                                        {/* Submitted To */}
                                        <div className="text-center">
                                            <div className="inline-block border-b-2 border-gray-300 pb-1 mb-5">
                                                <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Submitted To</span>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-gray-900 mb-1">{data.submittedTo || 'Instructor Name'}</p>
                                                <p className="text-base text-gray-600 italic">{data.instructorDesignation || 'Designation'}</p>
                                            </div>
                                        </div>

                                        {/* Submitted By */}
                                        <div className="text-center w-full">
                                            <div className="inline-block border-b-2 border-gray-300 pb-1 mb-5">
                                                <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Submitted By</span>
                                            </div>

                                            {data.isGroup ? (
                                                <div className="w-full flex flex-col items-center">
                                                    <p className="text-lg font-bold mb-3 text-gray-800">{data.groupName || 'Group Name'}</p>
                                                    <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                                                        <div className="bg-gray-100 border-b border-gray-300 flex text-xs font-bold text-black uppercase tracking-wider">
                                                            <div className="flex-1 py-2 px-3 text-left border-r border-gray-300">Name</div>
                                                            <div className="w-24 py-2 px-3 text-center">ID</div>
                                                        </div>
                                                        <div>
                                                            {(data.groupMembers && data.groupMembers.length > 0) ? (
                                                                data.groupMembers.map((member, index) => (
                                                                    <div key={index} className="flex text-sm border-b last:border-0 border-gray-200 hover:bg-gray-50 transition-colors">
                                                                        <div className="flex-1 py-2 px-3 text-left font-bold text-black truncate border-r border-gray-200" title={member.name}>{member.name}</div>
                                                                        <div className="w-24 py-2 px-3 text-center font-bold text-black">{member.id}</div>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="p-3 text-center text-gray-500 italic text-sm">No members added</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-xl font-bold text-gray-900 mb-1">{data.submittedBy || 'Student Name'}</p>
                                                    <p className="text-lg text-gray-700">ID: {data.studentId || '________'}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* === FOOTER === */}
                                <div className="w-full text-center pb-4">
                                    <p className="text-base font-medium text-gray-600">
                                        Date of Submission: <span className="text-black font-semibold ml-2">{formatDate(data.submissionDate)}</span>
                                    </p>
                                </div>
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