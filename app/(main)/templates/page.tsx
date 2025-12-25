// app/(main)/templates/page.tsx
"use client";

import { useState, useMemo } from "react";
import { getAllTemplates, getTemplateById, getPopularTemplates } from "@/lib/templates/templateUtils";
import { getTemplateStats } from "@/lib/templates/templateGenerator";
import { generateResumeHTML } from "@/lib/pdf/templateRenderer";
import { sampleResume } from "@/lib/data/sampleResume";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, ArrowLeft, Search, Filter, FileText } from "lucide-react";
import Link from "next/link";
import { HTMLPreview } from "@/components/builder/HTMLPreview";
import { toast } from "sonner";
import { TemplateCategory, TemplateStyle } from "@/lib/types/template";

export default function TemplatesPage() {
  const allTemplates = useMemo(() => getAllTemplates(), []);
  const popularTemplates = useMemo(() => getPopularTemplates(), []);
  const templateStats = useMemo(() => getTemplateStats(), []);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");
  const [selectedStyle, setSelectedStyle] = useState<TemplateStyle | "all">("all");
  const [showATSOnly, setShowATSOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handlePreview = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setIsPreviewOpen(true);
  };

  const handleUseTemplate = (templateId: string) => {
    // Save selected template to localStorage and redirect to builder
    const stored = localStorage.getItem('resume-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.state.currentResume.template = templateId;
      localStorage.setItem('resume-storage', JSON.stringify(parsed));
    }

    toast.success('Template selected!');
    window.location.href = '/builder';
  };

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

  const selectedTemplate = selectedTemplateId ? getTemplateById(selectedTemplateId) : null;

  const previewHTML = useMemo(() => {
    if (!selectedTemplate || !selectedTemplateId) return '';
    try {
      const resumeData = {
        ...sampleResume,
        template: selectedTemplateId,
        styling: {
          ...sampleResume.styling,
          showProfileImage: false,
        },
      };
      return generateResumeHTML(resumeData as any, selectedTemplate);
    } catch (error) {
      console.error('Preview error:', error);
      console.error('Template ID:', selectedTemplateId);
      console.error('Resume data:', sampleResume);
      return '<html><body><p>Error generating preview</p></body></html>';
    }
  }, [selectedTemplate, selectedTemplateId]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-xl">Resume Templates</h1>
                <p className="text-sm text-slate-500">{allTemplates.length} professional templates available</p>
              </div>
            </div>
            <Link href="/builder">
              <Button>
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Choose Your Perfect Template</h2>
          <p className="text-slate-600">
            All templates are ATS-friendly and professionally designed. Click preview to see them in action.
          </p>
        </div>

        {/* Template Statistics */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mb-6">
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
        <Card className="mb-6">
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
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="all">
              All Templates ({filteredTemplates.length})
            </TabsTrigger>
            <TabsTrigger value="popular">
              Popular ({popularTemplates.length})
            </TabsTrigger>
          </TabsList>

          {/* All Templates Tab */}
          <TabsContent value="all">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer" onClick={() => handlePreview(template.id)}>
              <CardContent className="p-0">
                {/* Template Preview Thumbnail */}
                <div className="h-[240px] bg-slate-50 overflow-hidden border-b relative">
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
                    className="pointer-events-none scale-[0.3] origin-top-left"
                    style={{
                      width: '333.33%',
                      height: '333.33%',
                      overflow: 'hidden',
                    }}
                    title={`${template.name} preview`}
                    sandbox="allow-same-origin"
                    scrolling="no"
                  />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                </div>

                {/* Template Info */}
                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm line-clamp-2 flex-1">{template.name}</h3>
                    {template.isPremium && (
                      <Badge variant="default" className="text-xs px-1.5 py-0 h-5">Pro</Badge>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                      {template.style}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(template.id);
                      }}
                      className="flex-1 h-8 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseTemplate(template.id);
                      }}
                      className="flex-1 h-8 text-xs"
                    >
                      Use
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
          <TabsContent value="popular">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer" onClick={() => handlePreview(template.id)}>
                  <CardContent className="p-0">
                    {/* Template Preview Thumbnail */}
                    <div className="h-[240px] bg-slate-50 overflow-hidden border-b relative">
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
                        className="pointer-events-none scale-[0.3] origin-top-left"
                        style={{
                          width: '333.33%',
                          height: '333.33%',
                          overflow: 'hidden',
                        }}
                        title={`${template.name} preview`}
                        sandbox="allow-same-origin"
                        scrolling="no"
                      />
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                    </div>

                    {/* Template Info */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm line-clamp-2 flex-1">{template.name}</h3>
                        {template.isPremium && (
                          <Badge variant="default" className="text-xs px-1.5 py-0 h-5">Pro</Badge>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                          {template.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                          {template.style}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreview(template.id);
                          }}
                          className="flex-1 h-8 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUseTemplate(template.id);
                          }}
                          className="flex-1 h-8 text-xs"
                        >
                          Use
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0">
          <DialogHeader className="px-6 pt-4  border-b">
            <div className="flex items-start justify-between gap-4 pr-5">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-lg">{selectedTemplate?.name}</DialogTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Preview with sample data
                </p>
              </div>
              <Button
                onClick={() => handleUseTemplate(selectedTemplateId!)}
                size="sm"
              >
                Use This Template
              </Button>
            </div>
          </DialogHeader>
          <div className="overflow-auto h-[calc(90vh-120px)]">
            {previewHTML && <HTMLPreview htmlContent={previewHTML} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
