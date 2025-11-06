/**
 * PDF Generation Utilities for Medicare Cost Calculator
 * Creates downloadable PDF reports with calculation results
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CostEstimate, CostCalculatorInput } from '@/types/medicare.types';

/**
 * Generates and downloads a PDF report of the Medicare cost calculation
 */
export const generateCalculatorPDF = (
  estimate: CostEstimate,
  inputs: CostCalculatorInput
): void => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // YourMedGuy blue
    doc.text('YOUR MEDICARE COST ESTIMATE', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setFontSize(12);
    doc.setTextColor(75, 85, 99); // Gray
    doc.text('Nassau & Suffolk County, NY', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 6;
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: 'center' });
    
    // User Inputs Section
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55); // Dark gray
    doc.text('What You Told Us', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.text(`Health Status: ${capitalizeFirst(inputs.healthStatus)}`, 20, yPos);
    yPos += 6;
    doc.text(`Prescriptions: ${inputs.prescriptionCount} regular medications`, 20, yPos);
    yPos += 6;
    doc.text(`Location: ${inputs.zipCode}, New York`, 20, yPos);

    // Main Cost Estimate Box
    yPos += 15;
    doc.setFillColor(239, 246, 255); // Light blue
    doc.rect(20, yPos - 5, pageWidth - 40, 35, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.text('YOUR ADDITIONAL MEDICARE COSTS', pageWidth / 2, yPos + 2, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.text('(Not including Part B Premium)', pageWidth / 2, yPos + 9, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text(
      `$${Math.round(estimate.totalMonthly.min)} - $${Math.round(estimate.totalMonthly.max)}/month`,
      pageWidth / 2,
      yPos + 20,
      { align: 'center' }
    );

    // Part B Premium Notice
    yPos += 45;
    doc.setFillColor(219, 234, 254); // Lighter blue
    doc.rect(20, yPos - 5, pageWidth - 40, 20, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(31, 41, 55);
    doc.text('Medicare Part B Premium (Separate)', 25, yPos + 2);
    
    doc.setFontSize(14);
    doc.text(`$${estimate.partBPremium.toFixed(2)}/month`, pageWidth - 25, yPos + 2, { align: 'right' });
    
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    doc.text('Usually deducted from Social Security', 25, yPos + 10);

    // Cost Breakdown Table
    yPos += 30;
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.text('Medicare Advantage Cost Breakdown', 20, yPos);

    yPos += 5;
    const tableData = estimate.breakdown
      .filter(item => item.category !== 'Medicare Part B Premium')
      .map(item => [
        item.category,
        `$${item.amount.toFixed(2)}`,
        item.description
      ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Category', 'Monthly Cost', 'Description']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 55 },
        1: { cellWidth: 30, halign: 'right' },
        2: { cellWidth: 85 },
      },
    });

    // Add second page for recommendations
    doc.addPage();
    yPos = 20;

    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text('Your Next Steps', 20, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);

    const nextSteps = [
      '☐ Verify your doctors are in-network',
      '☐ Check your prescriptions on Medicare.gov',
      '☐ Compare 2-3 different plans',
      '☐ Book a free consultation',
      '☐ Enroll during your enrollment period',
    ];

    nextSteps.forEach(step => {
      doc.text(step, 25, yPos);
      yPos += 7;
    });

    // Important Notes
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(31, 41, 55);
    doc.text('Important Notes', 20, yPos);

    yPos += 8;
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    const notes = [
      'This estimate does not include labs, imaging, or outpatient procedures.',
      'Actual costs vary by specific plan selection and usage.',
      'Plans change annually - review during Open Enrollment (Oct 15-Dec 7).',
    ];

    notes.forEach(note => {
      const lines = doc.splitTextToSize(note, pageWidth - 50);
      doc.text(lines, 25, yPos);
      yPos += 6 * lines.length;
    });

    // Contact Information
    yPos += 15;
    doc.setFillColor(239, 246, 255);
    doc.rect(20, yPos - 5, pageWidth - 40, 35, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235);
    doc.text('Ready to Choose Your Plan?', pageWidth / 2, yPos + 3, { align: 'center' });
    
    doc.setFontSize(11);
    doc.setTextColor(31, 41, 55);
    doc.text('YourMedGuy | Medicare Made Simple', pageWidth / 2, yPos + 11, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text('📞 888-355-1085 | 🌐 YourMedGuy.com', pageWidth / 2, yPos + 18, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    doc.text('Licensed & Certified | No Pressure | Free Service', pageWidth / 2, yPos + 25, { align: 'center' });

    // Footer on both pages
    addFooter(doc, 1);
    addFooter(doc, 2);

    // Save the PDF
    const fileName = `Medicare-Cost-Estimate-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);

    // Track analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download_pdf', {
        event_category: 'Calculator',
        event_label: 'Cost Estimate PDF',
        value: estimate.totalMonthly.max,
      });
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Unable to generate PDF. Please try again or contact support.');
  }
};

/**
 * Adds footer to PDF page
 */
const addFooter = (doc: jsPDF, pageNumber: number): void => {
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setPage(pageNumber);
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  
  // Disclaimer
  const disclaimer = 'This estimate is based on typical 2026 Medicare costs and your provided information. Actual costs vary by plan. ' +
    'Not affiliated with or endorsed by the U.S. government or Medicare. YourMedGuy represents multiple carriers.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 40);
  
  let footerY = pageHeight - 20;
  doc.text(disclaimerLines, pageWidth / 2, footerY, { align: 'center' });
  
  footerY += (disclaimerLines.length * 3) + 3;
  doc.text(`Page ${pageNumber}`, pageWidth / 2, footerY, { align: 'center' });
};

/**
 * Capitalize first letter of string
 */
const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

