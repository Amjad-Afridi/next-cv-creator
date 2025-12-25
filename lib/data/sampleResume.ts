// lib/data/sampleResume.ts

import { Resume } from "@/lib/types/resume";

export const sampleResume: Resume = {
  id: "sample-resume",
  title: "Sample Resume - Software Engineer",

  contactInfo: {
    firstName: "Alex",
    lastName: "Morgan",
    professionalTitle: "Senior Full Stack Developer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    city: "San Francisco",
    country: "USA",
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    website: "https://alexmorgan.dev",
  },

  summary: "Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Strong advocate for clean code and agile methodologies.",

  experience: [
    {
      id: "exp-1",
      jobTitle: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "",
      isCurrentJob: true,
      description: `<ul>
<li>Led development of microservices architecture serving 5M+ daily active users</li>
<li>Architected real-time collaboration features using WebSockets and Redis</li>
<li>Mentored team of 6 junior developers and established code review practices</li>
<li>Reduced deployment time by 70% through CI/CD pipelines implementation</li>
</ul>`,
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      graduationDate: "2015-12",
      isCurrentlyStudying: false,
      gpa: "3.8",
      additionalInfo: "Dean's List • Graduated with Honors • Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems",
    },
  ],

  skills: {
    technical: [
      { name: "JavaScript", level: "Expert" },
      { name: "React", level: "Expert" },
      { name: "Node.js", level: "Advanced" },
    ],
    soft: [
      { name: "Team Leadership", level: "Advanced" },
      { name: "Problem Solving", level: "Expert" },
    ],
    languages: [
      { name: "English", level: "Native" },
    ],
    tools: [],
  },

  projects: [
    {
      id: "proj-1",
      name: "DevCollab - Real-time Collaboration Platform",
      description: "Open-source platform for real-time code collaboration with integrated chat.",
      technologies: ["React", "TypeScript", "WebRTC", "Node.js"],
      link: "https://github.com/alexmorgan/devcollab",
      date: "2023-06",
    },
  ],

  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      dateIssued: "2023-08",
      credentialUrl: "https://aws.amazon.com/verification",
    },
  ],

  awards: [
    {
      id: "award-1",
      title: "Innovation Award",
      issuer: "TechCorp Inc.",
      date: "2023-12",
      description: "Recognized for developing innovative features",
    },
  ],

  volunteer: [],

  interests: [
    "Open Source",
    "Photography",
    "Hiking",
  ],

  languages: [],
  publications: [],

  references: {
    showReferences: false,
    referenceList: [],
  },

  template: "modern-two-column",

  styling: {
    primaryColor: "#2563eb",
    fontSize: "medium",
    sectionOrder: ["experience", "education", "skills", "projects"],
    showProfileImage: false,
  },

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
