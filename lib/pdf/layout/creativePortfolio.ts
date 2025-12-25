// lib/pdf/layout/creativePortfolio.ts
// SINGLE-PAGE OPTIMIZED - Creative portfolio design

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderCreativePortfolio(resume: Resume, template: Template): string {
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
      font-family: 'Poppins', 'Helvetica', sans-serif;
      font-size: 9.5pt;
      line-height: 1.5;
      color: ${config.colors.text};
      background: white;
      padding: 10pt 40pt 10pt 40pt;
    }
    
    .header {
      background: linear-gradient(135deg, ${config.colors.primary}15 0%, ${config.colors.secondary}10 100%);
      padding: 20pt;
      margin-bottom: 14pt;
      border-radius: 8pt;
      border-left: 4pt solid ${config.colors.primary};
    }
    
    .name {
      font-size: 28pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 4pt;
    }
    
    .contact-info {
      font-size: 8.5pt;
      color: ${config.colors.text};
      line-height: 1.5;
      margin-bottom: 4pt;
    }
    
    .contact-links {
      font-size: 8pt;
      color: ${config.colors.primary};
      line-height: 1.4;
      font-weight: 500;
    }
    
    .section {
      margin-bottom: 12pt;
    }
    
    .section-title {
      font-size: 12pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 8pt;
      padding-left: 10pt;
      border-left: 4pt solid ${config.colors.primary};
    }
    
    .job-item {
      margin-bottom: 9pt;
      padding: 10pt;
      background: ${config.colors.primary}05;
      border-radius: 6pt;
      page-break-inside: avoid;
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
      color: ${config.colors.primary};
      font-weight: 500;
      margin-bottom: 2pt;
      line-height: 1.3;
    }
    
    .date-location {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-bottom: 4pt;
      line-height: 1.2;
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
      padding: 5pt 12pt;
      background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary || config.colors.primary} 100%);
      color: white;
      border-radius: 15pt;
      font-weight: 500;
    }

    .professional-title {
      font-size: 12pt;
      color: ${config.colors.primary};
      font-weight: 500;
      margin-bottom: 8pt;
      line-height: 1.2;
      opacity: 0.85;
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
    <div class="section-title">About Me</div>
    <div class="description">${resume.summary}</div>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Work Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-title">${exp.jobTitle}</div>
        <div class="company">${exp.company}</div>
        <div class="date-location">${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate} | ${exp.location}</div>
        ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">Featured Projects</div>
    ${resume.projects.map(project => `
      <div class="job-item">
        <div class="job-title">${project.name}</div>
        ${project.date ? `<div class="date-location">${project.date}</div>` : ''}
        ${project.description ? `<div class="description">${project.description}</div>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div class="tech-list">Tech Stack: ${project.technologies.join(', ')}</div>` : ''}
        ${project.link ? `<div class="tech-list">${project.link}</div>` : ''}
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
        <div class="company">${edu.institution}</div>
        <div class="date-location">${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate} | ${edu.location}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
        ${edu.additionalInfo ? `<div class="description">${edu.additionalInfo}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills & Tools</div>
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
      ${resume.skills.languages.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">Certifications</div>
    ${resume.certifications.map(cert => `
      <div class="job-item">
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
    <div class="section-title">Awards & Recognition</div>
    ${resume.awards.map(award => `
      <div class="job-item">
        <div class="job-title">${award.title}</div>
        <div class="date-location">${award.issuer}${award.date ? ` | ${award.date}` : ''}</div>
        ${award.description ? `<div class="description">${award.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">Volunteer Work</div>
    ${resume.volunteer.map(vol => `
      <div class="job-item">
        <div class="job-title">${vol.role}</div>
        <div class="company">${vol.organization}</div>
        <div class="date-location">${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate} | ${vol.location}</div>
        ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasInterests ? `
  <div class="section">
    <div class="section-title">Interests & Hobbies</div>
    <div class="skills-grid">
      ${resume.interests.map(interest => `<span class="skill-tag">${interest}</span>`).join('')}
    </div>
  </div>
  ` : ''}
</body>
</html>
  `;
}