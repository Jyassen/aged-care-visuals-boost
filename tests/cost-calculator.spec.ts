/**
 * Playwright E2E Tests for Medicare Cost Calculator
 * Tests the complete user flow and functionality
 */

import { test, expect } from '@playwright/test';

test.describe('Medicare Cost Calculator', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the calculator page
    await page.goto('/tools/cost-calculator');
  });

  test('should load the calculator page successfully', async ({ page }) => {
    // Check page title/heading
    await expect(page.getByRole('heading', { name: /What Will Medicare Cost YOU/i })).toBeVisible();
    
    // Check that the form is visible
    await expect(page.getByText('Calculate Your Medicare Costs')).toBeVisible();
    
    // Check trust indicators (updated wording)
    await expect(page.getByText('Quick Estimate')).toBeVisible();
    await expect(page.getByText('No Obligation')).toBeVisible();
    await expect(page.getByText('Instant Results')).toBeVisible();
  });

  test('should display all form fields', async ({ page }) => {
    // Check for age input
    const ageInput = page.locator('input#age');
    await expect(ageInput).toBeVisible();
    
    // Check for ZIP code input
    const zipInput = page.locator('input#zipCode');
    await expect(zipInput).toBeVisible();
    
    // Check for health status select
    const healthSelect = page.locator('#healthStatus');
    await expect(healthSelect).toBeVisible();
    
    // Check for prescription count input
    const prescriptionInput = page.locator('input#prescriptionCount');
    await expect(prescriptionInput).toBeVisible();
    
    // Check for submit button
    await expect(page.getByRole('button', { name: /Calculate My Costs/i })).toBeVisible();
  });

  test('should validate invalid ZIP code', async ({ page }) => {
    // Fill form with invalid ZIP code
    await page.locator('input#age').fill('65');
    await page.locator('input#zipCode').fill('10001'); // NYC, not Long Island
    await page.locator('input#prescriptionCount').fill('3');
    
    // Submit form
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    
    // Check for error message
    await expect(page.getByText(/valid Long Island ZIP code/i)).toBeVisible();
  });

  test('should validate invalid age', async ({ page }) => {
    // Fill form with invalid age
    await page.locator('input#age').fill('45'); // Too young
    await page.locator('input#zipCode').fill('11554');
    
    // Submit form
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    
    // Check for error message
    await expect(page.getByText(/age between 55 and 100/i)).toBeVisible();
  });

  test('should calculate costs successfully with valid inputs', async ({ page }) => {
    // Fill form with valid data
    await page.locator('input#age').fill('65');
    await page.locator('input#zipCode').fill('11554');
    
    // Select health status
    await page.locator('#healthStatus').click();
    await page.getByRole('option', { name: /Good - Routine checkups only/i }).click();
    
    // Fill prescription count
    await page.locator('input#prescriptionCount').fill('3');
    
    // Submit form
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    
    // Wait for results to appear
    await page.waitForTimeout(600); // Wait for calculation animation
    
    // Check for results heading
    await expect(page.getByText('Your Estimated Medicare Costs')).toBeVisible();
    
    // Check for cost display (should show dollar amounts)
    await expect(page.locator('text=/\\$\\d+.*-.*\\$\\d+/')).toBeVisible();
    
    // Check for annual costs
    await expect(page.getByText(/per year/i)).toBeVisible();
    
    // Check for cost breakdown section
    await expect(page.getByText('Cost Breakdown')).toBeVisible();
    await expect(page.getByText('Medicare Part B Premium')).toBeVisible();
    
    // Check for recommendations section
    await expect(page.getByText(/Ways to Optimize Your Costs/i)).toBeVisible();
    
    // Check for CTA
    await expect(page.getByText(/Want a Detailed, Personalized Analysis/i)).toBeVisible();
  });

  test('should show lead capture form when CTA is clicked', async ({ page }) => {
    // First, calculate costs
    await page.locator('input#age').fill('67');
    await page.locator('input#zipCode').fill('11758');
    await page.locator('input#prescriptionCount').fill('5');
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    
    // Wait for results
    await page.waitForTimeout(600);
    
    // Click the consultation CTA (updated wording)
    await page.getByRole('button', { name: /Talk to an Agent/i }).click();
    
    // Check that lead capture form appears (updated heading)
    await expect(page.getByText('Schedule Your Consultation')).toBeVisible();
    
    // Check form fields
    await expect(page.locator('input#firstName')).toBeVisible();
    await expect(page.locator('input#lastName')).toBeVisible();
    await expect(page.locator('input#phone')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
  });

  test('should reset calculator when "Calculate Again" is clicked', async ({ page }) => {
    // Calculate costs first
    await page.locator('input#age').fill('70');
    await page.locator('input#zipCode').fill('11901');
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    
    // Wait for results
    await page.waitForTimeout(600);
    
    // Verify results are shown
    await expect(page.getByText('Your Estimated Medicare Costs')).toBeVisible();
    
    // Click "Calculate Again"
    await page.getByRole('button', { name: /Calculate Again/i }).click();
    
    // Verify form is shown again
    await expect(page.getByText('Calculate Your Medicare Costs')).toBeVisible();
    await expect(page.locator('input#age')).toBeVisible();
  });

  test('should handle excellent health with no prescriptions', async ({ page }) => {
    // Test best-case scenario
    await page.locator('input#age').fill('65');
    await page.locator('input#zipCode').fill('11554');
    await page.locator('#healthStatus').click();
    await page.getByRole('option', { name: /Excellent/i }).click();
    await page.locator('input#prescriptionCount').fill('0');
    
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    await page.waitForTimeout(600);
    
    // Should show results
    await expect(page.getByText('Your Estimated Medicare Costs')).toBeVisible();
    
    // Should have recommendation about zero-premium plans
    await expect(page.getByText(/zero-premium/i)).toBeVisible();
  });

  test('should handle poor health with many prescriptions', async ({ page }) => {
    // Test worst-case scenario
    await page.locator('input#age').fill('75');
    await page.locator('input#zipCode').fill('11758');
    await page.locator('#healthStatus').click();
    await page.getByRole('option', { name: /Poor/i }).click();
    await page.locator('input#prescriptionCount').fill('10');
    
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    await page.waitForTimeout(600);
    
    // Should show results
    await expect(page.getByText('Your Estimated Medicare Costs')).toBeVisible();
    
    // Should have recommendation about Extra Help
    await expect(page.getByText(/Extra Help/i)).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Page should still be functional
    await expect(page.getByRole('heading', { name: /What Will Medicare Cost YOU/i })).toBeVisible();
    await expect(page.getByText('Calculate Your Medicare Costs')).toBeVisible();
    
    // Form should be visible and usable
    await expect(page.locator('input#age')).toBeVisible();
    await expect(page.locator('input#zipCode')).toBeVisible();
  });

  test('should show loading state during calculation', async ({ page }) => {
    await page.locator('input#age').fill('68');
    await page.locator('input#zipCode').fill('11701');
    
    // Click calculate button
    await page.getByRole('button', { name: /Calculate My Costs/i }).click();
    
    // Check for loading state
    await expect(page.getByRole('button', { name: /Calculating/i })).toBeVisible();
  });

  test('should validate all Nassau/Suffolk ZIP codes', async ({ page }) => {
    const validZips = ['11554', '11565', '11701', '11758', '11901', '11950'];
    
    for (const zip of validZips) {
      await page.goto('/tools/cost-calculator');
      await page.locator('input#age').fill('65');
      await page.locator('input#zipCode').fill(zip);
      await page.getByRole('button', { name: /Calculate My Costs/i }).click();
      await page.waitForTimeout(600);
      
      // Should show results, not error
      await expect(page.getByText('Your Estimated Medicare Costs')).toBeVisible();
    }
  });
});

