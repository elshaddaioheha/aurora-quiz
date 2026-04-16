'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { Calendar } from 'lucide-react';
import { trackMetaEvent } from '@/components/meta-pixel';

export default function ResponseA() {
  const router = useRouter();
  const { answers } = useQuiz();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: 'Halotherapy Response A',
      content_category: 'quiz-response',
      response_flow: 'A',
    });
  }, []);

  const handleConsultationClick = () => {
    trackMetaEvent('Lead', {
      content_name: 'Free Consultation Click',
      content_category: 'booking',
      response_flow: 'A',
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12">
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
              <strong>Primary Goals:</strong> {answers.question1?.join(', ') || 'N/A'}
            </p>
            <p>
              <strong>Health Concerns:</strong> {answers.question2?.join(', ') || 'N/A'}
            </p>
            <p>
              <strong>Wellness Priority:</strong> {answers.question3?.[0] || 'N/A'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="grid gap-4 md:grid-cols-2">
          <Button
            onClick={() => setShowVideo((current) => !current)}
            variant="outline"
            className="w-full py-6 rounded-full"
          >
            Learn how halo therapy works
          </Button>
          <button
            onClick={handleConsultationClick}
            data-cal-link="aurorarecovery/halotherapy"
            data-cal-namespace="halotherapy"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":true,"theme":"light"}'
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2"
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

        <Button
          onClick={() => router.push('/quiz/question-4')}
          variant="outline"
          className="w-full py-6 rounded-full"
        >
          Back to Previous Question
        </Button>

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
