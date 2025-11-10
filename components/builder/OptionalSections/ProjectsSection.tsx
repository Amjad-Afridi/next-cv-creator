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
      projects: currentResume.projects || [
        {
          id: `project-${Date.now()}`,
          name: "",
          description: "",
          technologies: "",
          link: "",
          date: "",
        },
      ],
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
      useResumeStore.setState((state) => ({
        currentResume: {
          ...state.currentResume,
          projects: watchedProjects,
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
                placeholder="E-commerce Website"
                {...register(`projects.${index}.name`)}
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
            <Label htmlFor={`projects.${index}.description`}>Description</Label>
            <Textarea
              id={`projects.${index}.description`}
              placeholder="Built a full-stack e-commerce platform with user authentication..."
              rows={3}
              {...register(`projects.${index}.description`)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projects.${index}.technologies`}>Technologies Used</Label>
            <Input
              id={`projects.${index}.technologies`}
              placeholder="React, Node.js, MongoDB"
              {...register(`projects.${index}.technologies`)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projects.${index}.link`}>Project Link (Optional)</Label>
            <Input
              id={`projects.${index}.link`}
              type="url"
              placeholder="https://github.com/username/project"
              {...register(`projects.${index}.link`)}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
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
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Project
      </Button>
    </div>
  );
}