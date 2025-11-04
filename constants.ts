export const FACULTIES = [
  'School of Business and Economics (SoBE)',
  'School of Science and Engineering (SoSE)',
  'School of Humanities and Social Sciences (SoHS)',
  'School of Life Sciences (SoLS)',
  'Institute of Natural Sciences',
  'Other',
];

export const DEPARTMENTS = {
  'School of Business and Economics (SoBE)': [
    'Department of Business Administration',
    'Department of Economics',
    'Other',
  ],
  'School of Science and Engineering (SoSE)': [
    'Department of Civil Engineering',
    'Department of Computer Science and Engineering (CSE)',
    'Department of Electrical and Electronics Engineering (EEE)',
    'Other',
  ],
  'School of Humanities and Social Sciences (SoHS)': [
    'Department of Environment and Development Studies',
    'Department of Media Studies and Journalism',
    'Department of English',
    'Graduate Programs',
    'Other',
  ],
  'School of Life Sciences (SoLS)': [
    'Department of Pharmacy',
    'Department of Biotechnology and Genetic Engineering',
    'Other',
  ],
  'Institute of Natural Sciences': [
    'Other'
  ],
  'Other': [
      'Other'
  ]
};

export const PROGRAMS = {
    // SoBE
    'Department of Business Administration': [
        'Bachelor of Business Administration (BBA)',
        'BBA in Accounting & Information Systems (BBA in AIS)',
        'Master of Business Administration (MBA)',
        'Executive Master of Business Administration (EMBA)',
    ],
    'Department of Economics': [
        'Bachelor of Science in Economics',
        'Master of Science in Economics',
    ],
    // SoSE
    'Department of Civil Engineering': [
        'B.Sc. in Civil Engineering (CE)',
    ],
    'Department of Computer Science and Engineering (CSE)': [
        'B.Sc. in Computer Science & Engineering (CSE)',
        'B.Sc. in Data Science (BSDS)',
        'M.Sc. in Computer Science & Engineering (MSCSE)',
    ],
    'Department of Electrical and Electronics Engineering (EEE)': [
        'B.Sc. in Electrical & Electronic Engineering (EEE)',
    ],
    // SoHS
    'Department of Environment and Development Studies': [
        'BSS in Environment and Development Studies (BSSEDS)',
    ],
    'Department of Media Studies and Journalism': [
        'BSS in Media Studies and Journalism (BSSMSJ)',
    ],
    'Department of English': [
        'BA in English',
    ],
    'Graduate Programs': [
        'Master in Development Studies (MDS)',
    ],
    // SoLS
    'Department of Pharmacy': [
        'Bachelor of Pharmacy (B. Pharm.)',
    ],
    'Department of Biotechnology and Genetic Engineering': [
        'B.Sc. in Biotechnology and Genetic Engineering (BSBGE)',
    ],
    'Other': [
        'Other (Please specify in course details if needed)'
    ]
};


export const COURSES = {
    'B.Sc. in Computer Science & Engineering (CSE)': [
        // Trimester 1
        'CSE 1115 - Computer Fundamentals',
        'CSE 1116 - Computer Fundamentals Lab',
        'PHY 1121 - Physics',
        'PHY 1122 - Physics Lab',
        'MATH 1131 - Mathematics-I (Differential and Integral Calculus)',
        'UGE 1141 - English-I',
        // Trimester 2
        'CSE 1215 - Object Oriented Programming',
        'CSE 1216 - Object Oriented Programming Lab',
        'CHEM 1221 - Chemistry',
        'MATH 1231 - Mathematics-II (Complex Variable, Vector Analysis & Laplace Transform)',
        'UGE 1241 - English-II',
        // Trimester 3
        'CSE 2113 - Data Structure',
        'CSE 2114 - Data Structure Lab',
        'EEE 2113 - Electrical Circuits',
        'EEE 2114 - Electrical Circuits Lab',
        'MATH 2131 - Mathematics-III (Matrices, Co-ordinate Geometry & Vector Spaces)',
        'UGE 2141 - Bangladesh Studies',
        // Trimester 4
        'CSE 2211 - Database Management Systems',
        'CSE 2212 - Database Management Systems Lab',
        'EEE 2213 - Electronic Devices and Circuits',
        'EEE 2214 - Electronic Devices and Circuits Lab',
        'MATH 2231 - Mathematics-IV (Differential Equations & Fourier Analysis)',
        'ACCT 2251 - Financial and Managerial Accounting',
        // Trimester 5
        'CSE 2311 - Algorithms',
        'CSE 2312 - Algorithms Lab',
        'CSE 2313 - Digital Logic Design',
        'CSE 2314 - Digital Logic Design Lab',
        'STAT 2331 - Statistics and Probability',
        'ECON 2351 - Principles of Economics',
        // Trimester 6
        'CSE 3111 - Theory of Computation',
        'CSE 3113 - Microprocessors and Interfacing',
        'CSE 3114 - Microprocessors and Interfacing Lab',
        'CSE 3115 - Object Oriented Analysis and Design',
        'CSE 3116 - Object Oriented Analysis and Design Lab',
        // Trimester 7
        'CSE 3211 - Operating Systems',
        'CSE 3212 - Operating Systems Lab',
        'CSE 3213 - Computer Architecture',
        'CSE 3215 - Software Engineering',
        'CSE 3216 - Software Engineering Lab',
        // Trimester 8
        'CSE 3313 - Data Communication',
        'CSE 3314 - Data Communication Lab',
        'CSE 3315 - Artificial Intelligence',
        'CSE 3316 - Artificial Intelligence Lab',
        // Trimester 9
        'CSE 4113 - Computer Networks',
        'CSE 4114 - Computer Networks Lab',
        'CSE 4115 - Compiler Design',
        'CSE 4116 - Compiler Design Lab',
        // Trimester 10
        'CSE 4211 - Computer Graphics',
        'CSE 4212 - Computer Graphics Lab',
        // Trimester 11 & 12
        'CSE 4300 - Thesis/Project',
        'CSE 4398 - Industrial Training',
    ],
    'B.Sc. in Data Science (BSDS)': [
        'DS101 - Introduction to Data Science',
        'DS201 - Data Mining & Warehouse',
        'DS305 - Big Data Analytics',
    ],
    'B.Sc. in Electrical & Electronic Engineering (EEE)': [
        'EEE101 - Electrical Circuits I',
        'EEE203 - Electronics I',
        'EEE301 - Digital Logic Design',
    ],
     'Bachelor of Business Administration (BBA)': [
        'BBA101 - Principles of Management',
        'BBA203 - Marketing Management',
        'BBA305 - Financial Management',
    ],
    'BA in English': [
        'ENG101 - Introduction to English Literature',
        'ENG202 - Shakespearean Drama',
        'ENG301 - Modern Poetry',
    ],
    // Add more courses for other programs as needed
};

export const ASSIGNMENT_TITLES = [
  'Assignment 1',
  'Assignment 2',
  'Assignment 3',
  'Assignment 4',
  'Mid Term Assignment',
  'Final Assignment',
  'Project Report',
  'Lab Report',
  'Case Study',
  'Research Paper',
  'Group Project',
];

export const TRIMESTERS = [
  'Spring 2024',
  'Summer 2024',
  'Fall 2024',
  'Spring 2025',
  'Summer 2025',
  'Fall 2025',
];

export const SECTIONS = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));