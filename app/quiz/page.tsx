'use client';

import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { ArrowRight } from 'lucide-react';

export default function QuizLanding() {
  const router = useRouter();
  const { resetQuiz } = useQuiz();

  const handleStart = () => {
    resetQuiz();
    router.push('/quiz/question-1');
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full mx-auto">
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="space-y-6 sm:space-y-8 text-center">
          {/* Headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
              Discover Your Perfect Wellness Path
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Take our personalized assessment to find the halotherapy solution tailored specifically for your health goals and lifestyle.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 sm:py-8">
            {[
              { icon: '✓', label: 'Personalized Results' },
              { icon: '⏱', label: '2-3 Minutes' },
              { icon: '🎯', label: 'Expert Guidance' },
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 sm:gap-2">
                <span className="text-2xl sm:text-3xl">{benefit.icon}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{benefit.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-8">
            <Button
              onClick={handleStart}
              size="lg"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-6 text-base sm:text-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:gap-3"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Trust signal */}
          <p className="text-xs sm:text-sm text-muted-foreground pt-4 sm:pt-8">
            Trusted by wellness professionals • No spam, just personalized insights
          </p>
        </div>
      </div>
    </main>
  );
}
