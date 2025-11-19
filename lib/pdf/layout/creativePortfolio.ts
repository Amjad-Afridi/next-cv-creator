// lib/pdf/layouts/creativePortfolio.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderCreativePortfolio(resume: Resume, template: Template): string {
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
      font-family: 'Poppins', -apple-system, sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.6;
      color: ${config.colors.text};
      background: white;
    }

    .creative-header {
      background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
      color: white;
      padding: 40pt 50pt;
      position: relative;
      overflow: hidden;
    }

    .creative-header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 300pt;
      height: 300pt;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      margin-bottom: 8pt;
      position: relative;
      z-index: 1;
    }

    .tagline {
      font-size: ${config.typography.sizes.heading}pt;
      margin-bottom: 12pt;
      opacity: 0.95;
      position: relative;
      z-index: 1;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 15pt;
      font-size: ${config.typography.sizes.small}pt;
      opacity: 0.9;
      position: relative;
      z-index: 1;
    }

    .content {
      padding: 35pt 50pt;
    }

    .section {
      margin-bottom: ${config.spacing.sectionGap}pt;
    }

    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: ${config.spacing.itemGap}pt;
      gap: 10pt;
    }

    .color-block {
      width: 4pt;
      height: 25pt;
      background: linear-gradient(180deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
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
      border-left: 2pt solid ${config.colors.primary}15;
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
      color: ${config.colors.text};
    }

    .company {
      font-size: ${config.typography.sizes.body}pt;
      color: ${config.colors.primary};
      margin-top: 2pt;
    }

    .date-location {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.textLight};
      text-align: right;
    }

    .description {
      margin-top: 6pt;
      line-height: 1.6;
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
      gap: 10pt;
      margin-top: 10pt;
    }

    .skill-badge {
      font-size: ${config.typography.sizes.small}pt;
      padding: 6pt 12pt;
      background: linear-gradient(135deg, ${config.colors.primary}15 0%, ${config.colors.secondary}15 100%);
      border: 1pt solid ${config.colors.primary};
      border-radius: 20pt;
      text-align: center;
      font-weight: ${config.typography.weights.medium};
      color: ${config.colors.primary};
    }

    @page {
      size: letter;
      margin: 0;
    }
  </style>
</head>
<body>
  <!-- Creative Header -->
  <div class="creative-header">
    <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
    <div class="tagline">Creative Professional</div>
    <div class="contact-row">
      <span>${resume.contactInfo?.email || 'email@example.com'}</span>
      <span>${resume.contactInfo?.phone || '(555) 123-4567'}</span>
      <span>${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</span>
    </div>
  </div>

  <!-- Content -->
  <div class="content">
    ${hasSummary ? `
    <div class="section">
      <div class="section-header">
        <div class="color-block"></div>
        <div class="section-title">About Me</div>
      </div>
      <p>${resume.summary}</p>
    </div>
    ` : ''}

    ${hasExperience ? `
    <div class="section">
      <div class="section-header">
        <div class="color-block"></div>
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

    ${hasSkills ? `
    <div class="section">
      <div class="section-header">
        <div class="color-block"></div>
        <div class="section-title">Skills</div>
      </div>
      <div class="skills-grid">
        ${resume.skills.technical.map(skill => `
          <div class="skill-badge">${skill.name}</div>
        `).join('')}
        ${resume.skills.soft.map(skill => `
          <div class="skill-badge">${skill.name}</div>
        `).join('')}
        ${resume.skills.tools.map(skill => `
          <div class="skill-badge">${skill.name}</div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    ${hasProjects ? `
    <div class="section">
      <div class="section-header">
        <div class="color-block"></div>
        <div class="section-title">Portfolio Projects</div>
      </div>
      ${resume.projects!.map((project: any) => `
        <div class="job-item">
          <div class="job-title">${project.name}</div>
          ${project.date ? `<div style="font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; margin-top: 2pt;">${project.date}</div>` : ''}
          ${project.description ? `<p style="margin-top: 4pt;">${project.description}</p>` : ''}
          ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<p style="margin-top: 4pt; font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight};">Tech: ${project.technologies.join(', ')}</p>` : ''}
          ${project.link ? `<p style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt; color: ${config.colors.primary};">${project.link}</p>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${hasEducation ? `
    <div class="section">
      <div class="section-header">
        <div class="color-block"></div>
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
          ${edu.gpa ? `<div style="margin-top: 2pt; font-size: ${config.typography.sizes.small}pt;">GPA: ${edu.gpa}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${hasAwards ? `
    <div class="section">
      <div class="section-header">
        <div class="color-block"></div>
        <div class="section-title">Awards</div>
      </div>
      ${resume.awards!.map((award: any) => `
        <div class="job-item">
          <div class="job-title">${award.title}</div>
          <div style="font-size: ${config.typography.sizes.small}pt; color: ${config.colors.textLight}; margin-top: 2pt;">${award.issuer}${award.date ? ` • ${award.date}` : ''}</div>
          ${award.description ? `<p style="margin-top: 4pt;">${award.description}</p>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}
  </div>
</body>
</html>
  `;
}
