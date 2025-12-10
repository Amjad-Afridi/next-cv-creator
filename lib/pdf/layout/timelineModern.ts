// lib/pdf/layout/timelineModern.ts
// SINGLE-PAGE OPTIMIZED - Visual timeline design

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderTimelineModern(resume: Resume, template: Template): string {
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
    
    @page { 
      size: letter; 
      margin: 25pt 0 35pt 0;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      font-size: 9.5pt;
      line-height: 1.5;
      color: ${config.colors.text};
      background: white;
      padding: 10pt 40pt 10pt 40pt;
    }
    
    .header {
      margin-bottom: 10pt;
    }
    
    .name {
      font-size: 24pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 3pt;
    }
    
    .contact-info {
      font-size: 8.5pt;
      color: ${config.colors.textLight};
      line-height: 1.4;
      margin-bottom: 3pt;
    }
    
    .contact-links {
      font-size: 8pt;
      color: ${config.colors.textLight};
      line-height: 1.3;
    }
    
    .section {
      margin-bottom: 10pt;
    }
    
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 7pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    
    .timeline-item {
      display: flex;
      margin-bottom: 8pt;
      position: relative;
    }
    
    .timeline-date {
      width: 80pt;
      text-align: left;
      font-size: 8pt;
      color: ${config.colors.textLight};
      flex-shrink: 0;
      padding-top: 2pt;
    }
    
    .timeline-marker {
      width: 25pt;
      position: relative;
      flex-shrink: 0;
    }
    
    .timeline-dot {
      width: 10pt;
      height: 10pt;
      background-color: ${config.colors.primary};
      border-radius: 50%;
      position: absolute;
      left: 7.5pt;
      top: 4pt;
    }
    
    .timeline-line {
      width: 2pt;
      background-color: ${config.colors.border};
      position: absolute;
      left: 12pt;
      top: 14pt;
      bottom: -10pt;
    }
    
    .timeline-content {
      flex: 1;
      padding-top: 0;
    }
    
    .job-title {
      font-size: 10pt;
      font-weight: 600;
      color: ${config.colors.text};
      margin-bottom: 2pt;
      line-height: 1.3;
    }
    
    .company {
      font-size: 9pt;
      color: ${config.colors.textLight};
      margin-bottom: 4pt;
      line-height: 1.3;
    }
    
    .description {
      font-size: 9pt;
      line-height: 1.5;
      color: ${config.colors.text};
      margin-top: 3pt;
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
      gap: 6pt;
    }
    
    .skill-tag {
      font-size: 8.5pt;
      padding: 4pt 10pt;
      background-color: ${config.colors.primary}15;
      color: ${config.colors.primary};
      border-radius: 3pt;
      font-weight: 500;
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
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
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
    <div class="section-title">Experience</div>
    ${resume.experience.map((exp, index) => `
      <div class="timeline-item">
        <div class="timeline-date">${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          ${index < resume.experience.length - 1 ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-content">
          <div class="job-title">${exp.jobTitle}</div>
          <div class="company">${exp.company} | ${exp.location}</div>
          ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasEducation ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${resume.education.map((edu, index) => `
      <div class="timeline-item">
        <div class="timeline-date">${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          ${index < resume.education.length - 1 ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-content">
          <div class="job-title">${edu.degree}</div>
          <div class="company">${edu.institution} | ${edu.location}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
          ${edu.additionalInfo ? `<div class="description">${edu.additionalInfo}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-grid">
      ${resume.skills.technical.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
      ${resume.skills.tools.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
      ${resume.skills.soft.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasLanguages ? `
  <div class="section">
    <div class="section-title">Languages</div>
    <div class="skills-grid">
      ${resume.skills.languages.map(skill => `<span class="skill-tag">${skill.name}${skill.level ? ` (${skill.level})` : ''}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${resume.projects.map(project => `
      <div class="timeline-item">
        <div class="timeline-date">${project.date || ''}</div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="job-title">${project.name}</div>
          ${project.description ? `<div class="description">${project.description}</div>` : ''}
          ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div class="tech-list">Tech: ${project.technologies.join(', ')}</div>` : ''}
          ${project.link ? `<div class="tech-list">${project.link}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">Certifications</div>
    ${resume.certifications.map(cert => `
      <div class="timeline-item">
        <div class="timeline-date">${cert.dateIssued || ''}</div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="job-title">${cert.name}</div>
          <div class="company">${cert.issuer}${cert.expiryDate && !cert.doesNotExpire ? ` | Expires: ${cert.expiryDate}` : ''}</div>
          ${cert.credentialId ? `<div class="description">ID: ${cert.credentialId}</div>` : ''}
          ${cert.credentialUrl ? `<div class="tech-list">${cert.credentialUrl}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">Awards</div>
    ${resume.awards.map(award => `
      <div class="timeline-item">
        <div class="timeline-date">${award.date || ''}</div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="job-title">${award.title}</div>
          <div class="company">${award.issuer}</div>
          ${award.description ? `<div class="description">${award.description}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">Volunteer</div>
    ${resume.volunteer.map(vol => `
      <div class="timeline-item">
        <div class="timeline-date">${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
        </div>
        <div class="timeline-content">
          <div class="job-title">${vol.role}</div>
          <div class="company">${vol.organization} | ${vol.location}</div>
          ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
  `;
}