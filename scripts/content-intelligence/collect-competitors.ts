#!/usr/bin/env node

/**
 * Competitor Website Collector
 * 
 * Scrapes competitor websites using Supadata to gather content, messaging, and visual patterns
 */

import * as fs from 'fs';
import * as path from 'path';
import { ContentItem } from '../../src/types/content-intelligence.types';

interface CompetitorConfig {
  name: string;
  url: string;
  crawlDepth?: 'full' | 'homepage' | 'specific';
  specificPages?: string[];
}

interface ScrapedPage {
  url: string;
  name: string;
  content: string;
  description?: string;
  links?: string[];
}

class CompetitorCollector {
  private dataPath: string;
  private outputFile: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'content-intelligence');
    this.outputFile = path.join(this.dataPath, 'competitor-content.json');
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
   * Map all URLs on a website using Supadata
   */
  private async mapWebsite(url: string): Promise<string[]> {
    console.log(`  → Mapping website: ${url}`);
    console.log('  ⚠ Using Supadata MCP tool (supadata_map) to discover URLs');
    
    // Placeholder - actual implementation uses MCP tools
    return [];
  }

  /**
   * Scrape a single page using Supadata
   */
  private async scrapePage(url: string): Promise<ScrapedPage | null> {
    console.log(`  → Scraping: ${url}`);
    console.log('  ⚠ Using Supadata MCP tool (supadata_scrape) to extract content');
    
    // Placeholder - actual implementation uses MCP tools
    return null;
  }

  /**
   * Crawl entire website using Supadata
   */
  private async crawlWebsite(url: string, limit: number = 50): Promise<ScrapedPage[]> {
    console.log(`  → Starting crawl of: ${url} (limit: ${limit} pages)`);
    console.log('  ⚠ Using Supadata MCP tool (supadata_crawl) to crawl website');
    console.log('  ⚠ This will create a job and poll for results');
    
    // Placeholder - actual implementation uses MCP tools
    // Would use supadata_crawl and supadata_check_crawl_status
    return [];
  }

  /**
   * Extract themes from content
   */
  private extractThemes(content: string): string[] {
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
      'prescription drugs',
      'doctor network',
      'Annual Enrollment',
      'supplement plans',
      'preventive care',
      'dental coverage',
      'vision coverage',
      'hearing aids',
      'fitness benefits',
      'transportation',
      'telehealth',
      'cost comparison',
      'plan comparison',
      'customer service',
      'local agents',
      'star ratings',
      'benefits',
      'claims process'
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
   * Extract messaging patterns
   */
  private extractMessagingPatterns(content: string, url: string): string[] {
    const patterns: Set<string> = new Set();
    const lowerContent = content.toLowerCase();

    const patternIndicators = [
      { pattern: 'trust-building', keywords: ['trusted', 'reliable', 'years of experience', 'established', 'reputation'] },
      { pattern: 'local-focus', keywords: ['local', 'community', 'neighborhood', 'nearby', 'area'] },
      { pattern: 'easy-enrollment', keywords: ['easy', 'simple', 'quick enrollment', 'straightforward', 'hassle-free'] },
      { pattern: 'comprehensive-coverage', keywords: ['comprehensive', 'complete', 'full coverage', 'everything you need'] },
      { pattern: 'cost-savings', keywords: ['save', 'affordable', 'low cost', '$0 premium', 'no cost'] },
      { pattern: 'customer-support', keywords: ['support', 'help', 'assistance', '24/7', 'customer service'] },
      { pattern: 'extra-benefits', keywords: ['extra', 'additional', 'bonus', 'includes', 'plus'] },
      { pattern: 'star-rating', keywords: ['5-star', 'highly rated', 'top rated', 'award', 'excellence'] },
      { pattern: 'personalized', keywords: ['personalized', 'customized', 'tailored', 'fits your needs'] },
      { pattern: 'urgency', keywords: ['deadline', 'limited time', 'act now', 'enroll today', 'don\'t wait'] }
    ];

    patternIndicators.forEach(({ pattern, keywords }) => {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        patterns.add(pattern);
      }
    });

    // Page type patterns
    if (url.includes('/blog') || url.includes('/articles')) {
      patterns.add('educational-content');
    }
    if (url.includes('/plans') || url.includes('/coverage')) {
      patterns.add('plan-details');
    }
    if (url.includes('/enroll') || url.includes('/apply')) {
      patterns.add('conversion-focused');
    }
    if (url.includes('/about') || url.includes('/company')) {
      patterns.add('about-us');
    }

    return Array.from(patterns);
  }

  /**
   * Extract CTAs from content
   */
  private extractCTA(content: string): string | undefined {
    const ctaPatterns = [
      /call us at [\d\-\(\) ]+/i,
      /enroll (now|today|online)/i,
      /get a quote/i,
      /find a plan/i,
      /compare plans/i,
      /speak with an agent/i,
      /schedule a call/i,
      /request information/i,
      /learn more/i
    ];

    for (const pattern of ctaPatterns) {
      const match = content.match(pattern);
      if (match) return match[0];
    }

    return undefined;
  }

  /**
   * Detect visual style indicators from content
   */
  private detectVisualStyle(content: string, url: string): string {
    const lowerContent = content.toLowerCase();
    const styles: string[] = [];

    if (lowerContent.includes('video') || lowerContent.includes('watch')) {
      styles.push('video-content');
    }
    if (lowerContent.includes('testimonial') || lowerContent.includes('review')) {
      styles.push('testimonials');
    }
    if (lowerContent.includes('calculator') || lowerContent.includes('tool')) {
      styles.push('interactive-tools');
    }
    if (lowerContent.includes('compare') && lowerContent.includes('chart')) {
      styles.push('comparison-charts');
    }

    return styles.length > 0 ? styles.join(', ') : 'informational';
  }

  /**
   * Process a single competitor website
   */
  async processCompetitor(config: CompetitorConfig): Promise<ContentItem[]> {
    console.log(`\n🏢 Processing competitor: ${config.name}`);
    console.log(`   URL: ${config.url}`);

    const items: ContentItem[] = [];

    try {
      if (config.crawlDepth === 'full') {
        // Full website crawl
        console.log('  📊 Starting full website crawl...');
        const pages = await this.crawlWebsite(config.url);
        
        for (const page of pages) {
          items.push(this.createContentItem(page, config.name));
        }

      } else if (config.crawlDepth === 'specific' && config.specificPages) {
        // Scrape specific pages
        console.log(`  📄 Scraping ${config.specificPages.length} specific pages...`);
        
        for (const pageUrl of config.specificPages) {
          const page = await this.scrapePage(pageUrl);
          if (page) {
            items.push(this.createContentItem(page, config.name));
          }
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

      } else {
        // Just homepage
        console.log('  🏠 Scraping homepage only...');
        const page = await this.scrapePage(config.url);
        if (page) {
          items.push(this.createContentItem(page, config.name));
        }
      }

      console.log(`  ✓ Collected ${items.length} pages from ${config.name}`);

    } catch (error) {
      console.error(`  ✗ Error processing ${config.name}:`, error);
    }

    return items;
  }

  /**
   * Create ContentItem from scraped page
   */
  private createContentItem(page: ScrapedPage, competitorName: string): ContentItem {
    const themes = this.extractThemes(page.content);
    const messagingPatterns = this.extractMessagingPatterns(page.content, page.url);
    const cta = this.extractCTA(page.content);
    const visualStyle = this.detectVisualStyle(page.content, page.url);

    return {
      id: `competitor-${competitorName.replace(/\s/g, '-').toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source: 'competitor',
      platform: competitorName,
      url: page.url,
      title: page.name || 'Untitled Page',
      content: page.content,
      collectedDate: new Date().toISOString(),
      metadata: {
        format: 'page',
        visualStyle,
        cta
      },
      themes,
      messagingPatterns
    };
  }

  /**
   * Collect content from multiple competitors
   */
  async collect(competitors: CompetitorConfig[]): Promise<void> {
    console.log(`\n🔍 Starting competitor collection for ${competitors.length} websites...\n`);

    const existingData = this.loadExistingData();
    const newItems: ContentItem[] = [];

    for (const competitor of competitors) {
      const items = await this.processCompetitor(competitor);
      newItems.push(...items);
      
      // Rate limiting between competitors
      await new Promise(resolve => setTimeout(resolve, 3000));
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
  const collector = new CompetitorCollector();

  // Example competitor configurations
  const competitors: CompetitorConfig[] = [
    {
      name: 'Humana',
      url: 'https://www.humana.com/medicare',
      crawlDepth: 'homepage'
    },
    {
      name: 'Aetna',
      url: 'https://www.aetna.com/individuals-families/medicare.html',
      crawlDepth: 'homepage'
    },
    {
      name: 'HealthFirst',
      url: 'https://www.healthfirst.org/medicare/',
      crawlDepth: 'homepage'
    }
  ];

  console.log('═══════════════════════════════════════════════════════');
  console.log('  Competitor Website Collector');
  console.log('  Using Supadata for content scraping & crawling');
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n⚠ To use this script:');
  console.log('  1. Add competitor URLs to config/content-sources.json');
  console.log('  2. Run via orchestrator: npm run collect-content');
  console.log('  3. Or directly: ts-node scripts/content-intelligence/collect-competitors.ts\n');

  // For demonstration
  collector.collect(competitors).catch(console.error);
}

export default CompetitorCollector;

