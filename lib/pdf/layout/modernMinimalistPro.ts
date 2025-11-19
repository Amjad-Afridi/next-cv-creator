// lib/pdf/layouts/modernMinimalistPro.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderModernMinimalistPro(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.7;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 8pt;
      letter-spacing: -0.5pt;
    }
    .contact-line { font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; margin-bottom: 40pt; }
    .section { margin-bottom: ${config.spacing.sectionGap}pt; }
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.primary};
      margin-bottom: ${config.spacing.itemGap}pt;
      letter-spacing: 1pt;
    }
    .job-item { margin-bottom: ${config.spacing.itemGap + 2}pt; }
    .job-title { font-size: ${config.typography.sizes.subheading}pt; font-weight: ${config.typography.weights.semibold}; color: ${config.colors.text}; }
    .company-line { font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; margin-top: 4pt; margin-bottom: 6pt; }
    .description { margin-top: 6pt; line-height: 1.7; }
    .description ul { margin-left: 18pt; }
    .description li { margin-bottom: 3pt; }
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10pt; margin-top: 8pt; }
    .skill-item { font-size: ${config.typography.sizes.small}pt; padding: 8pt; background: ${config.colors.primary}05; border-left: 2pt solid ${config.colors.primary}; }
    @page { size: letter; margin: 0; }
  </style>
</head>
<body>
  <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
  <div class="contact-line">${resume.contactInfo?.email || 'email@example.com'} • ${resume.contactInfo?.phone || '(555) 123-4567'} • ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</div>
  ${hasSummary ? `<div class="section"><div class="section-title">SUMMARY</div><p>${resume.summary}</p></div>` : ''}
  ${hasExperience ? `
  <div class="section">
    <div class="section-title">EXPERIENCE</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-title">${exp.jobTitle}</div>
        <div class="company-line">${exp.company} • ${exp.location} • ${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
        ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
  ${hasEducation ? `
  <div class="section">
    <div class="section-title">EDUCATION</div>
    ${resume.education.map(edu => `
      <div class="job-item">
        <div class="job-title">${edu.degree}</div>
        <div class="company-line">${edu.institution} • ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}
  ${hasSkills ? `
  <div class="section">
    <div class="section-title">SKILLS</div>
    <div class="skills-grid">
      ${resume.skills.technical.map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
      ${resume.skills.soft.map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `;
}
