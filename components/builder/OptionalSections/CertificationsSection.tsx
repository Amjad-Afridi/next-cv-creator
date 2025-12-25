// components/builder/OptionalSections/CertificationsSection.tsx

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

interface CertificationForm {
  certifications: {
    id: string;
    name: string;
    issuer: string;
    dateIssued: string;
    expirationDate?: string;
    credentialUrl?: string;
  }[];
}

export default function CertificationsSection() {
  const { currentResume, updateCertifications } = useResumeStore();

  const { register, control, watch } = useForm<CertificationForm>({
    defaultValues: {
      certifications: currentResume.certifications || [
        {
          id: `cert-${Date.now()}`,
          name: "",
          issuer: "",
          dateIssued: "",
          expirationDate: "",
          credentialUrl: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  // Auto-save on change - watch all form values to ensure deep changes are detected
  const formValues = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const certificationsData = formValues.certifications || [];

      // Filter out empty certifications
      const filteredCerts = certificationsData.filter((cert: any) => cert.name || cert.issuer);
      updateCertifications(filteredCerts);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValues.certifications), updateCertifications]);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">Certification {index + 1}</h4>
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
              <Label htmlFor={`certifications.${index}.name`}>Certification Name</Label>
              <Input
                id={`certifications.${index}.name`}
                placeholder="AWS Certified Solutions Architect"
                {...register(`certifications.${index}.name`)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`certifications.${index}.issuer`}>Issuing Organization</Label>
              <Input
                id={`certifications.${index}.issuer`}
                placeholder="Amazon Web Services"
                {...register(`certifications.${index}.issuer`)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`certifications.${index}.dateIssued`}>Date Issued</Label>
              <Input
                id={`certifications.${index}.dateIssued`}
                type="month"
                {...register(`certifications.${index}.dateIssued`)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`certifications.${index}.expirationDate`}>
                Expiration Date (Optional)
              </Label>
              <Input
                id={`certifications.${index}.expirationDate`}
                type="month"
                {...register(`certifications.${index}.expirationDate`)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`certifications.${index}.credentialUrl`}>
              Credential URL (Optional)
            </Label>
            <Input
              id={`certifications.${index}.credentialUrl`}
              type="url"
              placeholder="https://www.credly.com/badges/..."
              {...register(`certifications.${index}.credentialUrl`)}
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
            id: `cert-${Date.now()}`,
            name: "",
            issuer: "",
            dateIssued: "",
            expirationDate: "",
            credentialUrl: "",
          })
        }
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Certification
      </Button>
    </div>
  );
}