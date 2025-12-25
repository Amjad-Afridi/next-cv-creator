// components/builder/LiveTemplatePreview.tsx
"use client";

import { useResumeStore } from "@/lib/store/resumeStore";
import { getTemplateById, getAllTemplates } from "@/lib/templates/templateUtils";
import { generateResumeHTML } from "@/lib/pdf/templateRenderer";
import { HTMLPreview } from "./HTMLPreview";
import { useMemo, useState } from "react";
import { sampleResume } from "@/lib/data/sampleResume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { calculateResumeCompletion } from "@/lib/utils/resumeValidation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

export function LiveTemplatePreview() {
  const { currentResume, updateTemplate } = useResumeStore();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const allTemplates = useMemo(() => getAllTemplates(), []);
  
  const currentTemplateIndex = useMemo(() => {
    return allTemplates.findIndex(t => t.id === currentResume.template);
  }, [allTemplates, currentResume.template]);

  const template = useMemo(() => {
    return getTemplateById(currentResume.template || 'classic-ats');
  }, [currentResume.template]);

  // Calculate resume completion
  const completionStatus = useMemo(() => {
    return calculateResumeCompletion(currentResume);
  }, [currentResume]);

  // Check if user has started filling data
  const hasUserData = useMemo(() => {
    return !!(
      currentResume.contactInfo?.firstName ||
      currentResume.contactInfo?.lastName ||
      currentResume.contactInfo?.email ||
      (currentResume.experience && currentResume.experience.length > 0) ||
      (currentResume.education && currentResume.education.length > 0)
    );
  }, [currentResume]);

  // Use sample data if user hasn't filled anything yet
  const displayResume = useMemo(() => {
    return hasUserData ? currentResume : {
      ...sampleResume,
      template: currentResume.template || 'modern-two-column',
      styling: currentResume.styling || sampleResume.styling
    };
  }, [currentResume, hasUserData]);

  const previewHTML = useMemo(() => {
    if (!template) return '';
    try {
      return generateResumeHTML(displayResume as any, template);
    } catch (error) {
      console.error('Preview error:', error);
      return '<html><body><p>Error generating preview</p></body></html>';
    }
  }, [displayResume, template]);

  const goToPrevTemplate = () => {
    const prevIndex = currentTemplateIndex > 0 
      ? currentTemplateIndex - 1 
      : allTemplates.length - 1;
    updateTemplate(allTemplates[prevIndex].id);
  };

  const goToNextTemplate = () => {
    const nextIndex = currentTemplateIndex < allTemplates.length - 1 
      ? currentTemplateIndex + 1 
      : 0;
    updateTemplate(allTemplates[nextIndex].id);
  };

  const handleDownload = async () => {
    if (!template) {
      toast.error("No template selected");
      return;
    }

    if (!completionStatus.isComplete) {
      toast.error("Please complete at least 50% of your resume", {
        description: `Current completion: ${completionStatus.percentage}%`,
      });
      return;
    }

    setIsDownloading(true);
    const loadingToast = toast.loading("Generating PDF...");

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: currentResume,
          templateId: template.id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || 'Failed to generate PDF');
      }

      // Get the PDF blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentResume.contactInfo?.firstName || 'Resume'}_${currentResume.contactInfo?.lastName || ''}_${template.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Resume downloaded successfully!", { id: loadingToast });
    } catch (error) {
      console.error('Download error:', error);
      toast.error(
        error instanceof Error ? error.message : "Failed to download PDF",
        { id: loadingToast }
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const isDownloadDisabled = !completionStatus.isComplete || isDownloading;

  return (
    <Card className="sticky top-4">
      <CardHeader className="-mb-4">
        <div className="space-y-3">
          {/* Title and Template Navigation */}
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Live Preview</CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={goToPrevTemplate}
                title="Previous template"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-slate-600 px-2 min-w-[3rem] text-center">
                {currentTemplateIndex + 1} / {allTemplates.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={goToNextTemplate}
                title="Next template"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Completion Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Resume Completion</span>
              <span className={`font-medium ${completionStatus.isComplete ? 'text-green-600' : 'text-orange-600'}`}>
                {completionStatus.percentage}%
              </span>
            </div>
            <Progress value={completionStatus.percentage} className="h-2" />
          </div>

          {/* Template Name and Download Button */}
          <div className="flex items-center justify-between gap-2">
            {template && (
              <p className="text-xs text-slate-500 font-medium truncate flex-1">
                {template.name}
              </p>
            )}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      size="sm"
                      onClick={handleDownload}
                      disabled={isDownloadDisabled}
                      className="gap-2 shrink-0"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="hidden sm:inline">Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Download</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TooltipTrigger>
                {!completionStatus.isComplete && (
                  <TooltipContent side="left" className="max-w-xs">
                    <div className="space-y-2">
                      <p className="font-semibold flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Complete at least 50% to download
                      </p>
                      <p className="text-xs">Missing fields:</p>
                      <ul className="text-xs list-disc list-inside space-y-1">
                        {completionStatus.missingFields.slice(0, 5).map((field) => (
                          <li key={field}>{field}</li>
                        ))}
                        {completionStatus.missingFields.length > 5 && (
                          <li>And {completionStatus.missingFields.length - 5} more...</li>
                        )}
                      </ul>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1">
        <div className="bg-white border p-2 rounded-lg overflow-hidden" style={{ height: '600px' }}>
          <HTMLPreview htmlContent={previewHTML} className="w-full h-full" />
        </div>
        
        {/* Helper Text */}
        <p className="text-xs text-slate-500 text-center mt-2">
          Use arrows to browse templates • Download to save as PDF
        </p>
      </CardContent>
    </Card>
  );
}