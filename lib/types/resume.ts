// lib/types/resume.ts

export interface Resume {
  id: string;
  title: string;
  
  // Contact Information
  contactInfo: ContactInfo;
  
  // Professional Summary
  summary?: string;
  
  // Work Experience
  experience: Experience[];
  
  // Education
  education: Education[];
  
  // Skills
  skills: Skills;
  
  // Optional Sections
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  publications?: Publication[];
  awards?: Award[];
  volunteer?: Volunteer[];
  interests?: string[];
  references: References;
  
  // Template & Styling
  template: string;
  styling: Styling;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  professionalTitle?: string;
  profileImage?: string; // Base64 data URI
  email: string;
  phone: string;
  city: string;
  country: string;
  linkedin?: string;
  website?: string;
  github?: string;
  customLink?: {
    label?: string;  // Make optional
    url?: string;    // Make optional
  };
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string; // Format: "2020-01"
  endDate?: string;
  isCurrentJob: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  isCurrentlyStudying: boolean;
  gpa?: string;
  additionalInfo?: string;
}

export interface Skills {
  technical: SkillItem[];
  soft: SkillItem[];
  languages: SkillItem[];
  tools: SkillItem[];
}

export interface SkillItem {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Native' | 'Fluent' | 'Professional' | 'Basic';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  date: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateIssued: string;
  expirationDate?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface Publication {
  id: string;
  title: string;
  publication: string;
  date: string;
  coAuthors?: string;
  url?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Volunteer {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  description: string;
}

export interface References {
  showReferences: boolean;
  referenceList?: Reference[];
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface Styling {
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  sectionOrder: string[];
  showProfileImage?: boolean;
}