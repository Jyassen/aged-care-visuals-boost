// Content Intelligence Type Definitions

export type ContentSource = 'youtube' | 'facebook' | 'instagram' | 'competitor';
export type ContentFormat = 'video' | 'post' | 'article' | 'ad' | 'page';
export type Priority = 'high' | 'medium' | 'low';

export interface ContentItem {
  id: string;
  source: ContentSource;
  platform: string;
  url: string;
  title: string;
  content: string;
  publishedDate?: string;
  collectedDate: string;
  engagement?: EngagementMetrics;
  metadata?: ContentMetadata;
  themes: string[];
  messagingPatterns: string[];
}

export interface EngagementMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  engagementRate?: number;
}

export interface ContentMetadata {
  duration?: number;
  format?: ContentFormat;
  visualStyle?: string;
  cta?: string;
  author?: string;
  tags?: string[];
}

export interface ThemeInsight {
  theme: string;
  frequency: number;
  averageEngagement?: number;
  examples: string[];
}

export interface MessagingPattern {
  pattern: string;
  frequency: number;
  effectiveness?: number;
  examples: string[];
}

export interface VisualStyle {
  style: string;
  frequency: number;
  platforms: string[];
}

export interface TopPerformer {
  id: string;
  title: string;
  url: string;
  source: string;
  engagementScore: number;
  keyFactors: string[];
}

export interface CompetitorGap {
  opportunity: string;
  description: string;
  potentialImpact: Priority;
}

export interface Recommendation {
  category: string;
  recommendation: string;
  priority: Priority;
  basedOn: string;
}

export interface InsightsSummary {
  totalItems: number;
  bySource: {
    youtube: number;
    facebook: number;
    instagram: number;
    competitor: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
}

export interface AggregatedInsights {
  generatedDate: string;
  summary: InsightsSummary;
  topThemes: ThemeInsight[];
  messagingPatterns: MessagingPattern[];
  visualStyles: VisualStyle[];
  topPerformers: TopPerformer[];
  competitorGaps: CompetitorGap[];
  recommendations: Recommendation[];
}

export interface ContentSource {
  name: string;
  type: ContentSource;
  url: string;
  active: boolean;
}

export interface CollectionConfig {
  competitors: ContentSource[];
  youtubeChannels: ContentSource[];
  socialProfiles: ContentSource[];
  collectionInterval?: number;
  maxItemsPerSource?: number;
}

