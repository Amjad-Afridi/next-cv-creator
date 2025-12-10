// lib/utils/resumeValidation.ts
import { Resume } from "@/lib/types/resume";

export interface ResumeCompletionStatus {
  percentage: number;
  isComplete: boolean;
  missingFields: string[];
}

export function calculateResumeCompletion(resume: Partial<Resume>): ResumeCompletionStatus {
  const checks = {
    // Contact Info (30% total - 5% each field)
    firstName: {
      value: !!resume.contactInfo?.firstName?.trim(),
      weight: 5,
      label: "First Name"
    },
    lastName: {
      value: !!resume.contactInfo?.lastName?.trim(),
      weight: 5,
      label: "Last Name"
    },
    email: {
      value: !!resume.contactInfo?.email?.trim(),
      weight: 5,
      label: "Email"
    },
    phone: {
      value: !!resume.contactInfo?.phone?.trim(),
      weight: 5,
      label: "Phone"
    },
    city: {
      value: !!resume.contactInfo?.city?.trim(),
      weight: 5,
      label: "City"
    },
    country: {
      value: !!resume.contactInfo?.country?.trim(),
      weight: 5,
      label: "Country"
    },

    // Professional Summary (10%)
    summary: {
      value: !!resume.summary?.trim(),
      weight: 10,
      label: "Professional Summary"
    },

    // Work Experience (30%)
    experience: {
      value: !!(resume.experience && resume.experience.length > 0),
      weight: 30,
      label: "Work Experience (at least one)"
    },

    // Education (20%)
    education: {
      value: !!(resume.education && resume.education.length > 0),
      weight: 20,
      label: "Education (at least one)"
    },

    // Skills (10%)
    skills: {
      value: !!(
        resume.skills &&
        (resume.skills.technical?.length > 0 ||
          resume.skills.soft?.length > 0 ||
          resume.skills.languages?.length > 0 ||
          resume.skills.tools?.length > 0)
      ),
      weight: 10,
      label: "Skills (at least one)"
    },
  };

  let totalWeight = 0;
  let completedWeight = 0;
  const missingFields: string[] = [];

  Object.entries(checks).forEach(([key, check]) => {
    totalWeight += check.weight;
    if (check.value) {
      completedWeight += check.weight;
    } else {
      missingFields.push(check.label);
    }
  });

  const percentage = Math.round((completedWeight / totalWeight) * 100);
  const isComplete = percentage >= 50;

  return {
    percentage,
    isComplete,
    missingFields,
  };
}