// lib/pdf/layouts/academicScholar.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderAcademicScholar(resume: Resume, template: Template): string {
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
      font-family: 'Times New Roman', Times, serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.6;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    .header { text-align: center; padding-bottom: 15pt; margin-bottom: ${config.spacing.sectionGap}pt; border-bottom: 1.5pt solid ${config.colors.primary}; }
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 10pt;
    }
    .contact-line { font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; line-height: 1.4; }
    .section { margin-bottom: ${config.spacing.sectionGap}pt; }
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: ${config.spacing.itemGap}pt;
      text-transform: uppercase;
      border-bottom: 1pt solid ${config.colors.border};
      padding-bottom: 4pt;
    }
    .job-item { margin-bottom: ${config.spacing.itemGap}pt; page-break-inside: avoid; }
    .job-title { font-size: ${config.typography.sizes.subheading}pt; font-weight: ${config.typography.weights.semibold}; color: ${config.colors.text}; }
    .company-line { font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; margin-top: 2pt; margin-bottom: 4pt; }
    .description { margin-top: 4pt; line-height: 1.6; text-align: justify; }
    .description ul { margin-left: 18pt; margin-top: 3pt; }
    .description li { margin-bottom: 2pt; }
    .skills-list { columns: 2; column-gap: 25pt; }
    .skill-item { font-size: ${config.typography.sizes.small}pt; margin-bottom: 4pt; break-inside: avoid; }
    @page { size: letter; margin: 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="contact-line">
      ${resume.contactInfo?.email || 'email@example.com'}<br>
      ${resume.contactInfo?.phone || '(555) 123-4567'} • ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
  </div>
  ${hasSummary ? `<div class="section"><div class="section-title">Research Interests</div><p style="text-align: justify;">${resume.summary}</p></div>` : ''}
  ${hasEducation ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${resume.education.map(edu => `
      <div class="job-item">
        <div class="job-title">${edu.degree}</div>
        <div class="company-line">${edu.institution}, ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
        ${edu.gpa ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt;">GPA: ${edu.gpa}</div>` : ''}
        ${edu.additionalInfo ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt;">${edu.additionalInfo}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Academic & Professional Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-title">${exp.jobTitle}</div>
        <div class="company-line">${exp.company}, ${exp.location} • ${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
        ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills & Competencies</div>
    <div class="skills-list">
      ${resume.skills.technical.map(skill => `<div class="skill-item">• ${skill.name}</div>`).join('')}
      ${resume.skills.soft.map(skill => `<div class="skill-item">• ${skill.name}</div>`).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `;
}
