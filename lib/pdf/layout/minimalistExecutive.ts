// lib/pdf/layout/minimalistExecutive.ts
// SINGLE-PAGE OPTIMIZED - Elegant executive design

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderMinimalistExecutive(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.tools.length > 0);
  const hasLanguages = resume.skills?.languages && resume.skills.languages.length > 0;
  const hasProjects = resume.projects && resume.projects.length > 0;
  const hasCertifications = resume.certifications && resume.certifications.length > 0;
  const hasAwards = resume.awards && resume.awards.length > 0;
  const hasVolunteer = resume.volunteer && resume.volunteer.length > 0;
  const hasInterests = resume.interests && resume.interests.length > 0;

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
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 9.5pt;
      line-height: 1.6;
      color: ${config.colors.text};
      background: white;
      padding: 10pt 50pt 10pt 50pt;
    }
    
    .header {
      text-align: center;
      margin-bottom: 20pt;
      padding-top: 0;
    }
    
    .name {
      font-size: 24pt;
      font-weight: normal;
      color: ${config.colors.text};
      margin-bottom: 6pt;
      letter-spacing: 2pt;
      text-transform: uppercase;
    }
    
    .contact-info {
      font-size: 8.5pt;
      color: ${config.colors.textLight};
      letter-spacing: 0.5pt;
      margin-bottom: 3pt;
      line-height: 1.4;
    }
    
    .contact-links {
      font-size: 8pt;
      color: ${config.colors.textLight};
      letter-spacing: 0.5pt;
      line-height: 1.3;
    }
    
    .divider {
      width: 60pt;
      height: 1px;
      background-color: ${config.colors.text};
      margin: 16pt auto;
    }
    
    .section {
      margin-bottom: 14pt;
    }
    
    .section-title {
      font-size: 10.5pt;
      font-weight: normal;
      color: ${config.colors.text};
      text-transform: uppercase;
      letter-spacing: 2pt;
      margin-bottom: 8pt;
      text-align: center;
    }
    
    .job-item {
      margin-bottom: 10pt;
      page-break-inside: avoid;
    }
    
    .job-header {
      text-align: center;
      margin-bottom: 5pt;
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
      margin-top: 2pt;
      line-height: 1.3;
    }
    
    .date-location {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
      line-height: 1.2;
    }
    
    .description {
      font-size: 9pt;
      line-height: 1.6;
      text-align: justify;
      color: ${config.colors.text};
      margin-top: 6pt;
    }
    
    .description ul {
      margin: 2pt 0;
      padding-left: 12pt;
    }
    
    .description li {
      margin-bottom: 2pt;
      padding-left: 0;
    }
    
    .skills-container {
      text-align: center;
    }
    
    .skill-item {
      display: inline-block;
      font-size: 9pt;
      color: ${config.colors.text};
      margin: 0 8pt 6pt 8pt;
    }

    .professional-title {
      font-size: 9.5pt;
      color: ${config.colors.textLight};
      margin-bottom: 8pt;
      line-height: 1.3;
      letter-spacing: 1pt;
      font-weight: 300;
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
    ${resume.contactInfo?.professionalTitle ? `<div class="professional-title">${resume.contactInfo.professionalTitle}</div>` : ''}
    <div class="contact-info">
      ${resume.contactInfo?.email || 'email@example.com'} • 
      ${resume.contactInfo?.phone || '(555) 123-4567'} • 
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
    ${(resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website || resume.contactInfo?.customLink?.url) ? `
    <div class="contact-links">
      ${resume.contactInfo?.linkedin ? `${resume.contactInfo.linkedin}` : ''}${resume.contactInfo?.github ? `${resume.contactInfo?.linkedin ? ' • ' : ''}${resume.contactInfo.github}` : ''}${resume.contactInfo?.website ? `${(resume.contactInfo?.linkedin || resume.contactInfo?.github) ? ' • ' : ''}${resume.contactInfo.website}` : ''}${resume.contactInfo?.customLink?.url ? `${(resume.contactInfo?.linkedin || resume.contactInfo?.github || resume.contactInfo?.website) ? ' • ' : ''}${resume.contactInfo.customLink.label || 'Website'}: ${resume.contactInfo.customLink.url}` : ''}
    </div>
    ` : ''}
  </div>

  <div class="divider"></div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <div class="description">${resume.summary}</div>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-header">
          <div class="job-title">${exp.jobTitle}</div>
          <div class="company">${exp.company}</div>
          <div class="date-location">${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate} | ${exp.location}</div>
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
          <div class="job-title">${edu.degree}</div>
          <div class="company">${edu.institution}</div>
          <div class="date-location">${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate} | ${edu.location}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
        </div>
        ${edu.additionalInfo ? `<div class="description">${edu.additionalInfo}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-container">
      ${resume.skills.technical.map(skill => `<span class="skill-item">${skill.name}</span>`).join('')}
      ${resume.skills.tools.map(skill => `<span class="skill-item">${skill.name}</span>`).join('')}
      ${resume.skills.soft.map(skill => `<span class="skill-item">${skill.name}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasLanguages ? `
  <div class="section">
    <div class="section-title">Languages</div>
    <div class="skills-container">
      ${resume.skills.languages.map(skill => `<span class="skill-item">${skill.name}${skill.level ? ` (${skill.level})` : ''}</span>`).join('')}
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
      <div class="job-item">
        <div class="job-header">
          <div class="job-title">${cert.name}</div>
          <div class="date-location">${cert.issuer}${cert.dateIssued ? ` • ${cert.dateIssued}` : ''}${cert.expiryDate && !cert.doesNotExpire ? ` – ${cert.expiryDate}` : ''}</div>
        </div>
        ${cert.credentialId ? `<div class="date-location">ID: ${cert.credentialId}</div>` : ''}
        ${cert.credentialUrl ? `<div class="tech-list">${cert.credentialUrl}</div>` : ''}
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
          <div class="job-title">${award.title}</div>
          <div class="date-location">${award.issuer}${award.date ? ` • ${award.date}` : ''}</div>
        </div>
        ${award.description ? `<div class="description">${award.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">Volunteer</div>
    ${resume.volunteer.map(vol => `
      <div class="job-item">
        <div class="job-header">
          <div class="job-title">${vol.role}</div>
          <div class="company">${vol.organization}</div>
          <div class="date-location">${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate} | ${vol.location}</div>
        </div>
        ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasInterests ? `
  <div class="section">
    <div class="section-title">Interests & Hobbies</div>
    <div class="skills-container">
      ${resume.interests.map(interest => `<span class="skill-item">${interest}</span>`).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `;
}