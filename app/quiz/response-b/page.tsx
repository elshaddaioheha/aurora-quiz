'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { Calendar, ChevronLeft } from 'lucide-react';
import { trackMetaEvent } from '@/components/meta-pixel';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCalBookingHandoff } from '@/hooks/use-cal-booking-handoff';

const commitmentMap = {
  A: {
    label: 'Just browsing',
    resultType: 'browsing',
    leadTemperature: 'Cold',
  },
  B: {
    label: 'Somewhat interested',
    resultType: 'interested',
    leadTemperature: 'Warm',
  },
  C: {
    label: 'Very ready to try something new',
    resultType: 'ready',
    leadTemperature: 'Hot',
  },
};

export default function ResponseB() {
  const router = useRouter();
  const { answers } = useQuiz();
  const isMobile = useIsMobile();
  const [showVideo, setShowVideo] = useState(false);
  const redirectUrl = useCalBookingHandoff('halotherapy');
  const flow = (answers.responseFlow || answers.question4) as 'A' | 'B' | 'C' | undefined;
  const mapped = flow ? commitmentMap[flow] : undefined;

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: 'Halotherapy Response B',
      content_category: 'quiz-response',
      response_flow: 'B',
    });
  }, []);

  const calLink = redirectUrl
    ? `aurorarecovery/halotherapy?redirectUrl=${encodeURIComponent(redirectUrl)}`
    : 'aurorarecovery/halotherapy';
  const calConfig = JSON.stringify({
    layout: isMobile ? 'mobile' : 'month_view',
    'ui.autoscroll': true,
    theme: 'light',
    useSlotsViewOnSmallScreen: true,
    'metadata[condition]': answers.question1?.[0] || '',
    'metadata[duration]': answers.question2?.[0] || '',
    'metadata[triedBefore]': answers.question3?.join(', ') || '',
    'metadata[commitment]': mapped?.label || '',
    'metadata[responseFlow]': flow || '',
    'metadata[resultType]': mapped?.resultType || '',
    'metadata[leadTemperature]': mapped?.leadTemperature || '',
    'metadata[leadSource]': 'Aurora Recovery Quiz',
    'metadata[createdAt]': new Date().toISOString(),
  });

  const handleConsultationClick = () => {
    trackMetaEvent('Lead', {
      content_name: 'Free Consultation Click',
      content_category: 'booking',
      response_flow: 'B',
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12">
      {/* ── Top back button ── */}
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-0">
        <button
          onClick={() => router.push('/quiz/question-4')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        {/* Company Branding */}
        <div className="text-center pb-6 border-b border-border">
          <h2 className="text-2xl font-bold text-accent">Aurora Recovery</h2>
          <p className="text-sm text-muted-foreground mt-1">Your Wellness Experts in Katy, TX</p>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Somewhat interested?</h1>
          <p className="text-lg text-muted-foreground">
            Here&apos;s exactly what your first halotherapy session at Aurora Recovery will look like:
          </p>
        </div>

        {/* Session Walkthrough */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Session Walkthrough</h2>
          <ol className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Step 1 — </span>
              You arrive and are welcomed into a calm, dimly lit salt room designed to feel like a natural salt cave.
            </li>
            <li>
              <span className="font-semibold text-foreground">Step 2 — </span>
              You sit back in a comfortable chair. Soft music plays. There are no screens, no distractions.
            </li>
            <li>
              <span className="font-semibold text-foreground">Step 3 — </span>
              A halogenerator quietly grinds pharmaceutical-grade salt into microscopic particles and disperses them into the air.
            </li>
            <li>
              <span className="font-semibold text-foreground">Step 4 — </span>
              You simply breathe normally. The salt particles travel deep into your airways, settle on your skin, and begin working naturally.
            </li>
            <li>
              <span className="font-semibold text-foreground">Step 5 — </span>
              45 minutes later you walk out. Airways clearer. Skin calmer. Mind lighter.
            </li>
          </ol>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleConsultationClick}
              data-cal-link={calLink}
              data-cal-namespace="halotherapy"
              data-cal-config={calConfig}
              className="w-full min-h-14 h-auto bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-4 text-base sm:text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2 whitespace-normal text-center leading-snug"
            >
              <Calendar className="w-5 h-5" />
              Get a Free 15-Minute Salt Therapy Consultation
            </button>
            <Button
              onClick={() => setShowVideo((current) => !current)}
              variant="ghost"
              className="w-full h-auto py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground"
            >
              Learn more about how it works
            </Button>
          </div>

          {showVideo && (
            <div className="bg-background border border-border rounded-lg overflow-hidden aspect-video">
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.loom.com/embed/c4d4bbc4f75843c59ca0579a4b6abd7d"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="Halotherapy Introduction"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quiz Summary */}
        <div className="bg-accent/10 border border-accent rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Your Assessment Summary</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Current condition:</strong> {answers.question1?.join(', ') || 'N/A'}
            </p>
            <p>
              <strong>How long it has been going on:</strong> {answers.question2?.join(', ') || 'N/A'}
            </p>
            <p>
              <strong>What you have already tried:</strong> {answers.question3?.join(', ') || 'N/A'}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-foreground">Your next step</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Watch the session walkthrough if you want a clearer picture</li>
            <li>Book the free 15-minute consultation when you&apos;re ready</li>
            <li>Use the consultation to decide whether halotherapy fits your goals</li>
          </ol>
        </div>


      </div>

    </main>
  );
}
