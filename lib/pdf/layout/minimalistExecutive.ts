// lib/pdf/layouts/minimalistExecutive.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderMinimalistExecutive(resume: Resume, template: Template): string {
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
      font-family: Georgia, 'Times New Roman', serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.8;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40pt;
      padding-top: 20pt;
    }
    
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.normal};
      color: ${config.colors.text};
      margin-bottom: 12pt;
      letter-spacing: 3pt;
      text-transform: uppercase;
    }
    
    .contact-line {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      letter-spacing: 0.5pt;
    }
    
    .divider {
      width: 60pt;
      height: 1px;
      background-color: ${config.colors.text};
      margin: 30pt auto;
    }
    
    .section {
      margin-bottom: ${config.spacing.sectionGap + 10}pt;
    }
    
    .section-title {
      font-size: ${config.typography.sizes.heading - 1}pt;
      font-weight: ${config.typography.weights.normal};
      color: ${config.colors.text};
      text-transform: uppercase;
      letter-spacing: 2pt;
      margin-bottom: ${config.spacing.itemGap + 4}pt;
    }
    
    .job-item {
      margin-bottom: ${config.spacing.itemGap + 6}pt;
    }
    
    .job-header {
      margin-bottom: 8pt;
    }
    
    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      font-style: italic;
      color: ${config.colors.text};
    }
    
    .company-line {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      margin-top: 4pt;
      letter-spacing: 0.3pt;
    }
    
    .description {
      margin-top: 8pt;
      line-height: 1.8;
      text-align: justify;
    }
    
    .description ul {
      margin-left: 20pt;
      margin-top: 6pt;
    }
    
    .description li {
      margin-bottom: 4pt;
    }
    
    .skills-list {
      margin-top: 8pt;
      column-count: 2;
      column-gap: 30pt;
    }
    
    .skill-item {
      font-size: ${config.typography.sizes.small}pt;
      margin-bottom: 6pt;
      break-inside: avoid;
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
    <div class="contact-line">
      ${resume.contactInfo?.email || 'email@example.com'} • 
      ${resume.contactInfo?.phone || '(555) 123-4567'} • 
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
  </div>

  <div class="divider"></div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Profile</div>
    <p style="text-align: justify;">${resume.summary}</p>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-header">
          <div class="job-title">${exp.jobTitle}</div>
          <div class="company-line">
            ${exp.company} • ${exp.location} • ${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}
          </div>
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
        <div class="job-title">${edu.degree}</div>
        <div class="company-line">
          ${edu.institution} • ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}
        </div>
        ${edu.gpa ? `<div style="margin-top: 4pt; font-size: ${config.typography.sizes.small}pt;">GPA: ${edu.gpa}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills-list">
      ${resume.skills.technical.map(skill => `
        <div class="skill-item">• ${skill.name}</div>
      `).join('')}
      ${resume.skills.soft.map(skill => `
        <div class="skill-item">• ${skill.name}</div>
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