// lib/pdf/layouts/infographicModern.ts

import { Resume } from "@/lib/types/resume";
import { Template } from "@/lib/types/template";

export function renderInfographicModern(resume: Resume, template: Template): string {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0);
  const hasProjects = resume.projects && resume.projects.length > 0;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Nunito', sans-serif;
      font-size: ${config.typography.sizes.body}pt;
      line-height: 1.6;
      color: ${config.colors.text};
      background: white;
    }
    .container { display: flex; min-height: 100vh; }
    .sidebar {
      width: 35%;
      background: linear-gradient(180deg, ${config.colors.primary}08 0%, ${config.colors.secondary}08 100%);
      padding: ${config.spacing.margins.top}pt 25pt;
      border-right: 4pt solid ${config.colors.primary};
    }
    .main-content { width: 65%; padding: ${config.spacing.margins.top}pt 35pt; }
    .profile-section {
      text-align: center;
      margin-bottom: ${config.spacing.sectionGap}pt;
      padding-bottom: ${config.spacing.sectionGap}pt;
      border-bottom: 2pt solid ${config.colors.primary};
    }
    .name {
      font-size: ${config.typography.sizes.name}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 6pt;
    }
    .title {
      font-size: ${config.typography.sizes.subheading}pt;
      color: ${config.colors.textLight};
      margin-bottom: 12pt;
    }
    .contact-item {
      font-size: ${config.typography.sizes.small}pt;
      color: ${config.colors.text};
      margin-bottom: 5pt;
      text-align: center;
    }
    .sidebar-section { margin-bottom: ${config.spacing.sectionGap}pt; }
    .sidebar-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: 10pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
    }
    .skill-bar-container { margin-bottom: 10pt; }
    .skill-name {
      font-size: ${config.typography.sizes.small}pt;
      margin-bottom: 4pt;
      font-weight: ${config.typography.weights.medium};
    }
    .skill-bar {
      width: 100%;
      height: 8pt;
      background: ${config.colors.border};
      border-radius: 4pt;
      overflow: hidden;
    }
    .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
      border-radius: 4pt;
    }
    .section { margin-bottom: ${config.spacing.sectionGap}pt; }
    .section-title {
      font-size: ${config.typography.sizes.heading}pt;
      font-weight: ${config.typography.weights.bold};
      color: ${config.colors.primary};
      margin-bottom: ${config.spacing.itemGap}pt;
      text-transform: uppercase;
      letter-spacing: 0.5pt;
      padding-left: 12pt;
      border-left: 4pt solid ${config.colors.primary};
    }
    .job-item { margin-bottom: ${config.spacing.itemGap}pt; }
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
    .description { margin-top: 4pt; line-height: 1.6; }
    .description ul { margin-left: 16pt; }
    .description li { margin-bottom: 2pt; }
    @page { size: letter; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="sidebar">
      <div class="profile-section">
        <div class="name">${hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}</div>
        <div class="title">Professional</div>
        <div style="margin-top: 10pt;">
          <div class="contact-item">${resume.contactInfo?.email || 'email@example.com'}</div>
          <div class="contact-item">${resume.contactInfo?.phone || '(555) 123-4567'}</div>
          <div class="contact-item">${resume.contactInfo?.city || 'City'}, ${resume.contactInfo?.country || 'Country'}</div>
        </div>
      </div>
      ${hasSkills ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Skills</div>
        ${resume.skills.technical.slice(0, 6).map(skill => `
          <div class="skill-bar-container">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
              <div class="skill-fill" style="width: ${skill.level === 'Expert' ? '95' : skill.level === 'Advanced' ? '80' : skill.level === 'Intermediate' ? '65' : '50'}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
      ${resume.skills.languages.length > 0 ? `
      <div class="sidebar-section">
        <div class="sidebar-title">Languages</div>
        ${resume.skills.languages.map(skill => `
          <div class="skill-bar-container">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-bar">
              <div class="skill-fill" style="width: ${skill.level === 'Native' || skill.level === 'Fluent' ? '95' : skill.level === 'Professional' ? '80' : skill.level === 'Intermediate' ? '65' : '50'}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
      ` : ''}
      ` : ''}
    </div>
    <div class="main-content">
      ${hasSummary ? `
      <div class="section">
        <div class="section-title">Profile</div>
        <p>${resume.summary}</p>
      </div>
      ` : ''}
      ${hasExperience ? `
      <div class="section">
        <div class="section-title">Experience</div>
        ${resume.experience.map(exp => `
          <div class="job-item">
            <div class="job-title">${exp.jobTitle}</div>
            <div class="company-date">${exp.company} • ${exp.location} • ${exp.startDate} - ${exp.isCurrentJob ? 'Present' : exp.endDate}</div>
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
            <div class="company-date">${edu.institution} • ${edu.location} • ${edu.isCurrentlyStudying ? 'Expected ' : ''}${edu.graduationDate}</div>
            ${edu.gpa ? `<div style="margin-top: 2pt;">GPA: ${edu.gpa}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ` : ''}
      ${hasProjects ? `
      <div class="section">
        <div class="section-title">Projects</div>
        ${resume.projects!.map((project: any) => `
          <div class="job-item">
            <div class="job-title">${project.name}</div>
            ${project.date ? `<div class="company-date">${project.date}</div>` : ''}
            ${project.description ? `<p style="margin-top: 4pt;">${project.description}</p>` : ''}
            ${project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? `<p style="margin-top: 4pt; font-size: ${config.typography.sizes.small}pt;">Tech: ${project.technologies.join(', ')}</p>` : ''}
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
