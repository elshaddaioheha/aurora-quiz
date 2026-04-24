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

export default function ResponseA() {
  const router = useRouter();
  const { answers } = useQuiz();
  const isMobile = useIsMobile();
  const [showVideo, setShowVideo] = useState(false);
  const redirectUrl = useCalBookingHandoff('halotherapy');

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: 'Halotherapy Response A',
      content_category: 'quiz-response',
      response_flow: 'A',
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
  });

  const handleConsultationClick = () => {
    trackMetaEvent('Lead', {
      content_name: 'Free Consultation Click',
      content_category: 'booking',
      response_flow: 'A',
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Just browsing?</h1>
          <p className="text-lg text-muted-foreground">
            Start by learning how halo therapy works, or skip ahead to a free consultation.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          {[
            { title: 'Learn the Basics', desc: 'See how the salt room experience works' },
            { title: 'No Pressure', desc: 'Explore first, decide later' },
            { title: 'Quick Next Step', desc: 'Book a free 15-minute consultation' },
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
        <div className="grid gap-4 md:grid-cols-2">
          <Button
            onClick={() => setShowVideo((current) => !current)}
            className="w-full min-h-14 h-auto bg-accent hover:bg-accent/90 text-accent-foreground py-4 px-5 rounded-full whitespace-normal text-center leading-snug"
          >
            See how halo therapy works
          </Button>
          <button
            onClick={handleConsultationClick}
            data-cal-link={calLink}
            data-cal-namespace="halotherapy"
            data-cal-config={calConfig}
            className="w-full min-h-14 h-auto border-2 border-border bg-card hover:border-accent/40 text-foreground px-5 py-4 text-base sm:text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2 whitespace-normal text-center leading-snug transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Get a Free 15-Minute Salt Therapy Consultation
          </button>
        </div>

        {showVideo && (
          <div className="bg-card border border-border rounded-lg overflow-hidden aspect-video">
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.loom.com/embed/c4d4bbc4f75843c59ca0579a4b6abd7d"
                frameBorder="0"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="How Halotherapy Works"
              />
            </div>
          </div>
        )}



        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-foreground">What happens next</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Learn the basics of halo therapy</li>
            <li>Book a free 15-minute consultation if you want to talk to our team</li>
            <li>Choose the next step that feels right for you</li>
          </ol>
        </div>
      </div>

    </main>
  );
}
