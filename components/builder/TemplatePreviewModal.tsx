// components/builder/TemplatePreviewModal.tsx

"use client";

import { Template } from "@/lib/types/template";
import { Resume } from "@/lib/types/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface TemplatePreviewModalProps {
  template: Template | null;
  resume: Resume;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
  isSelected: boolean;
}

export default function TemplatePreviewModal({
  template,
  resume,
  isOpen,
  onClose,
}: TemplatePreviewModalProps) {
  if (!template) return null;

  // Get base layout ID
  const getBaseLayoutId = (templateId: string): string => {
    const baseLayouts = [
      'classic-ats',
      'modern-two-column',
      'bold-creative-header',
      'minimalist-executive',
      'timeline-modern',
      'compact-professional',
      'tech-startup-clean',
    ];

    if (baseLayouts.includes(templateId)) {
      return templateId;
    }

    for (const baseLayout of baseLayouts) {
      if (templateId.startsWith(baseLayout)) {
        return baseLayout;
      }
    }

    return 'classic-ats';
  };

  const layoutId = getBaseLayoutId(template.id);

  // Render preview based on layout
  const renderPreview = () => {
    switch (layoutId) {
      case 'classic-ats':
        return <ClassicATSPreview resume={resume} template={template} />;
      case 'modern-two-column':
        return <ModernTwoColumnPreview resume={resume} template={template} />;
      case 'bold-creative-header':
        return <BoldCreativeHeaderPreview resume={resume} template={template} />;
      case 'minimalist-executive':
        return <MinimalistExecutivePreview resume={resume} template={template} />;
      case 'timeline-modern':
        return <TimelineModernPreview resume={resume} template={template} />;
      case 'compact-professional':
        return <CompactProfessionalPreview resume={resume} template={template} />;
      case 'tech-startup-clean':
        return <TechStartupCleanPreview resume={resume} template={template} />;
      default:
        return <ClassicATSPreview resume={resume} template={template} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[95vh] p-0 gap-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="p-4 md:p-6 border-b bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <DialogTitle className="text-lg md:text-xl">{template.name}</DialogTitle>
            {template.isPremium && (
              <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-600 text-left">{template.description}</p>
        </DialogHeader>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg w-full">
              {renderPreview()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Preview Components for Each Layout

// 1. Classic ATS Preview
function ClassicATSPreview({ resume, template }: { resume: Resume; template: Template }) {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0 || resume.skills.soft.length > 0);

  return (
    <div className="p-8 md:p-12" style={{ fontSize: '10px', lineHeight: '1.4' }}>
      {/* Header */}
      <div
        className="text-center pb-4 mb-4"
        style={{
          borderBottom: `2px solid ${config.colors.primary}`,
        }}
      >
        <h1
          className="font-bold mb-2 uppercase tracking-wider"
          style={{
            fontSize: `${config.typography.sizes.name}px`,
            color: config.colors.primary,
          }}
        >
          {hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}
        </h1>
        <p style={{ fontSize: `${config.typography.sizes.small}px`, color: config.colors.textLight }}>
          {resume.contactInfo?.email || 'email@example.com'} • {resume.contactInfo?.phone || '(555) 123-4567'}
          <br />
          {resume.contactInfo?.city || 'City'}, {resume.contactInfo?.country || 'Country'}
        </p>
      </div>

      {/* Summary */}
      {hasSummary && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 pb-1"
            style={{
              fontSize: `${config.typography.sizes.heading}px`,
              color: config.colors.primary,
              borderBottom: `1px solid ${config.colors.border}`,
            }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p style={{ fontSize: `${config.typography.sizes.body}px` }}>{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {hasExperience && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-3 pb-1"
            style={{
              fontSize: `${config.typography.sizes.heading}px`,
              color: config.colors.primary,
              borderBottom: `1px solid ${config.colors.border}`,
            }}
          >
            WORK EXPERIENCE
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3
                    className="font-semibold"
                    style={{ fontSize: `${config.typography.sizes.subheading}px` }}
                  >
                    {exp.jobTitle}
                  </h3>
                  <p style={{ fontSize: `${config.typography.sizes.body}px`, color: config.colors.textLight }}>
                    {exp.company}
                  </p>
                </div>
                <div className="text-right text-xs" style={{ color: config.colors.textLight }}>
                  <p>{exp.location}</p>
                  <p>{exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}</p>
                </div>
              </div>
              {exp.description && (
                <div
                  className="prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:ml-4"
                  style={{ fontSize: `${config.typography.sizes.body}px` }}
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {hasEducation && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-3 pb-1"
            style={{
              fontSize: `${config.typography.sizes.heading}px`,
              color: config.colors.primary,
              borderBottom: `1px solid ${config.colors.border}`,
            }}
          >
            EDUCATION
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ fontSize: `${config.typography.sizes.subheading}px` }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: `${config.typography.sizes.body}px`, color: config.colors.textLight }}>
                    {edu.institution}
                  </p>
                </div>
                <p className="text-xs" style={{ color: config.colors.textLight }}>
                  {edu.graduationDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div>
          <h2
            className="font-bold uppercase tracking-wide mb-2 pb-1"
            style={{
              fontSize: `${config.typography.sizes.heading}px`,
              color: config.colors.primary,
              borderBottom: `1px solid ${config.colors.border}`,
            }}
          >
            SKILLS
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {resume.skills.technical.map((skill, index) => (
              <div
                key={index}
                className="text-xs px-2 py-1"
                style={{
                  backgroundColor: `${config.colors.primary}10`,
                  borderLeft: `3px solid ${config.colors.primary}`,
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

            {resume.projects && resume.projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            PROJECTS
          </h2>
          {resume.projects.map((project: any) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-xs">{project.name}</h3>
              {project.description && <p className="text-xs mt-1">{project.description}</p>}
              {project.technologies && (
                <p className="text-xs mt-1" style={{ color: config.colors.textLight }}>
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CERTIFICATIONS
          </h2>
          {resume.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-xs">{cert.name}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {cert.issuer} • {cert.dateIssued}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {resume.awards && resume.awards.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            AWARDS & HONORS
          </h2>
          {resume.awards.map((award: any) => (
            <div key={award.id} className="mb-2">
              <h3 className="font-semibold text-xs">{award.title}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {award.issuer} • {award.date}
              </p>
              {award.description && <p className="text-xs mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {resume.volunteer && resume.volunteer.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          {resume.volunteer.map((vol: any) => (
            <div key={vol.id} className="mb-2">
              <h3 className="font-semibold text-xs">{vol.role}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {vol.organization} • {vol.startDate} - {vol.isCurrentRole ? 'Present' : vol.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 2. Modern Two-Column Preview
function ModernTwoColumnPreview({ resume, template }: { resume: Resume; template: Template }) {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasEducation = resume.education && resume.education.length > 0;
  const hasSkills = resume.skills && (resume.skills.technical.length > 0);

  return (
    <div className="flex min-h-[600px]" style={{ fontSize: '9px' }}>
      {/* Sidebar */}
      <div
        className="w-[30%] p-6"
        style={{
          backgroundColor: `${config.colors.primary}08`,
          borderRight: `2px solid ${config.colors.primary}`,
        }}
      >
        <div className="mb-4">
          <h3
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CONTACT
          </h3>
          <div className="text-xs space-y-1" style={{ color: config.colors.text }}>
            <p className="break-words">{resume.contactInfo?.email || 'email@example.com'}</p>
            <p>{resume.contactInfo?.phone || '(555) 123-4567'}</p>
            <p>{resume.contactInfo?.city || 'City'}</p>
          </div>
        </div>

        {hasSkills && (
          <div>
            <h3
              className="font-bold uppercase tracking-wide mb-2 text-xs"
              style={{ color: config.colors.primary }}
            >
              SKILLS
            </h3>
            <div className="flex flex-wrap gap-1">
              {resume.skills.technical.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: config.colors.primary, fontSize: '7px' }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[70%] p-6">
        <div className="mb-4">
          <h1
            className="font-bold mb-1"
            style={{ fontSize: `${config.typography.sizes.name}px`, color: config.colors.primary }}
          >
            {hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}
          </h1>
          <p className="text-xs" style={{ color: config.colors.textLight }}>
            Professional Title
          </p>
        </div>

        {hasSummary && (
          <div className="mb-4">
            <h2
              className="font-bold uppercase tracking-wide mb-2 text-xs"
              style={{ color: config.colors.primary }}
            >
              ABOUT ME
            </h2>
            <p className="text-xs">{resume.summary}</p>
          </div>
        )}

        {hasExperience && (
          <div className="mb-4">
            <h2
              className="font-bold uppercase tracking-wide mb-2 text-xs"
              style={{ color: config.colors.primary }}
            >
              EXPERIENCE
            </h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <h3 className="font-semibold text-xs">{exp.jobTitle}</h3>
                <p className="text-xs" style={{ color: config.colors.textLight }}>
                  {exp.company} | {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                </p>
                {exp.description && (
                  <div
                    className="text-xs mt-1 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:ml-3 [&_li]:text-xs"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {hasEducation && (
          <div>
            <h2
              className="font-bold uppercase tracking-wide mb-2 text-xs"
              style={{ color: config.colors.primary }}
            >
              EDUCATION
            </h2>
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-xs">{edu.degree}</h3>
                <p className="text-xs" style={{ color: config.colors.textLight }}>
                  {edu.institution} | {edu.graduationDate}
                </p>
              </div>
            ))}
          </div>
        )}

              {resume.projects && resume.projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            PROJECTS
          </h2>
          {resume.projects.map((project: any) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-xs">{project.name}</h3>
              {project.description && <p className="text-xs mt-1">{project.description}</p>}
              {project.technologies && (
                <p className="text-xs mt-1" style={{ color: config.colors.textLight }}>
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CERTIFICATIONS
          </h2>
          {resume.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-xs">{cert.name}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {cert.issuer} • {cert.dateIssued}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {resume.awards && resume.awards.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            AWARDS & HONORS
          </h2>
          {resume.awards.map((award: any) => (
            <div key={award.id} className="mb-2">
              <h3 className="font-semibold text-xs">{award.title}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {award.issuer} • {award.date}
              </p>
              {award.description && <p className="text-xs mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {resume.volunteer && resume.volunteer.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          {resume.volunteer.map((vol: any) => (
            <div key={vol.id} className="mb-2">
              <h3 className="font-semibold text-xs">{vol.role}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {vol.organization} • {vol.startDate} - {vol.isCurrentRole ? 'Present' : vol.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

// 3. Bold Creative Header Preview
function BoldCreativeHeaderPreview({ resume, template }: { resume: Resume; template: Template }) {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasSkills = resume.skills && resume.skills.technical.length > 0;

  return (
    <div style={{ fontSize: '9px' }}>
      {/* Hero Header */}
      <div
        className="p-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%)`,
        }}
      >
        <h1
          className="font-bold uppercase tracking-widest mb-2"
          style={{ fontSize: `${config.typography.sizes.name + 2}px` }}
        >
          {hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}
        </h1>
        <p className="text-sm mb-3 opacity-95">Professional Title</p>
        <p className="text-xs opacity-90">
          {resume.contactInfo?.email || 'email@example.com'} • {resume.contactInfo?.phone || '(555) 123-4567'}
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {hasSummary && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div
                className="w-1 h-5 mr-2"
                style={{ backgroundColor: config.colors.primary }}
              />
              <h2
                className="font-bold uppercase tracking-wide text-xs"
                style={{ color: config.colors.primary }}
              >
                About Me
              </h2>
            </div>
            <p className="text-xs pl-3">{resume.summary}</p>
          </div>
        )}

        {hasExperience && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div
                className="w-1 h-5 mr-2"
                style={{ backgroundColor: config.colors.primary }}
              />
              <h2
                className="font-bold uppercase tracking-wide text-xs"
                style={{ color: config.colors.primary }}
              >
                Experience
              </h2>
            </div>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mb-3 pl-3" style={{ borderLeft: `2px solid ${config.colors.primary}20` }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xs" style={{ color: config.colors.primary }}>
                      {exp.jobTitle}
                    </h3>
                    <p className="text-xs">{exp.company}</p>
                  </div>
                  <p className="text-xs" style={{ color: config.colors.textLight }}>
                    {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasSkills && (
          <div>
            <div className="flex items-center mb-2">
              <div
                className="w-1 h-5 mr-2"
                style={{ backgroundColor: config.colors.primary }}
              />
              <h2
                className="font-bold uppercase tracking-wide text-xs"
                style={{ color: config.colors.primary }}
              >
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pl-3">
              {resume.skills.technical.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-white text-xs"
                  style={{
                    background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%)`,
                    fontSize: '7px',
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

              {resume.projects && resume.projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            PROJECTS
          </h2>
          {resume.projects.map((project: any) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-xs">{project.name}</h3>
              {project.description && <p className="text-xs mt-1">{project.description}</p>}
              {project.technologies && (
                <p className="text-xs mt-1" style={{ color: config.colors.textLight }}>
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CERTIFICATIONS
          </h2>
          {resume.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-xs">{cert.name}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {cert.issuer} • {cert.dateIssued}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {resume.awards && resume.awards.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            AWARDS & HONORS
          </h2>
          {resume.awards.map((award: any) => (
            <div key={award.id} className="mb-2">
              <h3 className="font-semibold text-xs">{award.title}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {award.issuer} • {award.date}
              </p>
              {award.description && <p className="text-xs mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {resume.volunteer && resume.volunteer.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          {resume.volunteer.map((vol: any) => (
            <div key={vol.id} className="mb-2">
              <h3 className="font-semibold text-xs">{vol.role}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {vol.organization} • {vol.startDate} - {vol.isCurrentRole ? 'Present' : vol.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

// 4. Minimalist Executive Preview
function MinimalistExecutivePreview({ resume, template }: { resume: Resume; template: Template }) {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;

  return (
    <div className="p-12" style={{ fontSize: '10px', lineHeight: '1.8' }}>
      {/* Header */}
      <div className="text-center mb-8 pt-4">
        <h1
          className="uppercase tracking-widest mb-3"
          style={{
            fontSize: `${config.typography.sizes.name}px`,
            color: config.colors.text,
            fontWeight: 'normal',
            letterSpacing: '3px',
          }}
        >
          {hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}
        </h1>
        <p className="text-xs tracking-wider" style={{ color: config.colors.textLight }}>
          {resume.contactInfo?.email || 'email@example.com'} • {resume.contactInfo?.phone || '(555) 123-4567'}
        </p>
      </div>

      {/* Divider */}
      <div
        className="w-16 h-px mx-auto mb-8"
        style={{ backgroundColor: config.colors.text }}
      />

      {/* Summary */}
      {hasSummary && (
        <div className="mb-8">
          <h2
            className="uppercase tracking-widest mb-3 text-xs"
            style={{ color: config.colors.text, letterSpacing: '2px' }}
          >
            Profile
          </h2>
          <p className="text-xs leading-relaxed text-justify">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {hasExperience && (
        <div>
          <h2
            className="uppercase tracking-widest mb-4 text-xs"
            style={{ color: config.colors.text, letterSpacing: '2px' }}
          >
            Experience
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <h3 className="font-semibold italic text-xs mb-1">{exp.jobTitle}</h3>
              <p className="text-xs tracking-wide" style={{ color: config.colors.textLight }}>
                {exp.company} • {exp.location} • {exp.startDate} – {exp.isCurrentJob ? 'Present' : exp.endDate}
              </p>
              {exp.description && (
                <div
                  className="text-xs mt-2 leading-relaxed text-justify prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:ml-4"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              )}
            </div>
          ))}
        </div>
      )}

            {resume.projects && resume.projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            PROJECTS
          </h2>
          {resume.projects.map((project: any) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-xs">{project.name}</h3>
              {project.description && <p className="text-xs mt-1">{project.description}</p>}
              {project.technologies && (
                <p className="text-xs mt-1" style={{ color: config.colors.textLight }}>
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CERTIFICATIONS
          </h2>
          {resume.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-xs">{cert.name}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {cert.issuer} • {cert.dateIssued}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {resume.awards && resume.awards.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            AWARDS & HONORS
          </h2>
          {resume.awards.map((award: any) => (
            <div key={award.id} className="mb-2">
              <h3 className="font-semibold text-xs">{award.title}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {award.issuer} • {award.date}
              </p>
              {award.description && <p className="text-xs mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {resume.volunteer && resume.volunteer.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          {resume.volunteer.map((vol: any) => (
            <div key={vol.id} className="mb-2">
              <h3 className="font-semibold text-xs">{vol.role}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {vol.organization} • {vol.startDate} - {vol.isCurrentRole ? 'Present' : vol.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 5. Timeline Modern Preview
function TimelineModernPreview({ resume, template }: { resume: Resume; template: Template }) {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;

  return (
    <div className="p-8" style={{ fontSize: '9px' }}>
      {/* Header */}
      <div className="mb-4">
        <h1
          className="font-bold mb-1"
          style={{ fontSize: `${config.typography.sizes.name}px`, color: config.colors.primary }}
        >
          {hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}
        </h1>
        <p className="text-xs" style={{ color: config.colors.textLight }}>
          {resume.contactInfo?.email || 'email@example.com'} • {resume.contactInfo?.phone || '(555) 123-4567'}
        </p>
      </div>

      {hasSummary && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            About
          </h2>
          <p className="text-xs">{resume.summary}</p>
        </div>
      )}

      {hasExperience && (
        <div>
          <h2
            className="font-bold uppercase tracking-wide mb-3 text-xs"
            style={{ color: config.colors.primary }}
          >
            Experience
          </h2>
          {resume.experience.map((exp, index) => (
            <div key={exp.id} className="flex mb-3">
              <div className="w-24 text-right pr-4 text-xs flex-shrink-0" style={{ color: config.colors.textLight }}>
                {exp.startDate}
                <br />
                {exp.isCurrentJob ? 'Present' : exp.endDate}
              </div>
              <div className="relative pl-6 flex-shrink-0" style={{ width: '30px' }}>
                <div
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: config.colors.primary,
                    left: '10px',
                    top: '4px',
                  }}
                />
                {index < resume.experience.length - 1 && (
                  <div
                    className="absolute w-0.5"
                    style={{
                      backgroundColor: `${config.colors.primary}30`,
                      left: '14px',
                      top: '14px',
                      bottom: '-12px',
                    }}
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xs">{exp.jobTitle}</h3>
                <p className="text-xs" style={{ color: config.colors.textLight }}>
                  {exp.company} • {exp.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

            {resume.projects && resume.projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            PROJECTS
          </h2>
          {resume.projects.map((project: any) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-xs">{project.name}</h3>
              {project.description && <p className="text-xs mt-1">{project.description}</p>}
              {project.technologies && (
                <p className="text-xs mt-1" style={{ color: config.colors.textLight }}>
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CERTIFICATIONS
          </h2>
          {resume.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-xs">{cert.name}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {cert.issuer} • {cert.dateIssued}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {resume.awards && resume.awards.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            AWARDS & HONORS
          </h2>
          {resume.awards.map((award: any) => (
            <div key={award.id} className="mb-2">
              <h3 className="font-semibold text-xs">{award.title}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {award.issuer} • {award.date}
              </p>
              {award.description && <p className="text-xs mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {resume.volunteer && resume.volunteer.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          {resume.volunteer.map((vol: any) => (
            <div key={vol.id} className="mb-2">
              <h3 className="font-semibold text-xs">{vol.role}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {vol.organization} • {vol.startDate} - {vol.isCurrentRole ? 'Present' : vol.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 6. Compact Professional Preview
function CompactProfessionalPreview({ resume, template }: { resume: Resume; template: Template }) {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;

  return (
    <div className="p-6" style={{ fontSize: '9px', lineHeight: '1.3' }}>
      {/* Header */}
      <div className="text-center pb-2 mb-3" style={{ borderBottom: `1px solid ${config.colors.border}` }}>
        <h1
          className="font-bold mb-1"
          style={{ fontSize: `${config.typography.sizes.name - 2}px`, color: config.colors.primary }}
        >
          {hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}
        </h1>
        <p className="text-xs" style={{ color: config.colors.textLight }}>
          {resume.contactInfo?.email || 'email@example.com'} | {resume.contactInfo?.phone || '(555) 123-4567'}
        </p>
      </div>

      {hasSummary && (
        <div className="mb-3">
          <h2
            className="font-bold uppercase text-xs mb-1 pb-0.5"
            style={{
              color: config.colors.primary,
              borderBottom: `1px solid ${config.colors.border}`,
            }}
          >
            Summary
          </h2>
          <p className="text-xs">{resume.summary}</p>
        </div>
      )}

      {hasExperience && (
        <div>
          <h2
            className="font-bold uppercase text-xs mb-2 pb-0.5"
            style={{
              color: config.colors.primary,
              borderBottom: `1px solid ${config.colors.border}`,
            }}
          >
            Experience
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xs">{exp.jobTitle}</h3>
                  <p className="text-xs" style={{ color: config.colors.textLight }}>
                    {exp.company}
                  </p>
                </div>
                <p className="text-xs text-right" style={{ color: config.colors.textLight }}>
                  {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
            {resume.projects && resume.projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            PROJECTS
          </h2>
          {resume.projects.map((project: any) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-xs">{project.name}</h3>
              {project.description && <p className="text-xs mt-1">{project.description}</p>}
              {project.technologies && (
                <p className="text-xs mt-1" style={{ color: config.colors.textLight }}>
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CERTIFICATIONS
          </h2>
          {resume.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-xs">{cert.name}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {cert.issuer} • {cert.dateIssued}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {resume.awards && resume.awards.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            AWARDS & HONORS
          </h2>
          {resume.awards.map((award: any) => (
            <div key={award.id} className="mb-2">
              <h3 className="font-semibold text-xs">{award.title}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {award.issuer} • {award.date}
              </p>
              {award.description && <p className="text-xs mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {resume.volunteer && resume.volunteer.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          {resume.volunteer.map((vol: any) => (
            <div key={vol.id} className="mb-2">
              <h3 className="font-semibold text-xs">{vol.role}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {vol.organization} • {vol.startDate} - {vol.isCurrentRole ? 'Present' : vol.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 7. Tech/Startup Clean Preview
function TechStartupCleanPreview({ resume, template }: { resume: Resume; template: Template }) {
  const config = template.config;
  const hasContactInfo = resume.contactInfo?.firstName && resume.contactInfo?.lastName;
  const hasSummary = resume.summary && resume.summary.trim().length > 0;
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasSkills = resume.skills && resume.skills.technical.length > 0;

  return (
    <div className="p-8" style={{ fontSize: '9px' }}>
      {/* Header */}
      <div className="mb-4">
        <h1
          className="font-bold mb-1"
          style={{ fontSize: `${config.typography.sizes.name}px`, color: config.colors.text }}
        >
          {hasContactInfo ? `${resume.contactInfo.firstName} ${resume.contactInfo.lastName}` : 'YOUR NAME'}
        </h1>
        <p className="text-xs mb-2" style={{ color: config.colors.textLight }}>
          Software Developer
        </p>
        <div className="flex flex-wrap gap-3 text-xs" style={{ color: config.colors.textLight }}>
          <span>{resume.contactInfo?.email || 'email@example.com'}</span>
          <span>{resume.contactInfo?.phone || '(555) 123-4567'}</span>
          <span>{resume.contactInfo?.city || 'City'}</span>
        </div>
        {(resume.contactInfo?.linkedin || resume.contactInfo?.github) && (
          <div className="flex gap-3 mt-2 text-xs" style={{ color: config.colors.primary }}>
            {resume.contactInfo?.linkedin && <span>→ LinkedIn</span>}
            {resume.contactInfo?.github && <span>→ GitHub</span>}
          </div>
        )}
      </div>

      {hasSummary && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-xs" style={{ color: config.colors.text }}>
            About
          </h2>
          <p className="text-xs">{resume.summary}</p>
        </div>
      )}

      {hasSkills && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2 text-xs" style={{ color: config.colors.text }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {resume.skills?.technical?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-white rounded text-xs"
                style={{ backgroundColor: config.colors.text, fontSize: '7px' }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {hasExperience && (
        <div>
          <h2 className="font-semibold mb-2 text-xs" style={{ color: config.colors.text }}>
            Experience
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <h3 className="font-semibold text-xs">
                {exp.jobTitle} @ {exp.company}
              </h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {exp.location} • {exp.startDate} – {exp.isCurrentJob ? 'Present' : exp.endDate}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            PROJECTS
          </h2>
          {resume.projects.map((project: any) => (
            <div key={project.id} className="mb-2">
              <h3 className="font-semibold text-xs">{project.name}</h3>
              {project.description && <p className="text-xs mt-1">{project.description}</p>}
              {project.technologies && (
                <p className="text-xs mt-1" style={{ color: config.colors.textLight }}>
                  Technologies: {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            CERTIFICATIONS
          </h2>
          {resume.certifications.map((cert: any) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-xs">{cert.name}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {cert.issuer} • {cert.dateIssued}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {resume.awards && resume.awards.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            AWARDS & HONORS
          </h2>
          {resume.awards.map((award: any) => (
            <div key={award.id} className="mb-2">
              <h3 className="font-semibold text-xs">{award.title}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {award.issuer} • {award.date}
              </p>
              {award.description && <p className="text-xs mt-1">{award.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {resume.volunteer && resume.volunteer.length > 0 && (
        <div className="mb-4">
          <h2
            className="font-bold uppercase tracking-wide mb-2 text-xs"
            style={{ color: config.colors.primary }}
          >
            VOLUNTEER EXPERIENCE
          </h2>
          {resume.volunteer.map((vol: any) => (
            <div key={vol.id} className="mb-2">
              <h3 className="font-semibold text-xs">{vol.role}</h3>
              <p className="text-xs" style={{ color: config.colors.textLight }}>
                {vol.organization} • {vol.startDate} - {vol.isCurrentRole ? 'Present' : vol.endDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}