// lib/templates/templateGenerator.ts

import { Template } from "@/lib/types/template";
import { baseTemplates } from "./baseTemplates";
import { colorSchemes } from "./colorSchemes";

/**
 * Generate all template variations
 * 7 base templates × 5 colors = 35 professional templates
 */
export function generateAllTemplates(): Template[] {
  const allTemplates: Template[] = [];

  baseTemplates.forEach((baseTemplate) => {
    // 1. Add original base template
    allTemplates.push(baseTemplate);

    // 2. Generate color variations (skip the color that's already used)
    Object.entries(colorSchemes).forEach(([schemeName, scheme]) => {
      // Skip if it's the same color scheme as base
      if (JSON.stringify(baseTemplate.config.colors) === JSON.stringify(scheme)) {
        return;
      }

      const colorVariation: Template = {
        ...baseTemplate,
        id: `${baseTemplate.id}-${schemeName}`,
        name: `${baseTemplate.name} (${formatSchemeName(schemeName)})`,
        config: {
          ...baseTemplate.config,
          colors: scheme,
        },
        popularity: Math.max(baseTemplate.popularity - Math.random() * 10, 70),
      };

      allTemplates.push(colorVariation);
    });
  });

  return allTemplates.sort((a, b) => b.popularity - a.popularity);
}

/**
 * Format color scheme name for display
 */
function formatSchemeName(name: string): string {
  const formatted = name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
  
  // Capitalize each word
  return formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get template statistics
 */
export function getTemplateStats() {
  const allTemplates = generateAllTemplates();

  return {
    total: allTemplates.length,
    free: allTemplates.filter((t) => !t.isPremium).length,
    premium: allTemplates.filter((t) => t.isPremium).length,
    atsKriendly: allTemplates.filter((t) => t.isATSFriendly).length,
    onePage: allTemplates.filter((t) => t.isOnePage).length,
    byCategory: {
      tech: allTemplates.filter((t) => t.category === 'tech').length,
      creative: allTemplates.filter((t) => t.category === 'creative').length,
      business: allTemplates.filter((t) => t.category === 'business').length,
      academic: allTemplates.filter((t) => t.category === 'academic').length,
      healthcare: allTemplates.filter((t) => t.category === 'healthcare').length,
      education: allTemplates.filter((t) => t.category === 'education').length,
    },
    byStyle: {
      professional: allTemplates.filter((t) => t.style === 'professional').length,
      modern: allTemplates.filter((t) => t.style === 'modern').length,
      creative: allTemplates.filter((t) => t.style === 'creative').length,
      minimal: allTemplates.filter((t) => t.style === 'minimal').length,
      classic: allTemplates.filter((t) => t.style === 'classic').length,
    },
  };
}