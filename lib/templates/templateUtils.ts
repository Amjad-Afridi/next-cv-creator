// lib/templates/templateUtils.ts

import { Template, TemplateFilter } from "@/lib/types/template";
import { generateAllTemplates } from "./templateGenerator";

// Cache generated templates
let cachedTemplates: Template[] | null = null;

/**
 * Get all available templates (with caching for performance)
 */
export function getAllTemplates(): Template[] {
  if (!cachedTemplates) {
    console.log('Generating templates...');
    const start = Date.now();
    cachedTemplates = generateAllTemplates();
    console.log(`Generated ${cachedTemplates.length} templates in ${Date.now() - start}ms`);
  }
  return cachedTemplates;
}

/**
 * Get a single template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return getAllTemplates().find((template) => template.id === id);
}

/**
 * Filter templates based on criteria
 */
export function filterTemplates(filters: TemplateFilter): Template[] {
  let filtered = getAllTemplates();

  if (filters.category) {
    filtered = filtered.filter((t) => t.category === filters.category);
  }

  if (filters.style) {
    filtered = filtered.filter((t) => t.style === filters.style);
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((t) =>
      filters.tags!.some((tag) => t.tags.includes(tag))
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  if (filters.isPremium !== undefined) {
    filtered = filtered.filter((t) => t.isPremium === filters.isPremium);
  }

  if (filters.isATSFriendly !== undefined) {
    filtered = filtered.filter((t) => t.isATSFriendly === filters.isATSFriendly);
  }

  return filtered;
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: string): Template[] {
  return getAllTemplates().filter((t) => t.category === category);
}

/**
 * Get popular templates (sorted by popularity, best first)
 */
export function getPopularTemplates(limit: number = 6): Template[] {
  return getAllTemplates()
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

/**
 * Get all available color schemes
 */
export { colorSchemes as getAllColorSchemes } from "./colorSchemes";

/**
 * Clear template cache (useful for development)
 */
export function clearTemplateCache(): void {
  cachedTemplates = null;
}