// lib/pdf/layouts/classicATS.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderClassicATS(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.languages.length > 0 || resume.skills.tools.length > 0);
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
      line-height: 1.4;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    
    .header {
      text-align: center;
      margin-bottom: ${config.spacing.sectionGap}pt;
      padding-bottom: ${config.spacing.itemGap}pt;
      border-bottom: 2px solid ${config.colors.primary};
    }
    
    .header h1 {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 6pt;
      text-transform: uppercase;
      letter-spacing: 1pt;
    }
    
    .contact-info {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      line-height: 1.6;
    }
    
    .section {
      margin-bottom: ${config.spacing.sectionGap}pt;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      text-transform: uppercase;
      letter-spacing: 1pt;
      margin-bottom: ${config.spacing.itemGap}pt;
      padding-bottom: 4pt;
      border-bottom: 1px solid ${config.colors.border};
    }
    
    .section-item {
      margin-bottom: ${config.spacing.itemGap}pt;
      page-break-inside: avoid;
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 4pt;
    }
    
    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
    }
    
    .company {
      font-size: ${config.typography.sizes.body}pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
    }
    
    .date-location {
      text-align: right;
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      white-space: nowrap;
      margin-left: 20pt;
    }
    
    .description {
      margin-top: 6pt;
      line-height: 1.5;
    }
    
    .description ul {
      margin-left: 18pt;
      margin-top: 4pt;
    }
    
    .description li {
      margin-bottom: 3pt;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8pt;
      margin-top: 8pt;
    }
    
    .skill-item {
      font-size: ${config.typography.sizes.small}pt;
      padding: 4pt 8pt;
      background-color: ${config.colors.primary}10;
      border-left: 3pt solid ${config.colors.primary};
      color: ${config.colors.text};
    }
    
    @page {
      size: letter;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</h1>
    <div class="contact-info">
      ${resume.contactInfo?.email || 'email@example.com'} •
      ${resume.contactInfo?.phone || '(555) 123-4567'}<br>
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
      ${(resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website || resume.contactInfo?.customLink?.url) ? '<br>' : ''}
      ${resume.contactInfo?.linkedin ? `${resume.contactInfo.linkedin}` : ''}
      ${resume.contactInfo?.github ? `${resume.contactInfo?.linkedin ? ' • ' : ''}${resume.contactInfo.github}` : ''}
      ${resume.contactInfo?.website ? `${(resume.contactInfo?.linkedin || resume.contactInfo?.github) ? ' • ' : ''}${resume.contactInfo.website}` : ''}
      ${resume.contactInfo?.customLink?.url ? `${(resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website) ? ' • ' : ''}${resume.contactInfo.customLink.url}` : ''}
    </div>
  </div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">PROFESSIONAL SUMMARY</div>
    <p>${resume.summary}</p>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">WORK EXPERIENCE</div>
    ${resume.experience.map(exp => `
      <div class="section-item">
        <div class="job-header">
          <div>
            <div class="job-title">${exp.jobTitle}</div>
            <div class="company">${exp.company}</div>
          </div>
          <div class="date-location">
            <div>${exp.location}</div>
            <div>${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
          </div>
        </div>
        ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasEducation ? `
  <div class="section">
    <div class="section-title">EDUCATION</div>
    ${resume.education.map(edu => `
      <div class="section-item">
        <div class="job-header">
          <div>
            <div class="job-title">${edu.degree}</div>
            <div class="company">${edu.institution}</div>
            ${edu.gpa ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt;">GPA: ${edu.gpa}</div>` : ''}
            ${edu.additionalInfo ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt;">${edu.additionalInfo}</div>` : ''}
          </div>
          <div class="date-location">
            <div>${edu.location}</div>
            <div>${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    ${resume.skills.technical.length > 0 ? `
      <div class="section-title">TECHNICAL SKILLS</div>
      <div class="skills-grid">
        ${resume.skills.technical.map(skill => `
          <div class="skill-item">${skill.name}${skill.level ? ` - ${skill.level}` : ''}</div>
        `).join('')}
      </div>
    ` : ''}
    
    ${resume.skills.soft.length > 0 ? `
      <div class="section-title" style="margin-top: ${config.spacing.itemGap}pt;">SOFT SKILLS</div>
      <div class="skills-grid">
        ${resume.skills.soft.map(skill => `
          <div class="skill-item">${skill.name}${skill.level ? ` - ${skill.level}` : ''}</div>
        `).join('')}
      </div>
    ` : ''}

    ${resume.skills.languages.length > 0 ? `
      <div class="section-title" style="margin-top: ${config.spacing.itemGap}pt;">LANGUAGES</div>
      <div class="skills-grid">
        ${resume.skills.languages.map(skill => `
          <div class="skill-item">${skill.name}${skill.level ? ` - ${skill.level}` : ''}</div>
        `).join('')}
      </div>
    ` : ''}

    ${resume.skills.tools.length > 0 ? `
      <div class="section-title" style="margin-top: ${config.spacing.itemGap}pt;">TOOLS & SOFTWARE</div>
      <div class="skills-grid">
        ${resume.skills.tools.map(skill => `
          <div class="skill-item">${skill.name}${skill.level ? ` - ${skill.level}` : ''}</div>
        `).join('')}
      </div>
    ` : ''}
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">PROJECTS</div>
    ${resume.projects!.map((project: any) => `
      <div class="section-item">
        <div class="job-header">
          <div class="job-title">${project.name}</div>
          ${project.date ? `<div class="date-location">${project.date}</div>` : ''}
        </div>
        ${project.description ? `<p style="margin-top: 4pt;">${project.description}</p>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<p style="margin-top: 4pt; font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight};">Technologies: ${project.technologies.join(', ')}</p>` : ''}
        ${project.link ? `<p style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt; color: ${config.colors.primary};">${project.link}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">CERTIFICATIONS</div>
    ${resume.certifications!.map((cert: any) => `
      <div class="section-item">
        <div class="job-header">
          <div>
            <div class="job-title">${cert.name}</div>
            <div class="company">${cert.issuer}</div>
            ${cert.credentialId ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt;">ID: ${cert.credentialId}</div>` : ''}
          </div>
          ${cert.dateIssued ? `<div class="date-location">${cert.dateIssued}${cert.expiryDate && !cert.doesNotExpire ? ` - ${cert.expiryDate}` : ''}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">AWARDS & HONORS</div>
    ${resume.awards!.map((award: any) => `
      <div class="section-item">
        <div class="job-header">
          <div>
            <div class="job-title">${award.title}</div>
            <div class="company">${award.issuer}</div>
            ${award.description ? `<p style="margin-top: 4pt; font-size: ${config.typography.sizes.body}pt;">${award.description}</p>` : ''}
          </div>
          ${award.date ? `<div class="date-location">${award.date}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">VOLUNTEER EXPERIENCE</div>
    ${resume.volunteer!.map((vol: any) => `
      <div class="section-item">
        <div class="job-header">
          <div>
            <div class="job-title">${vol.role}</div>
            <div class="company">${vol.organization}</div>
          </div>
          <div class="date-location">
            <div>${vol.location || ''}</div>
            <div>${vol.startDate} - ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
          </div>
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