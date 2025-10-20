# YourMedGuy Brand Guidelines

## Metadata

name: YourMedGuy Brand Guidelines
description: Apply YourMedGuy’s brand consistently across web, tools, presentations, and documents
version: 1.0.0
updated: 2025-10-20

## Overview

Use these standards for all external-facing materials to reflect YourMedGuy’s clear, local, no-pressure Medicare guidance for Long Island (Nassau and Suffolk County). Prioritize clarity, trust, and accessibility. Maintain regulatory disclosures and a reassuring tone.

## Brand Essence

- **mission**: Medicare made simple, local, unbiased, and pressure-free.
- **personality**: Reassuring, clear, helpful, professional, local.
- **voice**: Plain language, confident yet friendly.
- **tone**: Calm, supportive, informative (avoid hype).
- **avoid**: Jargon, scare tactics, or carrier bias.
- **value props**:
  - Licensed & certified; no cost for advisory services
  - Local Long Island expertise (Nassau/Suffolk)
  - Personalized plan comparison for doctors, drugs, and costs
  - No-pressure consultations; ongoing support

## Brand Colors

- **Primary (Blue)**: HSL 214 84% 56% (≈ #3182ED / #2563EB)
  - Hover: HSL 214 84% 46%
- **Accent/Success (Green)**: HSL 142 76% 36% (≈ #16A34A)
- **Warning (Gold)**: HSL 38 92% 50% (≈ #F59E0B)
- **Destructive (Red)**: HSL 0 84% 60% (≈ #EF4444)
- **Foreground (Charcoal Blue)**: HSL 210 24% 16% (≈ #1F2933)
- **Background (Near-White)**: HSL 0 0% 99% (#FCFCFC)
- **Secondary Background (Soft Slate)**: HSL 210 20% 96% (≈ #F1F5F9)
- **Border (Light Slate)**: HSL 210 20% 89% (≈ #DDE3E9)
- **Muted Foreground**: HSL 210 16% 46% (≈ #667085)

Color contrast: Ensure 4.5:1 minimum for body text and 3:1 for large headings. Use white text on Primary/Accent buttons.

## Typography

- **Headers**: SF Pro Display (preferred) or Inter fallback
- **Body**: Inter
- **Web scale (px)**:

  - H1: 48/56, 700–800
  - H2: 36/44, 700
  - H3: 24/32, 700
  - Body: 16/24, 400–500
  - Small: 14/20, 400
- **Print scale (pt)**:

  - H1: 32pt
  - H2: 24pt
  - Body: 11pt
- **Typesetting**:

  - Line length: 60–75 chars
  - Sentence case headings
  - Prefer bold over italics for emphasis

## Logo Usage

- **Primary mark**: Wordmark “YourMedGuy” with tagline “Medicare Made Simple.”
- **Color**:
  - Full-color logo on light backgrounds
  - White logo on dark/imagery overlays
- **Clearspace**: ≥ 0.5× logo height on all sides
- **Minimum sizes**:

  - Digital: 24px height
  - Print: 0.5 in width
- **Do not**: Alter colors, stretch/squash, add effects, or rotate; avoid low-contrast backgrounds without a solid/gradient backdrop

## UI Components and Tokens

- **Corners**: 12px radius for cards, inputs, buttons
- **Shadows**:

  - Soft: 0 2px 8px hsl(210 24% 16% / 0.04)
  - Medium: 0 4px 16px hsl(210 24% 16% / 0.08)
- **Buttons**:

  - Primary: Blue background (#2563EB–#3182ED), white text
  - Secondary: White background, Foreground text, light Border
  - Tertiary/Ghost: Transparent bg on light surfaces, Foreground text
  - Focus: 2px ring #3B82F6 with 2px white offset on light backgrounds
- **Inputs**:

  - Background: #FFFFFF
  - Border: #DDE3E9 default, #2563EB focus ring
  - Label: Muted Foreground; helper text 14/20
- **Cards/Sections**:

  - Card: White bg, light border, soft shadow
  - Section alt bg: Secondary Background for contrast rows

## Content Patterns

- **Primary CTA**: “Book Consultation” or “Start Your Free Consultation”
- **Secondary CTA**: “Call 888-355-1085” (click-to-call)
- **Proof elements**: “Licensed & Certified,” “No Cost to You,” “Independent Brokers,” “Local Area Experts”
- **Disclosure blocks**:

  - Title with bold “Important:” followed by compliant text
  - Neutral background with clear 1px border and 16px padding
  - Legal copy set at 14/20 for readability

## Imagery and Iconography

- **Imagery**: Friendly healthcare settings; seniors with dignity; diverse local context
- **Style**: Bright, natural light; avoid clichéd stock; maintain HIPAA-safe generic contexts
- **Icons**: Simple outline or duotone; use Primary for actionable and Accent for success

## Accessibility

- **Contrast**: 4.5:1 for text; 3:1 for large headings and UI elements
- **Focus states**: Always visible, high-contrast; do not remove outlines
- **Links**: Underline on hover; color alone is not the only cue
- **Forms**: Associate labels; show inline errors with clear text + color

## Cost Calculator (Tool) Specifics

- Step headers/labels: H3 24/32, 700, Foreground
- Inputs: Prominent focus ring (#3B82F6), clear helper text
- Trust indicators: Lock icon next to confidentiality note; Muted Foreground text with Primary icon accent
- KPIs/badges (e.g., “500+ Families Helped”, “4.9★”): Use Accent for positives; ensure strong contrast on light chips

## Layout and Spacing

- **Grid**: 12-col desktop; 4-col tablet; single-col mobile
- **Spacing scale (px)**: 4, 8, 12, 16, 24, 32, 48, 64
- **Section rhythm**: 64–96px vertical on desktop; 48–64px on mobile

## Copy Examples (Tone)

- **Headline**: “Medicare Made Simple”
- **Subhead**: “Review your 2026 options in Long Island”
- **Body**: “Keep your doctors and cut surprises. Book a 15-minute Medicare review with a licensed agent. We’ll check doctors, medicines, and costs with no pressure.”

## Regulatory and Compliant Copy

Include, where applicable (footer, lead forms, calculator):

- Important disclosure about plan availability and Medicare.gov contact
- Government endorsement disclaimer
- Consent notice for contact (calls, emails, texts) not as a condition of purchase

Style: 14/20, Muted Foreground, Secondary Background with Border.

## Quick Reference: Design Tokens

```css
--primary: 214 84% 56%;
--primary-hover: 214 84% 46%;
--accent: 142 76% 36%;
--warning: 38 92% 50%;
--destructive: 0 84% 60%;
--foreground: 210 24% 16%;
--background: 0 0% 99%;
--secondary: 210 20% 96%;
--border: 210 20% 89%;
--muted-foreground: 210 16% 46%;
--radius: 12px;
```

## When to Apply

Apply these guidelines whenever creating:

- Websites and landing pages
- Interactive tools (e.g., Cost Calculator)
- Sales decks and printed leave-behinds
- Ads, social posts, and email campaigns
- Reports and guides for clients
