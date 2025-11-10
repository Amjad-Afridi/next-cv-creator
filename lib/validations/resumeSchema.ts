// lib/validations/resumeSchema.ts

import { z } from "zod";

// Contact Information Schema
export const contactInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  customLink: z
    .object({
      label: z.string().optional(),
      url: z.string().url("Invalid URL").optional(),
    })
    .optional(),
});

// Professional Summary Schema
export const summarySchema = z.object({
  summary: z
    .string()
    .max(500, "Summary must be less than 500 characters")
    .optional(),
});

// Experience Schema
export const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isCurrentJob: z.boolean(),
  description: z.string().min(1, "Description is required"),
});

// Education Schema
export const educationSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  location: z.string().min(1, "Location is required"),
  graduationDate: z.string().min(1, "Graduation date is required"),
  isCurrentlyStudying: z.boolean(),
  gpa: z.string().optional(),
  additionalInfo: z.string().optional(),
});

// Replace the skills schema with this:

// Skills Schema
export const skillsSchema = z.object({
  technical: z.array(
    z.object({
      name: z.string(),
      level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).optional(),
    })
  ).default([]),
  soft: z.array(
    z.object({
      name: z.string(),
      level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).optional(),
    })
  ).default([]),
  languages: z.array(
    z.object({
      name: z.string(),
      level: z.enum(['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic']).optional(),
    })
  ).default([]),
  tools: z.array(
    z.object({
      name: z.string(),
      level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).optional(),
    })
  ).default([]),
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
export type SummaryFormData = z.infer<typeof summarySchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type SkillsFormData = z.infer<typeof skillsSchema>;