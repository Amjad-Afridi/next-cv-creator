// components/builder/OptionalSections/ProjectsSection.tsx

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface ProjectForm {
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string;
    link?: string;
    date: string;
  }[];
}

export default function ProjectsSection() {
  const { currentResume, updateExperience } = useResumeStore();

  const { register, control, watch } = useForm<ProjectForm>({
    defaultValues: {
      projects: (currentResume.projects || [
        {
          id: `project-${Date.now()}`,
          name: "",
          description: "",
          technologies: "",
          link: "",
          date: "",
        },
      ]).map((project: any) => ({
        ...project,
        // Convert technologies array to string for form input
        technologies: Array.isArray(project.technologies) 
          ? project.technologies.join(', ')
          : (project.technologies || ''),
      })) as any,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // Auto-save on change
  const watchedProjects = watch("projects");
  useEffect(() => {
    const timer = setTimeout(() => {
      // Convert technologies from string to array
      const convertedProjects = watchedProjects.map((project: any) => ({
        ...project,
        technologies: project.technologies
          ? project.technologies.split(',').map((t: string) => t.trim())
          : [],
      }));

      useResumeStore.setState((state) => ({
        currentResume: {
          ...state.currentResume,
          projects: convertedProjects as any,
        },
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [watchedProjects]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">Project {index + 1}</h4>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`projects.${index}.name`}>Project Name</Label>
              <Input
                id={`projects.${index}.name`}
                {...register(`projects.${index}.name`)}
                placeholder="E-commerce Platform"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`projects.${index}.date`}>Date</Label>
              <Input
                id={`projects.${index}.date`}
                type="month"
                {...register(`projects.${index}.date`)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projects.${index}.description`}>
              Description
            </Label>
            <Textarea
              id={`projects.${index}.description`}
              {...register(`projects.${index}.description`)}
              placeholder="Built a full-stack e-commerce platform with user authentication, product catalog, and payment integration..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projects.${index}.technologies`}>
              Technologies (comma-separated)
            </Label>
            <Input
              id={`projects.${index}.technologies`}
              {...register(`projects.${index}.technologies`)}
              placeholder="React, Node.js, PostgreSQL, Docker"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projects.${index}.link`}>
              Project Link (optional)
            </Label>
            <Input
              id={`projects.${index}.link`}
              {...register(`projects.${index}.link`)}
              placeholder="https://github.com/username/project"
              type="url"
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            id: `project-${Date.now()}`,
            name: "",
            description: "",
            technologies: "",
            link: "",
            date: "",
          })
        }
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}