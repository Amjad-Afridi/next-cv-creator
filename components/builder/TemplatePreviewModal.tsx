// components/builder/TemplatePreviewModal.tsx
"use client";

import { Template } from "@/lib/types/template";
import { Resume } from "@/lib/types/resume";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check, X } from "lucide-react";
import { HTMLPreview } from "./HTMLPreview";
import { generateResumeHTML } from "@/lib/pdf/templateRenderer";
import { useMemo } from "react";

interface TemplatePreviewModalProps {
  template: Template | null;
  resume: Resume;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
  isSelected: boolean;
}

export default function TemplatePreviewModal({
  template,
  resume,
  isOpen,
  onClose,
  onSelect,
  isSelected,
}: TemplatePreviewModalProps) {
  // Generate HTML from actual template
  const previewHTML = useMemo(() => {
    if (!template) return '';
    
    try {
      return generateResumeHTML(resume, template);
    } catch (error) {
      console.error('Error generating preview HTML:', error);
      return '<html><body><p>Error generating preview</p></body></html>';
    }
  }, [template, resume]);

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <DialogTitle className="text-xl font-bold">
                  {template.name}
                </DialogTitle>
                {template.isPremium && (
                  <Badge variant="default" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Premium
                  </Badge>
                )}
                {template.isATSFriendly && (
                  <Badge variant="secondary">ATS-Friendly</Badge>
                )}
              </div>
              <DialogDescription className="text-sm">
                {template.description}
              </DialogDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onSelect(template.id);
                  onClose();
                }}
                disabled={isSelected}
              >
                {isSelected ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Selected
                  </>
                ) : (
                  'Use This Template'
                )}
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden p-6 bg-slate-50">
          <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <HTMLPreview 
              htmlContent={previewHTML}
              className="w-full h-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}