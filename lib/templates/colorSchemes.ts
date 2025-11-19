// lib/templates/colorSchemes.ts

import { ColorScheme } from "@/lib/types/template";

export const colorSchemes: Record<string, ColorScheme> = {
  professionalBlue: {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1e293b',
    textLight: '#64748b',
    background: '#ffffff',
    border: '#e2e8f0',
  },
  
  elegantNavy: {
    primary: '#1e3a8a',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#0f172a',
    textLight: '#475569',
    background: '#ffffff',
    border: '#cbd5e1',
  },
  
  modernTeal: {
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#14b8a6',
    text: '#0f172a',
    textLight: '#475569',
    background: '#ffffff',
    border: '#cbd5e1',
  },
  
  classicBlack: {
    primary: '#000000',
    secondary: '#1e293b',
    accent: '#334155',
    text: '#0f172a',
    textLight: '#64748b',
    background: '#ffffff',
    border: '#e2e8f0',
  },
  
  sophisticatedGray: {
    primary: '#475569',
    secondary: '#334155',
    accent: '#64748b',
    text: '#0f172a',
    textLight: '#64748b',
    background: '#ffffff',
    border: '#cbd5e1',
  },
};