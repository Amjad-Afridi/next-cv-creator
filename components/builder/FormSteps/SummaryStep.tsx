// components/builder/FormSteps/SummaryStep.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { summarySchema, SummaryFormData } from "@/lib/validations/resumeSchema";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";

export default function SummaryStep() {
  const { currentResume, updateSummary, setCurrentStep } = useResumeStore();
  const [charCount, setCharCount] = useState(currentResume.summary?.length || 0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SummaryFormData>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: currentResume.summary || "",
    },
  });

  // Watch all form fields
  const watchedData = watch();

  // Auto-save with debouncing (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchedData.summary !== undefined) {
        updateSummary(watchedData.summary || "");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedData, updateSummary]);

  // Watch the summary field for character count
  const summaryValue = watch("summary");

  // Update character count
  useEffect(() => {
    setCharCount(summaryValue?.length || 0);
  }, [summaryValue]);

  const onSubmit = (data: SummaryFormData) => {
    updateSummary(data.summary || "");
    setCurrentStep(3); // Move to next step
  };

  const handleBack = () => {
    // Save current data before going back
    const currentSummary = watch("summary");
    updateSummary(currentSummary || "");
    setCurrentStep(1);
  };

  const handleSkip = () => {
    updateSummary("");
    setCurrentStep(3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>
            Write a brief summary that highlights your key qualifications and career goals (2-4 sentences)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary Textarea */}
          <div className="space-y-2">
            <Label htmlFor="summary">
              Summary (Optional)
            </Label>
            <Textarea
              id="summary"
              placeholder="Write summary here!"
              rows={6}
              maxLength={500}
              {...register("summary")}
              className={errors.summary ? "border-red-500" : ""}
            />
            <div className="flex justify-between items-center">
              <div>
                {errors.summary && (
                  <p className="text-sm text-red-500">{errors.summary.message}</p>
                )}
              </div>
              <p className="text-sm text-slate-500">
                {charCount} / 500 characters
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium text-blue-900 text-sm">Tips for a great summary:</p>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Start with your professional title and years of experience</li>
                  <li>Highlight 2-3 key skills or achievements</li>
                  <li>Mention what you're looking for or your career goals</li>
                  <li>Keep it concise and impactful (2-4 sentences)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples (Collapsible) */}
          <ExampleSummaries />
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
            Skip for Now
          </Button>
          <Button type="submit">
            Next: Work Experience
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}

// Example Summaries Component
function ExampleSummaries() {
  const [isOpen, setIsOpen] = useState(false);

  const examples = [
    {
      title: "Software Engineer",
      text: "Results-driven software engineer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Passionate about creating efficient solutions that enhance user experience and drive business growth."
    },
    {
      title: "Marketing Manager",
      text: "Creative marketing professional with 7+ years of experience developing data-driven campaigns. Proven track record of increasing brand awareness by 150% and driving revenue growth. Skilled in digital marketing, SEO, and team leadership."
    },
    {
      title: "Recent Graduate",
      text: "Recent computer science graduate with strong foundation in software development and problem-solving. Completed 3 internships at tech startups, contributing to mobile app development and data analysis projects. Eager to apply technical skills in a full-time role."
    },
    {
      title: "Career Changer",
      text: "Former teacher transitioning to UX design with newly acquired certification and portfolio of client projects. Strong communication skills and user empathy developed through 5 years of classroom experience. Passionate about creating intuitive digital experiences."
    }
  ];

  return (
    <div className="border rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-slate-50 rounded-lg transition"
      >
        {isOpen ? "Hide" : "Show"} Example Summaries
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {examples.map((example, index) => (
            <div key={index} className="border-t pt-4">
              <p className="font-medium text-sm text-slate-700 mb-2">
                {example.title}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {example.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}