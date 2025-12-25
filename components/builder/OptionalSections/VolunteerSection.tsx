// components/builder/OptionalSections/VolunteerSection.tsx

"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface VolunteerForm {
  volunteer: {
    id: string;
    role: string;
    organization: string;
    location: string;
    startDate: string;
    endDate?: string;
    isCurrentRole: boolean;
    description: string;
  }[];
}

export default function VolunteerSection() {
  const { currentResume, updateVolunteer } = useResumeStore();

  const { register, control, watch } = useForm<VolunteerForm>({
    defaultValues: {
      volunteer: currentResume.volunteer || [
        {
          id: `volunteer-${Date.now()}`,
          role: "",
          organization: "",
          location: "",
          startDate: "",
          endDate: "",
          isCurrentRole: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "volunteer",
  });

  // Auto-save on change - watch all form values to ensure deep changes are detected
  const formValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const volunteerData = formValues.volunteer || [];

      // Filter out empty volunteer entries
      const filteredVolunteer = volunteerData.filter((vol: any) => vol.role || vol.organization);
      updateVolunteer(filteredVolunteer);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues.volunteer), updateVolunteer]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        const isCurrentRole = watch(`volunteer.${index}.isCurrentRole`);

        return (
          <div key={field.id} className="p-4 border rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">Volunteer Position {index + 1}</h4>
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
                <Label htmlFor={`volunteer.${index}.role`}>Role</Label>
                <Input
                  id={`volunteer.${index}.role`}
                  placeholder="Volunteer Coordinator"
                  {...register(`volunteer.${index}.role`)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`volunteer.${index}.organization`}>Organization</Label>
                <Input
                  id={`volunteer.${index}.organization`}
                  placeholder="Red Cross"
                  {...register(`volunteer.${index}.organization`)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`volunteer.${index}.location`}>Location</Label>
              <Input
                id={`volunteer.${index}.location`}
                placeholder="New York, NY"
                {...register(`volunteer.${index}.location`)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`volunteer.${index}.startDate`}>Start Date</Label>
                <Input
                  id={`volunteer.${index}.startDate`}
                  type="month"
                  {...register(`volunteer.${index}.startDate`)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`volunteer.${index}.endDate`}>End Date</Label>
                <Input
                  id={`volunteer.${index}.endDate`}
                  type="month"
                  disabled={isCurrentRole}
                  {...register(`volunteer.${index}.endDate`)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name={`volunteer.${index}.isCurrentRole`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={`volunteer.${index}.isCurrentRole`}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor={`volunteer.${index}.isCurrentRole`}
                className="text-sm font-normal cursor-pointer"
              >
                I currently volunteer here
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`volunteer.${index}.description`}>Description</Label>
              <Textarea
                id={`volunteer.${index}.description`}
                placeholder="Organized community events and managed volunteer teams..."
                rows={3}
                {...register(`volunteer.${index}.description`)}
              />
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            id: `volunteer-${Date.now()}`,
            role: "",
            organization: "",
            location: "",
            startDate: "",
            endDate: "",
            isCurrentRole: false,
            description: "",
          })
        }
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Volunteer Position
      </Button>
    </div>
  );
}