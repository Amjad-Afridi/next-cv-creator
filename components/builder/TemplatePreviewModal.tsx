// components/builder/TemplatePreviewModal.tsx

"use client";

import { Template } from "@/lib/types/template";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface TemplatePreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
  isSelected: boolean;
}

export default function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
}: TemplatePreviewModalProps) {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[95vh] p-0 gap-0 flex flex-col">
        {/* Header - Fixed, No Scroll */}
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

        {/* Preview Area - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Resume Preview */}
            <div className="bg-white rounded-lg shadow-lg w-full">
              <div
                className="w-full p-8 md:p-12"
                style={{
                  fontSize: '10px',
                  lineHeight: '1.5',
                }}
              >
                {/* Header Section */}
                <div
                  className={`text-center pb-4 mb-4 ${
                    template.config.layout.showDividers ? 'border-b' : ''
                  }`}
                  style={{
                    borderColor: template.config.colors.border,
                  }}
                >
                  <h1
                    className="font-bold mb-2"
                    style={{
                      fontSize: `${template.config.typography.sizes.name}px`,
                      color: template.config.colors.primary,
                      fontFamily: template.config.typography.headingFont,
                    }}
                  >
                    John Doe
                  </h1>
                  <p
                    className="text-sm mb-1"
                    style={{
                      color: template.config.colors.textLight,
                      fontSize: `${template.config.typography.sizes.small}px`,
                    }}
                  >
                    john.doe@example.com | +1 (555) 123-4567
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: template.config.colors.textLight,
                      fontSize: `${template.config.typography.sizes.small}px`,
                    }}
                  >
                    San Francisco, CA | linkedin.com/in/johndoe
                  </p>
                </div>

                {/* Professional Summary */}
                <div className="mb-4">
                  <h2
                    className="font-bold uppercase tracking-wide mb-2 pb-1"
                    style={{
                      fontSize: `${template.config.typography.sizes.heading}px`,
                      color: template.config.colors.primary,
                      fontFamily: template.config.typography.headingFont,
                      borderBottom: template.config.layout.showDividers
                        ? `1px solid ${template.config.colors.border}`
                        : 'none',
                    }}
                  >
                    Professional Summary
                  </h2>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: `${template.config.typography.sizes.body}px`,
                      color: template.config.colors.text,
                      fontFamily: template.config.typography.bodyFont,
                    }}
                  >
                    Results-driven professional with 8+ years of experience in delivering
                    high-impact solutions. Proven track record in leading cross-functional teams and
                    driving business growth through innovative strategies and technical excellence.
                  </p>
                </div>

                {/* Work Experience */}
                <div className="mb-4">
                  <h2
                    className="font-bold uppercase tracking-wide mb-3 pb-1"
                    style={{
                      fontSize: `${template.config.typography.sizes.heading}px`,
                      color: template.config.colors.primary,
                      fontFamily: template.config.typography.headingFont,
                      borderBottom: template.config.layout.showDividers
                        ? `1px solid ${template.config.colors.border}`
                        : 'none',
                    }}
                  >
                    Work Experience
                  </h2>
                  <div className="space-y-3">
                    {/* Experience Entry 1 */}
                    <div>
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                        <div className="flex-1 min-w-[200px]">
                          <h3
                            className="font-semibold"
                            style={{
                              fontSize: `${template.config.typography.sizes.subheading}px`,
                              color: template.config.colors.text,
                            }}
                          >
                            Senior Software Engineer
                          </h3>
                          <p
                            style={{
                              fontSize: `${template.config.typography.sizes.body}px`,
                              color: template.config.colors.textLight,
                            }}
                          >
                            Tech Company Inc.
                          </p>
                        </div>
                        <div
                          className="text-right"
                          style={{
                            fontSize: `${template.config.typography.sizes.small}px`,
                            color: template.config.colors.textLight,
                          }}
                        >
                          <p>San Francisco, CA</p>
                          <p>2020 - Present</p>
                        </div>
                      </div>
                      <ul
                        className="list-disc list-inside space-y-1"
                        style={{
                          fontSize: `${template.config.typography.sizes.body}px`,
                          color: template.config.colors.text,
                        }}
                      >
                        <li>Led development of scalable microservices architecture serving 1M+ users</li>
                        <li>Improved system performance by 40% through optimization strategies</li>
                        <li>Mentored team of 5 junior developers in best practices and code reviews</li>
                      </ul>
                    </div>

                    {/* Experience Entry 2 */}
                    <div>
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                        <div className="flex-1 min-w-[200px]">
                          <h3
                            className="font-semibold"
                            style={{
                              fontSize: `${template.config.typography.sizes.subheading}px`,
                              color: template.config.colors.text,
                            }}
                          >
                            Software Engineer
                          </h3>
                          <p
                            style={{
                              fontSize: `${template.config.typography.sizes.body}px`,
                              color: template.config.colors.textLight,
                            }}
                          >
                            Startup Solutions
                          </p>
                        </div>
                        <div
                          className="text-right"
                          style={{
                            fontSize: `${template.config.typography.sizes.small}px`,
                            color: template.config.colors.textLight,
                          }}
                        >
                          <p>New York, NY</p>
                          <p>2018 - 2020</p>
                        </div>
                      </div>
                      <ul
                        className="list-disc list-inside space-y-1"
                        style={{
                          fontSize: `${template.config.typography.sizes.body}px`,
                          color: template.config.colors.text,
                        }}
                      >
                        <li>Developed full-stack applications using React and Node.js</li>
                        <li>Reduced API response time by 60% through caching strategies</li>
                        <li>Collaborated with design team to implement responsive UI components</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <h2
                    className="font-bold uppercase tracking-wide mb-3 pb-1"
                    style={{
                      fontSize: `${template.config.typography.sizes.heading}px`,
                      color: template.config.colors.primary,
                      fontFamily: template.config.typography.headingFont,
                      borderBottom: template.config.layout.showDividers
                        ? `1px solid ${template.config.colors.border}`
                        : 'none',
                    }}
                  >
                    Education
                  </h2>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex-1 min-w-[200px]">
                      <h3
                        className="font-semibold"
                        style={{
                          fontSize: `${template.config.typography.sizes.subheading}px`,
                          color: template.config.colors.text,
                        }}
                      >
                        Bachelor of Science in Computer Science
                      </h3>
                      <p
                        style={{
                          fontSize: `${template.config.typography.sizes.body}px`,
                          color: template.config.colors.textLight,
                        }}
                      >
                        University of California, Berkeley
                      </p>
                      <p
                        style={{
                          fontSize: `${template.config.typography.sizes.body}px`,
                          color: template.config.colors.text,
                        }}
                      >
                        GPA: 3.8/4.0
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: `${template.config.typography.sizes.small}px`,
                        color: template.config.colors.textLight,
                      }}
                    >
                      2018
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h2
                    className="font-bold uppercase tracking-wide mb-2 pb-1"
                    style={{
                      fontSize: `${template.config.typography.sizes.heading}px`,
                      color: template.config.colors.primary,
                      fontFamily: template.config.typography.headingFont,
                      borderBottom: template.config.layout.showDividers
                        ? `1px solid ${template.config.colors.border}`
                        : 'none',
                    }}
                  >
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git'].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: `${template.config.colors.primary}15`,
                            color: template.config.colors.primary,
                            fontSize: `${template.config.typography.sizes.small}px`,
                          }}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h2
                    className="font-bold uppercase tracking-wide mb-3 pb-1"
                    style={{
                      fontSize: `${template.config.typography.sizes.heading}px`,
                      color: template.config.colors.primary,
                      fontFamily: template.config.typography.headingFont,
                      borderBottom: template.config.layout.showDividers
                        ? `1px solid ${template.config.colors.border}`
                        : 'none',
                    }}
                  >
                    Projects
                  </h2>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                        <h3
                          className="font-semibold flex-1"
                          style={{
                            fontSize: `${template.config.typography.sizes.subheading}px`,
                            color: template.config.colors.text,
                          }}
                        >
                          E-commerce Platform
                        </h3>
                        <p
                          style={{
                            fontSize: `${template.config.typography.sizes.small}px`,
                            color: template.config.colors.textLight,
                          }}
                        >
                          2023
                        </p>
                      </div>
                      <p
                        className="mb-1"
                        style={{
                          fontSize: `${template.config.typography.sizes.body}px`,
                          color: template.config.colors.text,
                        }}
                      >
                        Built a full-stack e-commerce platform with payment integration, real-time inventory management, and responsive design.
                      </p>
                      <p
                        style={{
                          fontSize: `${template.config.typography.sizes.small}px`,
                          color: template.config.colors.textLight,
                        }}
                      >
                        Technologies: React, Node.js, MongoDB, Stripe API
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
