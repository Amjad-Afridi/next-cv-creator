// lib/pdf/layouts/compactProfessional.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderCompactProfessional(resume: Resume, template: Template): string {
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
      font-family: Arial, Helvetica, sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.3;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    
    .header {
      text-align: center;
      margin-bottom: ${config.spacing.sectionGap - 2}pt;
      padding-bottom: 8pt;
      border-bottom: 1px solid ${config.colors.border};
    }
    
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 4pt;
    }
    
    .contact-info {
      font-size: ${config.typography.sizes.small - 1}pt;
      color: ${config.colors.textLight};
    }
    
    .section {
      margin-bottom: ${config.spacing.sectionGap - 2}pt;
    }
    
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      text-transform: uppercase;
      margin-bottom: 6pt;
      padding-bottom: 2pt;
      border-bottom: 1px solid ${config.colors.border};
    }
    
    .job-item {
      margin-bottom: ${config.spacing.itemGap - 2}pt;
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2pt;
    }
    
    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
    }
    
    .company {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
    }
    
    .date-location {
      font-size: ${config.typography.sizes.small - 1}pt;
      color: ${config.colors.textLight};
      text-align: right;
    }
    
    .description {
      margin-top: 3pt;
      font-size: ${config.typography.sizes.body - 0.5}pt;
    }
    
    .description ul {
      margin-left: 14pt;
    }
    
    .description li {
      margin-bottom: 2pt;
    }
    
    .skills-columns {
      column-count: 3;
      column-gap: 15pt;
    }
    
    .skill-item {
      font-size: ${config.typography.sizes.small}pt;
      margin-bottom: 3pt;
      break-inside: avoid;
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
    <div class="contact-info">
      ${resume.contactInfo?.email || 'email@example.com'} | 
      ${resume.contactInfo?.phone || '(555) 123-4567'} | 
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
  </div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Summary</div>
    <p>${resume.summary}</p>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-header">
          <div>
            <div class="job-title">${exp.jobTitle}</div>
            <div class="company">${exp.company}</div>
          </div>
          <div class="date-location">
            ${exp.location}<br>
            ${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}
          </div>
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
        <div class="job-header">
          <div>
            <div class="job-title">${edu.degree}</div>
            <div class="company">${edu.institution}</div>
          </div>
          <div class="date-location">
            ${edu.location}<br>
            ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}
          </div>
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-columns">
      ${resume.skills.technical.map(skill => `
        <div class="skill-item">• ${skill.name}</div>
      `).join('')}
      ${resume.skills.soft.map(skill => `
        <div class="skill-item">• ${skill.name}</div>
      `).join('')}
    </div>
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