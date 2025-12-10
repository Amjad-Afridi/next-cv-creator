// lib/pdf/layout/compactProfessional.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderCompactProfessional(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.tools.length > 0);
  const hasLanguages = resume.skills.languages && resume.skills.languages.length > 0;
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
      padding: 10pt ${config.spacing.margins.right}pt 10pt ${config.spacing.margins.left}pt;
    }
    
    .header {
      text-align: center;
      margin-bottom: ${config.spacing.sectionGap - 4}pt;
      padding-bottom: 6pt;
      border-bottom: 1px solid ${config.colors.border};
    }
    
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 3pt;
    }
    
    .contact-info {
      font-size: ${config.typography.sizes.small - 1}pt;
      color: ${config.colors.textLight};
      line-height: 1.4;
    }
    
    .section {
      margin-bottom: ${config.spacing.sectionGap - 4}pt;
    }
    
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      text-transform: uppercase;
      margin-bottom: 4pt;
      padding-bottom: 2pt;
      border-bottom: 1px solid ${config.colors.border};
    }
    
    .job-item {
      margin-bottom: ${config.spacing.itemGap - 3}pt;
      page-break-inside: avoid;
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
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
      margin-top: 1pt;
    }
    
    .date-location {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      text-align: right;
      white-space: nowrap;
    }
    
    .description {
      margin-top: 3pt;
      line-height: 1.3;
      font-size: ${config.typography.sizes.small}pt;
    }
    
    .description ul {
      margin-left: 14pt;
      margin-top: 2pt;
    }
    
    .description li {
      margin-bottom: 1pt;
    }
    
    .skills-inline {
      font-size: ${config.typography.sizes.small}pt;
      line-height: 1.4;
    }
    
    .skill-category {
      margin-bottom: 4pt;
    }
    
    .skill-category-title {
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
      display: inline;
    }
    
    .skill-list {
      display: inline;
      color: ${config.colors.textLight};
    }
    
    .languages-inline {
      font-size: ${config.typography.sizes.small}pt;
      line-height: 1.4;
      color: ${config.colors.textLight};
    }
    
    @page {
      size: letter;
      margin: ${config.spacing.margins.top - 10}pt 0 ${config.spacing.margins.bottom - 10}pt 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="contact-info">
      ${resume.contactInfo?.email || 'email@example.com'} • ${resume.contactInfo?.phone || '(555) 123-4567'} • ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
      ${resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website || resume.contactInfo?.customLink?.url ? `<br>` : ''}
      ${resume.contactInfo?.linkedin ? `${resume.contactInfo.linkedin}` : ''}
      ${resume.contactInfo?.linkedin && (resume.contactInfo?.github || resume.contactInfo?.website || resume.contactInfo?.customLink?.url) ? ` • ` : ''}
      ${resume.contactInfo?.github ? `${resume.contactInfo.github}` : ''}
      ${resume.contactInfo?.github && (resume.contactInfo?.website || resume.contactInfo?.customLink?.url) ? ` • ` : ''}
      ${resume.contactInfo?.website ? `${resume.contactInfo.website}` : ''}
      ${resume.contactInfo?.website && resume.contactInfo?.customLink?.url ? ` • ` : ''}
      ${resume.contactInfo?.customLink?.url ? `${resume.contactInfo.customLink.url}` : ''}
    </div>
  </div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Summary</div>
    <p style="font-size: ${config.typography.sizes.small}pt; line-height: 1.4;">${resume.summary}</p>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-header">
          <div style="flex: 1;">
            <div class="job-title">${exp.jobTitle}</div>
            <div class="company">${exp.company}, ${exp.location}</div>
          </div>
          <div class="date-location">${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
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
          <div style="flex: 1;">
            <div class="job-title">${edu.degree}</div>
            <div class="company">${edu.institution}, ${edu.location}</div>
          </div>
          <div class="date-location">${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
        </div>
        ${edu.gpa ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small - 1}pt; color: ${config.colors.textLight};">GPA: ${edu.gpa}</div>` : ''}
        ${edu.additionalInfo ? `<div style="margin-top: 1pt; font-size: ${config.typography.sizes.small - 1}pt; color: ${config.colors.textLight};">${edu.additionalInfo}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-inline">
      ${resume.skills.technical.length > 0 ? `
      <div class="skill-category">
        <div class="skill-category-title">Technical:</div>
        <span class="skill-list"> ${resume.skills.technical.map(s => s.name).join(', ')}</span>
      </div>
      ` : ''}
      ${resume.skills.tools.length > 0 ? `
      <div class="skill-category">
        <div class="skill-category-title">Tools:</div>
        <span class="skill-list"> ${resume.skills.tools.map(s => s.name).join(', ')}</span>
      </div>
      ` : ''}
      ${resume.skills.soft.length > 0 ? `
      <div class="skill-category">
        <div class="skill-category-title">Soft Skills:</div>
        <span class="skill-list"> ${resume.skills.soft.map(s => s.name).join(', ')}</span>
      </div>
      ` : ''}
    </div>
  </div>
  ` : ''}

  ${hasLanguages ? `
  <div class="section">
    <div class="section-title">Languages</div>
    <div class="languages-inline">
      ${resume.skills.languages.map(skill => `${skill.name}${skill.level ? ` (${skill.level})` : ''}`).join(', ')}
    </div>
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${resume.projects.map(project => `
      <div class="job-item">
        <div class="job-header">
          <div class="job-title">${project.name}</div>
          ${project.date ? `<div class="date-location">${project.date}</div>` : ''}
        </div>
        ${project.description ? `<div class="description">${project.description}</div>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small - 1}pt; color: ${config.colors.textLight};">Tech: ${project.technologies.join(', ')}</div>` : ''}
        ${project.link ? `<div style="margin-top: 1pt; font-size: ${config.typography.sizes.small - 1}pt; color: ${config.colors.primary};">${project.link}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">Certifications</div>
    ${resume.certifications.map(cert => `
      <div class="job-item">
        <div class="job-header">
          <div style="flex: 1;">
            <div class="job-title">${cert.name}</div>
            <div class="company">${cert.issuer}</div>
          </div>
          ${cert.dateIssued ? `<div class="date-location">${cert.dateIssued}${cert.expiryDate && !cert.doesNotExpire ? ` – ${cert.expiryDate}` : ''}</div>` : ''}
        </div>
        ${cert.credentialId ? `<div style="margin-top: 1pt; font-size: ${config.typography.sizes.small - 1}pt; color: ${config.colors.textLight};">ID: ${cert.credentialId}</div>` : ''}
        ${cert.credentialUrl ? `<div style="margin-top: 1pt; font-size: ${config.typography.sizes.small - 1}pt; color: ${config.colors.primary};">${cert.credentialUrl}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">Awards</div>
    ${resume.awards.map(award => `
      <div class="job-item">
        <div class="job-header">
          <div style="flex: 1;">
            <div class="job-title">${award.title}</div>
            <div class="company">${award.issuer}</div>
          </div>
          ${award.date ? `<div class="date-location">${award.date}</div>` : ''}
        </div>
        ${award.description ? `<div class="description">${award.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">Volunteer Experience</div>
    ${resume.volunteer.map(vol => `
      <div class="job-item">
        <div class="job-header">
          <div style="flex: 1;">
            <div class="job-title">${vol.role}</div>
            <div class="company">${vol.organization}, ${vol.location}</div>
          </div>
          <div class="date-location">${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
        </div>
        ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
  `;
}