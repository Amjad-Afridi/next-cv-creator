// lib/store/resumeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Resume, ContactInfo, Experience, Education, Skills } from '@/lib/types/resume';

interface ResumeStore {
  currentResume: Partial<Resume>;
  currentStep: number;
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
    professionalTitle: '',
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
  interests: [],
  references: {
    showReferences: false,
    referenceList: [],
  },
  template: 'classic-ats',
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

      setCurrentStep: (step) => {
        console.log('✅ Setting step:', step);
        set({ currentStep: step });
      },

      updateContactInfo: (data) => {
        console.log('✅ Updating contact info:', data);
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            contactInfo: {
              ...state.currentResume.contactInfo,
              ...data,
            } as ContactInfo,
          },
        }));
      },

      updateSummary: (summary) => {
        console.log('✅ Updating summary');
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            summary,
          },
        }));
      },

      updateExperience: (experience) => {
        console.log('✅ Updating experience');
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            experience,
          },
        }));
      },

      updateEducation: (education) => {
        console.log('✅ Updating education');
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            education,
          },
        }));
      },

      updateSkills: (skills) => {
        console.log('✅ Updating skills');
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            skills: {
              ...state.currentResume.skills,
              ...skills,
            } as Skills,
          },
        }));
      },

      updateTemplate: (template) => {
        console.log('✅ Updating template:', template);
        set((state) => ({
          currentResume: {
            ...state.currentResume,
            template,
          },
        }));
      },

      resetResume: () => {
        console.log('🔴 RESET RESUME CALLED'); // THIS IS THE KEY - see if this is being called
        console.trace(); // This will show you WHERE it's being called from
        set({
          currentResume: initialResume,
          currentStep: 1,
        });
      },

      initializeResume: () => {
        console.log('🔴 INITIALIZE RESUME CALLED'); // THIS IS THE KEY
        console.trace(); // This will show you WHERE it's being called from
        set((state) => ({
          currentResume: {
            ...initialResume,
            id: `resume-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }));
      },
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        console.log('🔵 Starting to rehydrate from localStorage...');
        return (state, error) => {
          if (error) {
            console.error('🔴 Error rehydrating:', error);
          } else {
            console.log('✅ Rehydration complete. State:', state);
          }
        };
      },
    }
  )
);

// Add this to see when store is created
console.log('🟢 Resume store created');