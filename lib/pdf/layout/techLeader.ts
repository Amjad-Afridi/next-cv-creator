// lib/pdf/layout/techLeader.ts
// COMPACT SINGLE-PAGE - Larger fonts, aligned bullets, all content visible

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderTechLeader(resume: Resume, template: Template): string {
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
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
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
      width: 32%;
      height: 100%;
      background: linear-gradient(180deg, ${config.colors.primary}08 0%, ${config.colors.secondary}0A 100%);
      border-right: 3pt solid ${config.colors.primary};
      z-index: -1;
    }
    
    .content {
      display: flex;
    }
    
    .sidebar {
      width: 32%;
      padding: 0 15pt;
    }
    
    .main-content { 
      width: 68%; 
      padding: 0 24pt;
    }
    
    .header-section {
      margin-bottom: 9pt;
      padding-bottom: 7pt;
      border-bottom: 2pt solid ${config.colors.primary};
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
      margin-bottom: 4pt;
      font-weight: 500;
    }
    
    .contact-line {
      font-size: 8pt;
      color: ${config.colors.text};
      line-height: 1.3;
    }
    
    .sidebar-section {
      margin-bottom: 8pt;
    }
    
    .sidebar-title {
      font-size: 10pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 4pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
      padding-bottom: 2pt;
      border-bottom: 1pt solid ${config.colors.primary};
    }
    
    .skill-item {
      margin-bottom: 3.5pt;
    }
    
    .skill-name {
      font-size: 8pt;
      font-weight: 500;
      margin-bottom: 1.5pt;
      color: ${config.colors.text};
    }
    
    .skill-bar {
      width: 100%;
      height: 4pt;
      background-color: #e0e0e0;
      border-radius: 2pt;
      overflow: hidden;
    }
    
    .skill-fill {
      height: 100%;
      background-color: ${config.colors.primary};
      border-radius: 2pt;
    }
    
    .education-item {
      margin-bottom: 4pt;
    }
    
    .education-degree {
      font-size: 8pt;
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
    
    .cert-item {
      margin-bottom: 3.5pt;
      padding: 3pt 5pt;
      background-color: ${config.colors.primary}08;
      border-left: 2pt solid ${config.colors.primary};
    }
    
    .cert-name {
      font-size: 8pt;
      font-weight: 600;
      color: ${config.colors.text};
      line-height: 1.3;
    }
    
    .cert-detail {
      font-size: 7pt;
      color: ${config.colors.textLight};
      line-height: 1.2;
    }
    
    .section {
      margin-bottom: 8pt;
    }
    
    .section-title {
      font-size: 11.5pt;
      font-weight: bold;
      color: ${config.colors.primary};
      margin-bottom: 4pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
      padding-left: 7pt;
      border-left: 4pt solid ${config.colors.primary};
    }
    
    .job-item {
      margin-bottom: 5pt;
      page-break-inside: avoid;
    }
    
    .job-title {
      font-size: 10pt;
      font-weight: 600;
      color: ${config.colors.text};
      margin-bottom: 1pt;
      line-height: 1.3;
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
      font-family: 'Courier New', monospace;
    }
  </style>
</head>
<body>
  <div class="sidebar-background"></div>
  
  <div class="content">
    <div class="sidebar">
      <div class="header-section">
        <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
        <div class="title">${hasContactInfo && resume.contactInfo.title ? resume.contactInfo.title : 'Tech Leader'}</div>
        <div class="contact-line">${resume.contactInfo?.email || 'email@example.com'} | ${resume.contactInfo?.phone || '(555) 123-4567'}</div>
        <div class="contact-line">${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</div>
        ${resume.contactInfo?.linkedin ? `<div class="contact-line">${resume.contactInfo.linkedin}</div>` : ''}
        ${resume.contactInfo?.github ? `<div class="contact-line">${resume.contactInfo.github}</div>` : ''}
        ${resume.contactInfo?.website ? `<div class="contact-line">${resume.contactInfo.website}</div>` : ''}
        ${resume.contactInfo?.customLink?.url ? `<div class="contact-line">${resume.contactInfo.customLink.label || 'Website'}: ${resume.contactInfo.customLink.url}</div>` : ''}
      </div>

      ${hasSkills ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Technical Skills</div>
        ${resume.skills.technical.map(skill => `
          <div class="skill-item">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
              <div class="skill-fill" style="width: ${skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '65%' : '50%'}"></div>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${resume.skills?.tools && resume.skills.tools.length > 0 ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Tools & Tech</div>
        ${resume.skills.tools.map(skill => `
          <div class="skill-item">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
              <div class="skill-fill" style="width: ${skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '65%' : '50%'}"></div>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${hasLanguages ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Languages</div>
        ${resume.skills.languages.map(skill => `
          <div class="skill-item">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
              <div class="skill-fill" style="width: ${skill.level === 'Native' || skill.level === 'Fluent' ? '95%' : skill.level === 'Professional' || skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '65%' : '50%'}"></div>
            </div>
          </div>
        `).join('')}
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
          <div class="cert-item">
            <div class="cert-name">${cert.name}</div>
            <div class="cert-detail">${cert.issuer}</div>
            ${cert.dateIssued ? `<div class="cert-detail">${cert.dateIssued}</div>` : ''}
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
        <div class="section-title">Key Projects</div>
        ${resume.projects.map(project => `
          <div class="job-item">
            <div class="job-title">${project.name}</div>
            ${project.date ? `<div class="company-date">${project.date}</div>` : ''}
            ${project.description ? `<div class="description">${project.description}</div>` : ''}
            ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<div class="tech-list">${project.technologies.join(' • ')}</div>` : ''}
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