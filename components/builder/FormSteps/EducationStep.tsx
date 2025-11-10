// components/builder/FormSteps/EducationStep.tsx

"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Plus, Trash2, GraduationCap, Lightbulb } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Schema for the entire education array
const educationArraySchema = z.object({
  education: z.array(
    z.object({
      id: z.string(),
      degree: z.string().min(1, "Degree/Certificate is required"),
      institution: z.string().min(1, "Institution name is required"),
      location: z.string().min(1, "Location is required"),
      graduationDate: z.string().min(1, "Graduation date is required"),
      isCurrentlyStudying: z.boolean(),
      gpa: z.string().optional(),
      additionalInfo: z.string().optional(),
    })
  ).min(1, "Add at least one education entry"),
});

type EducationFormData = z.infer<typeof educationArraySchema>;

export default function EducationStep() {
  const { currentResume, updateEducation, setCurrentStep } = useResumeStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationArraySchema),
    defaultValues: {
      education: currentResume.education && currentResume.education.length > 0
        ? currentResume.education
        : [{
            id: `edu-${Date.now()}`,
            degree: "",
            institution: "",
            location: "",
            graduationDate: "",
            isCurrentlyStudying: false,
            gpa: "",
            additionalInfo: "",
          }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data: EducationFormData) => {
    updateEducation(data.education);
    setCurrentStep(5); // Move to skills step
  };

  const handleBack = () => {
    // Save current data before going back
    const currentData = watch("education");
    updateEducation(currentData);
    setCurrentStep(3);
  };

  const handleSkip = () => {
    updateEducation([]);
    setCurrentStep(5);
  };

  const addEducation = () => {
    append({
      id: `edu-${Date.now()}`,
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      isCurrentlyStudying: false,
      gpa: "",
      additionalInfo: "",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </CardTitle>
          <CardDescription>
            Add your educational background, starting with your most recent degree
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Education Entries */}
      {fields.map((field, index) => {
        const isCurrentlyStudying = watch(`education.${index}.isCurrentlyStudying`);
        
        return (
          <Card key={field.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {index === 0 ? "Most Recent Education" : `Education ${index + 1}`}
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
              {/* Degree and Institution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.degree`}>
                    Degree/Certificate <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`education.${index}.degree`}
                    placeholder="Bachelor of Science in Computer Science"
                    {...register(`education.${index}.degree`)}
                    className={errors.education?.[index]?.degree ? "border-red-500" : ""}
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-sm text-red-500">
                      {errors.education[index]?.degree?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.institution`}>
                    Institution <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`education.${index}.institution`}
                    placeholder="Stanford University"
                    {...register(`education.${index}.institution`)}
                    className={errors.education?.[index]?.institution ? "border-red-500" : ""}
                  />
                  {errors.education?.[index]?.institution && (
                    <p className="text-sm text-red-500">
                      {errors.education[index]?.institution?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.location`}>
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`education.${index}.location`}
                    placeholder="Stanford, CA"
                    {...register(`education.${index}.location`)}
                    className={errors.education?.[index]?.location ? "border-red-500" : ""}
                  />
                  {errors.education?.[index]?.location && (
                    <p className="text-sm text-red-500">
                      {errors.education[index]?.location?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`education.${index}.graduationDate`}>
                    {isCurrentlyStudying ? "Expected Graduation" : "Graduation Date"} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`education.${index}.graduationDate`}
                    type="month"
                    {...register(`education.${index}.graduationDate`)}
                    className={errors.education?.[index]?.graduationDate ? "border-red-500" : ""}
                  />
                  {errors.education?.[index]?.graduationDate && (
                    <p className="text-sm text-red-500">
                      {errors.education[index]?.graduationDate?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Currently Studying Checkbox */}
              <div className="flex items-center space-x-2">
                <Controller
                  name={`education.${index}.isCurrentlyStudying`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={`education.${index}.isCurrentlyStudying`}
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
                <Label
                  htmlFor={`education.${index}.isCurrentlyStudying`}
                  className="text-sm font-normal cursor-pointer"
                >
                  I currently study here
                </Label>
              </div>

              {/* GPA (Optional) */}
              <div className="space-y-2">
                <Label htmlFor={`education.${index}.gpa`}>
                  GPA (Optional)
                </Label>
                <Input
                  id={`education.${index}.gpa`}
                  placeholder="3.8/4.0"
                  {...register(`education.${index}.gpa`)}
                />
                <p className="text-xs text-slate-500">
                  Only include if 3.5 or higher, or if required
                </p>
              </div>

              {/* Additional Info (Optional) */}
              <div className="space-y-2">
                <Label htmlFor={`education.${index}.additionalInfo`}>
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id={`education.${index}.additionalInfo`}
                  placeholder="Honors, relevant coursework, thesis, achievements, etc."
                  rows={3}
                  {...register(`education.${index}.additionalInfo`)}
                />
                <p className="text-xs text-slate-500">
                  E.g., "Summa Cum Laude", "Thesis: Machine Learning Applications", "Dean's List all semesters"
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
        onClick={addEducation}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Education
      </Button>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-blue-900 text-sm">Tips for education section:</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>List education in reverse chronological order (most recent first)</li>
                <li>Include relevant coursework for recent graduates</li>
                <li>Mention honors, awards, or distinctions (Dean's List, Cum Laude, etc.)</li>
                <li>Only include GPA if it's 3.5 or higher</li>
                <li>For online degrees, include the institution name</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Error */}
      {errors.education && typeof errors.education.message === 'string' && (
        <Card className="border-red-500 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{errors.education.message}</p>
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
            Next: Skills
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}