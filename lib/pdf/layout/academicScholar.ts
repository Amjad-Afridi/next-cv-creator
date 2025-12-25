// lib/pdf/layout/academicScholar.ts
// SINGLE-PAGE OPTIMIZED - Academic scholar design

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderAcademicScholar(resume: Resume, template: Template): string {
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
    
    @page :first {
      margin-bottom: 15pt;
    }
    
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 9.5pt;
      line-height: 1.6;
      color: ${config.colors.text};
      background: white;
      padding: 10pt 50pt 10pt 50pt;
    }
    
    .header {
      text-align: center;
      padding-bottom: 12pt;
      margin-bottom: 14pt;
      border-bottom: 1.5pt solid ${config.colors.primary};
    }
    
    .name {
      font-size: 24pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 8pt;
    }
    
    .contact-info {
      font-size: 8.5pt;
      color: ${config.colors.textLight};
      line-height: 1.5;
      margin-bottom: 4pt;
    }
    
    .contact-links {
      font-size: 8pt;
      color: ${config.colors.textLight};
      line-height: 1.4;
    }
    
    .section {
      margin-bottom: 13pt;
    }
    
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 8pt;
      text-transform: uppercase;
      border-bottom: 1pt solid ${config.colors.border};
      padding-bottom: 3pt;
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
      text-align: justify;
      color: ${config.colors.text};
      margin-top: 3pt;
    }
    
    .description ul {
      margin: 2pt 0 2pt 12pt;
      padding-left: 0;
    }
    
    .description li {
      margin-bottom: 2pt;
    }
    
    .skills-list {
      columns: 2;
      column-gap: 20pt;
    }
    
    .skill-item {
      font-size: 9pt;
      margin-bottom: 3pt;
      break-inside: avoid;
    }

    .professional-title {
      font-size: 10pt;
      color: ${config.colors.textLight};
      margin-bottom: 8pt;
      line-height: 1.3;
      font-family: 'Times New Roman', Times, serif;
      font-weight: 500;
    }
    
    .tech-list {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
      font-style: italic;
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

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Research Interests</div>
    <div class="description">${resume.summary}</div>
  </div>
  ` : ''}

  ${hasEducation ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${resume.education.map(edu => `
      <div class="job-item">
        <div class="job-title">${edu.degree}</div>
        <div class="company-line">${edu.institution}, ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
        ${edu.additionalInfo ? `<div class="description">${edu.additionalInfo}</div>` : ''}
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

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">Research Projects</div>
    ${resume.projects.map(project => `
      <div class="job-item">
        <div class="job-title">${project.name}</div>
        ${project.date ? `<div class="company-line">${project.date}</div>` : ''}
        ${project.description ? `<div class="description">${project.description}</div>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div class="tech-list">Methods: ${project.technologies.join(', ')}</div>` : ''}
        ${project.link ? `<div class="tech-list">${project.link}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Technical Skills</div>
    <div class="skills-list">
      ${resume.skills.technical.map(skill => `<div class="skill-item">• ${skill.name}</div>`).join('')}
      ${resume.skills.tools.map(skill => `<div class="skill-item">• ${skill.name}</div>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasLanguages ? `
  <div class="section">
    <div class="section-title">Languages</div>
    <div class="skills-list">
      ${resume.skills.languages.map(skill => `<div class="skill-item">• ${skill.name}${skill.level ? ` (${skill.level})` : ''}</div>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">Certifications & Training</div>
    ${resume.certifications.map(cert => `
      <div class="job-item">
        <div class="job-title">${cert.name}</div>
        <div class="company-line">${cert.issuer}${cert.dateIssued ? ` • ${cert.dateIssued}` : ''}${cert.expiryDate && !cert.doesNotExpire ? ` – ${cert.expiryDate}` : ''}</div>
        ${cert.credentialId ? `<div class="company-line">Credential ID: ${cert.credentialId}</div>` : ''}
        ${cert.credentialUrl ? `<div class="tech-list">${cert.credentialUrl}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">Honors & Awards</div>
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
    <div class="section-title">Service & Leadership</div>
    ${resume.volunteer.map(vol => `
      <div class="job-item">
        <div class="job-title">${vol.role}</div>
        <div class="company-line">${vol.organization}, ${vol.location} • ${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
        ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasInterests ? `
  <div class="section">
    <div class="section-title">Research Interests & Hobbies</div>
    <div class="skills-list">
      ${resume.interests.map(interest => `<div class="skill-item">• ${interest}</div>`).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `;
}