// lib/templates/templateGenerator.ts

import { Template, FontFamily } from "@/lib/types/template";
import { baseTemplates } from "./baseTemplates";
import { colorSchemes } from "./colorSchemes";

/**
 * Generate all template variations
 * Creates 50+ templates from base templates by varying:
 * - Colors (8 schemes)
 * - Fonts (3 combinations per base)
 * - Minor layout tweaks
 */
export function generateAllTemplates(): Template[] {
  const allTemplates: Template[] = [];

  // Font combinations for variations
  const fontCombinations: Array<{
    name: string;
    heading: FontFamily;
    body: FontFamily;
  }> = [
    { name: 'sans-modern', heading: 'inter', body: 'inter' },
    { name: 'sans-classic', heading: 'arial', body: 'arial' },
    { name: 'serif-traditional', heading: 'georgia', body: 'georgia' },
    { name: 'serif-formal', heading: 'times', body: 'times' },
    { name: 'mixed-professional', heading: 'montserrat', body: 'inter' },
    { name: 'mixed-modern', heading: 'poppins', body: 'roboto' },
  ];

  baseTemplates.forEach((baseTemplate) => {
    // 1. Add original base template
    allTemplates.push(baseTemplate);

    // 2. Generate color variations
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
        popularity: Math.max(baseTemplate.popularity - Math.random() * 15, 50),
      };

      allTemplates.push(colorVariation);
    });

    // 3. Generate font variations (only for top 2 base templates)
    if (baseTemplate.popularity > 85) {
      fontCombinations.slice(0, 3).forEach((fontCombo) => {
        // Skip if it's the same font as base
        if (
          baseTemplate.config.typography.headingFont === fontCombo.heading &&
          baseTemplate.config.typography.bodyFont === fontCombo.body
        ) {
          return;
        }

        const fontVariation: Template = {
          ...baseTemplate,
          id: `${baseTemplate.id}-${fontCombo.name}`,
          name: `${baseTemplate.name} (${formatFontName(fontCombo.name)})`,
          config: {
            ...baseTemplate.config,
            typography: {
              ...baseTemplate.config.typography,
              headingFont: fontCombo.heading,
              bodyFont: fontCombo.body,
              fontFamily: fontCombo.body,
            },
          },
          popularity: Math.max(baseTemplate.popularity - Math.random() * 20, 45),
        };

        allTemplates.push(fontVariation);
      });
    }

    // 4. Generate compact variations (for multi-page templates)
    if (!baseTemplate.isOnePage && !baseTemplate.config.layout.compactMode) {
      const compactVariation: Template = {
        ...baseTemplate,
        id: `${baseTemplate.id}-compact`,
        name: `${baseTemplate.name} (Compact)`,
        description: `${baseTemplate.description} - Optimized for one page`,
        config: {
          ...baseTemplate.config,
          layout: {
            ...baseTemplate.config.layout,
            compactMode: true,
          },
          spacing: {
            ...baseTemplate.config.spacing,
            sectionGap: Math.max(baseTemplate.config.spacing.sectionGap - 4, 8),
            itemGap: Math.max(baseTemplate.config.spacing.itemGap - 4, 6),
          },
          typography: {
            ...baseTemplate.config.typography,
            sizes: {
              ...baseTemplate.config.typography.sizes,
              name: baseTemplate.config.typography.sizes.name - 2,
              heading: baseTemplate.config.typography.sizes.heading - 1,
              subheading: baseTemplate.config.typography.sizes.subheading - 1,
              body: Math.max(baseTemplate.config.typography.sizes.body - 1, 9),
            },
          },
        },
        isOnePage: true,
        tags: [...baseTemplate.tags, 'one-page', 'compact'],
        popularity: Math.max(baseTemplate.popularity - 10, 40),
      };

      allTemplates.push(compactVariation);
    }
  });

  // Sort by popularity
  return allTemplates.sort((a, b) => b.popularity - a.popularity);
}

/**
 * Format color scheme name for display
 */
function formatSchemeName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Format font combination name for display
 */
function formatFontName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get recommended templates based on user's profile
 */
export function getRecommendedTemplates(
  jobTitle?: string,
  industry?: string,
  experienceLevel?: 'entry' | 'mid' | 'senior'
): Template[] {
  const allTemplates = generateAllTemplates();

  // Smart recommendations based on profile
  let recommended = allTemplates;

  // Filter by industry/job title
  if (industry) {
    const industryMap: Record<string, string[]> = {
      tech: ['tech', 'modern', 'minimal'],
      creative: ['creative', 'bold', 'colorful'],
      business: ['professional', 'corporate', 'traditional'],
      academic: ['academic', 'classic', 'formal'],
      healthcare: ['professional', 'traditional'],
    };

    const relevantStyles = industryMap[industry.toLowerCase()] || [];
    if (relevantStyles.length > 0) {
      recommended = recommended.filter(
        (t) =>
          relevantStyles.some((style) =>
            t.tags.some((tag) => tag.toLowerCase().includes(style))
          ) || relevantStyles.includes(t.style)
      );
    }
  }

  // Filter by experience level
  if (experienceLevel === 'entry') {
    // Entry level: prefer simpler, ATS-friendly templates
    recommended = recommended.filter((t) => t.isATSFriendly);
  } else if (experienceLevel === 'senior') {
    // Senior: can use more detailed templates
    recommended = recommended.filter((t) => !t.config.layout.compactMode);
  }

  return recommended.slice(0, 6);
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