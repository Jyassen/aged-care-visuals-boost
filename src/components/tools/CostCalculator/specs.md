# Enhanced Medicare Cost Calculator - Technical Specifications

## 📋 Project Overview

**Component:** `CostCalculator`
**Location:** `src/components/tools/CostCalculator/`
**Priority:** 🔴 HIGHEST - Build First
**Estimated Effort:** 12-15 hours
**Target Conversion:** 35-45% lead capture

---

## 🏗️ Architecture Overview

### Component Structure
```
CostCalculator/
├── CostCalculator.tsx              # Main container component
├── CostCalculatorForm.tsx          # Multi-step input form
├── CostCalculatorResults.tsx       # Results display with lead capture
├── costCalculator.utils.ts         # Calculation algorithms
├── costCalculator.types.ts         # TypeScript interfaces
├── costCalculator.validation.ts    # Form validation logic
├── costCalculator.analytics.ts     # Google Analytics tracking
├── hooks/
│   ├── useCostCalculator.ts        # Main calculation hook
│   └── useFormProgress.ts          # Form step management
├── ui/
│   └── CalculatorLoading.tsx       # Loading animation component
└── __tests__/
    ├── CostCalculator.test.tsx
    ├── costCalculator.utils.test.ts
    └── costCalculator.validation.test.ts
```

### Data Flow Architecture
```
User Input → Form Validation → Calculation Engine → Results Display → Lead Capture → API Submission → Email Auto-Response
```

---

## 🔧 Technical Requirements

### Technology Stack
- **Framework:** React 18.2.0+
- **Language:** TypeScript 5.0.0+
- **Styling:** Tailwind CSS 3.3.0+
- **UI Components:** Shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion 10.16.0+
- **Icons:** Lucide React 0.263.0+
- **Forms:** React Hook Form + Zod validation
- **State Management:** React hooks (useState, useCallback)

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-progress": "^1.0.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.0",
    "react-hook-form": "^7.45.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.50.0",
    "prettier": "^3.0.0"
  }
}
```

---

## 📊 Data Models

### Input Interface
```typescript
interface EnhancedCostCalculatorInput {
  // Basic Information
  age: number;                      // 55-100
  zipCode: string;                  // 5 digits, Nassau/Suffolk validation

  // Health Assessment
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  healthConditions: string[];       // Array of condition IDs

  // Healthcare Usage
  prescriptionCount: number;        // 0-50
  doctorVisitFrequency: VisitFrequency;
  specialistVisitFrequency: VisitFrequency;

  // Optional Comparison
  currentInsurancePremium?: number;
  currentDoctorCopays?: number;
  currentPrescriptionCosts?: number;
}
```

### Output Interface
```typescript
interface EnhancedCostEstimate {
  // Premium Breakdown
  monthlyPremium: { min: number; max: number; average: number };
  partBPremium: number;             // Fixed: $174.70 (2024)

  // Healthcare Costs
  prescriptionCosts: { min: number; max: number };
  copayAccumulation: {
    primaryCare: number;            // Annual copays
    specialist: number;             // Annual copays
    totalAnnualCopays: number;
  };

  // Medication Intelligence
  suggestedMedications: Array<{
    name: string;
    genericName: string;
    estimatedMonthlyCost: number;
    condition: string;
    tier: number;
  }>;

  // Cost Comparison
  currentVsMedicare: {
    currentAnnualTotal: number;
    medicareAnnualTotal: number;
    savings: number;
  };

  // Totals
  totalMonthly: { min: number; max: number };
  totalAnnual: { min: number; max: number };

  // Detailed Breakdown
  breakdown: Array<{
    category: string;
    amount: number;
    description: string;
  }>;

  // Personalized Recommendations
  recommendations: string[];
}
```

---

## 🎨 Design Specifications

### Color Palette
```css
/* Primary Colors */
--blue-50: #eff6ff;    /* Background accents */
--blue-100: #dbeafe;   /* Light backgrounds */
--blue-600: #2563eb;   /* Primary buttons, links */
--blue-900: #1e3a8a;   /* Headings */

/* Secondary Colors */
--orange-100: #fff7ed; /* Accent backgrounds */
--orange-600: #ea580c; /* Secondary accents */

/* Semantic Colors */
--green-500: #10b981;  /* Success, positive results */
--green-600: #059669;  /* Checkmarks, confirmations */
--yellow-500: #f59e0b; /* Warnings, important info */
--red-500: #ef4444;    /* Errors, validation */

/* Neutral Colors */
--gray-50: #f9fafb;    /* Page backgrounds */
--gray-100: #f3f4f6;   /* Card backgrounds */
--gray-200: #e5e7eb;   /* Borders, dividers */
--gray-500: #6b7280;   /* Secondary text */
--gray-900: #111827;   /* Primary text */
```

### Typography Scale (Inter Font)
```css
/* Headlines */
--text-3xl: 1.875rem;  /* 30px */ /* Large section titles */
--text-2xl: 1.5rem;    /* 24px */ /* Card titles */
--text-xl: 1.25rem;    /* 20px */ /* Subtitles */
--text-lg: 1.125rem;   /* 18px */ /* Body large */

/* Body Text */
--text-base: 1rem;     /* 16px */ /* Primary body text */
--text-sm: 0.875rem;   /* 14px */ /* Secondary text */
--text-xs: 0.75rem;    /* 12px */ /* Captions */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale
```css
/* Spacing tokens */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
```

---

## 🔄 Component Behavior

### Form Flow States
```
1. STEP_AGE (required)
   - Input: age (55-100)
   - Validation: numeric, range check
   - Visual: Users icon, centered card

2. STEP_LOCATION (required)
   - Input: zipCode (5 digits)
   - Validation: Nassau/Suffolk check
   - Visual: MapPin icon, validation feedback

3. STEP_HEALTH (required)
   - Inputs: healthStatus, healthConditions[]
   - Validation: required selections
   - Visual: Heart icon, checkbox grid

4. STEP_MEDICATIONS (required)
   - Inputs: visit frequencies, prescription count, optional current costs
   - Validation: required fields, optional additions
   - Visual: Stethoscope icon, comprehensive form
```

### Calculation Process
```
Input Validation → Health Multiplier Application → Prescription Cost Calculation → Copay Accumulation → Medication Suggestions → Comparison Analysis → Recommendation Generation → Result Formatting
```

### Loading States
```
Trigger: Form submission
Duration: 1.5 seconds (simulated processing)
Visual: Animated calculator icon, progress messages
Feedback: Step-by-step processing indicators
```

### Error Handling
```
Validation Errors: Real-time field-level feedback
Calculation Errors: Graceful fallback with error messaging
Network Errors: Retry mechanism with user feedback
Analytics Errors: Silent failure, doesn't block user flow
```

---

## 📱 Responsive Breakpoints

### Mobile (320px - 767px)
```
- Single column layout
- Stacked form elements
- Touch-friendly buttons (48px minimum)
- 16px font minimum (prevents zoom)
- Sticky CTA at bottom
- Simplified navigation
```

### Tablet (768px - 1199px)
```
- Two-column results layout
- Condensed spacing
- Touch-optimized interactions
- Medium-sized typography
- Flexible card layouts
```

### Desktop (1200px+)
```
- Full multi-column layouts
- Optimal spacing and sizing
- Hover states and interactions
- Large typography for impact
- Advanced layout features
```

---

## 🔍 Validation Rules

### Real-time Validation
```typescript
// Age validation
const validateAge = (age: number): ValidationResult => {
  if (!age) return { isValid: false, message: 'Age is required' };
  if (age < 55) return { isValid: false, message: 'Must be 55 or older for Medicare' };
  if (age > 100) return { isValid: false, message: 'Please enter a realistic age' };
  return { isValid: true, message: 'Valid age' };
};

// ZIP code validation
const validateZipCode = (zipCode: string): ValidationResult => {
  if (!zipCode) return { isValid: false, message: 'ZIP code is required' };
  if (zipCode.length !== 5) return { isValid: false, message: 'Must be 5 digits' };
  if (!/^\d{5}$/.test(zipCode)) return { isValid: false, message: 'Must contain only numbers' };
  if (!isNassauSuffolkZip(zipCode)) return { isValid: false, message: 'We serve Nassau and Suffolk counties' };
  return { isValid: true, message: 'Valid ZIP code' };
};
```

### Form Completion Checks
```typescript
const isStepComplete = (step: number, data: FormData): boolean => {
  switch (step) {
    case 1: return !!(data.age && validateAge(data.age).isValid);
    case 2: return !!(data.zipCode && validateZipCode(data.zipCode).isValid);
    case 3: return !!(data.healthStatus && data.healthConditions?.length > 0);
    case 4: return !!(
      data.doctorVisitFrequency &&
      data.specialistVisitFrequency &&
      data.prescriptionCount !== undefined
    );
    default: return false;
  }
};
```

---

## 📊 Calculation Algorithms

### Health Status Multipliers
```typescript
const HEALTH_MULTIPLIERS = {
  excellent: { min: 0, max: 150 },
  good: { min: 50, max: 200 },
  fair: { min: 100, max: 300 },
  poor: { min: 150, max: 400 }
};
```

### Visit Frequency Mappings
```typescript
const VISIT_FREQUENCIES = {
  rarely: 1,          // <2 visits/year
  occasionally: 4,    // 3-5 visits/year
  frequently: 8,      // 6-10 visits/year
  'very-frequently': 15 // 10+ visits/year
};
```

### Medication Mapping by Condition
```typescript
const CONDITION_MEDICATIONS = {
  diabetes: [
    { name: 'Metformin', cost: 15, tier: 2 },
    { name: 'Insulin', cost: 85, tier: 3 }
  ],
  'high-blood-pressure': [
    { name: 'Lisinopril', cost: 10, tier: 1 }
  ],
  // ... additional conditions
};
```

---

## 📈 Analytics Implementation

### Google Analytics 4 Events
```typescript
// Calculator funnel tracking
gtag('event', 'calculator_started', {
  tool_name: 'cost_calculator'
});

gtag('event', 'calculator_completed', {
  age: 65,
  health_status: 'good',
  prescription_count: 3,
  estimated_monthly_min: 289,
  estimated_monthly_max: 524
});

gtag('event', 'lead_captured', {
  source: 'cost_calculator',
  estimated_value: 400
});
```

### Conversion Tracking
- Form completion rate
- Lead capture rate (35-45% target)
- Consultation booking rate
- Time to conversion metrics

---

## 🔗 API Integration

### Lead Capture Endpoint
```
POST /api/contact
Content-Type: application/json

Request Body:
{
  "firstName": "John",
  "lastName": "Jane",
  "phone": "516-555-1234",
  "email": "john@example.com",
  "source": "cost-calculator",
  "context": {
    "age": 65,
    "zipCode": "11554",
    "healthStatus": "good",
    "prescriptionCount": 3,
    "estimatedMonthlyMin": 289,
    "estimatedMonthlyMax": 524
  },
  "message": "Lead from Medicare Cost Calculator"
}

Response:
{
  "success": true,
  "message": "Lead captured successfully",
  "leadId": "lead_12345"
}
```

### Error Handling
```typescript
const handleApiError = (error: ApiError) => {
  switch (error.code) {
    case 'VALIDATION_ERROR':
      showValidationErrors(error.fields);
      break;
    case 'RATE_LIMITED':
      showRateLimitMessage();
      break;
    case 'NETWORK_ERROR':
      showNetworkError();
      break;
    default:
      showGenericError();
  }
};
```

---

## 📧 Email Integration

### Auto-Responder Template
```
Subject: Your Medicare Cost Estimate - Next Steps

Body:
Hi [firstName],

Thanks for using our Medicare Cost Calculator!

Here's a recap of your personalized estimate:
💰 Estimated Monthly Cost: $[estimatedMonthlyMin] - $[estimatedMonthlyMax]
📅 Estimated Annual Cost: $[estimatedAnnualMin] - $[estimatedAnnualMax]

Based on your:
- Age: [age]
- ZIP Code: [zipCode] ([county] County)
- Health Status: [healthStatus]
- Prescriptions: [prescriptionCount] medications

Next Steps:
1. Schedule your free consultation to discuss plan options
2. Review our Medicare Made Simple guide
3. Check which plans cover your specific medications

[Book Free Consultation Button]

Questions? Reply to this email or call 347-305-2260.

Best regards,
YourMedGuy Team
```

---

## 🧪 Testing Requirements

### Unit Tests
```typescript
// Calculation logic tests
describe('calculateMedicareCosts', () => {
  it('should calculate basic premiums correctly', () => {
    const input = { age: 65, zipCode: '11554', healthStatus: 'good', prescriptionCount: 3 };
    const result = calculateMedicareCosts(input);
    expect(result.totalMonthly.min).toBeGreaterThan(0);
    expect(result.totalMonthly.max).toBeGreaterThan(result.totalMonthly.min);
  });
});

// Validation tests
describe('validateZipCode', () => {
  it('should accept valid Nassau ZIP codes', () => {
    expect(validateZipCode('11554')).toBe(true);
  });

  it('should reject invalid ZIP codes', () => {
    expect(validateZipCode('10001')).toBe(false);
  });
});
```

### Integration Tests
```typescript
// Form submission flow
describe('CostCalculatorForm', () => {
  it('should progress through all steps correctly', async () => {
    render(<CostCalculatorForm onSubmit={mockOnSubmit} />);

    // Step 1: Age
    await userEvent.type(screen.getByLabelText(/age/i), '65');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Step 2: ZIP Code
    await userEvent.type(screen.getByLabelText(/zip code/i), '11554');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Continue through remaining steps...
  });
});
```

### E2E Tests
```typescript
// Full calculator flow
describe('Complete Calculator Flow', () => {
  it('should calculate costs and capture lead', () => {
    cy.visit('/cost-calculator');

    // Complete form
    cy.get('[data-testid="age-input"]').type('65');
    cy.get('[data-testid="continue-button"]').click();

    cy.get('[data-testid="zip-input"]').type('11554');
    cy.get('[data-testid="continue-button"]').click();

    // Continue through all steps...

    // Verify results display
    cy.get('[data-testid="results-display"]').should('be.visible');
    cy.get('[data-testid="monthly-cost"]').should('contain', '$');

    // Submit lead form
    cy.get('[data-testid="lead-form"]').within(() => {
      cy.get('[data-testid="first-name"]').type('John');
      cy.get('[data-testid="last-name"]').type('Doe');
      cy.get('[data-testid="email"]').type('john@example.com');
      cy.get('[data-testid="phone"]').type('5165551234');
      cy.get('[data-testid="submit-button"]').click();
    });

    // Verify success
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

---

## 🚀 Performance Requirements

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **FID (First Input Delay):** < 100 milliseconds
- **CLS (Cumulative Layout Shift):** < 0.1

### Bundle Size
- **Initial Load:** < 200KB (gzipped)
- **Calculator Chunk:** < 50KB (gzipped)
- **Lazy Loading:** Implement for results component

### Runtime Performance
- **Calculation Time:** < 500ms
- **Form Validation:** < 100ms
- **Animation Frame Rate:** 60 FPS
- **Memory Usage:** < 50MB

---

## 🔐 Security & Privacy

### Data Handling
- Client-side calculations only
- No sensitive health data stored locally
- Lead data encrypted in transit (HTTPS)
- Session data cleared on component unmount

### Input Sanitization
- All form inputs validated and sanitized
- ZIP codes restricted to Nassau/Suffolk
- Age limits enforced (55-100)
- Email format validation

### API Security
- Rate limiting on lead capture endpoint
- Input validation on server side
- CORS configuration for allowed origins
- Request logging for audit trails

---

## 🛠️ Development Workflow

### Local Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript checks
npm run type-check

# Run ESLint
npm run lint

# Run tests
npm run test

# Build for production
npm run build
```

### Code Quality Standards
- **TypeScript:** Strict mode enabled
- **ESLint:** Airbnb config with React rules
- **Prettier:** Consistent code formatting
- **Testing:** 80%+ code coverage required

### Git Workflow
```bash
# Feature branch
git checkout -b feature/cost-calculator

# Commit standards
git commit -m "feat: implement cost calculator form component

- Add multi-step form with validation
- Implement ZIP code validation for Nassau/Suffolk
- Add health condition selection
- Include progress indicator

Closes #123"

# Pull request requirements
- [ ] Tests passing
- [ ] Code review approved
- [ ] TypeScript errors resolved
- [ ] Responsive design verified
```

---

## 📋 Implementation Checklist

### Phase 1: Setup & Foundation (2 hours)
- [ ] Create component directory structure
- [ ] Install required dependencies
- [ ] Set up TypeScript interfaces
- [ ] Configure Tailwind CSS
- [ ] Create basic component skeletons

### Phase 2: Form Development (4 hours)
- [ ] Implement multi-step form logic
- [ ] Add form validation
- [ ] Create progress indicator
- [ ] Implement ZIP code validation
- [ ] Add health condition selection

### Phase 3: Calculation Engine (3 hours)
- [ ] Implement calculation algorithms
- [ ] Add medication suggestions
- [ ] Create cost breakdown logic
- [ ] Implement comparison features
- [ ] Add recommendation generation

### Phase 4: Results & UI (3 hours)
- [ ] Create results display component
- [ ] Add loading animations
- [ ] Implement lead capture form
- [ ] Add responsive design
- [ ] Style with design system

### Phase 5: Integration & Testing (3 hours)
- [ ] Integrate with existing API
- [ ] Add analytics tracking
- [ ] Implement error handling
- [ ] Write comprehensive tests
- [ ] Performance optimization

### Phase 6: Polish & Launch (1 hour)
- [ ] Final design refinements
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Documentation updates
- [ ] Production deployment

---

## 📊 Success Metrics

### Performance Targets
- **Load Time:** < 3 seconds
- **Form Completion:** 70-80% of starts
- **Lead Capture:** 35-45% conversion
- **Mobile Usage:** 60%+ traffic
- **Error Rate:** < 5% of sessions

### Quality Targets
- **TypeScript Coverage:** 100%
- **Test Coverage:** 80%+
- **Accessibility Score:** 95%+
- **Performance Score:** 90%+
- **SEO Score:** 85%+

---

## 🔧 Maintenance & Updates

### Regular Updates Required
```typescript
// Update Medicare Part B premium annually
const MEDICARE_PART_B_PREMIUM = 174.70; // Update for 2025

// Update prescription cost estimates
const PRESCRIPTION_COSTS = {
  tier1: 10,  // Update based on market data
  tier2: 25,
  tier3: 85
};

// Update health condition medications
// Review annually for new medications and price changes
```

### Monitoring & Alerts
- **Performance Monitoring:** Core Web Vitals tracking
- **Error Monitoring:** Sentry integration for runtime errors
- **Conversion Tracking:** Google Analytics goals
- **A/B Testing:** Feature flag implementation

---

## 🚨 Risk Mitigation

### Technical Risks
- **Calculation Accuracy:** Comprehensive testing of algorithms
- **API Reliability:** Fallback mechanisms for API failures
- **Browser Compatibility:** Progressive enhancement approach
- **Mobile Performance:** Optimized bundle splitting

### Business Risks
- **Lead Quality:** Validation and qualification checks
- **Conversion Optimization:** A/B testing framework
- **Compliance Updates:** Regular CMS guideline reviews
- **Competitive Response:** Unique feature development

---

## 📞 Support & Escalation

### Development Team
- **Lead Developer:** [Assign primary developer]
- **UI/UX Designer:** [Assign designer]
- **QA Engineer:** [Assign tester]
- **Product Manager:** [Assign PM]

### Escalation Paths
- **Technical Issues:** Development team → Tech lead → CTO
- **Design Issues:** Design team → Creative director
- **Business Issues:** Product team → CEO
- **Compliance Issues:** Legal team → General counsel

### Communication Channels
- **Daily Standups:** Development progress
- **Design Reviews:** UI/UX feedback
- **Code Reviews:** Technical implementation
- **Product Reviews:** Feature validation

---

This comprehensive specification provides everything needed to build, test, deploy, and maintain the Enhanced Medicare Cost Calculator with confidence! 🎯💰
