// lib/pdf/layouts/executiveLuxury.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderExecutiveLuxury(resume: Resume, template: Template): string {
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
      font-family: Garamond, 'Times New Roman', serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.7;
      color: ${config.colors.text};
      background: white;
      padding: ${config.spacing.margins.top}pt ${config.spacing.margins.right}pt ${config.spacing.margins.bottom}pt ${config.spacing.margins.left}pt;
    }

    .header {
      text-align: center;
      padding: 25pt 0;
      margin-bottom: ${config.spacing.sectionGap}pt;
      border-top: 3pt solid ${config.colors.primary};
      border-bottom: 3pt solid ${config.colors.primary};
    }

    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.secondary};
      margin-bottom: 10pt;
      letter-spacing: 4pt;
      text-transform: uppercase;
    }

    .contact-line {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      margin-top: 8pt;
    }

    .gold-divider {
      width: 80pt;
      height: 2pt;
      background: linear-gradient(to right, transparent, ${config.colors.primary}, transparent);
      margin: 15pt auto;
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
      letter-spacing: 2pt;
      border-bottom: 1pt solid ${config.colors.border};
      padding-bottom: 6pt;
    }

    .job-item {
      margin-bottom: ${config.spacing.itemGap + 2}pt;
      page-break-inside: avoid;
    }

    .job-title {
      font-size: ${config.typography.sizes.subheading}pt;
      font-weight: ${config.typography.weights.semibold};
      color: ${config.colors.secondary};
      font-style: italic;
    }

    .company-line {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      margin-top: 3pt;
      margin-bottom: 6pt;
    }

    .description {
      margin-top: 6pt;
      line-height: 1.7;
      text-align: justify;
    }

    .description ul {
      margin-left: 20pt;
      margin-top: 4pt;
    }

    .description li {
      margin-bottom: 3pt;
    }

    .skills-list {
      columns: 2;
      column-gap: 25pt;
    }

    .skill-item {
      font-size: ${config.typography.sizes.small}pt;
      margin-bottom: 5pt;
      break-inside: avoid;
      color: ${config.colors.text};
    }

    .skill-item::before {
      content: "▸ ";
      color: ${config.colors.primary};
      font-weight: bold;
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
    <div class="gold-divider"></div>
    <div class="contact-line">
      ${resume.contactInfo?.email || 'email@example.com'} •
      ${resume.contactInfo?.phone || '(555) 123-4567'} •
      ${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}
    </div>
  </div>

  ${hasSummary ? `
  <div class="section">
    <div class="section-title">Executive Summary</div>
    <p style="text-align: justify; line-height: 1.7;">${resume.summary}</p>
  </div>
  ` : ''}

  ${hasExperience ? `
  <div class="section">
    <div class="section-title">Professional Experience</div>
    ${resume.experience.map(exp => `
      <div class="job-item">
        <div class="job-title">${exp.jobTitle}</div>
        <div class="company-line">
          ${exp.company} • ${exp.location} • ${exp.startDate} – ${exp.isCurrentJob ? 'Present' : exp.endDate}
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
        ${edu.gpa ? `<div style="margin-top: 3pt; font-size: ${config.typography.sizes.small}pt;">GPA: ${edu.gpa}</div>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasSkills ? `
  <div class="section">
    <div class="section-title">Core Competencies</div>
    <div class="skills-list">
      ${resume.skills.technical.map(skill => `
        <div class="skill-item">${skill.name}</div>
      `).join('')}
      ${resume.skills.soft.map(skill => `
        <div class="skill-item">${skill.name}</div>
      `).join('')}
      ${resume.skills.tools.map(skill => `
        <div class="skill-item">${skill.name}</div>
      `).join('')}
    </div>
  </div>
  ` : ''}

  ${hasProjects ? `
  <div class="section">
    <div class="section-title">Key Projects</div>
    ${resume.projects!.map((project: any) => `
      <div class="job-item">
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
    <div class="section-title">Certifications</div>
    ${resume.certifications!.map((cert: any) => `
      <div class="job-item">
        <div class="job-title">${cert.name}</div>
        <div class="company-line">${cert.issuer}${cert.dateIssued ? ` • ${cert.dateIssued}` : ''}</div>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${hasAwards ? `
  <div class="section">
    <div class="section-title">Awards & Recognition</div>
    ${resume.awards!.map((award: any) => `
      <div class="job-item">
        <div class="job-title">${award.title}</div>
        <div class="company-line">${award.issuer}${award.date ? ` • ${award.date}` : ''}</div>
        ${award.description ? `<p style="margin-top: 4pt;">${award.description}</p>` : ''}
      </div>
    `).join('')}
  </div>
  ` : ''}
</body>
</html>
  `;
}
