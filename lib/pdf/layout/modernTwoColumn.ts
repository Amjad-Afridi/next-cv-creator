// lib/pdf/layout/modernTwoColumn.ts
// COMPACT SINGLE-PAGE - Larger fonts, aligned bullets, all content visible

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderModernTwoColumn(resume: Resume, template: Template): string {
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
      margin: 0;
    }
    
    body {
      font-family: 'Inter', 'Helvetica', 'Arial', sans-serif;
      font-size: 9.5pt;
      line-height: 1.4;
      color: ${config.colors.text};
      background: white;
      padding: 25pt 0;
    }
    
    .sidebar-background {
      position: fixed;
      left: 0;
      top: 0;
      width: 30%;
      height: 100vh;
      max-height: 11in;
      background-color: ${config.colors.primary}0A;
      border-right: 2pt solid ${config.colors.primary};
      z-index: -1;
    }
    
    .content {
      display: flex;
    }
    
    .sidebar {
      width: 30%;
      padding: 0 15pt;
    }
    
    .main-content { 
      width: 70%; 
      padding: 0 25pt;
    }
    
    .name {
      font-size: 22pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 2pt;
      line-height: 1.1;
    }
    
    .title {
      font-size: 10.5pt;
      color: ${config.colors.textLight};
      margin-bottom: 9pt;
    }
    
    .sidebar-section {
      margin-bottom: 9pt;
    }
    
    .sidebar-title {
      font-size: 10.5pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 4pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    
    .contact-item {
      font-size: 8pt;
      color: ${config.colors.text};
      margin-bottom: 6pt;
      line-height: 1.4;
      word-break: break-word;
    }
    
    .skill-tag {
      display: inline-block;
      font-size: 7.5pt;
      padding: 3pt 6pt;
      margin: 1.5pt 2.5pt 1.5pt 0;
      background-color: ${config.colors.primary};
      color: white;
      border-radius: 3pt;
      line-height: 1.1;
    }
    
    .education-item {
      margin-bottom: 5pt;
    }
    
    .education-degree {
      font-size: 8.5pt;
      font-weight: 600;
      color: ${config.colors.text};
      margin-bottom: 1pt;
      line-height: 1.3;
    }
    
    .education-detail {
      font-size: 7.5pt;
      color: ${config.colors.textLight};
      line-height: 1.2;
    }
    
    .section {
      margin-bottom: 9pt;
    }
    
    .section-title {
      font-size: 11.5pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 5pt;
      padding-bottom: 3pt;
      border-bottom: 2pt solid ${config.colors.primary};
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    
    .job-item {
      margin-bottom: 5pt;
      page-break-inside: avoid;
    }
    
    .job-title {
      font-size: 10pt;
      font-weight: 600;
      color: ${config.colors.text};
      line-height: 1.3;
      margin-bottom: 1pt;
    }
    
    .company-date {
      font-size: 8pt;
      color: ${config.colors.textLight};
      margin-bottom: 2pt;
      line-height: 1.2;
    }
    
    .description {
      font-size: 8.5pt;
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
    
    .tech-list {
      font-size: 7.5pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
    }
  </style>
</head>
<body>
  <div class="sidebar-background"></div>
  
  <div class="content">
    <div class="sidebar">
      <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
      <div class="title">${hasContactInfo && resume.contactInfo.title ? resume.contactInfo.title : 'Professional Title'}</div>

      <div class="sidebar-section">
        <div class="sidebar-title">Contact</div>
        <div class="contact-item">${resume.contactInfo?.email || 'email@example.com'}</div>
        <div class="contact-item">${resume.contactInfo?.phone || '(555) 123-4567'}</div>
        <div class="contact-item">${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</div>
        ${resume.contactInfo?.linkedin ? `<div class="contact-item">${resume.contactInfo.linkedin}</div>` : ''}
        ${resume.contactInfo?.github ? `<div class="contact-item">${resume.contactInfo.github}</div>` : ''}
        ${resume.contactInfo?.website ? `<div class="contact-item">${resume.contactInfo.website}</div>` : ''}
        ${resume.contactInfo?.customLink?.url ? `<div class="contact-item">${resume.contactInfo.customLink.label || 'Website'}: ${resume.contactInfo.customLink.url}</div>` : ''}
      </div>

      ${hasSkills ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Skills</div>
        <div>
          ${resume.skills.technical.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
          ${resume.skills.tools.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
          ${resume.skills.soft.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
        </div>
      </div>
      ` : ''}

      ${hasLanguages ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Languages</div>
        <div>
          ${resume.skills.languages.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
        </div>
      </div>
      ` : ''}

      ${hasEducation ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Education</div>
        ${resume.education.map(edu => `
          <div class="education-item">
            <div class="education-degree">${edu.degree}</div>
            <div class="education-detail">${edu.institution}</div>
            <div class="education-detail">${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
            ${edu.gpa ? `<div class="education-detail">GPA: ${edu.gpa}</div>` : ''}
            ${edu.additionalInfo ? `<div class="education-detail">${edu.additionalInfo}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${hasCertifications ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Certifications</div>
        ${resume.certifications.map(cert => `
          <div class="education-item">
            <div class="education-degree">${cert.name}</div>
            <div class="education-detail">${cert.issuer}</div>
            ${cert.dateIssued ? `<div class="education-detail">${cert.dateIssued}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>

    <div class="main-content">
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
            <div class="job-title">${exp.jobTitle}</div>
            <div class="company-date">${exp.company} | ${exp.location} | ${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
            ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${hasProjects ? `
      <div class="section">
        <div class="section-title">Projects</div>
        ${resume.projects.map(project => `
          <div class="job-item">
            <div class="job-title">${project.name}</div>
            ${project.date ? `<div class="company-date">${project.date}</div>` : ''}
            ${project.description ? `<div class="description">${project.description}</div>` : ''}
            ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div class="tech-list">Technologies: ${project.technologies.join(', ')}</div>` : ''}
            ${project.link ? `<div class="tech-list">${project.link}</div>` : ''}
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
            <div class="company-date">${award.issuer}${award.date ? ` • ${award.date}` : ''}</div>
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
            <div class="company-date">${vol.organization}, ${vol.location} • ${vol.startDate} – ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
            ${vol.description ? `<div class="description">${vol.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>
  `;
}