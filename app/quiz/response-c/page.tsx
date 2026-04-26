'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
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

export default function ResponseC() {
  const router = useRouter();
  const { answers } = useQuiz();
  const isMobile = useIsMobile();
  const redirectUrl = useCalBookingHandoff('halotherapy');
  const flow = (answers.responseFlow || answers.question4) as 'A' | 'B' | 'C' | undefined;
  const mapped = flow ? commitmentMap[flow] : undefined;

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: 'Halotherapy Response C',
      content_category: 'quiz-response',
      response_flow: 'C',
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
    'metadata[condition]': answers.question1 || '',
    'metadata[duration]': answers.question2 || '',
    'metadata[triedBefore]': answers.question3 || '',
    'metadata[commitment]': mapped?.label || '',
    'metadata[responseFlow]': flow || '',
    'metadata[resultType]': mapped?.resultType || '',
    'metadata[leadTemperature]': mapped?.leadTemperature || '',
    'metadata[leadSource]': 'Aurora Recovery Quiz',
    'metadata[createdAt]': new Date().toISOString(),
  });

  const handleBookingClick = () => {
    trackMetaEvent('Lead', {
      content_name: 'Book Now Click',
      content_category: 'booking',
      response_flow: 'C',
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
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Your personalized next step</h1>
          <p className="text-lg text-muted-foreground">
            Book a free 15-minute salt therapy consultation to walk through what to expect and decide whether halotherapy is the right fit for your goals.
          </p>
        </div>

        {/* Quiz Summary */}
        <div className="bg-accent/10 border border-accent rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Your Assessment Summary</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Current condition:</strong> {answers.question1 || 'N/A'}
            </p>
            <p>
              <strong>How long it has been going on:</strong> {answers.question2 || 'N/A'}
            </p>
            <p>
              <strong>What you have already tried:</strong> {answers.question3 || 'N/A'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex">
          <button
            onClick={handleBookingClick}
            data-cal-link={calLink}
            data-cal-namespace="halotherapy"
            data-cal-config={calConfig}
            className="w-full min-h-14 h-auto bg-accent hover:bg-accent/90 text-accent-foreground px-5 py-4 text-base sm:text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2 whitespace-normal text-center leading-snug"
          >
            <Calendar className="w-5 h-5" />
            Book Your First Session Now
          </button>
        </div>

      </div>
    </main>
  );
}
