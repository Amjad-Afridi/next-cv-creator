// components/builder/FormSteps/OptionalSectionsStep.tsx

"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, FolderOpen, Award, Trophy, Heart, Sparkles } from "lucide-react";
import ProjectsSection from "@/components/builder/OptionalSections/ProjectsSection";
import CertificationsSection from "@/components/builder/OptionalSections/CertificationsSection";
import AwardsSection from "@/components/builder/OptionalSections/AwardsSection";
import VolunteerSection from "@/components/builder/OptionalSections/VolunteerSection";
import InterestsSection from "@/components/builder/OptionalSections/InterestsSection";

export default function OptionalSectionsStep() {
  const { setCurrentStep } = useResumeStore();
  const [activeSections, setActiveSections] = useState<string[]>([]);

  const handleNext = () => {
    setCurrentStep(7); // Move to finalize step
  };

  const handleBack = () => {
    setCurrentStep(5);
  };

  const handleSkip = () => {
    setCurrentStep(7);
  };

  const toggleSection = (section: string) => {
    if (activeSections.includes(section)) {
      setActiveSections(activeSections.filter((s) => s !== section));
    } else {
      setActiveSections([...activeSections, section]);
    }
  };

  const optionalSections = [
    {
      id: "projects",
      title: "Projects",
      description: "Showcase your personal or professional projects",
      icon: FolderOpen,
      component: ProjectsSection,
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "Professional certifications and licenses",
      icon: Award,
      component: CertificationsSection,
    },
    {
      id: "awards",
      title: "Awards & Honors",
      description: "Recognition and achievements",
      icon: Trophy,
      component: AwardsSection,
    },
    {
      id: "volunteer",
      title: "Volunteer Experience",
      description: "Community service and volunteer work",
      icon: Heart,
      component: VolunteerSection,
    },
    {
      id: "interests",
      title: "Interests & Hobbies",
      description: "Personal interests that show your personality",
      icon: Sparkles,
      component: InterestsSection,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Optional Sections</CardTitle>
          <CardDescription>
            Add additional sections to showcase more of your experience and achievements
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Section Selector */}
      {activeSections.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-4">
              Choose sections you'd like to add to your resume:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {optionalSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="flex items-start gap-3 p-4 border rounded-lg hover:bg-slate-50 transition text-left"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{section.title}</h3>
                      <p className="text-xs text-slate-600">{section.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Sections */}
      {activeSections.map((sectionId) => {
        const section = optionalSections.find((s) => s.id === sectionId);
        if (!section) return null;

        const SectionComponent = section.component;
        const Icon = section.icon;

        return (
          <Card key={sectionId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle className="text-base">{section.title}</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection(sectionId)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Section
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SectionComponent />
            </CardContent>
          </Card>
        );
      })}

      {/* Add More Sections Button */}
      {activeSections.length > 0 && activeSections.length < optionalSections.length && (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 mb-3">Add more sections:</p>
            <div className="flex flex-wrap gap-2">
              {optionalSections
                .filter((s) => !activeSections.includes(s.id))
                .map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSection(section.id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {section.title}
                    </Button>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> These sections are optional but can make your resume stand out. 
            Add them only if you have relevant content to share.
          </p>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button type="button" variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={handleSkip}>
            Skip All
          </Button>
          <Button type="button" onClick={handleNext}>
            Next: Finalize & Download
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}