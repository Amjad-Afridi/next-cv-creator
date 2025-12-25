// app/(main)/builder/page.tsx
"use client";

import { useResumeStore } from "@/lib/store/resumeStore";
import { useEffect, useRef, useState } from "react";
import StepIndicator from "@/components/builder/StepIndicator";
import ContactInfoStep from "@/components/builder/FormSteps/ContactInfoStep";
import SummaryStep from "@/components/builder/FormSteps/SummaryStep";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceStep from "@/components/builder/FormSteps/ExperienceStep";
import EducationStep from "@/components/builder/FormSteps/EducationStep";
import SkillsStep from "@/components/builder/FormSteps/SkillsStep";
import OptionalSectionsStep from "@/components/builder/FormSteps/OptionalSectionsStep";
import FinalizeStep from "@/components/builder/FormSteps/FinalizeStep";
import { LiveTemplatePreview } from "@/components/builder/LiveTemplatePreview";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BuilderPage() {
  const { currentStep, currentResume, initializeResume, setCurrentStep } = useResumeStore();
  const initialized = useRef(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  useEffect(() => {
    // Only run once on mount
    if (initialized.current) return;
    initialized.current = true;

    // Check localStorage directly to see if we have saved data
    const storedData = localStorage.getItem('resume-storage');
    
    if (!storedData) {
      // No saved data, initialize a new resume
      console.log('No saved data found, initializing new resume');
      initializeResume();
    } else {
      try {
        const parsed = JSON.parse(storedData);
        const hasData = parsed?.state?.currentResume?.id;
        
        if (!hasData) {
          // Saved data exists but no resume ID, initialize
          console.log('Saved data exists but no resume ID, initializing');
          initializeResume();
        } else {
          console.log('Found existing resume:', parsed.state.currentResume.id);
          // Data exists, don't do anything - Zustand will rehydrate automatically
        }
      } catch (error) {
        console.error('Error parsing saved data:', error);
        initializeResume();
      }
    }
  }, []); // ✅ Empty array - only run once

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

          {/* Right Side - Preview (Desktop) */}
          <div className="hidden lg:block">
            <LiveTemplatePreview />
          </div>
        </div>
      </div>

      {/* Floating Preview Button (Mobile/Tablet) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setShowPreviewDialog(true)}
          className="shadow-lg rounded-full h-14 w-14 p-0"
        >
          <Eye className="h-6 w-6" />
        </Button>
      </div>

      {/* Preview Dialog (Mobile/Tablet) */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle>Live Preview</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto h-[calc(90vh-80px)]">
            <LiveTemplatePreview />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}