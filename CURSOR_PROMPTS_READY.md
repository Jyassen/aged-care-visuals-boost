# **CURSOR-READY PROMPTS FOR PHASE 1**
## Adjusted for Your Actual Codebase Structure

---

## **SETUP PHASE (Do First)**

### **Step 0: Create Folder Structure**

```
Create the following folder structure in the src directory:

src/
├── components/
│   └── tools/
│       ├── CostCalculator/
│       ├── MedicationTool/
│       └── shared/
├── types/
├── pages/
│   └── tools/
└── lib/
    └── api/

Use the file system to create these empty directories.
```

---

## **COST CALCULATOR - STEP BY STEP**

### **Step 1: Create TypeScript Types**

```
Create a new file at src/types/medicare.types.ts with the following TypeScript interfaces:

1. CostCalculatorInput interface:
   - age: number
   - zipCode: string
   - healthStatus: 'excellent' | 'good' | 'fair' | 'poor'
   - prescriptionCount: number
   - currentMedicare?: string (optional)

2. CostEstimate interface:
   - monthlyPremium: object with min, max, average (all numbers)
   - partBPremium: number
   - prescriptionCosts: object with min and max numbers
   - totalMonthly: object with min and max numbers
   - totalAnnual: object with min and max numbers
   - breakdown: array of CostBreakdown objects
   - recommendations: string array

3. CostBreakdown interface:
   - category: string
   - amount: number
   - description: string

Export all interfaces with JSDoc comments.
Use standard TypeScript syntax.
```

---

### **Step 2: Create Calculation Utilities**

```
Create src/components/tools/CostCalculator/costCalculator.utils.ts with:

1. Export constant PART_B_PREMIUM_2024 = 174.70

2. Export function calculateMedicareCosts that:
   - Takes CostCalculatorInput parameter
   - Returns CostEstimate
   - Calculates premiums based on health status:
     * excellent: $0-$150
     * good: $50-$200
     * fair: $100-$300
     * poor: $150-$400
   - Estimates prescription costs: $45/medication average (range $20-$80)
   - Calculates total monthly and annual costs
   - Generates breakdown array with 3 items:
     * Medicare Part B Premium
     * Medicare Advantage/Supplement Premium
     * Prescription Drugs (Part D)
   - Generates 3-5 personalized recommendations

3. Export function validateZipCode that:
   - Takes zipCode string
   - Returns boolean
   - Validates Nassau/Suffolk ZIP codes: 11500-11599, 11700-11799, 11900-11999

4. Export function generateRecommendations that:
   - Takes CostCalculatorInput and cost totals
   - Returns string array of recommendations
   - Includes logic for:
     * Many prescriptions → recommend Medicare Advantage
     * Poor/fair health → recommend Medicare Supplement
     * High costs → mention Extra Help program
     * Always include consultation CTA

Import the CostCalculatorInput and CostEstimate types from @/types/medicare.types
Use TypeScript with detailed comments.
```

---

### **Step 3: Create Form Component**

```
Create src/components/tools/CostCalculator/CostCalculatorForm.tsx as a React component:

Props interface:
- onCalculate: (input: CostCalculatorInput) => void
- isCalculating?: boolean

Component requirements:
1. Use React useState for form data (matching CostCalculatorInput)
2. Use React useState for validation errors (Record<string, string>)
3. Default form values: age=65, zipCode='', healthStatus='good', prescriptionCount=0

4. Form fields (use shadcn/ui components):
   - Age: Input type="number", min=55, max=100, required
   - ZIP Code: Input type="text", maxLength=5, placeholder="11554", required
   - Health Status: Select with 4 options:
     * Excellent - Rarely see doctors
     * Good - Routine checkups only
     * Fair - Some ongoing conditions
     * Poor - Multiple chronic conditions
   - Prescription Count: Input type="number", min=0, default=0

5. Validation on submit:
   - Age between 55-100
   - ZIP code validates with validateZipCode function
   - Prescription count >= 0
   - Show error messages below each field if validation fails

6. Layout:
   - Wrap in Card component with padding
   - Include Calculator icon from lucide-react
   - Title: "Calculate Your Medicare Costs"
   - Subtitle: "Get your personalized estimate in 30 seconds"
   - Submit button: gradient blue (from-blue-600 to-blue-700), full width
   - Show "Calculating..." when isCalculating is true
   - Trust indicators below: "Free estimate • No obligation • Your information is secure"

Import components from:
- @/components/ui/button
- @/components/ui/input
- @/components/ui/label
- @/components/ui/select
- @/components/ui/card
- lucide-react for Calculator icon
- @/types/medicare.types for types
- ./costCalculator.utils for validateZipCode

Use TypeScript, Tailwind CSS, mobile-responsive design.
Export as default function.
```

---

### **Step 4: Create Results Component**

```
Create src/components/tools/CostCalculator/CostCalculatorResults.tsx:

Props interface:
- estimate: CostEstimate
- onReset: () => void

Component requirements:
1. Import useState from react
2. Use useState for showLeadCapture (boolean, default false)

3. Display sections:

   A. Main Cost Display (Card with blue gradient background):
      - Title: "Your Estimated Medicare Costs"
      - Large display: "$X - $Y per month"
      - Annual costs with Calendar icon
      - Use text-5xl for cost numbers

   B. Cost Breakdown (Card):
      - Section title with DollarSign icon
      - Map through estimate.breakdown
      - Each item shows: category, description, amount
      - Format amount with .toFixed(2)

   C. Recommendations (Card with green background):
      - Section title with TrendingDown icon
      - Map through estimate.recommendations
      - Each item has Check icon and text
      - Green accent colors

   D. Lead Capture Section:
      - If showLeadCapture is false:
        * Card with orange gradient background
        * Heading: "Want a Detailed, Personalized Analysis?"
        * Description text
        * Button: "Get My Free Consultation" (onClick sets showLeadCapture to true)
        * Reassurance text below
      - If showLeadCapture is true:
        * Show LeadCaptureForm component
        * Pass props: source="cost-calculator", context={{ estimatedCosts: estimate.totalMonthly, calculatorResults: estimate }}

   E. Calculate Again button (outline variant, centered)

Import components from:
- @/components/ui/card
- @/components/ui/button
- @/components/tools/shared/LeadCaptureForm
- lucide-react (Check, TrendingDown, Calendar, DollarSign)
- @/types/medicare.types

Use TypeScript, Tailwind CSS, mobile-responsive.
Export as default function.
```

---

### **Step 5: Create Main Calculator Component**

```
Create src/components/tools/CostCalculator/CostCalculator.tsx:

Requirements:
1. Import useState from react
2. Import CostCalculatorForm and CostCalculatorResults components
3. Import calculateMedicareCosts from utils
4. Import types from @/types/medicare.types

State:
- estimate: CostEstimate | null (default null)
- isCalculating: boolean (default false)

Functions:
- handleCalculate: async function that:
  * Sets isCalculating to true
  * Waits 500ms (simulate processing): await new Promise(resolve => setTimeout(resolve, 500))
  * Calls calculateMedicareCosts with input
  * Sets estimate state with result
  * Sets isCalculating to false

- handleReset: function that:
  * Sets estimate back to null

Render:
- Container div with classes: max-w-4xl mx-auto py-8 px-4
- Conditionally render:
  * If estimate is null: show CostCalculatorForm with onCalculate and isCalculating props
  * If estimate exists: show CostCalculatorResults with estimate and onReset props

Use TypeScript.
Export as default function.
```

---

### **Step 6: Create Lead Capture Form**

```
Create src/components/tools/shared/LeadCaptureForm.tsx:

Props interface:
- source: string (e.g., 'cost-calculator')
- context?: any (optional, tool-specific data)
- onSuccess?: () => void (optional callback)

Requirements:
1. Import useState from react
2. Import useToast hook from @/hooks/use-toast
3. Import shadcn/ui components: Card, Input, Label, Select, Button

Form state (useState):
- firstName: string
- lastName: string
- phone: string
- email: string
- bestTimeToCall: string

Additional state:
- isSubmitting: boolean (default false)

Form fields:
1. First Name (required, Input component)
2. Last Name (required, Input component)
3. Phone Number (required, Input type="tel", placeholder="(555) 123-4567")
4. Email (optional but recommended, Input type="email")
5. Best Time to Call (Select dropdown):
   - Morning (9 AM - 12 PM)
   - Afternoon (12 PM - 5 PM)
   - Evening (5 PM - 8 PM)
   - Anytime

handleSubmit function:
1. Prevent default
2. Set isSubmitting to true
3. Try to POST to '/api/contact':
   - Method: POST
   - Headers: Content-Type: application/json
   - Body: JSON.stringify({
       ...formData,
       source: source,
       context: JSON.stringify(context),
       message: `Lead from ${source} tool`
     })
4. If successful:
   - Show success toast: "Thank you! We'll contact you within 24 hours..."
   - Call onSuccess if provided
5. If error:
   - Show error toast with phone number fallback
6. Finally: set isSubmitting to false

Layout:
- Card wrapper with padding
- Centered heading: "Schedule Your Free Consultation"
- Subtitle: "Let's discuss your results and find the perfect plan for you"
- Grid layout for first/last name (2 columns on desktop)
- Submit button: gradient blue, full width, show "Submitting..." when loading
- Disclaimer text: "By submitting, you consent to receive communications..."

Use TypeScript, Tailwind CSS, mobile-responsive.
Export as default function.
```

---

### **Step 7: Create Calculator Page**

```
Create src/pages/tools/CostCalculatorPage.tsx:

Requirements:
1. Import CostCalculator component
2. Import Header and Footer components from @/components
3. Use existing components from your site

Structure:
- Outer div: min-h-screen flex flex-col
- Include Header component at top
- Main element with flex-1 bg-gray-50:
  
  A. Hero Section:
     - Background: gradient-to-r from-blue-600 to-blue-800
     - Text: white
     - Max-width container: max-w-4xl mx-auto px-4
     - Centered text
     - H1: "What Will Medicare Cost YOU?"
     - Subtitle: "Get your personalized Medicare cost estimate in 30 seconds"
     - Trust indicators with checkmarks: "100% Free • No Obligation • Instant Results"
     - Padding: py-16

  B. Calculator Section:
     - Padding: py-12
     - Render CostCalculator component

  C. Trust Section (optional):
     - Background: white
     - Padding: py-12
     - Heading: "Trusted by 500+ Long Island Families"
     - Subtitle text
     - Placeholder for testimonials

- Include Footer component at bottom

Use TypeScript, semantic HTML.
Export as default function.
```

---

### **Step 8: Add Route to App**

```
Update src/App.tsx to add the cost calculator route.

Requirements:
1. Import CostCalculatorPage from './pages/tools/CostCalculatorPage'
2. Add new Route BEFORE the catch-all "*" route:
   <Route path="/tools/cost-calculator" element={<CostCalculatorPage />} />

Keep all existing routes and imports.
Make minimal changes - only add the import and route.
```

---

## **API UPDATE (REQUIRED)**

### **Update Contact API to Handle Tool Data**

```
Update api/contact.js to handle additional fields from tools:

Changes needed:
1. Destructure additional fields from req.body:
   - source (optional string)
   - context (optional string or object)

2. Keep existing validation for firstName, lastName, phone, email

3. Update the email HTML to include:
   - Source section (if provided): 
     <p><strong>Source:</strong> ${source || 'Contact Form'}</p>
   
   - Context section (if provided):
     ${context ? `
       <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
         <h3 style="color: #1e40af; margin-top: 0;">Tool Results</h3>
         <pre style="white-space: pre-wrap; font-size: 12px; color: #374151;">${typeof context === 'string' ? context : JSON.stringify(context, null, 2)}</pre>
       </div>
     ` : ''}

4. Keep all existing functionality (Resend, error handling, etc.)

This allows tools to pass additional context without breaking existing contact form.
```

---

## **TESTING CHECKLIST**

After implementing each step, test:

1. **Types compile**: No TypeScript errors
2. **Calculator logic works**: Test with different inputs
3. **Form validation**: Try invalid ZIP codes, ages
4. **Results display**: Check all sections render
5. **Lead capture submits**: Verify API receives data
6. **Mobile responsive**: Test on narrow viewport
7. **Route works**: Navigate to /tools/cost-calculator

---

## **USAGE INSTRUCTIONS**

1. **Work sequentially**: Do steps 1-8 in order
2. **Test after each step**: Don't proceed if errors exist
3. **Use Cursor AI**: Copy each prompt into Cursor chat (Cmd+L)
4. **Review generated code**: Check for any issues before saving
5. **Ask for modifications**: If something doesn't look right, ask Cursor to fix it

---

## **COMMON CURSOR FOLLOW-UP PROMPTS**

If you need to adjust generated code:

**Fix TypeScript errors:**
```
"There are TypeScript errors in this file. Please fix all type issues and ensure proper imports."
```

**Improve mobile responsiveness:**
```
"Make this component more mobile-friendly. Stack elements vertically on screens smaller than 768px and increase spacing."
```

**Add more validation:**
```
"Add more comprehensive form validation with better error messages and field-level validation."
```

**Improve styling:**
```
"Make this component more visually appealing with better use of colors, spacing, and shadows. Use Tailwind CSS."
```

---

## **NEXT STEPS AFTER COST CALCULATOR**

Once the Cost Calculator is working:
1. Test thoroughly with real data
2. Deploy to staging
3. Gather user feedback
4. Then proceed to Medication Tool (similar pattern)

---

**These prompts are specifically adapted for your codebase structure and will work with Cursor's AI assistant. Follow them step-by-step for best results.**

