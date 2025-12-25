// components/builder/TemplateCard.tsx
"use client";

import { Template } from "@/lib/types/template";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateResumeHTML } from "@/lib/pdf/templateRenderer";
import { sampleResume } from "@/lib/data/sampleResume";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

export function TemplateCard({
  template,
  isSelected,
  onSelect,
}: TemplateCardProps) {
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02]",
        isSelected && "ring-2 ring-primary shadow-lg"
      )}
      onClick={() => !isSelected && onSelect(template.id)}
    >
      <CardContent className="p-3">
        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}

        {/* Template Thumbnail Preview */}
        <div className={cn(
          "w-full h-48 bg-slate-50 rounded-md mb-2 overflow-hidden border-2 relative",
          isSelected && "border-primary"
        )}>
          <iframe
            srcDoc={generateResumeHTML(
              {
                ...sampleResume,
                template: template.id,
                styling: {
                  ...sampleResume.styling,
                  showProfileImage: false,
                },
              } as any,
              template
            )}
            className="pointer-events-none scale-[0.2] origin-top-left"
            style={{
              width: '500%',
              height: '500%',
              overflow: 'hidden',
            }}
            title={`${template.name} preview`}
            sandbox="allow-same-origin"
            scrolling="no"
          />
        </div>

        {/* Template Info */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn(
              "font-semibold text-sm line-clamp-1",
              isSelected && "text-primary"
            )}>
              {template.name}
            </h3>
            {template.isPremium && (
              <Badge variant="default" className="shrink-0 gap-1">
                <Sparkles className="h-3 w-3" />
              </Badge>
            )}
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 min-h-[2.5rem]">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {template.isATSFriendly && (
              <Badge variant="secondary" className="text-xs">
                ATS
              </Badge>
            )}
            {template.isOnePage && (
              <Badge variant="outline" className="text-xs">
                1 Page
              </Badge>
            )}
            <Badge variant="outline" className="text-xs capitalize">
              {template.category}
            </Badge>
          </div>

          {/* Select Button */}
          <Button
            className="w-full"
            size="sm"
            variant={isSelected ? "secondary" : "default"}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template.id);
            }}
            disabled={isSelected}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Selected
              </>
            ) : (
              'Select Template'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}