# Content Intelligence System

An automated content intelligence system that uses Supadata to gather insights from YouTube, Facebook/Instagram, and competitor websites, then generates markdown reports and an interactive dashboard for analyzing trending and high-performing content in the Medicare/aged care niche.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Configuration](#configuration)
- [Data Collection](#data-collection)
- [Analysis](#analysis)
- [Reporting](#reporting)
- [Dashboard](#dashboard)
- [API](#api)
- [Troubleshooting](#troubleshooting)

## Overview

The Content Intelligence System helps you:

- **Monitor** competitors and industry leaders
- **Analyze** what content performs best
- **Identify** opportunities and gaps in your content strategy
- **Generate** actionable recommendations
- **Visualize** insights through an interactive dashboard

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Data Collection                      │
│  (YouTube, Social Media, Competitor Websites)       │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│             Analysis Engine                          │
│  (Themes, Messaging, Engagement)                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   ├─────────────┬───────────────┐
                   ▼             ▼               ▼
          ┌───────────────┐  ┌──────────┐  ┌─────────┐
          │    Markdown   │  │ Dashboard│  │   API   │
          │    Reports    │  │   (Web)  │  │Endpoint │
          └───────────────┘  └──────────┘  └─────────┘
```

## Features

### Data Collection

- **YouTube**: Extract video transcripts and metadata using Supadata
- **Competitors**: Crawl and scrape competitor websites (Humana, Aetna, HealthFirst, etc.)
- **Social Media**: Gather Facebook and Instagram content (where accessible)

### Analysis

- **Theme Extraction**: Identify recurring topics and content themes
- **Messaging Analysis**: Extract hooks, pain points, CTAs, and messaging patterns
- **Engagement Scoring**: Calculate engagement scores based on multiple metrics
- **Competitor Gaps**: Identify opportunities competitors aren't addressing
- **Recommendations**: Generate actionable, data-driven recommendations

### Reporting

- **Markdown Reports**: Comprehensive reports with text-based charts
- **Dashboard**: Interactive web-based visualization
- **API**: RESTful endpoint for programmatic access

## Setup

### Prerequisites

- Node.js 18+ and npm
- TypeScript configured
- Supadata MCP tools configured

### Installation

The system is already integrated into the YourMedGuy project. No additional installation required.

### Verify Setup

```bash
# Check that all required directories exist
ls -la data/content-intelligence/
ls -la scripts/content-intelligence/
ls -la config/

# Verify configuration file
cat config/content-sources.json
```

## Usage

### Quick Start

```bash
# 1. Run complete workflow (collection + analysis + report)
npm run content-intelligence

# Or run steps individually:

# 2. Collect content from all sources
npm run collect-content

# 3. Analyze collected content
npm run analyze-content

# 4. Generate markdown report
npm run generate-report

# 5. Start dev server to view dashboard
npm run dev
# Then visit http://localhost:3000/intelligence
```

### Detailed Workflow

#### Step 1: Configure Sources

Edit `config/content-sources.json` to add or modify content sources:

```json
{
  "competitors": [
    {
      "name": "Your Competitor",
      "type": "competitor",
      "url": "https://competitor.com/medicare",
      "active": true
    }
  ],
  "youtubeChannels": [
    {
      "name": "Channel Name",
      "type": "youtube",
      "url": "https://www.youtube.com/@channel",
      "active": true
    }
  ]
}
```

#### Step 2: Collect Content

```bash
# Collect from all sources
ts-node scripts/content-intelligence/orchestrator.ts

# Or collect from specific sources
ts-node scripts/content-intelligence/orchestrator.ts --youtube
ts-node scripts/content-intelligence/orchestrator.ts --competitors
ts-node scripts/content-intelligence/orchestrator.ts --social
```

**Output**: Content saved to `data/content-intelligence/`:
- `youtube-content.json`
- `competitor-content.json`
- `social-content.json`

#### Step 3: Analyze Content

```bash
# Run full analysis
ts-node scripts/content-intelligence/analysis/generate-insights.ts

# Or run individual analysis modules
ts-node scripts/content-intelligence/analysis/extract-themes.ts
ts-node scripts/content-intelligence/analysis/analyze-messaging.ts
ts-node scripts/content-intelligence/analysis/calculate-engagement.ts
```

**Output**: Insights saved to `data/content-intelligence/insights-aggregated.json`

#### Step 4: Generate Report

```bash
# Generate markdown report
ts-node scripts/content-intelligence/reports/generate-markdown-report.ts
```

**Output**: Reports saved to `docs/content-intelligence/reports/`:
- `content-intelligence-report-[timestamp].md`
- `latest-report.md`

#### Step 5: View Dashboard

```bash
# Start development server
npm run dev
```

Visit `http://localhost:3000/intelligence` to view the interactive dashboard.

## Configuration

### Content Sources

Edit `config/content-sources.json`:

```json
{
  "competitors": [...],
  "youtubeChannels": [...],
  "socialProfiles": [...],
  "collectionInterval": 86400000,  // 24 hours in ms
  "maxItemsPerSource": 50
}
```

### Collection Settings

- `active`: Set to `false` to temporarily disable a source
- `collectionInterval`: Time between automated collections (milliseconds)
- `maxItemsPerSource`: Limit items collected per source

## Data Collection

### Supadata Integration

The system uses Supadata MCP tools for content collection:

- `supadata_transcript`: Extract YouTube video transcripts
- `supadata_scrape`: Scrape individual web pages
- `supadata_crawl`: Crawl entire websites
- `supadata_map`: Discover URLs on websites

### Data Structure

Content items are stored with this structure:

```typescript
{
  id: string;
  source: 'youtube' | 'facebook' | 'instagram' | 'competitor';
  platform: string;
  url: string;
  title: string;
  content: string;
  publishedDate?: string;
  collectedDate: string;
  engagement?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    engagementRate?: number;
  };
  themes: string[];
  messagingPatterns: string[];
}
```

## Analysis

### Theme Extraction

Identifies recurring content themes using NLP techniques:

- Medicare plan types
- Enrollment periods
- Cost and pricing
- Coverage topics
- Benefits and features

### Messaging Analysis

Extracts messaging patterns:

- **Hooks**: Question, statistic, pain-point, promise, urgency
- **Pain Points**: Confusion, costs, doctor networks, deadlines
- **CTAs**: Call now, schedule consultation, compare plans, etc.
- **Patterns**: Empathy, education, testimonials, comparisons

### Engagement Scoring

Multi-factor engagement score (0-100):

- Views score (20%)
- Likes score (25%)
- Comments score (25%)
- Shares score (15%)
- Engagement rate score (15%)

### Recommendations

Categorized by priority (high, medium, low):

- Content themes to focus on
- Messaging strategies to use
- Competitive advantages to leverage
- Format and timing suggestions

## Reporting

### Markdown Reports

Generated reports include:

1. **Executive Summary**
   - Collection overview
   - Key findings
   - Distribution charts

2. **Theme Analysis**
   - Top themes by frequency
   - Engagement correlation
   - Trend analysis

3. **Messaging Patterns**
   - Pattern effectiveness
   - Common hooks and CTAs
   - Pain points addressed

4. **Top Performers**
   - Highest engagement content
   - Success factors
   - Source breakdown

5. **Opportunities**
   - Competitor gaps
   - Underserved topics
   - Format opportunities

6. **Recommendations**
   - Prioritized action items
   - Data-backed suggestions
   - Implementation guidance

### Report Location

- Latest: `docs/content-intelligence/reports/latest-report.md`
- Historical: `docs/content-intelligence/reports/content-intelligence-report-[timestamp].md`

## Dashboard

### Features

- **Overview Tab**: Summary cards and key charts
- **Themes Tab**: Theme frequency and performance analysis
- **Engagement Tab**: Top performers and success factors
- **Competitors Tab**: Gap analysis and opportunities
- **Content Tab**: Detailed content table with filtering

### Accessing the Dashboard

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/intelligence`
3. Data is loaded from `/api/content-intelligence`

### Dashboard Components

- `Dashboard.tsx`: Main container
- `ContentTable.tsx`: Filterable content list
- `InsightsCharts.tsx`: Overview visualizations
- `ThemeAnalysis.tsx`: Theme-focused charts
- `EngagementMetrics.tsx`: Performance metrics
- `CompetitorComparison.tsx`: Gap analysis

## API

### Endpoint

```
GET /api/content-intelligence
```

### Response

```json
{
  "generatedDate": "2025-11-15T12:00:00.000Z",
  "summary": {
    "totalItems": 150,
    "bySource": {
      "youtube": 45,
      "facebook": 20,
      "instagram": 15,
      "competitor": 70
    },
    "dateRange": {
      "start": "2025-10-01T00:00:00.000Z",
      "end": "2025-11-15T00:00:00.000Z"
    }
  },
  "topThemes": [...],
  "messagingPatterns": [...],
  "topPerformers": [...],
  "competitorGaps": [...],
  "recommendations": [...]
}
```

### Caching

- Cache duration: 5 minutes
- Header: `Cache-Control: public, max-age=300`

## Troubleshooting

### No Data Available

**Problem**: Dashboard shows "No Data Available"

**Solution**:
```bash
# Run collection and analysis
npm run collect-content
npm run analyze-content
```

### Collection Fails

**Problem**: Content collection scripts error

**Solutions**:
1. Check Supadata MCP tools are configured
2. Verify network connectivity
3. Check URLs in `config/content-sources.json` are valid
4. Review console output for specific errors

### Empty Insights

**Problem**: Analysis generates empty insights

**Solutions**:
1. Ensure content was collected: check `data/content-intelligence/[source]-content.json`
2. Verify JSON files are not empty arrays
3. Re-run collection if files are empty

### Dashboard Won't Load

**Problem**: Dashboard page shows errors

**Solutions**:
1. Check dev server is running: `npm run dev`
2. Verify API endpoint works: `curl http://localhost:3000/api/content-intelligence`
3. Check browser console for errors
4. Ensure insights file exists: `data/content-intelligence/insights-aggregated.json`

### TypeScript Errors

**Problem**: Type errors in components

**Solutions**:
1. Rebuild TypeScript: `npx tsc --noEmit`
2. Check types are exported from `src/types/content-intelligence.types.ts`
3. Restart TypeScript server in your editor

## Scheduled Collection

### Manual Schedule

Use cron or Task Scheduler to run collection periodically:

```bash
# Crontab example - run daily at 2 AM
0 2 * * * cd /path/to/project && npm run content-intelligence
```

### Programmatic Schedule

```typescript
import ContentOrchestrator from './scripts/content-intelligence/orchestrator';

const orchestrator = new ContentOrchestrator();

// Run every 24 hours
setInterval(async () => {
  await orchestrator.runCollection();
}, 24 * 60 * 60 * 1000);
```

## Best Practices

1. **Regular Collection**: Run collection at least weekly during AEP, monthly otherwise
2. **Review Reports**: Check generated reports monthly for trends
3. **Update Sources**: Add/remove sources as competitors change
4. **Monitor Performance**: Track which insights lead to better content
5. **Backup Data**: Regularly backup `data/content-intelligence/` directory
6. **Rate Limiting**: Respect website rate limits and robots.txt
7. **Data Privacy**: Don't collect or store personal information
8. **Attribution**: Properly attribute content sources in your own content

## Support

For issues or questions:

1. Check this README first
2. Review generated report for data quality issues
3. Check console output for error messages
4. Verify all dependencies are installed
5. Ensure Supadata MCP tools are properly configured

---

**Generated by YourMedGuy Content Intelligence System**
*Last Updated: November 2025*

