// lib/pdf/layouts/elegantProfessional.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderElegantProfessional(resume: Resume, template: Template): string {
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
      font-family: 'Merriweather', Georgia, serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.8;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    .header { text-align: center; padding: 30pt 0; margin-bottom: ${config.spacing.sectionGap}pt; border-bottom: 1pt solid ${config.colors.border}; }
    .name {
      font-family: 'Playfair Display', serif;
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 12pt;
      letter-spacing: 1pt;
    }
    .contact-line { font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; }
    .section { margin-bottom: ${config.spacing.sectionGap}pt; }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: ${config.spacing.itemGap}pt;
      padding-bottom: 6pt;
      border-bottom: 1pt solid ${config.colors.border};
    }
    .job-item { margin-bottom: ${config.spacing.itemGap}pt; page-break-inside: avoid; }
    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
      font-style: italic;
    }
    .company-line { font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; margin-top: 3pt; margin-bottom: 6pt; }
    .description { margin-top: 6pt; line-height: 1.8; text-align: justify; }
    .description ul { margin-left: 20pt; margin-top: 4pt; }
    .description li { margin-bottom: 3pt; }
    .skills-columns { columns: 2; column-gap: 30pt; }
    .skill-item { font-size: ${config.typography.sizes.small}pt; margin-bottom: 6pt; break-inside: avoid; }
    @page { size: letter; margin: 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="contact-line">
      ${resume.contactInfo?.email || 'email@example.com'} • ${resume.contactInfo?.phone || '(555) 123-4567'} • ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
  </div>
  ${hasSummary ? `<div class="section"><div class="section-title">Professional Summary</div><p style="text-align: justify; line-height: 1.8;">${resume.summary}</p></div>` : ''}
  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Professional Experience</div>
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
    <div class="section-title">Education</div>
    ${resume.education.map(edu => `
      <div class="job-item">
        <div class="job-title">${edu.degree}</div>
        <div class="company-line">${edu.institution} • ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
        ${edu.gpa ? `<div style="margin-top: 3pt; font-size: ${config.typography.sizes.small}pt;">GPA: ${edu.gpa}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Core Competencies</div>
    <div class="skills-columns">
      ${resume.skills.technical.map(skill => `<div class="skill-item">• ${skill.name}</div>`).join('')}
      ${resume.skills.soft.map(skill => `<div class="skill-item">• ${skill.name}</div>`).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `;
}
