// lib/pdf/layouts/boldCreativeHeader.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderBoldCreativeHeader(resume: Resume, template: Template): string {
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
      font-family: 'Montserrat', 'Roboto', sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.5;
      color: ${config.colors.text};
      background: white;
    }
    
    .hero-header {
      background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
      color: white;
      padding: 40pt 50pt;
      margin-bottom: 0;
    }
    
    .hero-name {
      font-size: ${config.typography.sizes.name + 4}pt;
      font-weight: ${config.typography.weights.bold};
      margin-bottom: 8pt;
      text-transform: uppercase;
      letter-spacing: 2pt;
    }
    
    .hero-title {
      font-size: ${config.typography.sizes.heading + 2}pt;
      margin-bottom: 12pt;
      opacity: 0.95;
      font-weight: ${config.typography.weights.medium};
    }
    
    .hero-contact {
      font-size: ${config.typography.sizes.small}pt;
      opacity: 0.9;
      line-height: 1.8;
    }
    
    .content {
      padding: 0 50pt 40pt 50pt;
    }
    
    .section {
      margin-bottom: ${config.spacing.sectionGap + 4}pt;
      page-break-inside: avoid;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: ${config.spacing.itemGap}pt;
    }
    
    .section-bar {
      width: 4pt;
      height: 20pt;
      background-color: ${config.colors.primary};
      margin-right: 10pt;
    }
    
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      text-transform: uppercase;
      letter-spacing: 1pt;
    }
    
    .job-item {
      margin-bottom: ${config.spacing.itemGap}pt;
      padding-left: 14pt;
      border-left: 2pt solid ${config.colors.primary}20;
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 4pt;
    }
    
    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.primary};
    }
    
    .company {
      font-size: ${config.typography.sizes.body}pt;
      color: ${config.colors.text};
      margin-top: 2pt;
    }
    
    .date-location {
      text-align: right;
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      white-space: nowrap;
    }
    
    .description {
      margin-top: 6pt;
      line-height: 1.5;
    }
    
    .description ul {
      margin-left: 16pt;
    }
    
    .description li {
      margin-bottom: 3pt;
    }
    
    .skills-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 8pt;
      margin-top: 8pt;
    }
    
    .skill-badge {
      display: inline-block;
      font-size: ${config.typography.sizes.small}pt;
      padding: 6pt 12pt;
      background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
      color: white;
      border-radius: 20pt;
      font-weight: ${config.typography.weights.medium};
    }
    
    @page {
      size: letter;
      margin: 0;
    }
  </style>
</head>
<body>
  <!-- Hero Header -->
  <div class="hero-header">
    <div class="hero-name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="hero-title">Professional Title</div>
    <div class="hero-contact">
      ${resume.contactInfo?.email || 'email@example.com'} • 
      ${resume.contactInfo?.phone || '(555) 123-4567'} • 
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
  </div>

  <!-- Content -->
  <div class="content">
    ${hasSummary ? `
    <div class="section">
      <div class="section-header">
        <div class="section-bar"></div>
        <div class="section-title">About Me</div>
      </div>
      <p style="padding-left: 14pt;">${resume.summary}</p>
    </div>
    ` : ''}

    ${hasExperience ? `
    <div class="section">
      <div class="section-header">
        <div class="section-bar"></div>
        <div class="section-title">Experience</div>
      </div>
      ${resume.experience.map(exp => `
        <div class="job-item">
          <div class="job-header">
            <div>
              <div class="job-title">${exp.jobTitle}</div>
              <div class="company">${exp.company}</div>
            </div>
            <div class="date-location">
              <div>${exp.location}</div>
              <div>${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
            </div>
          </div>
          ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${hasEducation ? `
    <div class="section">
      <div class="section-header">
        <div class="section-bar"></div>
        <div class="section-title">Education</div>
      </div>
      ${resume.education.map(edu => `
        <div class="job-item">
          <div class="job-header">
            <div>
              <div class="job-title">${edu.degree}</div>
              <div class="company">${edu.institution}</div>
            </div>
            <div class="date-location">
              <div>${edu.location}</div>
              <div>${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${hasSkills ? `
    <div class="section">
      <div class="section-header">
        <div class="section-bar"></div>
        <div class="section-title">Skills</div>
      </div>
      <div class="skills-flex">
        ${resume.skills.technical.map(skill => `
          <span class="skill-badge">${skill.name}</span>
        `).join('')}
        ${resume.skills.soft.map(skill => `
          <span class="skill-badge">${skill.name}</span>
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

    
  </div>
</body>
</html>
  `;
}