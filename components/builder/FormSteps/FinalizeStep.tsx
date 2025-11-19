// components/builder/FormSteps/FinalizeStep.tsx

"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Check, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TemplateSelector from "@/components/builder/TemplateSelector";
import { getTemplateById } from "@/lib/templates/templateUtils";
import { toast } from "sonner";
export default function FinalizeStep() {
  const { currentResume, setCurrentStep } = useResumeStore();
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    currentResume.template || "professional-traditional"
  );
  const [resumeTitle, setResumeTitle] = useState(currentResume.title || "My Resume");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBack = () => {
    setCurrentStep(6);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    useResumeStore.setState((state) => ({
      currentResume: {
        ...state.currentResume,
        template: templateId,
      },
    }));
  };

 const handleDownload = async () => {
  setIsGenerating(true);

  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume: currentResume,
        templateId: selectedTemplateId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    // Get the PDF blob
    const blob = await response.blob();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeTitle.replace(/\s+/g, '_')}_${selectedTemplate?.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Show success toast
    toast.success('Resume downloaded successfully!', {
      description: `${resumeTitle} with ${selectedTemplate?.name} template`,
    });
  } catch (error) {
    console.error('Download error:', error);
    toast.error('Failed to download resume', {
      description: 'Please try again or contact support',
    });
  } finally {
    setIsGenerating(false);
  }
};


  const completionPercentage = calculateCompletionPercentage(currentResume);
  const selectedTemplate = getTemplateById(selectedTemplateId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Finalize Your Resume
          </CardTitle>
          <CardDescription>
            Choose a template and download your professional resume
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resume Completeness */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resume Completeness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Your resume is {completionPercentage}% complete</span>
              <span className="font-semibold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <CompletionItem
                label="Contact Info"
                completed={!!currentResume.contactInfo?.firstName}
              />
              <CompletionItem label="Summary" completed={!!currentResume.summary} />
              <CompletionItem
                label="Experience"
                completed={!!(currentResume.experience && currentResume.experience.length > 0)}
              />
              <CompletionItem
                label="Education"
                completed={!!(currentResume.education && currentResume.education.length > 0)}
              />
              <CompletionItem
                label="Skills"
                completed={
                  !!(currentResume.skills &&
                  (currentResume.skills.technical.length > 0 ||
                    currentResume.skills.soft.length > 0))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume Title */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resume Title</CardTitle>
          <CardDescription>Give your resume a name for easy identification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="resumeTitle">Title</Label>
            <Input
              id="resumeTitle"
              value={resumeTitle}
              onChange={(e) => {
                setResumeTitle(e.target.value);
                useResumeStore.setState((state) => ({
                  currentResume: {
                    ...state.currentResume,
                    title: e.target.value,
                  },
                }));
              }}
              placeholder="e.g., Software Engineer Resume, Marketing Manager CV"
            />
          </div>
        </CardContent>
      </Card>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Choose Your Template</CardTitle>
          <CardDescription>
            Select a design that best fits your style and industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TemplateSelector
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={handleTemplateSelect}
          />
        </CardContent>
      </Card>

      {/* Selected Template Summary */}
      {selectedTemplate && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Selected Template</h3>
                <p className="text-sm text-slate-600 mb-2">
                  {selectedTemplate.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.isATSFriendly && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      ✓ ATS-Friendly
                    </span>
                  )}
                  {selectedTemplate.isOnePage && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      ✓ One Page
                    </span>
                  )}
                  {selectedTemplate.isPremium && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      ★ Premium
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="font-medium text-blue-900 text-sm">Before downloading:</p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Review all sections for accuracy and typos</li>
              <li>Ensure your contact information is up to date</li>
              <li>Check that dates are in the correct format</li>
              <li>Verify all links are working correctly</li>
              <li>Make sure your resume is 1-2 pages (ideally)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Download Options */}
      <Card className="border-primary">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Ready to Download?</h3>
              <p className="text-sm text-slate-600">
                Your resume will be downloaded as a PDF file with the{" "}
                <strong>{selectedTemplate?.name}</strong> template
              </p>
            </div>

            <Button
              size="lg"
              onClick={handleDownload}
              disabled={isGenerating || completionPercentage < 50}
              className="w-full md:w-auto"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume PDF
                </>
              )}
            </Button>

            {completionPercentage < 50 && (
              <p className="text-sm text-red-600">
                Please complete at least 50% of your resume to download
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}

// Helper Component
interface CompletionItemProps {
  label: string;
  completed: boolean;
}

function CompletionItem({ label, completed }: CompletionItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {completed ? (
        <div className="bg-green-100 text-green-600 rounded-full p-0.5">
          <Check className="h-3 w-3" />
        </div>
      ) : (
        <div className="bg-slate-200 rounded-full w-4 h-4" />
      )}
      <span className={completed ? "text-slate-900" : "text-slate-500"}>{label}</span>
    </div>
  );
}

// Calculate completion percentage
function calculateCompletionPercentage(resume: any): number {
  let completed = 0;
  let total = 5; // 5 main sections

  if (resume.contactInfo?.firstName && resume.contactInfo?.email) completed++;
  if (resume.summary && resume.summary.trim().length > 0) completed++;
  if (resume.experience && resume.experience.length > 0) completed++;
  if (resume.education && resume.education.length > 0) completed++;
  if (
    resume.skills &&
    (resume.skills.technical.length > 0 || resume.skills.soft.length > 0)
  ) {
    completed++;
  }

  return Math.round((completed / total) * 100);
}