// Portfolio data — all developer information
export const developer = {
  name: "Shivam Raj",
  title: "Full Stack Developer | AI Enthusiast",
  subtitle: "AI Enthusiast",
  headline: "Engineering Intelligent Digital Experiences with Full Stack & AI",
  email: "shivamraj918815@gmail.com",
  phone: "+91 6399666608",
  linkedin: "https://www.linkedin.com/in/shivam-raj-9s",
  github: "https://github.com/ShivamRaj9188",
  resumeFile: "/Shivam_Raj_CV.pdf",
};

export const aboutMe =
  "A Full Stack Developer and AI Enthusiast skilled in the MERN stack, Java, Spring Boot, and Maven. I chose Full Stack Development and AI because the most impactful digital products emerge at the intersection of clean engineering and intelligent automation. My goal is to engineer scalable, AI-integrated web applications that solve real-world problems — from concept to deployment.";

export const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Lovely Professional University",
    grade: "CGPA 8.34",
    icon: "",
  },
  {
    degree: "Intermediate (12th)",
    institution: "Touch Wood School Dehradun",
    grade: "80%",
    icon: "",
  },
  {
    degree: "Matriculation (10th)",
    institution: "Touch Wood School Dehradun",
    grade: "90%",
    icon: "",
  },
];

export const training = [
  {
    title: "FLAMES '25 MERN with Gen AI",
    provider: "W3grads",
    period: "2025",
    role: "Trainee Developer",
    tasks: "Built full-stack MERN applications with Generative AI integration, streamlined Git workflows, and participated in daily SCRUMs.",
    description: "Addressed major development bottlenecks—skill gaps, AI inconsistencies, database lag, and deployment issues; streamlined workflows and optimized processes. Established strict Git workflows and daily SCRUMs to reduce collaboration hurdles.",
    skillsGained: ["MERN Stack", "Generative AI", "Git Workflows", "Agile/SCRUM", "Database Optimization"],
    link: "https://drive.google.com/file/d/1bG9__h0E66NP9uDl3CW-yi3yVSJ7oivL/view?usp=sharing",
    image: "/certs/flames-25.png"
  }
];

export const skills = {
  languages: ["C++", "Java", "Python"],
  frameworksLibraries: ["React", "Node.js", "Express", "Spring Boot", "OpenCV", "NumPy", "Pandas"],
  toolsPlatforms: ["Git", "GitHub", "MongoDB", "PostgreSQL", "Vercel"],
  osScripting: ["Linux", "Bash", "Windows"],
  // Keep old keys for backward compat with 3D orbital canvas
  frameworks: ["React", "Node.js", "Express", "Spring Boot"],
  libraries: ["OpenCV", "NumPy", "Pandas"],
  tools: ["Git", "GitHub", "Linux", "PostgreSQL"],
  soft: ["Leadership", "Critical Thinking", "Articulation", "Team Collaboration"],
};

export const softSkills = ["Articulation", "Organizer", "Critical Thinking", "Leadership"];

export const hackathon = {
  name: "Medha Hackathon",
  description: "Collaborated on developing a wearable ECG vest and an efficient, non-invasive digital Blood Glucose Monitor — eliminating the need for patients to draw blood for regular monitoring. A 24-hour hackathon that sharpened problem-solving under pressure, cross-functional teamwork, and rapid prototyping for real-world healthcare challenges.",
  image: "/hackathon-medha.jpeg",
  link: "https://www.linkedin.com/feed/update/urn:li:activity:7238239903946268672/",
};

export const toolsPlatformsTable = [
  { category: "Languages", tools: "C++, Java, Python" },
  { category: "Frameworks & Libraries", tools: "React, Node.js, Express, Spring Boot, OpenCV, NumPy, Pandas" },
  { category: "Databases", tools: "MongoDB, PostgreSQL" },
  { category: "Tools & Platforms", tools: "Git, GitHub, Vercel, VS Code" },
  { category: "OS & Scripting", tools: "Linux, Bash, Windows" },
  { category: "Version Control", tools: "Git, GitHub" },
];

export const projects = [
  {
    id: "fintrackai",
    name: "FinTrackAI",
    tagline: "AI-Powered Financial Intelligence",
    description:
      "An AI-powered financial tracking platform that automatically categorizes expenses using generative AI, providing deep spending insights and analytics.",
    features: [
      "Automatic expense categorization via Generative AI",
      "Financial analytics dashboard",
      "Budget tracking & alerts",
      "Spending insights & forecasts",
    ],
    tech: ["MongoDB", "Express", "Node.js", "React"],
    skillsDemonstrated: ["Full Stack Development", "AI/ML Integration", "RESTful API Design", "Data Visualization"],
    image: "/projects/fintrackai.png",
    color: "#ff4d79",
    accentColor: "#990024",
    github: "https://github.com/ShivamRaj9188/FinTrackAI_Secure",
    live: "https://fin-track-ai-secure.vercel.app",
  },
  {
    id: "repmate",
    name: "RepMate",
    tagline: "AI-Powered Fitness Tracking & Privacy",
    description:
      "A privacy-first fitness platform that uses computer vision and EMA-based movement smoothing to provide real-time form correction and precise repetition counting directly in the browser.",
    features: [
      "Real-time AI pose tracking via MediaPipe",
      "EMA-based movement smoothing & jitter reduction",
      "Strict Privacy: No video recording or persistence",
      "Posture Analysis & injury prevention feedback",
      "Multi-Exercise logic (Push-ups, Squats, Curls)",
      "Secure JWT Authentication & Metrics Dashboard",
    ],
    tech: ["React 19", "Spring Boot 3", "PostgreSQL", "Python 3.11", "FastAPI", "MediaPipe", "Framer Motion"],
    skillsDemonstrated: ["Computer Vision", "Applied Mathematics", "Privacy-Centric Design", "Full Stack Development"],
    image: "/projects/repmate.png",
    color: "#ff80a0",
    accentColor: "#e2e8f0",
    github: "https://github.com/ShivamRaj9188/Repmate.git",
  },
  {
    id: "gym-management",
    name: "Gym Management System",
    tagline: "Enterprise Administration Platform",
    description:
      "A comprehensive, full-stack enterprise platform designed for gym administration and member lifecycle management utilizing a decoupled architecture.",
    features: [
      "JWT-driven RBAC authentication & security",
      "Operational Dashboard with real-time metrics",
      "Subscription, Attendance & Financial Tracking",
      "Automated Notifications & Data Export",
    ],
    tech: ["React 19", "Spring Boot 3", "PostgreSQL", "Java 17", "JWT"],
    skillsDemonstrated: ["Enterprise Architecture", "Authentication & Security", "Database Design", "Full Stack Java"],
    image: "/projects/gym.png",
    color: "#e2e8f0",
    accentColor: "#cc0030",
    github: "https://github.com/ShivamRaj9188/Gym-Management-System.git",
    live: "https://gym-management-system-blond.vercel.app",
  },
];

export const certifications = [
  {
    name: "Build Generative AI Apps and Solutions with No-Code Tools",
    issuer: "Infosys",
    icon: "",
    image: "/certs/infosys-nocode.png",
    link: "https://drive.google.com/file/d/1KMxPWtJj-fUyzQjit_qterMQ9QdaQXyj/view?usp=sharing",
  },
  {
    name: "Master Generative AI and Generative AI Tools",
    issuer: "Infosys",
    icon: "",
    image: "/certs/infosys-genai.png",
    link: "https://drive.google.com/file/d/18n7fnL7vJnZ-cnGbqOSk1GUWzUnnjWb9/view",
  },
  {
    name: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    icon: "",
    image: "/certs/google-networking.png",
    link: "https://www.coursera.org/account/accomplishments/verify/00NLBLTA5IU1?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
  },
  {
    name: "Computer Communications",
    issuer: "University of Colorado",
    icon: "",
    image: "/certs/uc-comm.png",
    link: "https://www.coursera.org/account/accomplishments/specialization/WOJRINRKWNMP?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=s12n",
  },
];
