'use client';

import { useEffect, useState } from 'react';
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
        {/* Company Branding */}
        <div className="text-center pb-6 border-b border-border">
          <h2 className="text-2xl font-bold text-accent">Aurora Recovery</h2>
          <p className="text-sm text-muted-foreground mt-1">Your Wellness Experts in Katy, TX</p>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Very ready to try something new?</h1>
          <p className="text-lg text-muted-foreground animate-unlocked-shake">
            You&apos;ve unlocked a Free 15-Minute Salt Therapy Consultation with your first session at Aurora Recovery OT in Katy, TX. Our team will walk you through exactly what to expect and make sure halotherapy is the right fit for you before you begin.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {[
            { title: 'Free Consultation', desc: 'Walk through your goals before your first visit' },
            { title: 'First Session Clarity', desc: 'Know exactly what to expect when you arrive' },
            { title: 'Fastest Path Forward', desc: 'Book now and get moving today' },
          ].map((benefit, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
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

        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-foreground">What happens next</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Tap Book Your First Session Now</li>
            <li>Fill in your information on the booking flow</li>
            <li>Confirm the appointment and get your consultation scheduled</li>
          </ol>
        </div>

        {/* Exclusive Offering */}
        <div className="border-2 border-accent rounded-lg p-6 bg-accent/5 space-y-3">
          <h3 className="font-semibold text-foreground text-lg">What you just unlocked</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Free 15-minute salt therapy consultation</li>
            <li>A guided first visit at Aurora Recovery OT in Katy, TX</li>
            <li>A clear understanding of what to expect before treatment begins</li>
          </ul>
        </div>


      </div>

      <style jsx>{`
        .animate-unlocked-shake {
          display: inline-block;
          transform-origin: center;
          animation: unlocked-shake 2.8s ease-in-out infinite;
        }

        @keyframes unlocked-shake {
          0%,
          65%,
          100% {
            transform: translateX(0) rotate(0deg);
          }

          70% {
            transform: translateX(-1px) rotate(-0.5deg);
          }

          75% {
            transform: translateX(1px) rotate(0.5deg);
          }

          80% {
            transform: translateX(-1px) rotate(-0.4deg);
          }

          85% {
            transform: translateX(1px) rotate(0.4deg);
          }

          90% {
            transform: translateX(0) rotate(0deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-unlocked-shake {
            animation: none;
          }
        }
      `}</style>

    </main>
  );
}
