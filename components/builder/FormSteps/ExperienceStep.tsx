// components/builder/FormSteps/ExperienceStep.tsx

"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Plus, Trash2, Briefcase, Lightbulb } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useEffect } from "react";

// Schema for the entire experience array
const experienceArraySchema = z.object({
  experience: z.array(
    z.object({
      id: z.string(),
      jobTitle: z.string().min(1, "Job title is required"),
      company: z.string().min(1, "Company name is required"),
      location: z.string().min(1, "Location is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      isCurrentJob: z.boolean(),
      description: z.string().min(1, "Description is required"),
    })
  ).min(1, "Add at least one work experience"),
});

type ExperienceFormData = z.infer<typeof experienceArraySchema>;

export default function ExperienceStep() {
  const { currentResume, updateExperience, setCurrentStep } = useResumeStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceArraySchema),
    defaultValues: {
      experience: currentResume.experience && currentResume.experience.length > 0
        ? currentResume.experience
        : [{
            id: `exp-${Date.now()}`,
            jobTitle: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            isCurrentJob: false,
            description: "",
          }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  // Watch all form fields for auto-save
  const watchedData = watch();

  // Auto-save with debouncing (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchedData.experience && watchedData.experience.length > 0) {
        // Only auto-save if there's at least some data
        const hasData = watchedData.experience.some(
          exp => exp.jobTitle || exp.company || exp.description
        );
        if (hasData) {
          updateExperience(watchedData.experience);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedData, updateExperience]);

  const onSubmit = (data: ExperienceFormData) => {
    updateExperience(data.experience);
    setCurrentStep(4); // Move to education step
  };

  const handleBack = () => {
    // Save current data before going back
    const currentData = watch("experience");
    updateExperience(currentData);
    setCurrentStep(2);
  };

  const handleSkip = () => {
    updateExperience([]);
    setCurrentStep(4);
  };

  const addExperience = () => {
    append({
      id: `exp-${Date.now()}`,
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Work Experience
          </CardTitle>
          <CardDescription>
            Add your work history, starting with your most recent position
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Experience Entries */}
      {fields.map((field, index) => {
        const isCurrentJob = watch(`experience.${index}.isCurrentJob`);
        
        return (
          <Card key={field.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {index === 0 ? "Most Recent Position" : `Position ${index + 1}`}
                </CardTitle>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Job Title and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`experience.${index}.jobTitle`}>
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`experience.${index}.jobTitle`}
                    placeholder="Software Engineer"
                    {...register(`experience.${index}.jobTitle`)}
                    className={errors.experience?.[index]?.jobTitle ? "border-red-500" : ""}
                  />
                  {errors.experience?.[index]?.jobTitle && (
                    <p className="text-sm text-red-500">
                      {errors.experience[index]?.jobTitle?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`experience.${index}.company`}>
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`experience.${index}.company`}
                    placeholder="Google"
                    {...register(`experience.${index}.company`)}
                    className={errors.experience?.[index]?.company ? "border-red-500" : ""}
                  />
                  {errors.experience?.[index]?.company && (
                    <p className="text-sm text-red-500">
                      {errors.experience[index]?.company?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor={`experience.${index}.location`}>
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`experience.${index}.location`}
                  placeholder="San Francisco, CA"
                  {...register(`experience.${index}.location`)}
                  className={errors.experience?.[index]?.location ? "border-red-500" : ""}
                />
                {errors.experience?.[index]?.location && (
                  <p className="text-sm text-red-500">
                    {errors.experience[index]?.location?.message}
                  </p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`experience.${index}.startDate`}>
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`experience.${index}.startDate`}
                    type="month"
                    {...register(`experience.${index}.startDate`)}
                    className={errors.experience?.[index]?.startDate ? "border-red-500" : ""}
                  />
                  {errors.experience?.[index]?.startDate && (
                    <p className="text-sm text-red-500">
                      {errors.experience[index]?.startDate?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`experience.${index}.endDate`}>
                    End Date {!isCurrentJob && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id={`experience.${index}.endDate`}
                    type="month"
                    disabled={isCurrentJob}
                    {...register(`experience.${index}.endDate`)}
                    className={errors.experience?.[index]?.endDate ? "border-red-500" : ""}
                  />
                  {errors.experience?.[index]?.endDate && !isCurrentJob && (
                    <p className="text-sm text-red-500">
                      {errors.experience[index]?.endDate?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Currently Working Checkbox - FIXED */}
              <div className="flex items-center space-x-2">
                <Controller
                  name={`experience.${index}.isCurrentJob`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={`experience.${index}.isCurrentJob`}
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        // Clear end date when checkbox is checked
                        if (checked) {
                          setValue(`experience.${index}.endDate`, "");
                        }
                      }}
                    />
                  )}
                />
                <Label
                  htmlFor={`experience.${index}.isCurrentJob`}
                  className="text-sm font-normal cursor-pointer"
                >
                  I currently work here
                </Label>
              </div>

              {/* Description - Rich Text Editor */}
              <div className="space-y-2">
                <Label htmlFor={`experience.${index}.description`}>
                  Description & Achievements <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name={`experience.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="• Led development of new features that increased user engagement by 30%
- Managed a team of 5 engineers
- Implemented CI/CD pipeline reducing deployment time by 50%"
                      className={errors.experience?.[index]?.description ? "border-red-500" : ""}
                    />
                  )}
                />
                {errors.experience?.[index]?.description && (
                  <p className="text-sm text-red-500">
                    {errors.experience[index]?.description?.message}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  Use the toolbar to format your text and add bullet points
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Add More Button */}
      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Position
      </Button>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-blue-900 text-sm">Tips for describing your experience:</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Start each bullet with action verbs (Led, Developed, Managed, Increased)</li>
                <li>Include quantifiable achievements with numbers and percentages</li>
                <li>Focus on impact and results, not just responsibilities</li>
                <li>Keep descriptions concise (3-5 bullet points per position)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Error */}
      {errors.experience && typeof errors.experience.message === 'string' && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{errors.experience.message}</p>
          </CardContent>
        </Card>
      )}

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
            Next: Education
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}