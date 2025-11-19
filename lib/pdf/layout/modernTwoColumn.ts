// lib/pdf/layouts/modernTwoColumn.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderModernTwoColumn(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0);
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
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.5;
      color: ${config.colors.text};
      background: white;
    }
    
    .container {
      display: flex;
      min-height: 100vh;
    }
    
    .sidebar {
      width: 30%;
      background-color: ${config.colors.primary}08;
      padding: ${config.spacing.margins.top}pt 20pt;
      border-right: 2pt solid ${config.colors.primary};
    }
    
    .main-content {
      width: 70%;
      padding: ${config.spacing.margins.top}pt 40pt ${config.spacing.margins.bottom}pt 30pt;
    }
    
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 4pt;
      line-height: 1.2;
    }
    
    .title {
      font-size: ${config.typography.sizes.subheading}pt;
      color: ${config.colors.textLight};
      margin-bottom: 16pt;
    }
    
    .sidebar-section {
      margin-bottom: ${config.spacing.sectionGap}pt;
    }
    
    .sidebar-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    
    .contact-item {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.text};
      margin-bottom: 6pt;
      line-height: 1.4;
      word-break: break-word;
    }
    
    .skill-tag {
      display: inline-block;
      font-size: ${config.typography.sizes.small}pt;
      padding: 4pt 8pt;
      margin: 2pt 4pt 2pt 0;
      background-color: ${config.colors.primary};
      color: white;
      border-radius: 3pt;
    }
    
    .section {
      margin-bottom: ${config.spacing.sectionGap}pt;
    }
    
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: ${config.spacing.itemGap}pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    
    .job-item {
      margin-bottom: ${config.spacing.itemGap}pt;
    }
    
    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
    }
    
    .company-date {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      margin-top: 2pt;
      margin-bottom: 4pt;
    }
    
    .description {
      margin-top: 4pt;
      line-height: 1.5;
    }
    
    .description ul {
      margin-left: 16pt;
    }
    
    .description li {
      margin-bottom: 2pt;
    }
    
    @page {
      size: letter;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Contact -->
      <div class="sidebar-section">
        <div class="sidebar-title">CONTACT</div>
        <div class="contact-item">${resume.contactInfo?.email || 'email@example.com'}</div>
        <div class="contact-item">${resume.contactInfo?.phone || '(555) 123-4567'}</div>
        <div class="contact-item">${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</div>
        ${resume.contactInfo?.linkedin ? `<div class="contact-item">LinkedIn</div>` : ''}
        ${resume.contactInfo?.github ? `<div class="contact-item">GitHub</div>` : ''}
      </div>

      ${hasSkills ? `
      <!-- Skills -->
      ${resume.skills.technical.length > 0 ? `
      <div class="sidebar-section">
        <div class="sidebar-title">TECHNICAL SKILLS</div>
        <div>
          ${resume.skills.technical.map(skill => `
            <span class="skill-tag">${skill.name}</span>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resume.skills.soft.length > 0 ? `
      <div class="sidebar-section">
        <div class="sidebar-title">SOFT SKILLS</div>
        <div>
          ${resume.skills.soft.map(skill => `
            <span class="skill-tag">${skill.name}</span>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resume.skills.tools.length > 0 ? `
      <div class="sidebar-section">
        <div class="sidebar-title">TOOLS</div>
        <div>
          ${resume.skills.tools.map(skill => `
            <span class="skill-tag">${skill.name}</span>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${resume.skills.languages.length > 0 ? `
      <div class="sidebar-section">
        <div class="sidebar-title">LANGUAGES</div>
        ${resume.skills.languages.map(skill => `
          <div class="contact-item">${skill.name}${skill.level ? ` - ${skill.level}` : ''}</div>
        `).join('')}
      </div>
      ` : ''}
      ` : ''}
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <div style="margin-bottom: ${config.spacing.sectionGap}pt;">
        <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
        <div class="title">Professional Title</div>
      </div>

      ${hasSummary ? `
      <!-- Summary -->
      <div class="section">
        <div class="section-title">ABOUT ME</div>
        <p>${resume.summary}</p>
      </div>
      ` : ''}

      ${hasExperience ? `
      <!-- Experience -->
      <div class="section">
        <div class="section-title">WORK EXPERIENCE</div>
        ${resume.experience.map(exp => `
          <div class="job-item">
            <div class="job-title">${exp.jobTitle}</div>
            <div class="company-date">
              ${exp.company} | ${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}
            </div>
            ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${hasEducation ? `
      <!-- Education -->
      <div class="section">
        <div class="section-title">EDUCATION</div>
        ${resume.education.map(edu => `
          <div class="job-item">
            <div class="job-title">${edu.degree}</div>
            <div class="company-date">
              ${edu.institution} | ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}
            </div>
            ${edu.gpa ? `<div style="margin-top: 2pt;">GPA: ${edu.gpa}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}

      ${hasProjects ? `
  <div class="section">
    <div class="section-title">PROJECTS</div>
    ${resume.projects!.map((project: any) => `
      <div class="section-item">
        <div class="job-title">${project.name}</div>
        ${project.date ? `<div class="company-line">${project.date}</div>` : ''}
        ${project.description ? `<p style="margin-top: 4pt;">${project.description}</p>` : ''}
        ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<p style="margin-top: 4pt; font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight};">Technologies: ${project.technologies.join(', ')}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasCertifications ? `
  <div class="section">
    <div class="section-title">CERTIFICATIONS</div>
    ${resume.certifications!.map((cert: any) => `
      <div class="section-item">
        <div class="job-title">${cert.name}</div>
        <div class="company-line">${cert.issuer}${cert.dateIssued ? ` • ${cert.dateIssued}` : ''}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">AWARDS & HONORS</div>
    ${resume.awards!.map((award: any) => `
      <div class="section-item">
        <div class="job-title">${award.title}</div>
        <div class="company-line">${award.issuer}${award.date ? ` • ${award.date}` : ''}</div>
        ${award.description ? `<p style="margin-top: 4pt;">${award.description}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasVolunteer ? `
  <div class="section">
    <div class="section-title">VOLUNTEER EXPERIENCE</div>
    ${resume.volunteer!.map((vol: any) => `
      <div class="section-item">
        <div class="job-title">${vol.role}</div>
        <div class="company-line">${vol.organization} • ${vol.startDate} - ${vol.isCurrentRole ? 'Present' : vol.endDate}</div>
        ${vol.description ? `<p style="margin-top: 4pt;">${vol.description}</p>` : ''}
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