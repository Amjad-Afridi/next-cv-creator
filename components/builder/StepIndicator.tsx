// components/builder/StepIndicator.tsx

"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/lib/store/resumeStore";

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { number: 1, title: "Contact", description: "Personal information" },
  { number: 2, title: "Summary", description: "Professional summary" },
  { number: 3, title: "Experience", description: "Work history" },
  { number: 4, title: "Education", description: "Academic background" },
  { number: 5, title: "Skills", description: "Your abilities" },
  { number: 6, title: "Optional", description: "Additional sections" },
  { number: 7, title: "Finalize", description: "Review & download" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { setCurrentStep, currentResume } = useResumeStore();

  // Determine if a step is completed
  const isStepCompleted = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(
          currentResume.contactInfo?.firstName &&
          currentResume.contactInfo?.lastName &&
          currentResume.contactInfo?.email &&
          currentResume.contactInfo?.phone
        );
      case 2:
        return !!currentResume.summary && currentResume.summary.trim().length > 0;
      case 3:
        return !!(currentResume.experience && currentResume.experience.length > 0);
      case 4:
        return !!(currentResume.education && currentResume.education.length > 0);
      case 5:
        return !!(
          currentResume.skills &&
          (currentResume.skills.technical.length > 0 ||
            currentResume.skills.soft.length > 0 ||
            currentResume.skills.languages.length > 0 ||
            currentResume.skills.tools.length > 0)
        );
      case 6:
        // Optional sections - always accessible
        return true;
      case 7:
        // Finalize - always accessible
        return true;
      default:
        return false;
    }
  };

  // Determine if a step is accessible (current or completed previous steps)
  const isStepAccessible = (stepNumber: number): boolean => {
    // Current step is always accessible
    if (stepNumber === currentStep) return true;
    
    // Can always go back to previous steps
    if (stepNumber < currentStep) return true;
    
    // Can go forward if previous step is completed
    if (stepNumber === currentStep + 1) {
      return isStepCompleted(currentStep);
    }
    
    // For steps further ahead, check if all previous steps are completed
    for (let i = 1; i < stepNumber; i++) {
      if (!isStepCompleted(i)) return false;
    }
    return true;
  };

  const handleStepClick = (stepNumber: number) => {
    if (isStepAccessible(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = isStepCompleted(step.number);
            const isCurrent = step.number === currentStep;
            const isAccessible = isStepAccessible(step.number);

            return (
              <div key={step.number} className="flex flex-col items-center">
                {/* Circle - Now Clickable */}
                <button
                  type="button"
                  onClick={() => handleStepClick(step.number)}
                  disabled={!isAccessible}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all duration-300",
                    {
                      // Current step
                      "border-primary bg-primary text-white": isCurrent,
                      // Completed steps (not current)
                      "border-green-500 bg-green-500 text-white": isCompleted && !isCurrent,
                      // Incomplete steps
                      "border-slate-300 text-slate-400 bg-white": !isCurrent && !isCompleted,
                      // Hover effects for accessible steps
                      "cursor-pointer hover:scale-110 hover:shadow-md": isAccessible && !isCurrent,
                      // Disabled steps
                      "cursor-not-allowed opacity-50": !isAccessible,
                    }
                  )}
                  title={
                    isAccessible
                      ? `Go to ${step.title}`
                      : `Complete previous steps to access ${step.title}`
                  }
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </button>

                {/* Label - Also Clickable on Desktop */}
                <button
                  type="button"
                  onClick={() => handleStepClick(step.number)}
                  disabled={!isAccessible}
                  className={cn(
                    "mt-2 text-center hidden md:block transition-all",
                    {
                      "cursor-pointer hover:text-primary": isAccessible,
                      "cursor-not-allowed": !isAccessible,
                    }
                  )}
                >
                  <p
                    className={cn("text-sm font-medium", {
                      "text-primary": isCurrent || isCompleted,
                      "text-slate-500": !isCurrent && !isCompleted,
                    })}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-400">{step.description}</p>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Current Step Display */}
      <div className="md:hidden mt-4 text-center">
        <p className="text-sm font-medium text-primary">
          Step {currentStep}: {steps[currentStep - 1].title}
        </p>
        <p className="text-xs text-slate-500">{steps[currentStep - 1].description}</p>
      </div>

      {/* Helper Text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">
          💡 Click on any completed step to edit or review
        </p>
      </div>
    </div>
  );
}
