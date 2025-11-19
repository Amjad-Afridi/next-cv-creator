// lib/types/template.ts

export type TemplateCategory = 
  | 'tech' 
  | 'creative' 
  | 'business' 
  | 'academic' 
  | 'healthcare' 
  | 'education'
  | 'other';

export type TemplateStyle = 
  | 'professional' 
  | 'modern' 
  | 'creative' 
  | 'minimal' 
  | 'classic';

export type LayoutType =
  | 'single-column'
  | 'two-column'
  | 'sidebar'
  | 'timeline'
  | 'asymmetric';

export type HeaderStyle =
  | 'centered'
  | 'left-aligned'
  | 'two-column'
  | 'minimal'
  | 'bold'
  | 'creative'
  | 'gradient';

export type FontFamily =
  | 'inter'
  | 'roboto'
  | 'georgia'
  | 'times'
  | 'arial'
  | 'montserrat'
  | 'poppins'
  | 'openSans'
  | 'lora'
  | 'merriweather'
  | 'playfair'
  | 'raleway'
  | 'nunito'
  | 'sourceCodePro'
  | 'timesNewRoman';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textLight: string;
  background: string;
  border: string;
}

export interface TypographyConfig {
  fontFamily: FontFamily;
  headingFont?: FontFamily;
  bodyFont?: FontFamily;
  sizes: {
    name: number;
    heading: number;
    subheading: number;
    body: number;
    small: number;
  };
  weights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface SpacingConfig {
  sectionGap: number;
  itemGap: number;
  padding: {
    page: number;
    section: number;
  };
  margins: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface LayoutConfig {
  type: LayoutType;
  headerStyle: HeaderStyle;
  columns: number;
  showIcons: boolean;
  showDividers: boolean;
  compactMode: boolean;
}

export interface SectionConfig {
  id: string;
  visible: boolean;
  order: number;
  style?: 'default' | 'card' | 'timeline' | 'compact';
}

export interface TemplateConfig {
  layout: LayoutConfig;
  typography: TypographyConfig;
  colors: ColorScheme;
  spacing: SpacingConfig;
  sections: SectionConfig[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  style: TemplateStyle;
  
  // Visual
  thumbnail: string;
  previewImages: string[];
  
  // Configuration
  config: TemplateConfig;
  
  // Metadata
  tags: string[];
  isPremium: boolean;
  isATSFriendly: boolean;
  isOnePage: boolean;
  popularity: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface TemplateFilter {
  category?: TemplateCategory;
  style?: TemplateStyle;
  tags?: string[];
  search?: string;
  isPremium?: boolean;
  isATSFriendly?: boolean;
}