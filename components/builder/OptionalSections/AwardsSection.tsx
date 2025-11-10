// components/builder/OptionalSections/AwardsSection.tsx

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface AwardForm {
  awards: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }[];
}

export default function AwardsSection() {
  const { currentResume } = useResumeStore();

  const { register, control, watch } = useForm<AwardForm>({
    defaultValues: {
      awards: currentResume.awards || [
        {
          id: `award-${Date.now()}`,
          title: "",
          issuer: "",
          date: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards",
  });

  // Auto-save
  const watchedAwards = watch("awards");
  useEffect(() => {
    const timer = setTimeout(() => {
      useResumeStore.setState((state) => ({
        currentResume: {
          ...state.currentResume,
          awards: watchedAwards,
        },
      }));
    }, 500);
    return () => clearTimeout(timer);
  }, [watchedAwards]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">Award {index + 1}</h4>
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
              <Label htmlFor={`awards.${index}.title`}>Award Title</Label>
              <Input
                id={`awards.${index}.title`}
                placeholder="Employee of the Year"
                {...register(`awards.${index}.title`)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`awards.${index}.issuer`}>Issuing Organization</Label>
              <Input
                id={`awards.${index}.issuer`}
                placeholder="Company Name"
                {...register(`awards.${index}.issuer`)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`awards.${index}.date`}>Date Received</Label>
            <Input
              id={`awards.${index}.date`}
              type="month"
              {...register(`awards.${index}.date`)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`awards.${index}.description`}>Description (Optional)</Label>
            <Textarea
              id={`awards.${index}.description`}
              placeholder="Recognized for exceptional performance..."
              rows={2}
              {...register(`awards.${index}.description`)}
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
            id: `award-${Date.now()}`,
            title: "",
            issuer: "",
            date: "",
            description: "",
          })
        }
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Award
      </Button>
    </div>
  );
}