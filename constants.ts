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
        'MATH 1151 - Fundamental Calculus',
        'CSE 1110 - Introduction to Computer Systems',
        'ENG 1011 - Intensive English I',
        'PHY 1101 - Physics I',
        'CSE 1111 - Structured Programming Language',
        'CSE 1112 - Structured Programming Language Laboratory',

        // Trimester 2
        'MATH 1183 - Calculus and Linear Algebra',
        'ENG 1013 - Intensive English II',
        'PHY 1103 - Physics II',
        'PHY 1104 - Physics II Laboratory',
        'CSE 2118 - Advanced Object Oriented Programming Laboratory', // Note: Image lists this in Tri 4 but logic flows here usually, stick to images if precise, but I'll follow image flow exactly below

        // CORRECTED FROM IMAGES (Trimester 3-12)
        // Trimester 3
        'MATH 2183 - Calculus and Linear Algebra',
        'CSE 1325 - Digital Logic Design',
        'CSE 1326 - Digital Logic Design Laboratory',
        'CSE 1115 - Object Oriented Programming',
        'CSE 1116 - Object Oriented Programming Laboratory',

        // Trimester 4
        'MATH 2201 - Coordinate Geometry and Vector Analysis',
        'PHY 2105 - Physics',
        'PHY 2106 - Physics Laboratory',
        'CSE 2118 - Advanced Object Oriented Programming Laboratory',
        'EEE 2113 - Electrical Circuits',

        // Trimester 5
        'MATH 2205 - Probability and Statistics',
        'SOC 2101 - Society, Environment and Engineering Ethics',
        'CSE 2215 - Data Structure and Algorithms - I',
        'CSE 2216 - Data Structure and Algorithms - I Laboratory',
        'CSE 2233 - Theory of Computation',

        // Trimester 6
        'CSE 3313 - Computer Architecture',
        'CSE 2217 - Data Structure and Algorithms - II',
        'CSE 2218 - Data Structure and Algorithms - II Laboratory',
        'EEE 2123 - Electronics',
        'EEE 2124 - Electronics Laboratory',

        // Trimester 7
        'CSE 3521 - Database Management Systems',
        'CSE 3522 - Database Management Systems Laboratory',
        'CSE 3411 - System Analysis and Design',
        'CSE 3412 - System Analysis and Design Laboratory',
        'CSE 3811 - Artificial Intelligence',
        'CSE 3812 - Artificial Intelligence Laboratory',

        // Trimester 8
        'CSE 4325 - Microprocessors and Microcontrollers',
        'CSE 4326 - Microprocessors and Microcontrollers Laboratory',
        'CSE 3421 - Software Engineering',
        'CSE 3422 - Software Engineering Laboratory',
        'CSE 3711 - Computer Networks',
        'CSE 3712 - Computer Networks Laboratory',

        // Trimester 9
        'BIO 3105 - Biology for Engineers',
        'GED OPT1 - General Education Optional-I',
        'CSE 4165 - Web Programming',
        'CSE 4181 - Mobile Application Development',
        'PMG 4101 - Project Management',

        // Trimester 10
        'GED OPT2 - General Education Optional-II',
        'CSE 4000A - Final Year Design Project - I',
        // Optional/Electives
        'ECO 4101 - Economics',
        'SOC 4101 - Introduction to Sociology',
        'ACT 2111 - Financial and Managerial Accounting',
        'IPE 3401 - Industrial and Operational Management',
        'TEC 2499 - Technology Entrepreneurship',
        'PSY 2101 - Psychology',
        'BDS 2201 - Bangladesh Studies',
        'BAN 2501 - Bangla',

        // Trimester 11
        'GED OPT3 - General Education Optional - III',
        'CSE 3509 - Operating Systems',
        'CSE 3510 - Operating Systems Laboratory',
        'CSE 4000B - Final Year Design Project - II',
        'CSE 4531 - Computer Security',

        // Trimester 12
        'CSE 4000C - Final Year Design Project - III',
        'EEE 4261 - Green Computing',

        // Electives & Others
        'CSE 3811 - Introduction to Data Science',
        'CSE 4251 - Computer Graphics',

        // Major: Computational Theory
        'CSE 4601 - Mathematical Analysis for Computer Science',
        'CSE 4633 - Basic Graph Theory',
        'CSE 4655 - Algorithm Engineering',
        'CSE 4611 - Compiler Design',
        'CSE 4613 - Computational Geometry',
        'CSE 4621 - Computer Graphics',

        // Major: Network and Communications
        'CSE 3715 - Data Communication',
        'CSE 4759 - Wireless and Cellular Communication',
        'CSE 4793 - Advanced Network Services and Management',
        'CSE 4783 - Cryptography',
        'CSE 4777 - Networks Security',
        'CSE 4763 - Electronic Business',

        // Major: Systems
        'CSE 4547 - Multimedia Systems Design',
        'CSE 4519 - Distributed Systems',
        'CSE 4523 - Simulation and Modeling',
        'CSE 4521 - Computer Graphics',
        'CSE 4587 - Cloud Computing',
        'CSE 4567 - Advanced Database Management Systems',

        // Major: Data Science
        'CSE 4889 - Machine Learning',
        'CSE 4891 - Data Mining',
        'CSE 4893 - Introduction to Bioinformatics',
        'CSE 4883 - Digital Image Processing',
        'CSE 4817 - Big Data Analytics',

        // Major: Software Engineering
        'CSE 4451 - Human Computer Interaction',
        'CSE 4435 - Software Architecture',
        'CSE 4165 - Web Programming',
        'CSE 4181 - Mobile Application Development',
        'CSE 4495 - Software Testing and Quality Assurance',
        'CSE 4485 - Game Design and Development',

        // Major: Hardware
        'CSE 4329 - Digital System Design',
        'CSE 4379 - Real-time Embedded Systems',
        'CSE 4327 - VLSI Design',
        'CSE 4337 - Robotics',
        'CSE 4397 - Interfacing',

        // Major: Information and Communication Technology
        'CSE 4941 - Enterprise Systems: Concepts and Practice',
        'CSE 4943 - Web Application Security',
        'CSE 4463 - Electronic Business',
        'CSE 4945 - UI: Concepts and Design',
        'CSE 4949 - IT Audit: Concepts and Practice',

        // University Required
        'URC 1103 - Life Skills for Success',
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
];

export const SESSIONS = [
    'Spring',
    'Summer',
    'Fall',
];

export const SECTIONS = Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));