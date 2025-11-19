// components/builder/TemplateSelector.tsx

"use client";

import { useState, useMemo } from "react";
import { useResumeStore } from "@/lib/store/resumeStore";
import { Template, TemplateCategory, TemplateStyle } from "@/lib/types/template";
import { getAllTemplates, getPopularTemplates } from "@/lib/templates/templateUtils";
import { getTemplateStats } from "@/lib/templates/templateGenerator";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Search, Star, Sparkles, FileText, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TemplatePreviewModal from "./TemplatePreviewModal"; 
interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({
  selectedTemplateId,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");
  const [selectedStyle, setSelectedStyle] = useState<TemplateStyle | "all">("all");
  const [showATSOnly, setShowATSOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const { currentResume } = useResumeStore();

  // Preview modal state
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const allTemplates = useMemo(() => getAllTemplates(), []);
  const popularTemplates = useMemo(() => getPopularTemplates(), []);
  const templateStats = useMemo(() => getTemplateStats(), []);

  // Filter templates based on current filters
  const filteredTemplates = useMemo(() => {
    let filtered = allTemplates;

    // Apply filters
    if (selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (selectedStyle !== "all") {
      filtered = filtered.filter((t) => t.style === selectedStyle);
    }

    if (showATSOnly) {
      filtered = filtered.filter((t) => t.isATSFriendly);
    }

    if (showFreeOnly) {
      filtered = filtered.filter((t) => !t.isPremium);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [allTemplates, selectedCategory, selectedStyle, showATSOnly, showFreeOnly, searchQuery]);

  const handleOpenPreview = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreviewModal(true);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setPreviewTemplate(null);
  };

  return (
    <div className="space-y-6">
      {/* Template Statistics */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{templateStats.total}</p>
              <p className="text-xs text-slate-600">Total Templates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{templateStats.free}</p>
              <p className="text-xs text-slate-600">Free Templates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{templateStats.premium}</p>
              <p className="text-xs text-slate-600">Premium</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{templateStats.atsKriendly}</p>
              <p className="text-xs text-slate-600">ATS-Friendly</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{templateStats.onePage}</p>
              <p className="text-xs text-slate-600">One Page</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search templates by name, style, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as TemplateCategory | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tech">Tech & IT</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>

            {/* Style Filter */}
            <Select
              value={selectedStyle}
              onValueChange={(value) => setSelectedStyle(value as TemplateStyle | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
              </SelectContent>
            </Select>

            {/* ATS Filter */}
            <Button
              variant={showATSOnly ? "default" : "outline"}
              onClick={() => setShowATSOnly(!showATSOnly)}
              className="justify-start"
            >
              <Filter className="h-4 w-4 mr-2" />
              ATS-Friendly
            </Button>

            {/* Free Filter */}
            <Button
              variant={showFreeOnly ? "default" : "outline"}
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className="justify-start"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Free Only
            </Button>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== "all" ||
            selectedStyle !== "all" ||
            showATSOnly ||
            showFreeOnly ||
            searchQuery) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-slate-600">Active filters:</span>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="cursor-pointer capitalize">
                  {selectedCategory}
                </Badge>
              )}
              {selectedStyle !== "all" && (
                <Badge variant="secondary" className="cursor-pointer capitalize">
                  {selectedStyle}
                </Badge>
              )}
              {showATSOnly && <Badge variant="secondary">ATS-Friendly</Badge>}
              {showFreeOnly && <Badge variant="secondary">Free</Badge>}
              {searchQuery && (
                <Badge variant="secondary">Search: {searchQuery}</Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStyle("all");
                  setShowATSOnly(false);
                  setShowFreeOnly(false);
                  setSearchQuery("");
                }}
              >
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Template Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">
            All Templates ({filteredTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="popular">
            <Star className="h-4 w-4 mr-2" />
            Popular
          </TabsTrigger>
        </TabsList>

        {/* All Templates Tab */}
        <TabsContent value="all" className="mt-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplateId === template.id}
                  onSelect={onSelectTemplate}
                  onPreview={handleOpenPreview}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedStyle("all");
                    setShowATSOnly(false);
                    setShowFreeOnly(false);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Popular Templates Tab */}
        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={onSelectTemplate}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      <TemplatePreviewModal
  template={previewTemplate}
  resume={currentResume as any}
  isOpen={showPreviewModal}
  onClose={handleClosePreview}
  onSelect={onSelectTemplate}
  isSelected={previewTemplate?.id === selectedTemplateId}
/>
    </div>
  );
}

// Template Card Component
interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onPreview: (template: Template) => void;
}

function TemplateCard({ template, isSelected, onSelect, onPreview }: TemplateCardProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all hover:shadow-lg",
        isSelected && "ring-2 ring-primary shadow-lg"
      )}
      onClick={() => onSelect(template.id)}
    >
      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-primary text-white rounded-full p-1.5">
          <Check className="h-4 w-4" />
        </div>
      )}

      {/* Premium Badge */}
      {template.isPremium && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
            <Sparkles className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}

      <CardContent className="p-0">
        {/* Template Preview */}
        <div className="relative bg-slate-100 rounded-t-lg h-48 flex items-center justify-center overflow-hidden">
          {/* Placeholder - will be replaced with actual preview */}
          <div className="text-center p-6">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-3" />
            <p className="text-xs text-slate-500 font-medium">{template.name}</p>
          </div>

          {/* Preview Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
            >
              Preview
            </Button>
          </div>
        </div>

        {/* Template Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
            <p className="text-xs text-slate-600 line-clamp-2">
              {template.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {template.isATSFriendly && (
              <Badge variant="outline" className="text-xs">
                ATS
              </Badge>
            )}
            {template.isOnePage && (
              <Badge variant="outline" className="text-xs">
                1-Page
              </Badge>
            )}
            {template.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Popularity */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{template.popularity}% popularity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}