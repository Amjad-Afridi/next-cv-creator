// lib/pdf/layout/modernMinimalistPro.ts
// SINGLE-PAGE OPTIMIZED - Modern minimalist design

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderModernMinimalistPro(resume: Resume, template: Template): string {
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
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 9.5pt;
      line-height: 1.5;
      color: ${config.colors.text};
      background: white;
      padding: 10pt 50pt 10pt 50pt;
    }
    
    .name {
      font-size: 28pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 5pt;
      letter-spacing: -0.5pt;
    }
    
    .contact-info {
      font-size: 8.5pt;
      color: ${config.colors.textLight};
      margin-bottom: 3pt;
      line-height: 1.4;
    }
    
    .contact-links {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-bottom: 18pt;
      line-height: 1.3;
    }
    
    .section {
      margin-bottom: 14pt;
    }
    
    .section-title {
      font-size: 11pt;
      font-weight: 600;
      color: ${config.colors.primary};
      margin-bottom: 8pt;
      letter-spacing: 1pt;
      text-transform: uppercase;
    }
    
    .job-item {
      margin-bottom: 9pt;
      page-break-inside: avoid;
    }
    
    .job-title {
      font-size: 10pt;
      font-weight: 600;
      color: ${config.colors.text};
      margin-bottom: 2pt;
      line-height: 1.3;
    }
    
    .company-line {
      font-size: 8.5pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
      margin-bottom: 4pt;
      line-height: 1.3;
    }
    
    .description {
      font-size: 9pt;
      line-height: 1.6;
      color: ${config.colors.text};
      margin-top: 4pt;
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
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8pt;
      margin-top: 6pt;
    }
    
    .skill-item {
      font-size: 8.5pt;
      padding: 6pt;
      background: ${config.colors.primary}05;
      border-left: 2pt solid ${config.colors.primary};
      line-height: 1.3;
    }

    .professional-title {
      font-size: 11pt;
      color: ${config.colors.textLight};
      font-weight: 400;
      margin-bottom: 6pt;
      line-height: 1.2;
      letter-spacing: 0.2pt;
    }
    
    .tech-list {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
    }
  </style>
</head>
<body>
  <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
  ${resume.contactInfo?.professionalTitle ? `<div class="professional-title">${resume.contactInfo.professionalTitle}</div>` : ''}
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

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Summary</div>
    <div class="description">${resume.summary}</div>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
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
        <div class="company-line">${edu.institution} • ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
        ${edu.additionalInfo ? `<div class="description">${edu.additionalInfo}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-grid">
      ${resume.skills.technical.map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
      ${resume.skills.tools.map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
      ${resume.skills.soft.map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasLanguages ? `
  <div class="section">
    <div class="section-title">Languages</div>
    <div class="skills-grid">
      ${resume.skills.languages.map(skill => `<div class="skill-item">${skill.name}${skill.level ? ` (${skill.level})` : ''}</div>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${resume.projects.map(project => `
      <div class="job-item">
        <div class="job-title">${project.name}</div>
        ${project.date ? `<div class="company-line">${project.date}</div>` : ''}
        ${project.description ? `<div class="description">${project.description}</div>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div class="tech-list">Tech: ${project.technologies.join(', ')}</div>` : ''}
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
        <div class="job-title">${cert.name}</div>
        <div class="company-line">${cert.issuer}${cert.dateIssued ? ` • ${cert.dateIssued}` : ''}${cert.expiryDate && !cert.doesNotExpire ? ` – ${cert.expiryDate}` : ''}</div>
        ${cert.credentialId ? `<div class="company-line">ID: ${cert.credentialId}</div>` : ''}
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
        <div class="job-title">${award.title}</div>
        <div class="company-line">${award.issuer}${award.date ? ` • ${award.date}` : ''}</div>
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
        <div class="job-title">${vol.role}</div>
        <div class="company-line">${vol.organization} • ${vol.location} • ${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
        ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasInterests ? `
  <div class="section">
    <div class="section-title">Interests & Hobbies</div>
    <div class="skills-grid">
      ${resume.interests.map(interest => `<div class="skill-item">${interest}</div>`).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `;
}