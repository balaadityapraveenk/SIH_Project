// Mock Database and Business Logic for Academia-Industry Collaboration Portal

export const STANDARD_ROLES = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    skills: [
      { name: "React", level: 80, category: "Frontend" },
      { name: "JavaScript", level: 80, category: "Frontend" },
      { name: "Node.js", level: 75, category: "Backend" },
      { name: "SQL/PostgreSQL", level: 70, category: "Database" },
      { name: "Git", level: 70, category: "Tools" },
      { name: "Tailwind CSS", level: 75, category: "Frontend" }
    ]
  },
  {
    id: "datascientist",
    title: "Data Scientist",
    skills: [
      { name: "Python", level: 85, category: "Languages" },
      { name: "SQL/PostgreSQL", level: 75, category: "Database" },
      { name: "Machine Learning", level: 80, category: "AI/ML" },
      { name: "Data Visualization", level: 75, category: "AI/ML" },
      { name: "Pandas/NumPy", level: 80, category: "Languages" },
      { name: "Statistics", level: 70, category: "Academic" }
    ]
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    skills: [
      { name: "Linux", level: 80, category: "Tools" },
      { name: "Docker", level: 80, category: "Cloud/DevOps" },
      { name: "Kubernetes", level: 70, category: "Cloud/DevOps" },
      { name: "AWS", level: 75, category: "Cloud/DevOps" },
      { name: "CI/CD Pipelines", level: 75, category: "Cloud/DevOps" },
      { name: "Shell Scripting", level: 70, category: "Languages" }
    ]
  },
  {
    id: "backend",
    title: "Java Backend Engineer",
    skills: [
      { name: "Java", level: 85, category: "Languages" },
      { name: "Spring Boot", level: 80, category: "Backend" },
      { name: "SQL/PostgreSQL", level: 80, category: "Database" },
      { name: "REST APIs", level: 80, category: "Backend" },
      { name: "Docker", level: 60, category: "Cloud/DevOps" },
      { name: "Hibernate/JPA", level: 75, category: "Backend" }
    ]
  }
];

export const ALL_AVAILABLE_SKILLS = [
  { name: "React", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "HTML/CSS", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Java", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "Shell Scripting", category: "Languages" },
  { name: "Node.js", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Hibernate/JPA", category: "Backend" },
  { name: "SQL/PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Docker", category: "Cloud/DevOps" },
  { name: "Kubernetes", category: "Cloud/DevOps" },
  { name: "AWS", category: "Cloud/DevOps" },
  { name: "CI/CD Pipelines", category: "Cloud/DevOps" },
  { name: "Linux", category: "Tools" },
  { name: "Git", category: "Tools" },
  { name: "Machine Learning", category: "AI/ML" },
  { name: "Data Visualization", category: "AI/ML" },
  { name: "Pandas/NumPy", level: 80, category: "Languages" },
  { name: "Statistics", category: "Academic" },
  { name: "Data Structures", category: "Academic" },
  { name: "DBMS", category: "Academic" },
  { name: "Communication Skills", category: "Soft Skills" },
  { name: "Problem Solving", category: "Soft Skills" }
];

export let MOCK_STUDENTS = [
  {
    id: "stud_1",
    name: "Aarav Sharma",
    email: "aarav.sharma@nit.edu",
    college: "National Institute of Technology",
    cgpa: 8.7,
    degree: "B.Tech Computer Science",
    graduationYear: 2027,
    skills: [
      { name: "React", level: 75, category: "Frontend" },
      { name: "JavaScript", level: 80, category: "Frontend" },
      { name: "HTML/CSS", level: 85, category: "Frontend" },
      { name: "Tailwind CSS", level: 70, category: "Frontend" },
      { name: "Node.js", level: 60, category: "Backend" },
      { name: "SQL/PostgreSQL", level: 65, category: "Database" },
      { name: "Git", level: 75, category: "Tools" },
      { name: "Data Structures", level: 80, category: "Academic" },
      { name: "Communication Skills", level: 85, category: "Soft Skills" }
    ],
    certifications: [
      { name: "AWS Certified Cloud Practitioner", provider: "Amazon Web Services", year: 2025 },
      { name: "Meta Frontend Developer Professional Certificate", provider: "Coursera", year: 2026 }
    ],
    projects: [
      {
        id: "proj_1",
        title: "Campus Placement Portal UI",
        description: "Developed the landing page and student profile manager dashboard using React and Tailwind CSS.",
        skills: ["React", "Tailwind CSS", "JavaScript"]
      },
      {
        id: "proj_2",
        title: "Personal Portfolio Website",
        description: "Designed a clean, responsive developer portfolio showcasing projects and contact details.",
        skills: ["HTML/CSS", "JavaScript"]
      }
    ],
    applications: [
      { jobId: "job_1", status: "Shortlisted", appliedDate: "2026-08-15" },
      { jobId: "job_3", status: "Applied", appliedDate: "2026-08-20" }
    ]
  },
  {
    id: "stud_2",
    name: "Priya Patel",
    email: "priya.patel@nit.edu",
    college: "National Institute of Technology",
    cgpa: 9.1,
    degree: "B.Tech Information Technology",
    graduationYear: 2027,
    skills: [
      { name: "Python", level: 80, category: "Languages" },
      { name: "Java", level: 75, category: "Languages" },
      { name: "SQL/PostgreSQL", level: 80, category: "Database" },
      { name: "Pandas/NumPy", level: 75, category: "Languages" },
      { name: "Statistics", level: 80, category: "Academic" },
      { name: "DBMS", level: 85, category: "Academic" },
      { name: "Git", level: 70, category: "Tools" },
      { name: "Communication Skills", level: 75, category: "Soft Skills" },
      { name: "Problem Solving", level: 80, category: "Soft Skills" }
    ],
    certifications: [
      { name: "Google Data Analytics Professional Certificate", provider: "Coursera", year: 2025 }
    ],
    projects: [
      {
        id: "proj_3",
        title: "Retail Sales Prediction Model",
        description: "Built a regression model in Python to forecast weekly sales for a retail chain using Pandas and Scikit-Learn.",
        skills: ["Python", "Pandas/NumPy", "Statistics"]
      }
    ],
    applications: [
      { jobId: "job_2", status: "Interviewing", appliedDate: "2026-08-18" }
    ]
  }
];

export let MOCK_COMPANIES = [
  {
    id: "comp_1",
    name: "TechCorp Solutions",
    industry: "IT & Cloud Services",
    email: "careers@techcorp.com",
    logo: "🏢"
  },
  {
    id: "comp_2",
    name: "DataDynamo Inc.",
    industry: "Analytics & AI",
    email: "talent@datadynamo.ai",
    logo: "📊"
  },
  {
    id: "comp_3",
    name: "FinTech Hub",
    industry: "Finance & Software",
    email: "jobs@fintechhub.co",
    logo: "💳"
  }
];

export let MOCK_JOBS = [
  {
    id: "job_1",
    title: "Frontend Developer Intern",
    companyId: "comp_1",
    companyName: "TechCorp Solutions",
    location: "Remote",
    type: "Internship",
    description: "Looking for an energetic React intern who understands state management, component lifecycles, and custom styling. You will collaborate on custom client dashboards.",
    skillsRequired: [
      { name: "React", level: 70 },
      { name: "JavaScript", level: 75 },
      { name: "Tailwind CSS", level: 65 }
    ],
    cgpaRequired: 7.5,
    stipend: "₹25,000 / month"
  },
  {
    id: "job_2",
    title: "Junior Data Analyst",
    companyId: "comp_2",
    companyName: "DataDynamo Inc.",
    location: "Bangalore",
    type: "Full-Time",
    description: "Analyze large business datasets to derive actionable insights. Must be comfortable cleaning raw data, executing database queries, and presenting summaries to team leads.",
    skillsRequired: [
      { name: "Python", level: 75 },
      { name: "SQL/PostgreSQL", level: 80 },
      { name: "Data Visualization", level: 70 },
      { name: "Statistics", level: 65 }
    ],
    cgpaRequired: 8.0,
    stipend: "₹8,00,000 / annum"
  },
  {
    id: "job_3",
    title: "Spring Boot Developer",
    companyId: "comp_3",
    companyName: "FinTech Hub",
    location: "Mumbai",
    type: "Full-Time",
    description: "Build robust transaction microservices. Strong Java fundamentals, understanding of MVC architecture, JPA/Hibernate, and relational database schema design are key.",
    skillsRequired: [
      { name: "Java", level: 80 },
      { name: "Spring Boot", level: 75 },
      { name: "SQL/PostgreSQL", level: 75 },
      { name: "REST APIs", level: 70 }
    ],
    cgpaRequired: 8.0,
    stipend: "₹10,50,000 / annum"
  }
];

// Helper Business Logic Functions

// Calculate Match Score % between a student's skills and a job's requirements
export function calculateJobMatchScore(studentSkills, jobSkillsRequired) {
  if (!jobSkillsRequired || jobSkillsRequired.length === 0) return 100;
  
  let totalScore = 0;
  
  jobSkillsRequired.forEach(req => {
    const studentSkill = studentSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
    if (studentSkill) {
      // If student meets or exceeds, they get 100% of this skill weight
      if (studentSkill.level >= req.level) {
        totalScore += 100;
      } else {
        // Partial match based on ratio
        totalScore += (studentSkill.level / req.level) * 100;
      }
    }
  });
  
  return Math.round(totalScore / jobSkillsRequired.length);
}

// Perform Detailed Skill Gap Analysis for a student against a standard industry role
export function performSkillGapAnalysis(studentSkills, targetRoleId) {
  const role = STANDARD_ROLES.find(r => r.id === targetRoleId);
  if (!role) return null;
  
  const roleSkills = role.skills;
  let matchingSkills = [];
  let gapSkills = []; // Skills student doesn't have or is under-skilled in
  
  roleSkills.forEach(reqSkill => {
    const studentSkill = studentSkills.find(s => s.name.toLowerCase() === reqSkill.name.toLowerCase());
    
    if (!studentSkill) {
      gapSkills.push({
        name: reqSkill.name,
        requiredLevel: reqSkill.level,
        currentLevel: 0,
        type: "Missing Skill",
        suggestion: `Start learning fundamentals of ${reqSkill.name}. Recommended: documentation, online courses.`
      });
    } else if (studentSkill.level < reqSkill.level) {
      gapSkills.push({
        name: reqSkill.name,
        requiredLevel: reqSkill.level,
        currentLevel: studentSkill.level,
        type: "Level Gap",
        suggestion: `Upgrade your proficiency in ${reqSkill.name} from level ${studentSkill.level}% to ${reqSkill.level}%. Work on projects using this skill.`
      });
    } else {
      matchingSkills.push({
        name: reqSkill.name,
        requiredLevel: reqSkill.level,
        currentLevel: studentSkill.level
      });
    }
  });
  
  const matchPercentage = Math.round((matchingSkills.length / roleSkills.length) * 100);
  
  return {
    roleTitle: role.title,
    matchPercentage,
    matchingSkills,
    gapSkills,
    suggestions: gapSkills.map(g => g.suggestion)
  };
}

// Get Institutional Academia Analytics
export function getAcademiaMetrics(collegeName) {
  const students = MOCK_STUDENTS.filter(s => !collegeName || s.college.toLowerCase() === collegeName.toLowerCase());
  
  // Aggregate top skills
  const skillCountMap = {};
  const skillTotalLevelMap = {};
  
  students.forEach(stud => {
    stud.skills.forEach(skill => {
      skillCountMap[skill.name] = (skillCountMap[skill.name] || 0) + 1;
      skillTotalLevelMap[skill.name] = (skillTotalLevelMap[skill.name] || 0) + skill.level;
    });
  });
  
  const skillAggregates = Object.keys(skillCountMap).map(name => ({
    name,
    studentCount: skillCountMap[name],
    averageLevel: Math.round(skillTotalLevelMap[name] / skillCountMap[name])
  })).sort((a, b) => b.studentCount - a.studentCount);
  
  // Curriculum Gap Analysis:
  // We compare target skills requested in ALL active jobs vs average level in the college
  const demandMap = {};
  let totalJobsCount = MOCK_JOBS.length;
  
  MOCK_JOBS.forEach(job => {
    job.skillsRequired.forEach(req => {
      demandMap[req.name] = (demandMap[req.name] || 0) + 1;
    });
  });
  
  const curriculumGaps = Object.keys(demandMap).map(skillName => {
    const jobFrequencyPercent = Math.round((demandMap[skillName] / totalJobsCount) * 100);
    const collegeSkill = skillAggregates.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    const averageCollegeLevel = collegeSkill ? collegeSkill.averageLevel : 0;
    const studentReachPercent = collegeSkill ? Math.round((collegeSkill.studentCount / students.length) * 100) : 0;
    
    // Higher gap score means high industry demand but low student adoption/level in college
    const gapScore = Math.max(0, jobFrequencyPercent - studentReachPercent);
    
    return {
      skillName,
      industryDemandFreq: jobFrequencyPercent, // % of postings requiring this skill
      studentReach: studentReachPercent,       // % of college students possessing this skill
      averageCollegeLevel,
      gapScore
    };
  }).sort((a, b) => b.gapScore - a.gapScore);
  
  return {
    totalStudents: students.length,
    skillAggregates,
    curriculumGaps,
    placementRate: 75, // mock %
    activeCollabCompanies: MOCK_COMPANIES.length
  };
}

// Simulating Database State Updates

export function addStudentSkill(studentId, newSkill) {
  const student = MOCK_STUDENTS.find(s => s.id === studentId);
  if (!student) return false;
  
  const existing = student.skills.find(s => s.name.toLowerCase() === newSkill.name.toLowerCase());
  if (existing) {
    existing.level = newSkill.level;
  } else {
    student.skills.push({
      name: newSkill.name,
      level: newSkill.level,
      category: newSkill.category || "General"
    });
  }
  return true;
}

export function updateStudentSkill(studentId, skillName, newLevel) {
  const student = MOCK_STUDENTS.find(s => s.id === studentId);
  if (!student) return false;
  
  const skill = student.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
  if (skill) {
    skill.level = newLevel;
    return true;
  }
  return false;
}

export function removeStudentSkill(studentId, skillName) {
  const student = MOCK_STUDENTS.find(s => s.id === studentId);
  if (!student) return false;
  
  student.skills = student.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase());
  return true;
}

export function addJobPosting(companyId, jobData) {
  const company = MOCK_COMPANIES.find(c => c.id === companyId);
  if (!company) return null;
  
  const newJob = {
    id: `job_${MOCK_JOBS.length + 1}`,
    companyId,
    companyName: company.name,
    ...jobData
  };
  
  MOCK_JOBS.push(newJob);
  return newJob;
}

export function applyForJob(studentId, jobId) {
  const student = MOCK_STUDENTS.find(s => s.id === studentId);
  if (!student) return false;
  
  const job = MOCK_JOBS.find(j => j.id === jobId);
  if (!job) return false;
  
  const alreadyApplied = student.applications.some(app => app.jobId === jobId);
  if (alreadyApplied) return false;
  
  student.applications.push({
    jobId,
    status: "Applied",
    appliedDate: new Date().toISOString().split('T')[0]
  });
  return true;
}

export function updateApplicationStatus(studentId, jobId, newStatus) {
  const student = MOCK_STUDENTS.find(s => s.id === studentId);
  if (!student) return false;
  
  const app = student.applications.find(a => a.jobId === jobId);
  if (app) {
    app.status = newStatus;
    return true;
  }
  return false;
}
