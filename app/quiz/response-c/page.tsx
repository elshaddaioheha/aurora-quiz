'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { Calendar } from 'lucide-react';
import { trackMetaEvent } from '@/components/meta-pixel';

export default function ResponseC() {
  const router = useRouter();
  const { answers } = useQuiz();

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: 'Halotherapy Response C',
      content_category: 'quiz-response',
      response_flow: 'C',
    });
  }, []);

  const handleBookingClick = () => {
    trackMetaEvent('Lead', {
      content_name: 'Book Now Click',
      content_category: 'booking',
      response_flow: 'C',
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Very ready to try something new?</h1>
          <p className="text-lg text-muted-foreground">
            You&apos;ve unlocked a free 15-minute salt therapy consultation with your first session at Aurora Recovery OT in Katy, TX.
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
        <div className="flex gap-4">
          <button
            onClick={handleBookingClick}
            data-cal-link="aurorarecovery/halotherapy"
            data-cal-namespace="halotherapy"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":true,"theme":"light"}'
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-6 text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Book Your First Session Now
          </button>
          <Button
            onClick={() => router.push('/quiz')}
            variant="outline"
            className="flex-1 py-6 rounded-full"
          >
            Retake Quiz
          </Button>
        </div>

        {/* Info Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-foreground">You&apos;re ready</h3>
          <p className="text-sm text-muted-foreground">
            Your team will walk you through exactly what to expect and make sure halotherapy is the right fit for you before you begin.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Book your first session now</li>
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

        <Button
          onClick={() => router.push('/quiz/question-4')}
          variant="outline"
          className="w-full py-6 rounded-full"
        >
          Back to Previous Question
        </Button>
      </div>

    </main>
  );
}
