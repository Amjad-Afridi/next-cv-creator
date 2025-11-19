// lib/pdf/templateRenderer.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";
import { renderClassicATS } from "./layout/classicATS";
import { renderModernTwoColumn } from "./layout/modernTwoColumn";
import { renderBoldCreativeHeader } from "./layout/boldCreativeHeader";
import { renderMinimalistExecutive } from "./layout/minimalistExecutive";
import { renderTimelineModern } from "./layout/timelineModern";
import { renderCompactProfessional } from "./layout/compactProfessional";
import { renderTechStartupClean } from "./layout/techStartupClean";
import { renderExecutiveLuxury } from "./layout/executiveLuxury";
import { renderCreativePortfolio } from "./layout/creativePortfolio";
import { renderTechLeader } from "./layout/techLeader";
import { renderInfographicModern } from "./layout/infographicModern";
import { renderElegantProfessional } from "./layout/elegantProfessional";
import { renderModernMinimalistPro } from "./layout/modernMinimalistPro";
import { renderDynamicGradient } from "./layout/dynamicGradient";
import { renderAcademicScholar } from "./layout/academicScholar";
/**
 * Generate HTML for resume with template styling
 * Routes to the appropriate layout renderer based on template ID
 */
export function generateResumeHTML(resume: Resume, template: Template): string {
  // Route to specific layout based on template base ID
  const baseTemplateId = template.id.split('-')[0]; // Get base template ID (before color variation)
  
  // Check if it's a color variation or base template
  const layoutId = getBaseLayoutId(template.id);

  switch (layoutId) {
    case 'classic-ats':
      return renderClassicATS(resume, template);

    case 'modern-two-column':
      return renderModernTwoColumn(resume, template);

    case 'bold-creative-header':
      return renderBoldCreativeHeader(resume, template);

    case 'minimalist-executive':
      return renderMinimalistExecutive(resume, template);

    case 'timeline-modern':
      return renderTimelineModern(resume, template);

    case 'compact-professional':
      return renderCompactProfessional(resume, template);

    case 'tech-startup-clean':
      return renderTechStartupClean(resume, template);

    case 'executive-luxury':
      return renderExecutiveLuxury(resume, template);

    case 'creative-portfolio':
      return renderCreativePortfolio(resume, template);

    case 'tech-leader':
      return renderTechLeader(resume, template);

    case 'infographic-modern':
      return renderInfographicModern(resume, template);

    case 'elegant-professional':
      return renderElegantProfessional(resume, template);

    case 'modern-minimalist-pro':
      return renderModernMinimalistPro(resume, template);

    case 'dynamic-gradient':
      return renderDynamicGradient(resume, template);

    case 'academic-scholar':
      return renderAcademicScholar(resume, template);

    default:
      // Fallback to Classic ATS if unknown template
      console.warn(`Unknown template layout: ${layoutId}, using Classic ATS as fallback`);
      return renderClassicATS(resume, template);
  }
}

/**
 * Extract base layout ID from template ID
 * Handles both base templates and color variations
 * 
 * Examples:
 * - "classic-ats" -> "classic-ats"
 * - "classic-ats-modernTeal" -> "classic-ats"
 * - "modern-two-column-elegantNavy" -> "modern-two-column"
 */
function getBaseLayoutId(templateId: string): string {
  // Known base layout IDs
  const baseLayouts = [
    'classic-ats',
    'modern-two-column',
    'bold-creative-header',
    'minimalist-executive',
    'timeline-modern',
    'compact-professional',
    'tech-startup-clean',
    'executive-luxury',
    'creative-portfolio',
    'tech-leader',
    'infographic-modern',
    'elegant-professional',
    'modern-minimalist-pro',
    'dynamic-gradient',
    'academic-scholar',
  ];

  // Check if the template ID is already a base layout
  if (baseLayouts.includes(templateId)) {
    return templateId;
  }

  // Try to find which base layout this variation belongs to
  for (const baseLayout of baseLayouts) {
    if (templateId.startsWith(baseLayout)) {
      return baseLayout;
    }
  }

  // If no match found, try to extract the base by removing color scheme suffix
  // Split by last hyphen and check if it's a known base
  const parts = templateId.split('-');
  
  // Try different combinations
  for (let i = parts.length; i > 0; i--) {
    const possibleBase = parts.slice(0, i).join('-');
    if (baseLayouts.includes(possibleBase)) {
      return possibleBase;
    }
  }

  // Default fallback
  return 'classic-ats';
}