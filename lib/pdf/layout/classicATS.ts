// lib/pdf/layout/classicATS.ts
// COMPACT SINGLE-PAGE - Professional ATS-friendly design

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderClassicATS(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.languages.length > 0 || resume.skills.tools.length > 0);
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
    
    @page { 
      size: letter; 
      margin: 25pt 0 35pt 0;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 9.5pt;
      line-height: 1.4;
      color: ${config.colors.text};
      background: white;
      padding: 10pt 40pt 10pt 40pt;
    }
    
    .header {
      text-align: center;
      margin-bottom: 10pt;
      padding-bottom: 7pt;
      border-bottom: 2px solid ${config.colors.primary};
    }
    
    .header h1 {
      font-size: 22pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 5pt;
      text-transform: uppercase;
      letter-spacing: 1pt;
      line-height: 1.1;
    }
    
    .contact-info {
      font-size: 8.5pt;
      color: ${config.colors.textLight};
      line-height: 1.4;
      margin-bottom: 4pt;
    }
    
    .contact-links {
      font-size: 8pt;
      color: ${config.colors.textLight};
      line-height: 1.3;
    }
    
    .section {
      margin-bottom: 9pt;
    }
    
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      color: ${config.colors.primary};
      text-transform: uppercase;
      letter-spacing: 1pt;
      margin-bottom: 5pt;
      padding-bottom: 2pt;
      border-bottom: 1px solid ${config.colors.border};
    }
    
    .section-item {
      margin-bottom: 6pt;
      page-break-inside: avoid;
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2pt;
    }
    
    .job-title {
      font-size: 10pt;
      font-weight: 600;
      color: ${config.colors.text};
      line-height: 1.3;
    }
    
    .company {
      font-size: 9pt;
      color: ${config.colors.textLight};
      font-style: italic;
      line-height: 1.3;
    }
    
    .date-location {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-bottom: 3pt;
      line-height: 1.2;
    }
    
    .description {
      font-size: 9pt;
      line-height: 1.4;
      color: ${config.colors.text};
      margin-top: 2pt;
    }
    
    .description ul {
      margin: 2pt 0;
      padding-left: 12pt;
    }
    
    .description li {
      margin-bottom: 2pt;
      padding-left: 0;
    }
    
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8pt;
    }
    
    .skill-item {
      font-size: 9pt;
      color: ${config.colors.text};
      padding: 4pt 8pt;
      background-color: ${config.colors.primary}10;
      border-radius: 3pt;
    }
    
    .tech-list {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</h1>
    <div class="contact-info">
      ${resume.contactInfo?.email || 'email@example.com'} | 
      ${resume.contactInfo?.phone || '(555) 123-4567'} | 
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
    ${(resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website || resume.contactInfo?.customLink?.url) ? `
    <div class="contact-links">
      ${resume.contactInfo?.linkedin ? `${resume.contactInfo.linkedin}` : ''}${resume.contactInfo?.github ? `${resume.contactInfo?.linkedin ? ' | ' : ''}${resume.contactInfo.github}` : ''}${resume.contactInfo?.website ? `${(resume.contactInfo?.linkedin || resume.contactInfo?.github) ? ' | ' : ''}${resume.contactInfo.website}` : ''}${resume.contactInfo?.customLink?.url ? `${(resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website) ? ' | ' : ''}${resume.contactInfo.customLink.label || 'Website'}: ${resume.contactInfo.customLink.url}` : ''}
    </div>
    ` : ''}
  </div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <div class="description">${resume.summary}</div>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Professional Experience</div>
    ${resume.experience.map(exp => `
      <div class="section-item">
        <div class="job-header">
          <div>
            <div class="job-title">${exp.jobTitle}</div>
            <div class="company">${exp.company}</div>
          </div>
        </div>
        <div class="date-location">${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate} | ${exp.location}</div>
        ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasEducation ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${resume.education.map(edu => `
      <div class="section-item">
        <div class="job-header">
          <div>
            <div class="job-title">${edu.degree}</div>
            <div class="company">${edu.institution}</div>
          </div>
        </div>
        <div class="date-location">${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate} | ${edu.location}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
        ${edu.additionalInfo ? `<div class="description">${edu.additionalInfo}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-grid">
      ${resume.skills.technical.map(skill => `<span class="skill-item">${skill.name}</span>`).join('')}
      ${resume.skills.tools.map(skill => `<span class="skill-item">${skill.name}</span>`).join('')}
      ${resume.skills.soft.map(skill => `<span class="skill-item">${skill.name}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasLanguages ? `
  <div class="section">
    <div class="section-title">Languages</div>
    <div class="skills-grid">
      ${resume.skills.languages.map(skill => `<span class="skill-item">${skill.name}${skill.level ? ` (${skill.level})` : ''}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${resume.projects.map(project => `
      <div class="section-item">
        <div class="job-title">${project.name}</div>
        ${project.date ? `<div class="date-location">${project.date}</div>` : ''}
        ${project.description ? `<div class="description">${project.description}</div>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div class="tech-list">Technologies: ${project.technologies.join(', ')}</div>` : ''}
        ${project.link ? `<div class="tech-list">${project.link}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">Certifications</div>
    ${resume.certifications.map(cert => `
      <div class="section-item">
        <div class="job-title">${cert.name}</div>
        <div class="date-location">${cert.issuer}${cert.dateIssued ? ` | ${cert.dateIssued}` : ''}${cert.expiryDate && !cert.doesNotExpire ? ` – ${cert.expiryDate}` : ''}</div>
        ${cert.credentialId ? `<div class="date-location">ID: ${cert.credentialId}</div>` : ''}
        ${cert.credentialUrl ? `<div class="tech-list">${cert.credentialUrl}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">Awards & Achievements</div>
    ${resume.awards.map(award => `
      <div class="section-item">
        <div class="job-title">${award.title}</div>
        <div class="date-location">${award.issuer}${award.date ? ` | ${award.date}` : ''}</div>
        ${award.description ? `<div class="description">${award.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">Volunteer Experience</div>
    ${resume.volunteer.map(vol => `
      <div class="section-item">
        <div class="job-title">${vol.role}</div>
        <div class="company">${vol.organization}</div>
        <div class="date-location">${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate} | ${vol.location}</div>
        ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
  `;
}