#!/usr/bin/env node

/**
 * Content Intelligence Orchestrator
 * 
 * Coordinates all content collection tasks across YouTube, competitors, and social media
 */

import * as fs from 'fs';
import * as path from 'path';
import YouTubeCollector from './collect-youtube';
import CompetitorCollector from './collect-competitors';
import SocialCollector from './collect-social';
import { CollectionConfig } from '../../src/types/content-intelligence.types';

interface CollectionStats {
  youtube: number;
  competitors: number;
  social: number;
  total: number;
  startTime: string;
  endTime?: string;
  duration?: string;
}

class ContentOrchestrator {
  private configPath: string;
  private config: CollectionConfig | null = null;
  private stats: CollectionStats;

  constructor() {
    this.configPath = path.join(process.cwd(), 'config', 'content-sources.json');
    this.stats = {
      youtube: 0,
      competitors: 0,
      social: 0,
      total: 0,
      startTime: new Date().toISOString()
    };
  }

  /**
   * Load configuration from file
   */
  private loadConfig(): CollectionConfig {
    try {
      if (!fs.existsSync(this.configPath)) {
        console.error(`✗ Configuration file not found: ${this.configPath}`);
        console.log('  Creating default configuration...');
        this.createDefaultConfig();
      }

      const data = fs.readFileSync(this.configPath, 'utf-8');
      this.config = JSON.parse(data);
      return this.config!;
    } catch (error) {
      console.error('✗ Error loading configuration:', error);
      throw error;
    }
  }

  /**
   * Create default configuration file
   */
  private createDefaultConfig(): void {
    const defaultConfig: CollectionConfig = {
      competitors: [
        {
          name: 'Humana',
          type: 'competitor',
          url: 'https://www.humana.com/medicare',
          active: true
        },
        {
          name: 'Aetna',
          type: 'competitor',
          url: 'https://www.aetna.com/individuals-families/medicare.html',
          active: true
        },
        {
          name: 'HealthFirst',
          type: 'competitor',
          url: 'https://www.healthfirst.org/medicare/',
          active: true
        }
      ],
      youtubeChannels: [
        {
          name: 'Medicare Channel Example',
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=EXAMPLE',
          active: true
        }
      ],
      socialProfiles: [
        {
          name: 'Medicare.gov',
          type: 'facebook',
          url: 'https://www.facebook.com/Medicare',
          active: true
        }
      ],
      collectionInterval: 86400000, // 24 hours
      maxItemsPerSource: 50
    };

    const configDir = path.dirname(this.configPath);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2));
    console.log(`✓ Created default configuration at ${this.configPath}`);
  }

  /**
   * Count items in a data file
   */
  private countItems(filename: string): number {
    try {
      const filepath = path.join(process.cwd(), 'data', 'content-intelligence', filename);
      if (fs.existsSync(filepath)) {
        const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        return Array.isArray(data) ? data.length : 0;
      }
    } catch (error) {
      console.error(`Error counting items in ${filename}:`, error);
    }
    return 0;
  }

  /**
   * Update collection statistics
   */
  private updateStats(): void {
    this.stats.youtube = this.countItems('youtube-content.json');
    this.stats.competitors = this.countItems('competitor-content.json');
    this.stats.social = this.countItems('social-content.json');
    this.stats.total = this.stats.youtube + this.stats.competitors + this.stats.social;
  }

  /**
   * Display collection statistics
   */
  private displayStats(): void {
    const endTime = new Date();
    const startTime = new Date(this.stats.startTime);
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    
    this.stats.endTime = endTime.toISOString();
    this.stats.duration = `${Math.floor(duration / 60)}m ${duration % 60}s`;

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  COLLECTION STATISTICS');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`  YouTube Videos:      ${this.stats.youtube}`);
    console.log(`  Competitor Pages:    ${this.stats.competitors}`);
    console.log(`  Social Media Posts:  ${this.stats.social}`);
    console.log(`  ─────────────────────────────────────────────────────`);
    console.log(`  TOTAL ITEMS:         ${this.stats.total}`);
    console.log(`  ─────────────────────────────────────────────────────`);
    console.log(`  Duration:            ${this.stats.duration}`);
    console.log('═══════════════════════════════════════════════════════\n');
  }

  /**
   * Collect YouTube content
   */
  private async collectYouTube(): Promise<void> {
    if (!this.config || !this.config.youtubeChannels.length) {
      console.log('⊘ No YouTube channels configured');
      return;
    }

    const activeChannels = this.config.youtubeChannels.filter(ch => ch.active);
    if (activeChannels.length === 0) {
      console.log('⊘ No active YouTube channels');
      return;
    }

    console.log(`\n${'─'.repeat(55)}`);
    console.log(`📹 YOUTUBE COLLECTION`);
    console.log(`${'─'.repeat(55)}`);

    const collector = new YouTubeCollector();
    const videos = activeChannels.map(ch => ({
      url: ch.url,
      name: ch.name
    }));

    await collector.collect(videos);
  }

  /**
   * Collect competitor content
   */
  private async collectCompetitors(): Promise<void> {
    if (!this.config || !this.config.competitors.length) {
      console.log('⊘ No competitors configured');
      return;
    }

    const activeCompetitors = this.config.competitors.filter(c => c.active);
    if (activeCompetitors.length === 0) {
      console.log('⊘ No active competitors');
      return;
    }

    console.log(`\n${'─'.repeat(55)}`);
    console.log(`🏢 COMPETITOR COLLECTION`);
    console.log(`${'─'.repeat(55)}`);

    const collector = new CompetitorCollector();
    const competitors = activeCompetitors.map(c => ({
      name: c.name,
      url: c.url,
      crawlDepth: 'homepage' as const
    }));

    await collector.collect(competitors);
  }

  /**
   * Collect social media content
   */
  private async collectSocial(): Promise<void> {
    if (!this.config || !this.config.socialProfiles.length) {
      console.log('⊘ No social profiles configured');
      return;
    }

    const activeProfiles = this.config.socialProfiles.filter(p => p.active);
    if (activeProfiles.length === 0) {
      console.log('⊘ No active social profiles');
      return;
    }

    console.log(`\n${'─'.repeat(55)}`);
    console.log(`📱 SOCIAL MEDIA COLLECTION`);
    console.log(`${'─'.repeat(55)}`);

    const collector = new SocialCollector();
    const profiles = activeProfiles.map(p => ({
      name: p.name,
      platform: (p.type === 'facebook' ? 'facebook' : 'instagram') as 'facebook' | 'instagram',
      url: p.url,
      type: 'page' as const
    }));

    await collector.collect(profiles);
  }

  /**
   * Run complete collection workflow
   */
  async runCollection(options: {
    youtube?: boolean;
    competitors?: boolean;
    social?: boolean;
  } = {}): Promise<void> {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║  CONTENT INTELLIGENCE ORCHESTRATOR                    ║');
    console.log('╚═══════════════════════════════════════════════════════╝\n');

    try {
      // Load configuration
      console.log('⚙  Loading configuration...');
      this.loadConfig();
      console.log('✓ Configuration loaded\n');

      // Default to collecting everything if no specific options
      const collectAll = !options.youtube && !options.competitors && !options.social;

      // Run collections
      if (collectAll || options.youtube) {
        await this.collectYouTube();
      }

      if (collectAll || options.competitors) {
        await this.collectCompetitors();
      }

      if (collectAll || options.social) {
        await this.collectSocial();
      }

      // Update and display statistics
      this.updateStats();
      this.displayStats();

      console.log('✓ Collection workflow complete!\n');
      console.log('Next steps:');
      console.log('  1. Run analysis: npm run analyze-content');
      console.log('  2. Generate report: npm run generate-report');
      console.log('  3. View dashboard: npm run dev (then visit /intelligence)\n');

    } catch (error) {
      console.error('\n✗ Collection workflow failed:', error);
      throw error;
    }
  }

  /**
   * Run collection on a schedule
   */
  async runScheduled(): Promise<void> {
    console.log('⏰ Running scheduled collection...\n');
    
    await this.runCollection();

    if (this.config?.collectionInterval) {
      const hours = Math.round(this.config.collectionInterval / 3600000);
      console.log(`⏰ Next collection scheduled in ${hours} hours`);
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const orchestrator = new ContentOrchestrator();

  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: any = {};

  if (args.includes('--youtube')) options.youtube = true;
  if (args.includes('--competitors')) options.competitors = true;
  if (args.includes('--social')) options.social = true;
  if (args.includes('--scheduled')) {
    orchestrator.runScheduled().catch(console.error);
  } else {
    orchestrator.runCollection(options).catch(console.error);
  }
}

export default ContentOrchestrator;

