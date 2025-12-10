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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateCard } from "./TemplateCard";

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
  const [showFilters, setShowFilters] = useState(false);

  const allTemplates = useMemo(() => getAllTemplates(), []);
  const popularTemplates = useMemo(() => getPopularTemplates(), []);
  const templateStats = useMemo(() => getTemplateStats(), []);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let filtered = allTemplates;

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

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedStyle("all");
    setShowATSOnly(false);
    setShowFreeOnly(false);
    setSearchQuery("");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedStyle !== "all",
    showATSOnly,
    showFreeOnly,
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Template Statistics */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4 md:pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 text-center">
            <div>
              <p className="text-xl md:text-2xl font-bold text-primary">{templateStats.total}</p>
              <p className="text-xs text-slate-600">Total</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-green-600">{templateStats.free}</p>
              <p className="text-xs text-slate-600">Free</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-yellow-600">{templateStats.premium}</p>
              <p className="text-xs text-slate-600">Premium</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-blue-600">{templateStats.atsKriendly}</p>
              <p className="text-xs text-slate-600">ATS</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xl md:text-2xl font-bold text-purple-600">{templateStats.onePage}</p>
              <p className="text-xs text-slate-600">One Page</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4 md:pt-6 space-y-3 md:space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden relative"
            >
              <Filter className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filters - Show on desktop, toggle on mobile */}
          <div className={`space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-3 ${showFilters ? 'block' : 'hidden md:grid'}`}>
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
                <SelectItem value="tech">Tech</SelectItem>
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
              className="justify-start w-full"
              size="default"
            >
              ATS-Friendly
            </Button>

            {/* Free Filter */}
            <Button
              variant={showFreeOnly ? "default" : "outline"}
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className="justify-start w-full"
              size="default"
            >
              Free Only
            </Button>
          </div>

          {/* Clear Filters - Show when filters active */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-sm text-slate-600">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Templates Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">
            All Templates ({filteredTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="popular">
            Popular ({popularTemplates.length})
          </TabsTrigger>
        </TabsList>

        {/* All Templates Tab */}
        <TabsContent value="all" className="mt-4 md:mt-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplateId === template.id}
                  onSelect={onSelectTemplate}
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
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Popular Templates Tab */}
        <TabsContent value="popular" className="mt-4 md:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}