/**
 * Content Intelligence API Endpoint
 * 
 * Serves aggregated insights data to the dashboard
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Path to insights data
    const insightsPath = path.join(
      __dirname,
      '..',
      'data',
      'content-intelligence',
      'insights-aggregated.json'
    );

    // Check if file exists
    if (!fs.existsSync(insightsPath)) {
      return res.status(404).json({
        error: 'No insights data available',
        message: 'Run content collection and analysis first'
      });
    }

    // Read and parse insights data
    const insightsData = fs.readFileSync(insightsPath, 'utf-8');
    const insights = JSON.parse(insightsData);

    // Validate data structure
    if (!insights.generatedDate || !insights.summary) {
      return res.status(500).json({
        error: 'Invalid insights data format'
      });
    }

    // Set cache headers (cache for 5 minutes)
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('Content-Type', 'application/json');

    // Return insights data
    return res.status(200).json(insights);

  } catch (error) {
    console.error('Error loading insights:', error);
    return res.status(500).json({
      error: 'Failed to load insights data',
      message: error.message
    });
  }
}

