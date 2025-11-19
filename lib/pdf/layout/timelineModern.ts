// lib/pdf/layouts/timelineModern.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderTimelineModern(resume: Resume, template: Template): string {
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
      font-family: 'Inter', sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.5;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    
    .header {
      margin-bottom: ${config.spacing.sectionGap}pt;
    }
    
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 6pt;
    }
    
    .contact-info {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      line-height: 1.6;
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
    
    .timeline-item {
      display: flex;
      margin-bottom: ${config.spacing.itemGap}pt;
      position: relative;
    }
    
    .timeline-date {
      width: 100pt;
      padding-right: 20pt;
      text-align: right;
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      flex-shrink: 0;
    }
    
    .timeline-marker {
      width: 30pt;
      position: relative;
      flex-shrink: 0;
    }
    
    .timeline-dot {
      width: 10pt;
      height: 10pt;
      background-color: ${config.colors.primary};
      border-radius: 50%;
      position: absolute;
      left: 10pt;
      top: 4pt;
    }
    
    .timeline-line {
      width: 2pt;
      background-color: ${config.colors.primary}30;
      position: absolute;
      left: 14pt;
      top: 14pt;
      bottom: -${config.spacing.itemGap}pt;
    }
    
    .timeline-content {
      flex: 1;
      padding-top: 0;
    }
    
    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.text};
      margin-bottom: 2pt;
    }
    
    .company {
      font-size: ${config.typography.sizes.body}pt;
      color: ${config.colors.textLight};
      margin-bottom: 6pt;
    }
    
    .description {
      line-height: 1.5;
      margin-top: 4pt;
    }
    
    .description ul {
      margin-left: 16pt;
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
    
    .skill-box {
      padding: 8pt;
      background-color: ${config.colors.primary}08;
      border-left: 3pt solid ${config.colors.primary};
      font-size: ${config.typography.sizes.small}pt;
    }
    
    @page {
      size: letter;
      margin: 0;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="contact-info">
      ${resume.contactInfo?.email || 'email@example.com'} • 
      ${resume.contactInfo?.phone || '(555) 123-4567'} • 
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
  </div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">About</div>
    <p>${resume.summary}</p>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${resume.experience.map((exp, index) => `
      <div class="timeline-item">
        <div class="timeline-date">
          ${exp.startDate}<br>${exp.isCurrentJob ? 'Present' : exp.endDate}
        </div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          ${index < resume.experience.length - 1 ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-content">
          <div class="job-title">${exp.jobTitle}</div>
          <div class="company">${exp.company} • ${exp.location}</div>
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
        <div class="timeline-date">
          ${edu.graduationDate}
        </div>
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          ${index < resume.education.length - 1 ? '<div class="timeline-line"></div>' : ''}
        </div>
        <div class="timeline-content">
          <div class="job-title">${edu.degree}</div>
          <div class="company">${edu.institution} • ${edu.location}</div>
          ${edu.gpa ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt;">GPA: ${edu.gpa}</div>` : ''}
        </div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-grid">
      ${resume.skills.technical.map(skill => `
        <div class="skill-box">${skill.name}</div>
      `).join('')}
      ${resume.skills.soft.slice(0, 6).map(skill => `
        <div class="skill-box">${skill.name}</div>
      `).join('')}
    </div>
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
</body>
</html>
  `;
}