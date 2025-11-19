// lib/pdf/layouts/dynamicGradient.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderDynamicGradient(resume: Resume, template: Template): string {
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
    body { font-family: 'Raleway', sans-serif; font-size: ${config.typography.sizes.body}pt; line-height: 1.6; color: ${config.colors.text}; background: white; }
    .gradient-header {
      background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
      color: white;
      padding: 45pt 50pt;
    }
    .name { font-size: ${config.typography.sizes.name}pt; font-weight: ${config.typography.weights.bold}; margin-bottom: 8pt; }
    .title { font-size: ${config.typography.sizes.subheading}pt; margin-bottom: 12pt; opacity: 0.95; }
    .contact-row { font-size: ${config.typography.sizes.small}pt; opacity: 0.9; }
    .content { padding: 35pt 50pt; }
    .section { margin-bottom: ${config.spacing.sectionGap}pt; }
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: ${config.spacing.itemGap}pt;
      text-transform: uppercase;
      letter-spacing: 1pt;
    }
    .job-item { margin-bottom: ${config.spacing.itemGap}pt; }
    .job-title { font-size: ${config.typography.sizes.subheading}pt; font-weight: ${config.typography.weights.semibold}; color: ${config.colors.text}; }
    .company-date { font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; margin-top: 2pt; margin-bottom: 4pt; }
    .description { margin-top: 4pt; line-height: 1.6; }
    .description ul { margin-left: 16pt; }
    .description li { margin-bottom: 2pt; }
    .skills-flex { display: flex; flex-wrap: wrap; gap: 8pt; margin-top: 8pt; }
    .skill-badge {
      display: inline-block;
      font-size: ${config.typography.sizes.small}pt;
      padding: 6pt 14pt;
      background: linear-gradient(135deg, ${config.colors.primary}15 0%, ${config.colors.secondary}15 100%);
      border: 1pt solid ${config.colors.primary};
      border-radius: 20pt;
      color: ${config.colors.primary};
      font-weight: ${config.typography.weights.medium};
    }
    @page { size: letter; margin: 0; }
  </style>
</head>
<body>
  <div class="gradient-header">
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="title">Professional</div>
    <div class="contact-row">${resume.contactInfo?.email || 'email@example.com'} • ${resume.contactInfo?.phone || '(555) 123-4567'} • ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</div>
  </div>
  <div class="content">
    ${hasSummary ? `<div class="section"><div class="section-title">About</div><p>${resume.summary}</p></div>` : ''}
    ${hasExperience ? `
    <div class="section">
      <div class="section-title">Experience</div>
      ${resume.experience.map(exp => `
        <div class="job-item">
          <div class="job-title">${exp.jobTitle}</div>
          <div class="company-date">${exp.company} • ${exp.location} • ${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
          ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}
    ${hasSkills ? `
    <div class="section">
      <div class="section-title">Skills</div>
      <div class="skills-flex">
        ${resume.skills.technical.map(skill => `<span class="skill-badge">${skill.name}</span>`).join('')}
        ${resume.skills.soft.map(skill => `<span class="skill-badge">${skill.name}</span>`).join('')}
      </div>
    </div>
    ` : ''}
    ${hasEducation ? `
    <div class="section">
      <div class="section-title">Education</div>
      ${resume.education.map(edu => `
        <div class="job-item">
          <div class="job-title">${edu.degree}</div>
          <div class="company-date">${edu.institution} • ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}
