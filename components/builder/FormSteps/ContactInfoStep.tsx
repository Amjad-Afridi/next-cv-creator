// components/builder/FormSteps/ContactInfoStep.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInfoSchema, ContactInfoFormData } from "@/lib/validations/resumeSchema";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe, Linkedin, Github, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

export default function ContactInfoStep() {
  const { currentResume, updateContactInfo, setCurrentStep } = useResumeStore();
  const [showOptional, setShowOptional] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: currentResume.contactInfo,
  });

  const onSubmit = (data: ContactInfoFormData) => {
    // Clean up customLink if it's empty
    const cleanedData = {
      ...data,
      customLink: data.customLinkLabel && data.customLinkUrl
        ? { label: data.customLinkLabel, url: data.customLinkUrl }
        : undefined
    };

    updateContactInfo(cleanedData);
    setCurrentStep(2); // Move to next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Let's start with your basic contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Professional Title */}
          <div className="space-y-2">
            <Label htmlFor="professionalTitle" className="flex items-center gap-2">
              Professional Title
              <span className="text-xs text-muted-foreground font-normal">(appears under your name)</span>
            </Label>
            <Input
              id="professionalTitle"
              placeholder="e.g., Senior Software Engineer, Full Stack Developer, Product Designer"
              {...register("professionalTitle")}
              className={errors.professionalTitle ? "border-red-500" : ""}
            />
            {errors.professionalTitle && (
              <p className="text-sm text-red-500">{errors.professionalTitle.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              This helps recruiters quickly understand your role (e.g., "Senior Frontend Developer | React Specialist")
            </p>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                placeholder="New York"
                {...register("city")}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-red-500">*</span>
              </Label>
              <Input
                id="country"
                placeholder="United States"
                {...register("country")}
                className={errors.country ? "border-red-500" : ""}
              />
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optional Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Professional Links (Optional)</CardTitle>
          <CardDescription>
            Add your professional profiles and websites
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowOptional(!showOptional)}
            className="w-full md:w-auto"
          >
            {showOptional ? "Hide" : "Add"} Professional Links
          </Button>

          {showOptional && (
            <div className="space-y-4 pt-4">
              {/* LinkedIn */}
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                  {...register("linkedin")}
                  className={errors.linkedin ? "border-red-500" : ""}
                />
                {errors.linkedin && (
                  <p className="text-sm text-red-500">{errors.linkedin.message}</p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Personal Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://johndoe.com"
                  {...register("website")}
                  className={errors.website ? "border-red-500" : ""}
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>

              {/* GitHub */}
              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  type="url"
                  placeholder="https://github.com/johndoe"
                  {...register("github")}
                  className={errors.github ? "border-red-500" : ""}
                />
                {errors.github && (
                  <p className="text-sm text-red-500">{errors.github.message}</p>
                )}
              </div>

              {/* Custom Link */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Other Link
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    placeholder="Label (e.g., Portfolio)"
                    {...register("customLinkLabel")}
                  />
                  <Input
                    type="url"
                    placeholder="https://..."
                    {...register("customLinkUrl")}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4">
        <Button type="submit" size="lg">
          Next: Professional Summary
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}