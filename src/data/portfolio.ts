export interface ProjectArchitectureNode {
  id: string;
  label: string;
  subLabel: string;
  description: string;
  type: 'input' | 'process' | 'ai' | 'db' | 'output';
  position: [number, number, number];
}

export interface ProjectData {
  id: string;
  title: string;
  category: 'AI & Machine Learning' | 'Full-Stack & Systems' | 'Data Analytics & BI' | 'Creative Web';
  subtitle: string;
  description: string;
  impactMetrics: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
  architectureNodes?: ProjectArchitectureNode[];
  color: string;
  status: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    category: string;
    description: string;
    coords: [number, number, number];
  }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Shlok Sharma",
    title: "AI Engineer & Full-Stack Developer",
    subtitle: "Building intelligent systems with Machine Learning, Python, React, Next.js & Modern Web Architectures.",
    summary:
      "Computer Science undergraduate and software developer with hands-on experience from three internships and 8+ end-to-end projects. Proficient in Python, JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, SQL, and Data/ML pipelines.",
    email: "shlokrahul1@gmail.com",
    phone: "+91 9548683823",
    location: "Greater Noida, Uttar Pradesh, India",
    github: "https://github.com/Shloksharma-27",
    linkedin: "https://linkedin.com/in/Shlok-Sharma",
    streamlitApp: "https://edupro-k3tel9gfu7tzmxz2fvmwat.streamlit.app/",
    status: "OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES",
    gradYear: "2027",
    stats: [
      { label: "End-to-End Projects", value: "8+" },
      { label: "Industry Internships", value: "3" },
      { label: "Transactions Analyzed", value: "12K+" },
      { label: "Turnaround Security Boost", value: "50%" },
    ]
  },

  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "KCC Institute of Technology & Management",
      location: "Greater Noida, Uttar Pradesh",
      period: "2023 – Present (6th Semester)",
      grade: "GPA: 7.566",
      highlights: [
        "Core Coursework: Data Structures, Algorithms, Database Management, Operating Systems, Machine Learning",
        "Active Participant in Tech Hackathons and Voyager Coding Club initiatives",
        "Graduation Year: 2027"
      ]
    },
    {
      degree: "Higher Secondary (12th), CBSE",
      institution: "Mayawati Modi Public School",
      location: "Modinagar, Uttar Pradesh",
      period: "2022 – 2023",
      grade: "Percentage: 78%",
      highlights: ["Physics, Chemistry, Mathematics, Computer Science"]
    },
    {
      degree: "Secondary (10th), CBSE",
      institution: "Mayawati Modi Public School",
      location: "Modinagar, Uttar Pradesh",
      period: "2020 – 2021",
      grade: "Percentage: 85.6%",
      highlights: ["Science and Mathematics honors"]
    }
  ] as EducationItem[],

  experiences: [
    {
      role: "Machine Learning Intern",
      company: "Unified Mentor Pvt. Ltd.",
      location: "Gurugram, Haryana",
      period: "Sep 2026 – Present",
      bullets: [
        "Cleaned and preprocessed complex datasets using Python libraries (Pandas, NumPy), systematically handling missing values and outliers.",
        "Applied robust feature engineering techniques to improve data readiness and training efficacy for machine learning models.",
        "Evaluated data distribution integrity to enhance predictive pipeline quality."
      ],
      tags: ["Python", "Pandas", "NumPy", "Feature Engineering", "Data Cleaning", "Machine Learning"]
    },
    {
      role: "Full Stack Web Developer",
      company: "Codomax Digital Solutions",
      location: "Chennai, Tamil Nadu",
      period: "Aug 2026 – Sep 2026",
      bullets: [
        "Developed a full-stack blog application using Node.js, Express, and MongoDB.",
        "Integrated the secure back-end REST services with the front-end blog interface for seamless data flow.",
        "Engineered modular schema designs and API endpoints for post authoring, viewing, and state persistence."
      ],
      tags: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Full Stack"]
    },
    {
      role: "Web Development and Design Intern",
      company: "Synent Technology",
      location: "Gurugram, Haryana",
      period: "Jul 2026 – Aug 2026",
      bullets: [
        "Led front-end and back-end integration using Node.js and Express.",
        "Streamlined authentication workflows with JSON Web Tokens (JWT), achieving a 50% increase in system security.",
        "Crafted responsive UI components and optimized request lifecycles."
      ],
      tags: ["JWT Authentication", "Node.js", "Express.js", "System Security", "UI/UX"]
    }
  ] as ExperienceItem[],

  skills: [
    {
      category: "Programming Languages",
      iconName: "Code2",
      skills: [
        { name: "Python", level: "Advanced", category: "Languages", description: "Core data science, ML pipelines, scripting, voice assistant logic", coords: [-3, 2, 0] },
        { name: "JavaScript", level: "Advanced", category: "Languages", description: "ES6+, asynchronous event loop, full-stack browser & server logic", coords: [-2, 3, -1] },
        { name: "TypeScript", level: "Proficient", category: "Languages", description: "Type-safe Next.js & React architectures, interfaces, generic types", coords: [-1, 3.5, 1] },
        { name: "C++", level: "Intermediate", category: "Languages", description: "Data structures, algorithmic problem-solving and memory concepts", coords: [-3.5, 0.5, 0.5] },
        { name: "C", level: "Intermediate", category: "Languages", description: "Systems fundamentals, pointers and algorithmic foundations", coords: [-3, -1, 1] },
        { name: "Java", level: "Intermediate", category: "Languages", description: "Object-oriented software principles and backend logic", coords: [-2.5, -2, 0] },
        { name: "SQL", level: "Proficient", category: "Languages", description: "Relational queries, joins, aggregations, schema design", coords: [-1.5, -3, -1] },
      ]
    },
    {
      category: "Data & Machine Learning",
      iconName: "Cpu",
      skills: [
        { name: "Pandas", level: "Advanced", category: "Data & ML", description: "Data manipulation, cleaning, aggregation, restructuring", coords: [3, 2, 0] },
        { name: "NumPy", level: "Advanced", category: "Data & ML", description: "Vectorized numerical operations, matrix transformations", coords: [2, 3, 1] },
        { name: "Machine Learning", level: "Proficient", category: "Data & ML", description: "Feature engineering, data readiness, predictive modeling & AI opponents", coords: [3.5, 0.5, -0.5] },
        { name: "Feature Engineering", level: "Proficient", category: "Data & ML", description: "Outlier handling, imputations, mathematical transformations", coords: [3, -1, -1] },
        { name: "Data Cleaning", level: "Advanced", category: "Data & ML", description: "Data validation pipelines, anomaly detection, dataset readiness", coords: [2.5, -2, 0] },
        { name: "Matplotlib", level: "Proficient", category: "Data & ML", description: "Statistical visualizations, histogram distributions, line charts", coords: [1.5, 3.5, -1] },
        { name: "Seaborn", level: "Proficient", category: "Data & ML", description: "High-level statistical data visualization & heatmaps", coords: [1, 2.5, 1] },
        { name: "Plotly.js", level: "Proficient", category: "Data & ML", description: "Interactive web-based visual dashboards and charts", coords: [0.5, 3.8, 0] },
        { name: "Power BI & DAX", level: "Proficient", category: "Data & ML", description: "Executive KPI dashboards, DAX measure libraries, interactive slicers", coords: [2, -3, 1] },
        { name: "Streamlit", level: "Proficient", category: "Data & ML", description: "Rapid ML app deployments & interactive web demos (EduPro live)", coords: [1, -3.5, -1] },
        { name: "Jupyter Notebook", level: "Advanced", category: "Data & ML", description: "Exploratory data analysis, reproducible research & model training", coords: [0, -3.8, 0] },
      ]
    },
    {
      category: "Web & Full-Stack",
      iconName: "Layers",
      skills: [
        { name: "React.js", level: "Advanced", category: "Full-Stack", description: "Component-driven architecture, custom hooks, reactive state", coords: [0, 2, 3] },
        { name: "Next.js 14", level: "Proficient", category: "Full-Stack", description: "App router, SSR, server components, production agri-tech UI", coords: [-1.5, 2.5, 2.5] },
        { name: "Node.js", level: "Advanced", category: "Full-Stack", description: "Backend runtimes, event-driven I/O, REST APIs", coords: [1.5, 2.5, 2.5] },
        { name: "Express.js", level: "Advanced", category: "Full-Stack", description: "Middleware chaining, routing, authentication, API security", coords: [0, 0, 3.5] },
        { name: "Vite", level: "Advanced", category: "Full-Stack", description: "High-performance frontend tooling, HMR, bundling", coords: [-2, 0, 3] },
        { name: "Tailwind CSS", level: "Advanced", category: "Full-Stack", description: "Design systems, tokenized UI, responsive dark styling", coords: [2, 0, 3] },
        { name: "Framer Motion", level: "Proficient", category: "Full-Stack", description: "Declarative scroll reveals, layout animations, gestures", coords: [-1, -2, 3] },
        { name: "REST APIs", level: "Advanced", category: "Full-Stack", description: "CRUD endpoints, status codes, query filtering, JSON payloads", coords: [1, -2, 3] },
        { name: "JWT Authentication", level: "Advanced", category: "Full-Stack", description: "Token signing, RBAC, PIN distribution, session hardening", coords: [0, -3, 2.5] },
        { name: "Socket.IO", level: "Proficient", category: "Full-Stack", description: "Real-time bi-directional events, live notifications & updates", coords: [-1.5, 1, 3] },
        { name: "HTML5 / CSS3", level: "Advanced", category: "Full-Stack", description: "Semantic markup, modern layout models, animations & accessibility", coords: [1.5, 1, 3] },
      ]
    },
    {
      category: "Databases & Tools",
      iconName: "Database",
      skills: [
        { name: "MongoDB", level: "Proficient", category: "Databases", description: "NoSQL document collections, aggregation pipelines, Mongoose schemas", coords: [0, 1.5, -3] },
        { name: "SQL Databases", level: "Proficient", category: "Databases", description: "Relational integrity, indexing, normalized table structures", coords: [-1.5, 2, -2.5] },
        { name: "Git", level: "Advanced", category: "Tools", description: "Version control, branching strategies, commit workflows", coords: [1.5, 2, -2.5] },
        { name: "GitHub", level: "Advanced", category: "Tools", description: "Code collaboration, issue tracking, continuous repository maintenance", coords: [0, -1.5, -3] },
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "agrinova",
      title: "AgriNova",
      category: "AI & Machine Learning",
      subtitle: "AI-Powered Agri-Tech Platform with Predictive Analytics",
      description:
        "A full 20-section modern agri-tech platform built with Next.js 14 App Router. Features interactive AI demo modules including a disease-detection scanner, crop-recommendation sliders, live weather telemetry, and a typing chatbot preview architected for ML API integration.",
      impactMetrics: [
        "20+ production-grade component sections",
        "Engineered AI crop & disease detection modules",
        "Scroll-triggered yield-prediction interactive charts",
        "WCAG compliant design-system with keyboard navigation & reduced-motion"
      ],
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Machine Learning Architecture"],
      githubUrl: "https://github.com/Shloksharma-27",
      liveUrl: "https://edupro-k3tel9gfu7tzmxz2fvmwat.streamlit.app/",
      isFeatured: true,
      color: "#00f0ff",
      status: "PRODUCTION ARCHITECTURE",
      architectureNodes: [
        {
          id: "input",
          label: "Crop & Telemetry Ingestion",
          subLabel: "Sensor & Image Input",
          description: "Captures agricultural soil parameters, humidity, N-P-K ratios, and leaf scan imagery from farmer inputs.",
          type: "input",
          position: [-4, 0, 0]
        },
        {
          id: "preprocessing",
          label: "Feature Normalization Engine",
          subLabel: "Pandas & Data Pipeline",
          description: "Performs feature scaling, image matrix tensor formatting, and boundary outlier cleaning.",
          type: "process",
          position: [-2, 1, 0]
        },
        {
          id: "ml_inference",
          label: "AI Recommendation & Disease Vision",
          subLabel: "Predictive ML Models",
          description: "Runs disease pattern recognition and multi-variable crop suitability scoring with confidence metrics.",
          type: "ai",
          position: [0, 0, 0]
        },
        {
          id: "nextjs_actions",
          label: "Next.js 14 App Router & Cache",
          subLabel: "Server Actions & State",
          description: "Processes responses, updates dynamic yield estimation curves, and handles reactive UI state.",
          type: "process",
          position: [2, 1, 0]
        },
        {
          id: "output_dashboard",
          label: "Interactive Farmer Visual HUD",
          subLabel: "Confidence Gauges & Action Plan",
          description: "Renders real-time diagnostic confidence scores, yield forecast plots, and immediate fertilizer recommendations.",
          type: "output",
          position: [4, 0, 0]
        }
      ]
    },
    {
      id: "tendertrace",
      title: "TenderTrace",
      category: "Full-Stack & Systems",
      subtitle: "Government Tender & Site Management System",
      description:
        "Full-stack governance and site management platform for government bodies and contractors. Features JWT authentication with role-based access control (RBAC), auto-generated tender IDs, PIN-secured credential distribution, real-time attendance tracking, labor productivity scoring, material stock alerts, and citizen complaint tracking.",
      impactMetrics: [
        "Real-time Socket.IO synchronization across contractor & government portals",
        "Auto-generated unique tender IDs & PIN-secured credential distribution",
        "Integrated citizen complaint-tracking and site milestone verification",
        "Role-based access control protecting critical public expenditure data"
      ],
      techStack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Socket.IO", "Recharts"],
      githubUrl: "https://github.com/Shloksharma-27/tendertrace",
      isFeatured: false,
      color: "#3b82f6",
      status: "FULL-STACK PLATFORM",
      architectureNodes: [
        {
          id: "portal_ui",
          label: "Gov & Contractor Portal",
          subLabel: "React + Vite + Recharts",
          description: "Dual-portal dashboard displaying live site metrics, attendance logs, and tender status.",
          type: "input",
          position: [-3.5, 0, 0]
        },
        {
          id: "auth_guard",
          label: "JWT & RBAC Security Layer",
          subLabel: "PIN Verification Gate",
          description: "Validates token credentials, user roles (Officer vs Contractor), and encrypted PIN distribution.",
          type: "process",
          position: [-1.2, 0.8, 0]
        },
        {
          id: "backend_core",
          label: "Express REST & Socket.IO",
          subLabel: "Node.js Server",
          description: "Manages business logic for milestone approvals, stock alert dispatches, and bi-directional event broadcasts.",
          type: "ai",
          position: [1.2, 0.8, 0]
        },
        {
          id: "mongo_db",
          label: "MongoDB Document Store",
          subLabel: "Tender & Audit Collections",
          description: "Stores relational-like document schemes for complaints, material logs, and contractor productivity history.",
          type: "db",
          position: [3.5, 0, 0]
        }
      ]
    },
    {
      id: "retail-sales-analysis",
      title: "Retail Sales Intelligence",
      category: "Data Analytics & BI",
      subtitle: "12,000+ Transactions Analysis & BI Dashboard",
      description:
        "End-to-end business intelligence pipeline analyzing 12,000+ retail transactions covering INR 8.07 Cr in sales across 5 regions. Features a modular Python data cleaning and feature engineering pipeline adding 8 calculated fields, coupled with a two-page Power BI executive dashboard with 5 KPI cards, 7 slicers, DAX measure library, 10 Matplotlib charts, and interactive Plotly.js visuals.",
      impactMetrics: [
        "12,000+ transactions analyzed across 5 regions & customer segments",
        "INR 8.07 Cr sales volume mapped at 17.9% profit margin",
        "Surfaced Q4 seasonal peak representing ~27% of annual revenue",
        "Engineered 8 calculated fields & full DAX measure library"
      ],
      techStack: ["Python", "Pandas", "NumPy", "Power BI", "DAX", "Plotly.js", "Matplotlib", "Jupyter Notebook"],
      githubUrl: "https://github.com/Shloksharma-27/retail-sales-analysis-dashboard",
      isFeatured: false,
      color: "#10b981",
      status: "DATA PIPELINE",
      architectureNodes: [
        {
          id: "raw_data",
          label: "Raw Transaction Feed",
          subLabel: "12K+ Transaction Records",
          description: "Multi-region sales logs containing transaction times, product SKUs, discount rates, and customer IDs.",
          type: "input",
          position: [-3.5, 0, 0]
        },
        {
          id: "pandas_clean",
          label: "Pandas Cleaning & Imputation",
          subLabel: "Outlier & Missing Value Handling",
          description: "Python data pipeline filtering anomalies and validating transaction integrity.",
          type: "process",
          position: [-1.2, 0.8, 0]
        },
        {
          id: "feature_eng",
          label: "Feature Engineering & DAX",
          subLabel: "8 Calculated Measures",
          description: "Computes profit margins, quarter categorizations, customer lifetime metrics, and seasonal weightings.",
          type: "ai",
          position: [1.2, 0.8, 0]
        },
        {
          id: "powerbi_plotly",
          label: "Interactive Power BI & Plotly HUD",
          subLabel: "Executive 5-KPI Dashboard",
          description: "Delivers interactive slicers, profit heatmaps, product rankings, and revenue forecasts.",
          type: "output",
          position: [3.5, 0, 0]
        }
      ]
    },
    {
      id: "codomax-blog",
      title: "Codomax Blog Engine",
      category: "Full-Stack & Systems",
      subtitle: "Full-Stack Publishing & Content API Platform",
      description:
        "Developed during Full Stack Web Developer internship at Codomax Digital Solutions. Full-stack blog engine built with Node.js, Express, and MongoDB, enabling authenticated article creation, rich text persistence, and responsive presentation.",
      impactMetrics: [
        "Engineered complete RESTful CRUD content pipeline",
        "Optimized database queries for instant post retrieval",
        "Seamless frontend-backend data synchronization"
      ],
      techStack: ["Node.js", "Express.js", "MongoDB", "JavaScript", "REST APIs"],
      githubUrl: "https://github.com/Shloksharma-27/codomax",
      color: "#8b5cf6",
      status: "INTERNSHIP PROJECT"
    },
    {
      id: "volta-coffee",
      title: "VOLTA Luxury Web Experience",
      category: "Creative Web",
      subtitle: "Vanilla High-Performance Animated Experience",
      description:
        "A single-page, animated luxury coffee brand website engineered purely in HTML5, CSS3, and vanilla JavaScript with zero external frameworks or heavy build tools. Features custom magnetic cursor physics, 30-particle ambient simulation, parallax hero, and IntersectionObserver scroll reveals.",
      impactMetrics: [
        "Zero-framework architecture for ultra-fast load times",
        "Custom magnetic cursor & 30-particle canvas physics",
        "Fluid responsive design with prefers-reduced-motion accessibility"
      ],
      techStack: ["HTML5", "CSS3", "JavaScript (Vanilla)", "Canvas API", "IntersectionObserver"],
      githubUrl: "https://github.com/Shloksharma-27/coffee_website",
      color: "#f59e0b",
      status: "CREATIVE ENGINEERING"
    },
    {
      id: "jarvis-assistant",
      title: "Jarvis AI Voice Assistant & Tool Suite",
      category: "AI & Machine Learning",
      subtitle: "Python Voice Recognition & Algorithmic Tool Suite",
      description:
        "Showcase of specialized software tools including Jarvis (a Python voice assistant utilizing speech recognition and text-to-speech synthesis), a Tic Tac Toe game with Minimax AI opponent logic, a BMW parallax experience, and a keyboard-enabled calculator.",
      impactMetrics: [
        "Speech recognition and speech synthesis voice interface",
        "Deterministic Minimax AI opponent state evaluation",
        "Interactive desktop and web utilities"
      ],
      techStack: ["Python", "Speech Recognition", "TTS", "JavaScript", "HTML5/CSS3"],
      githubUrl: "https://github.com/Shloksharma-27/portfolio",
      color: "#ec4899",
      status: "SYSTEMS & UTILITIES"
    }
  ] as ProjectData[],

  certifications: [
    {
      title: "Full Stack Web Development",
      issuer: "Codomax Digital Solutions"
    },
    {
      title: "Front End Development (HTML)",
      issuer: "Great Learning"
    }
  ] as CertificationItem[],

  achievements: [
    {
      title: "Code Farming 24-Hour Code-A-Thon",
      event: "HackerRank & Voyager Coding Club",
      location: "KCC Institute of Technology & Management",
      date: "April 2026",
      description: "Participated in an intensive 24-hour algorithmic problem-solving sprint testing data structures, algorithms, and speed."
    },
    {
      title: "8+ End-to-End Production Projects",
      event: "Independent Engineering Portfolio",
      location: "Greater Noida, India",
      date: "2024 – 2026",
      description: "Independently designed, engineered, and deployed 8+ full-stack web applications, MERN architectures, and data analytics/BI pipelines."
    }
  ],

  knowledgeBase: [
    {
      keywords: ["specialization", "focus", "specialize", "ai", "engineer", "about", "who is", "who are you"],
      answer: "Shlok Sharma specializes in AI Engineering, Machine Learning data pipelines, and Modern Full-Stack Development. He works with Python, Pandas, NumPy, Next.js 14, React, Node.js, Express, MongoDB, and SQL to build responsive digital architectures and intelligent applications."
    },
    {
      keywords: ["project", "projects", "agrinova", "tendertrace", "retail", "dashboard"],
      answer: "Shlok's prominent projects include: 1) AgriNova (AI-powered agri-tech platform with crop recommendation & disease detection preview in Next.js 14), 2) TenderTrace (Full-stack government tender & site management system with JWT RBAC and Socket.IO), 3) Retail Sales Analysis Dashboard (12K+ transactions analyzed, INR 8.07 Cr sales in Power BI & Plotly), 4) Codomax Blog Engine, and 5) VOLTA (Zero-framework animated luxury web experience)."
    },
    {
      keywords: ["strongest", "best project", "featured", "flagship"],
      answer: "Shlok's flagship AI project is AgriNova — an AI-powered agri-tech platform built on Next.js 14 App Router, featuring disease-detection scanner preview, crop recommendation sliders, dynamic yield curves, and a tokenized design system. In full-stack systems, TenderTrace stands out with real-time Socket.IO synchronization and role-based access control."
    },
    {
      keywords: ["internship", "internships", "experience", "work", "companies"],
      answer: "Shlok has completed 3 internships: 1) Machine Learning Intern at Unified Mentor Pvt. Ltd. (cleaning/preprocessing datasets, feature engineering in Python), 2) Full Stack Web Developer at Codomax Digital Solutions (Node.js, Express, MongoDB blog platform), and 3) Web Development Intern at Synent Technology (JWT authentication, boosted security by 50%)."
    },
    {
      keywords: ["education", "college", "degree", "university", "gpa", "btech"],
      answer: "Shlok is pursuing his B.Tech in Computer Science Engineering at KCC Institute of Technology & Management, Greater Noida (Class of 2027), holding a 7.566 GPA (6th Semester). He completed his 12th CBSE (78%) and 10th CBSE (85.6%) at Mayawati Modi Public School."
    },
    {
      keywords: ["tech", "stack", "technologies", "skills", "languages", "python", "react"],
      answer: "Shlok's technical stack includes: Languages (Python, JavaScript, TypeScript, C, C++, Java, SQL), Web & Full-Stack (React.js, Next.js 14, Node.js, Express.js, Vite, Tailwind CSS, Framer Motion, Socket.IO, JWT Auth), Data & ML (Pandas, NumPy, Matplotlib, Seaborn, Plotly, Power BI, DAX, Streamlit, Jupyter), and Databases & Tools (MongoDB, SQL, Git, GitHub)."
    },
    {
      keywords: ["contact", "email", "phone", "hire", "linkedin", "github", "location"],
      answer: "You can reach Shlok directly at shlokrahul1@gmail.com or by phone at +91 9548683823. His location is Greater Noida, UP, India. Find him on GitHub at github.com/Shloksharma-27 and LinkedIn at linkedin.com/in/Shlok-Sharma."
    },
    {
      keywords: ["certification", "certificates", "awards", "hackathon"],
      answer: "Shlok holds certifications in Full Stack Web Development (Codomax Digital Solutions) and Front End Development HTML (Great Learning). He also competed in the 24-hour 'Code Farming' Code-A-Thon on HackerRank organized by Voyager Coding Club."
    }
  ]
};
