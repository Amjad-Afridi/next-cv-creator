// components/builder/TemplateCard.tsx
"use client";

import { Template } from "@/lib/types/template";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <CardContent className="p-4">
        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}

        {/* Template Thumbnail/Preview Placeholder */}
        <div className={cn(
          "w-full h-32 bg-gradient-to-br rounded-md mb-3 flex items-center justify-center",
          "from-slate-100 to-slate-200 border-2",
          isSelected && "border-primary"
        )}>
          <div className="text-center">
            <Star className={cn(
              "h-8 w-8 mx-auto mb-1",
              isSelected ? "text-primary fill-primary" : "text-slate-400"
            )} />
            <p className="text-xs text-slate-500 font-medium">
              {template.style}
            </p>
          </div>
        </div>

        {/* Template Info */}
        <div className="space-y-2">
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