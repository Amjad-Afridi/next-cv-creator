// app/(main)/builder/page.tsx

"use client";

import { useResumeStore } from "@/lib/store/resumeStore";
import { useEffect } from "react";
import StepIndicator from "@/components/builder/StepIndicator";
import ContactInfoStep from "@/components/builder/FormSteps/ContactInfoStep";
import SummaryStep from "@/components/builder/FormSteps/SummaryStep";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceStep from "@/components/builder/FormSteps/ExperienceStep";
import EducationStep from "@/components/builder/FormSteps/EducationStep";
import SkillsStep from "@/components/builder/FormSteps/SkillsStep";
import OptionalSectionsStep from "@/components/builder/FormSteps/OptionalSectionsStep";
import FinalizeStep from "@/components/builder/FormSteps/FinalizeStep";

export default function BuilderPage() {
  const { currentStep, currentResume, initializeResume, setCurrentStep } = useResumeStore();

  useEffect(() => {
    // Initialize resume if it doesn't exist
    if (!currentResume.id) {
      initializeResume();
    }
  }, [currentResume.id, initializeResume]);

const renderStep = () => {
  switch (currentStep) {
    case 1:
      return <ContactInfoStep />;
    case 2:
      return <SummaryStep />;
    case 3:
      return <ExperienceStep />;
    case 4:
      return <EducationStep />;
    case 5:
      return <SkillsStep />;
    case 6:
      return <OptionalSectionsStep />;
    case 7:
      return <FinalizeStep />;
    default:
      return <ContactInfoStep />;
  }
};


  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
            <div className="hidden md:block">
              <h1 className="font-bold text-xl">Resume Builder</h1>
              <p className="text-sm text-slate-500">
                Step {currentStep} of 7 • {currentResume.title || "Untitled Resume"}
              </p>
            </div>
          </div>
          
          {/* Step navigation in header */}
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            )}
            <div className="text-sm text-slate-500 hidden md:block">
              Auto-saved
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Left Side - Form */}
          <div className="space-y-6">
            {renderStep()}
          </div>

          {/* Right Side - Preview */}
<div className="hidden lg:block">
  <div className="sticky top-24">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
      <div className="border rounded-lg p-8 bg-white min-h-[800px] shadow-inner">
        {/* Preview Content */}
        <div className="space-y-6">
          {/* Header - Contact Information */}
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold">
              {currentResume.contactInfo?.firstName || "First Name"}{" "}
              {currentResume.contactInfo?.lastName || "Last Name"}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {currentResume.contactInfo?.email || "email@example.com"} |{" "}
              {currentResume.contactInfo?.phone || "+1 (555) 123-4567"}
            </p>
            <p className="text-sm text-slate-600">
              {currentResume.contactInfo?.city || "City"},{" "}
              {currentResume.contactInfo?.country || "Country"}
            </p>
            
            {/* Professional Links */}
            {(currentResume.contactInfo?.linkedin ||
              currentResume.contactInfo?.website ||
              currentResume.contactInfo?.github ||
              currentResume.contactInfo?.customLink?.url) && (
              <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-blue-600">
                {currentResume.contactInfo?.linkedin && (
                  <a href={currentResume.contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {currentResume.contactInfo.linkedin}
                  </a>
                )}
                {currentResume.contactInfo?.website && (
                  <a href={currentResume.contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {currentResume.contactInfo.website}
                  </a>
                )}
                {currentResume.contactInfo?.github && (
                  <a href={currentResume.contactInfo.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {currentResume.contactInfo.github}
                  </a>
                )}
                {currentResume.contactInfo?.customLink?.url && (
                  <a href={currentResume.contactInfo.customLink.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {currentResume.contactInfo.customLink.label || currentResume.contactInfo.customLink.url}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Professional Summary */}
          {currentResume.summary && currentResume.summary.trim() !== "" && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-2 border-b pb-1">
                Professional Summary
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentResume.summary}
              </p>
            </div>
          )}

          {/* Work Experience Section Preview - WITH HTML RENDERING */}
          {currentResume.experience && currentResume.experience.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3 border-b pb-1">
                Work Experience
              </h2>
              <div className="space-y-4">
                {currentResume.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{exp.jobTitle}</h3>
                        <p className="text-sm text-slate-600">{exp.company}</p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <p>{exp.location}</p>
                        <p>
                          {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                        </p>
                      </div>
                    </div>
                    {/* Render HTML content from Tiptap */}
                    <div 
                      className="text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section Preview */}
          {currentResume.education && currentResume.education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3 border-b pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {currentResume.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{edu.degree}</h3>
                        <p className="text-sm text-slate-600">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-xs text-slate-500 mt-1">GPA: {edu.gpa}</p>
                        )}
                        {edu.additionalInfo && (
                          <p className="text-xs text-slate-500 mt-1">{edu.additionalInfo}</p>
                        )}
                      </div>
                      <div className="text-right text-xs text-slate-500 ml-4">
                        <p>{edu.location}</p>
                        <p>{edu.isCurrentlyStudying ? "Expected " : ""}{edu.graduationDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section Preview */}
          {currentResume.skills && (
            <div className="space-y-4">
              {/* Technical Skills */}
              {currentResume.skills.technical && currentResume.skills.technical.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-2 border-b pb-1">
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {currentResume.skills.technical.map((skill, index) => (
                      <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {skill.name}
                        {skill.level && <span className="text-slate-500"> • {skill.level}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Soft Skills */}
              {currentResume.skills.soft && currentResume.skills.soft.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-2 border-b pb-1">
                    Soft Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {currentResume.skills.soft.map((skill, index) => (
                      <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {skill.name}
                        {skill.level && <span className="text-slate-500"> • {skill.level}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {currentResume.skills.languages && currentResume.skills.languages.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-2 border-b pb-1">
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {currentResume.skills.languages.map((skill, index) => (
                      <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {skill.name}
                        {skill.level && <span className="text-slate-500"> • {skill.level}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & Software */}
              {currentResume.skills.tools && currentResume.skills.tools.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-2 border-b pb-1">
                    Tools & Software
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {currentResume.skills.tools.map((skill, index) => (
                      <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded">
                        {skill.name}
                        {skill.level && <span className="text-slate-500"> • {skill.level}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Projects Section Preview */}
          {currentResume.projects && currentResume.projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3 border-b pb-1">
                Projects
              </h2>
              <div className="space-y-4">
                {currentResume.projects.map((project: any) => (
                  <div key={project.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{project.name}</h3>
                        {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                          <p className="text-xs text-slate-500">{project.technologies.join(', ')}</p>
                        )}
                      </div>
                      {project.date && (
                        <p className="text-xs text-slate-500">{project.date}</p>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-sm text-slate-600">{project.description}</p>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section Preview */}
          {currentResume.certifications && currentResume.certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3 border-b pb-1">
                Certifications
              </h2>
              <div className="space-y-3">
                {currentResume.certifications.map((cert: any) => (
                  <div key={cert.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{cert.name}</h3>
                        <p className="text-sm text-slate-600">{cert.issuer}</p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline inline-block mt-1"
                          >
                            {cert.credentialUrl}
                          </a>
                        )}
                      </div>
                      <div className="text-right text-xs text-slate-500 ml-4">
                        <p>{cert.dateIssued}</p>
                        {cert.expirationDate && <p>Expires: {cert.expirationDate}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards Section Preview */}
          {currentResume.awards && currentResume.awards.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3 border-b pb-1">
                Awards & Honors
              </h2>
              <div className="space-y-3">
                {currentResume.awards.map((award: any) => (
                  <div key={award.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm">{award.title}</h3>
                        <p className="text-sm text-slate-600">{award.issuer}</p>
                      </div>
                      {award.date && (
                        <p className="text-xs text-slate-500">{award.date}</p>
                      )}
                    </div>
                    {award.description && (
                      <p className="text-sm text-slate-600">{award.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteer Experience Section Preview */}
          {currentResume.volunteer && currentResume.volunteer.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-3 border-b pb-1">
                Volunteer Experience
              </h2>
              <div className="space-y-4">
                {currentResume.volunteer.map((vol: any) => (
                  <div key={vol.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{vol.role}</h3>
                        <p className="text-sm text-slate-600">{vol.organization}</p>
                        {vol.description && (
                          <p className="text-sm text-slate-600 mt-1">{vol.description}</p>
                        )}
                      </div>
                      <div className="text-right text-xs text-slate-500 ml-4">
                        {vol.location && <p>{vol.location}</p>}
                        <p>
                          {vol.startDate} - {vol.isCurrentRole ? "Present" : vol.endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder Message */}
          {currentStep <= 2 && (
            <p className="text-sm text-slate-400 text-center mt-8 pt-8 border-t">
              Keep filling the form to see your resume come to life!
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}