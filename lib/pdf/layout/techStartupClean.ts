// lib/pdf/layouts/techStartupClean.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderTechStartupClean(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0);
const hasProjects = resume.projects && resume.projects.length > 0;
const hasCertifications = resume.certifications && resume.certifications.length > 0;
const hasAwards = resume.awards && resume.awards.length > 0;
const hasVolunteer = resume.volunteer && resume.volunteer.length > 0;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Roboto', -apple-system, sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.6;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    
    .header {
      margin-bottom: ${config.spacing.sectionGap}pt;
    }
    
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.text};
      margin-bottom: 4pt;
    }
    
    .title {
      font-size: ${config.typography.sizes.subheading}pt;
      color: ${config.colors.textLight};
      margin-bottom: 8pt;
    }
    
    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12pt;
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 4pt;
    }
    
    .links-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12pt;
      margin-top: 6pt;
      font-size: ${config.typography.sizes.small}pt;
    }
    
    .link-item {
      color: ${config.colors.primary};
      text-decoration: none;
    }
    
    .section {
      margin-bottom: ${config.spacing.sectionGap}pt;
    }
    
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
      margin-bottom: ${config.spacing.itemGap}pt;
      padding-bottom: 4pt;
    }
    
    .job-item {
      margin-bottom: ${config.spacing.itemGap}pt;
    }
    
    .job-title-line {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
      margin-bottom: 2pt;
    }
    
    .company-line {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      margin-bottom: 6pt;
    }
    
    .description {
      line-height: 1.6;
    }
    
    .description ul {
      margin-left: 16pt;
    }
    
    .description li {
      margin-bottom: 3pt;
    }
    
    .skills-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 6pt;
      margin-top: 6pt;
    }
    
    .skill-tag {
      font-size: ${config.typography.sizes.small}pt;
      padding: 4pt 10pt;
      background-color: ${config.colors.text};
      color: white;
      border-radius: 2pt;
    }
    
    @page {
      size: letter;
      margin: 0;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="title">Software Developer</div>
    <div class="contact-row">
      <div class="contact-item">${resume.contactInfo?.email || 'email@example.com'}</div>
      <div class="contact-item">${resume.contactInfo?.phone || '(555) 123-4567'}</div>
      <div class="contact-item">${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</div>
    </div>
    ${resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website ? `
    <div class="links-row">
      ${resume.contactInfo?.linkedin ? `<div class="link-item">→ LinkedIn</div>` : ''}
      ${resume.contactInfo?.github ? `<div class="link-item">→ GitHub</div>` : ''}
      ${resume.contactInfo?.website ? `<div class="link-item">→ Website</div>` : ''}
    </div>
    ` : ''}
  </div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">About</div>
    <p>${resume.summary}</p>
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    ${resume.skills.technical.length > 0 ? `
    <div class="skills-flex">
      ${resume.skills.technical.map(skill => `
        <span class="skill-tag">${skill.name}</span>
      `).join('')}
    </div>
    ` : ''}
    ${resume.skills.soft.length > 0 || resume.skills.tools.length > 0 || resume.skills.languages.length > 0 ? `
    <div class="skills-flex" style="margin-top: 8pt;">
      ${resume.skills.soft.map(skill => `
        <span class="skill-tag">${skill.name}</span>
      `).join('')}
      ${resume.skills.tools.map(skill => `
        <span class="skill-tag">${skill.name}</span>
      `).join('')}
      ${resume.skills.languages.map(skill => `
        <span class="skill-tag">${skill.name}${skill.level ? ` (${skill.level})` : ''}</span>
      `).join('')}
    </div>
    ` : ''}
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-title-line">${exp.jobTitle} @ ${exp.company}</div>
        <div class="company-line">
          ${exp.location} • ${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}
        </div>
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
        <div class="job-title-line">${edu.degree}</div>
        <div class="company-line">
          ${edu.institution} • ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">PROJECTS</div>
    ${resume.projects!.map((project: any) => `
      <div class="section-item">
        <div class="job-title">${project.name}</div>
        ${project.date ? `<div class="company-line">${project.date}</div>` : ''}
        ${project.description ? `<p style="margin-top: 4pt;">${project.description}</p>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<p style="margin-top: 4pt; font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight};">Technologies: ${project.technologies.join(', ')}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">CERTIFICATIONS</div>
    ${resume.certifications!.map((cert: any) => `
      <div class="section-item">
        <div class="job-title">${cert.name}</div>
        <div class="company-line">${cert.issuer}${cert.dateIssued ? ` • ${cert.dateIssued}` : ''}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">AWARDS & HONORS</div>
    ${resume.awards!.map((award: any) => `
      <div class="section-item">
        <div class="job-title">${award.title}</div>
        <div class="company-line">${award.issuer}${award.date ? ` • ${award.date}` : ''}</div>
        ${award.description ? `<p style="margin-top: 4pt;">${award.description}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">VOLUNTEER EXPERIENCE</div>
    ${resume.volunteer!.map((vol: any) => `
      <div class="section-item">
        <div class="job-title">${vol.role}</div>
        <div class="company-line">${vol.organization} • ${vol.startDate} - ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
        ${vol.description ? `<p style="margin-top: 4pt;">${vol.description}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
  `;
}