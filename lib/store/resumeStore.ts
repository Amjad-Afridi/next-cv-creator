// lib/store/resumeStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Resume, ContactInfo, Experience, Education, Skills } from '@/lib/types/resume';

interface ResumeStore {
  // Current resume being edited
  currentResume: Partial<Resume>;
  
  // Current step in the form
  currentStep: number;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateContactInfo: (data: Partial<ContactInfo>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (experience: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: Partial<Skills>) => void;
  updateTemplate: (template: string) => void;
  resetResume: () => void;
  initializeResume: () => void;
}

const initialResume: Partial<Resume> = {
  id: '',
  title: 'My Resume',
  contactInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: {
  technical: [],
  soft: [],
  languages: [],
  tools: [],
},
  projects: [],
  certifications: [],
  languages: [],
  publications: [],
  awards: [],
  volunteer: [],
  references: {
    showReferences: false,
    referenceList: [],
  },
  template: 'professional',
  styling: {
    primaryColor: '#000000',
    fontSize: 'medium',
    sectionOrder: ['experience', 'education', 'skills', 'projects'],
  },
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      currentResume: initialResume,
      currentStep: 1,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateContactInfo: (data) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            contactInfo: {
              ...state.currentResume.contactInfo,
              ...data,
            } as ContactInfo,
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            summary,
          },
        })),

      updateExperience: (experience) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience,
          },
        })),

      updateEducation: (education) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            education,
          },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            skills: {
              ...state.currentResume.skills,
              ...skills,
            } as Skills,
          },
        })),

      updateTemplate: (template) =>
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            template,
          },
        })),

      resetResume: () => set({ currentResume: initialResume, currentStep: 1 }),

      initializeResume: () =>
        set((state) => ({
          currentResume: {
            ...initialResume,
            id: `resume-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })),
    }),
    {
      name: 'resume-storage', // localStorage key
    }
  )
);