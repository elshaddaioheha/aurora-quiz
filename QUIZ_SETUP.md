# Halotherapy Quiz Funnel Setup Guide

## Project Structure

The quiz funnel is built as a separate route system from the main booking system:

```
app/quiz/
├── page.tsx                    # Landing page
├── question-1/page.tsx         # First quiz question (multi-select)
├── question-2/page.tsx         # Second quiz question (multi-select)
├── question-3/page.tsx         # Third quiz question (single-select)
├── question-4/page.tsx         # Final question (determines response flow)
├── results/page.tsx            # Router page
├── response-a/page.tsx         # Prevention & Maintenance flow
├── response-b/page.tsx         # Active Treatment & Recovery flow
├── response-c/page.tsx         # Intensive Wellness Transformation flow
└── thank-you/page.tsx          # Confirmation page

lib/
├── quiz-context.tsx            # Quiz state management
└── components/quiz-progress.tsx # Progress indicator
```

## Key Features

### 1. Quiz Flow
- **4-question assessment** with customizable questions and answers
- **Multiple response formats**: Multi-select (Q1, Q2, Q3) and Single-select (Q4)
- **Progress tracking** with visual indicator
- **State persistence** across all pages using React Context

### 2. Conditional Response Flows
The final quiz answer determines which response page users see:
- **Response A** → "Just browsing"
- **Response B** → "Somewhat interested"
- **Response C** → "Very ready to try something new"

### 3. Cal.com Booking Flow
All response pages now route into the same Cal.com booking experience using the event slug:
```
aurorarecovery/halotherapy
```

Current behavior by branch:
- **Just browsing**: one button opens the "Why Halotherapy Works" section on the home page, and one button starts the free consultation booking flow.
- **Somewhat interested**: one button reveals the Loom walkthrough on the same page, and one button starts the free consultation booking flow.
- **Very ready**: one button takes the user directly into booking with the free 15-minute salt therapy consultation preselected.

The booking flow is now wired to prefill the consultation service before routing into the contact form.

### 4. Facebook Pixel Tracking
- Placeholder added in `app/layout.tsx`
- To enable: Replace `YOUR_PIXEL_ID` with your actual Facebook Pixel ID
- Can track quiz completions, bookings, and user flow

## Customization Guide

### Changing Quiz Questions

Edit the options array in each question file:

**`app/quiz/question-1/page.tsx`:**
```typescript
const options = [
  'Your custom option 1',
  'Your custom option 2',
  // ... more options
];
```

### Changing Response Flow Titles & Content

Edit the heading and content in each response file:

**`app/quiz/response-a/page.tsx`:**
```typescript
<h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
  Your Custom Title Here
</h1>
```

### Embedding Loom Videos

Response B uses the Loom video on the same page and can reveal it with a button:
```jsx
<div className="bg-card border border-border rounded-lg overflow-hidden aspect-video">
  <iframe
    src="https://www.loom.com/embed/c4d4bbc4f75843c59ca0579a4b6abd7d"
    frameBorder="0"
    allowFullScreen
    className="w-full h-full"
    title="Halotherapy Introduction"
  />
</div>
```

### Booking Handoff

The quiz response pages prefill the booking context with the consultation service and then route to `/booking/contact`.

If you want to change the handoff later, update the service passed into `updateData({ service: 'consultation' })` in the response pages.

### Enabling Facebook Pixel

In `app/layout.tsx`, uncomment and update:
```html
<script async defer crossOrigin="anonymous" 
  src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0&appId=YOUR_APP_ID" />
```

To track quiz completions, add pixel event tracking to response pages:
```typescript
import { useEffect } from 'react';

useEffect(() => {
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: 'Halotherapy Response A',
      value: 0,
      currency: 'USD',
    });
  }
}, []);
```

### Customizing Contact Information

Edit the thank you page (`app/quiz/thank-you/page.tsx`):
```typescript
{[
  {
    icon: Phone,
    label: 'Call Us',
    value: '(555) 123-4567',
    desc: 'Mon-Fri, 9am-5pm',
  },
  // ... update with your info
]}
```

## Styling & Theme

All colors use design tokens defined in `app/globals.css`. The current theme uses:
- **Primary color**: Forest green (`--primary: oklch(0.35 0.12 140)`)
- **Background**: Soft cream (`--background: oklch(0.98 0.001 70)`)
- **Text**: Dark charcoal (`--foreground: oklch(0.25 0.02 250)`)

To change the overall theme, update the CSS variables in `app/globals.css`.

## Testing the Quiz Flow

1. Navigate to `/quiz` to start the quiz
2. Complete all 4 questions to reach a response page
3. Question 4 routes users into one of the three readiness branches
4. Click the browse, video, or book buttons to test the branch-specific CTAs
5. Use the booking button to confirm the consultation flows into the booking screens

## Important Notes

- Quiz answers are stored in browser memory via React Context
- They persist across page navigation but are lost on page refresh
- To add backend persistence, integrate with your database in the quiz-context.tsx
- All pages follow the mobile-first responsive design pattern
- Progress indicator uses Tailwind CSS for styling

## Next Steps

1. ✅ Update quiz questions with your actual content
2. ✅ Add your Loom video links
3. ✅ Integrate Cal.com calendar
4. ✅ Add your Facebook Pixel ID
5. ✅ Update contact information
6. ✅ Test complete flow and booking integration
7. ✅ Deploy to production

---

For questions or issues, refer to the codebase comments or reach out to your development team.
