#!/usr/bin/env node

/**
 * YouTube Content Collector
 * 
 * Collects video transcripts and metadata from YouTube URLs using Supadata
 */

import * as fs from 'fs';
import * as path from 'path';
import { ContentItem } from '../../src/types/content-intelligence.types';

interface YouTubeVideoConfig {
  url: string;
  name: string;
}

interface TranscriptResult {
  url: string;
  transcript: string;
  metadata?: {
    title?: string;
    duration?: number;
    views?: number;
    likes?: number;
    comments?: number;
    publishedDate?: string;
    author?: string;
  };
}

class YouTubeCollector {
  private dataPath: string;
  private outputFile: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'content-intelligence');
    this.outputFile = path.join(this.dataPath, 'youtube-content.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory(): void {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }
  }

  private loadExistingData(): ContentItem[] {
    try {
      if (fs.existsSync(this.outputFile)) {
        const data = fs.readFileSync(this.outputFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
    return [];
  }

  private saveData(items: ContentItem[]): void {
    fs.writeFileSync(this.outputFile, JSON.stringify(items, null, 2));
    console.log(`✓ Saved ${items.length} items to ${this.outputFile}`);
  }

  /**
   * Extract video ID from YouTube URL
   */
  private extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  /**
   * Request transcript from Supadata
   * Note: In actual implementation, this would call the MCP tool
   */
  private async requestTranscript(url: string): Promise<TranscriptResult | null> {
    console.log(`→ Requesting transcript for: ${url}`);
    
    // This is a placeholder - actual implementation would use MCP tools
    // For now, return a structure that matches expected format
    console.log('  ⚠ Note: Using Supadata MCP tools (supadata_transcript) to fetch actual data');
    console.log('  ⚠ This placeholder will be replaced with actual MCP tool calls');
    
    return null;
  }

  /**
   * Parse transcript text to extract themes and patterns
   */
  private extractBasicThemes(content: string): string[] {
    const themes: Set<string> = new Set();
    const keywords = [
      'Medicare Advantage',
      'Original Medicare',
      'Medigap',
      'Part D',
      'enrollment',
      'premium',
      'copay',
      'deductible',
      'coverage',
      'prescription',
      'doctor network',
      'AEP',
      'Annual Enrollment',
      'supplement',
      'cost comparison',
      'turning 65',
      'retirement',
      'healthcare',
      'benefits',
      'savings'
    ];

    const lowerContent = content.toLowerCase();
    keywords.forEach(keyword => {
      if (lowerContent.includes(keyword.toLowerCase())) {
        themes.add(keyword);
      }
    });

    return Array.from(themes);
  }

  /**
   * Extract basic messaging patterns from content
   */
  private extractMessagingPatterns(content: string): string[] {
    const patterns: Set<string> = new Set();
    const lowerContent = content.toLowerCase();

    // Common Medicare messaging patterns
    const patternIndicators = [
      { pattern: 'confusion-empathy', keywords: ['confused', 'overwhelming', 'complicated'] },
      { pattern: 'cost-focus', keywords: ['save money', 'cost', 'expensive', 'affordable'] },
      { pattern: 'deadline-urgency', keywords: ['deadline', 'enrollment period', 'act now', 'before'] },
      { pattern: 'educational', keywords: ['learn', 'understand', 'explained', 'guide'] },
      { pattern: 'comparison', keywords: ['compare', 'versus', 'vs', 'difference between'] },
      { pattern: 'expert-authority', keywords: ['expert', 'years of experience', 'licensed', 'professional'] },
      { pattern: 'personalized', keywords: ['your situation', 'personalized', 'specific to you', 'individual'] },
      { pattern: 'no-pressure', keywords: ['no obligation', 'no pressure', 'free consultation', 'no cost'] }
    ];

    patternIndicators.forEach(({ pattern, keywords }) => {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        patterns.add(pattern);
      }
    });

    return Array.from(patterns);
  }

  /**
   * Calculate engagement rate from metrics
   */
  private calculateEngagementRate(views?: number, likes?: number, comments?: number): number | undefined {
    if (!views || views === 0) return undefined;
    const interactions = (likes || 0) + (comments || 0);
    return (interactions / views) * 100;
  }

  /**
   * Process a single YouTube video
   */
  async processVideo(videoUrl: string, channelName: string): Promise<ContentItem | null> {
    try {
      const videoId = this.extractVideoId(videoUrl);
      if (!videoId) {
        console.error(`✗ Invalid YouTube URL: ${videoUrl}`);
        return null;
      }

      console.log(`\n📹 Processing: ${channelName} - ${videoId}`);

      // Request transcript
      const result = await this.requestTranscript(videoUrl);
      if (!result) {
        console.log('  ⚠ Transcript not available or request failed');
        return null;
      }

      // Create content item
      const item: ContentItem = {
        id: `youtube-${videoId}-${Date.now()}`,
        source: 'youtube',
        platform: channelName,
        url: videoUrl,
        title: result.metadata?.title || `YouTube Video ${videoId}`,
        content: result.transcript,
        publishedDate: result.metadata?.publishedDate,
        collectedDate: new Date().toISOString(),
        engagement: {
          views: result.metadata?.views,
          likes: result.metadata?.likes,
          comments: result.metadata?.comments,
          engagementRate: this.calculateEngagementRate(
            result.metadata?.views,
            result.metadata?.likes,
            result.metadata?.comments
          )
        },
        metadata: {
          duration: result.metadata?.duration,
          format: 'video',
          author: result.metadata?.author || channelName
        },
        themes: this.extractBasicThemes(result.transcript),
        messagingPatterns: this.extractMessagingPatterns(result.transcript)
      };

      console.log(`  ✓ Extracted ${item.themes.length} themes, ${item.messagingPatterns.length} patterns`);
      return item;

    } catch (error) {
      console.error(`✗ Error processing ${videoUrl}:`, error);
      return null;
    }
  }

  /**
   * Collect content from multiple YouTube videos
   */
  async collect(videos: YouTubeVideoConfig[]): Promise<void> {
    console.log(`\n🎬 Starting YouTube collection for ${videos.length} videos...\n`);

    const existingData = this.loadExistingData();
    const newItems: ContentItem[] = [];

    for (const video of videos) {
      const item = await this.processVideo(video.url, video.name);
      if (item) {
        newItems.push(item);
      }
      
      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Merge with existing data (avoid duplicates by URL)
    const allItems = [...existingData];
    newItems.forEach(newItem => {
      const exists = allItems.some(item => item.url === newItem.url);
      if (!exists) {
        allItems.push(newItem);
      } else {
        console.log(`  ↻ Skipping duplicate: ${newItem.url}`);
      }
    });

    this.saveData(allItems);
    console.log(`\n✓ Collection complete! Added ${newItems.length} new items.`);
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const collector = new YouTubeCollector();

  // Example usage with sample videos
  const sampleVideos: YouTubeVideoConfig[] = [
    { url: 'https://www.youtube.com/watch?v=EXAMPLE', name: 'Sample Medicare Channel' }
  ];

  console.log('═══════════════════════════════════════════════════════');
  console.log('  YouTube Content Collector');
  console.log('  Using Supadata for transcript extraction');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n⚠ To use this script:');
  console.log('  1. Add video URLs to config/content-sources.json');
  console.log('  2. Run via orchestrator: npm run collect-content');
  console.log('  3. Or directly: ts-node scripts/content-intelligence/collect-youtube.ts\n');

  // For demonstration, show what would happen
  collector.collect(sampleVideos).catch(console.error);
}

export default YouTubeCollector;

