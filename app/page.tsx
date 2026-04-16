'use client';

import { useRouter } from '@/lib/router';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { resetQuiz } = useQuiz();

  const handleStartQuiz = () => {
    resetQuiz();
    router.push('/quiz/question-1');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Still Managing Symptoms That Never Fully Go Away?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s allergies, skin flare-ups, or a mind that won&apos;t switch off, find out if
            halotherapy is the natural, drug-free relief you&apos;ve been looking for. Takes 10 seconds
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button
            size="lg"
            onClick={handleStartQuiz}
            className="h-12 px-8 text-base font-semibold hover:shadow-lg transition-shadow"
          >
            👉 Click here to find out if halo therapy is for you 👈
          </Button>
        </div>

        {/* Bullet Points Section */}
        <div className="pt-8 space-y-3 text-left max-w-xl mx-auto">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Real relief for chronic allergies, congestion, and breathing issues — without inhalers that wear off
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Calmer, clearer skin without prescription creams or steroid treatments
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              A complete mental reset without medication or supplements
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              45 minutes in a natural salt room — no side effects, no recovery time
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              Your first session comes with a free 15-minute consultation
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="why-halotherapy-works" className="pt-24 space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Why Halotherapy Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Natural Relief',
                description: 'Drug-free, side effect-free healing with salt therapy',
                image: '/relief-natural.jpg',
              },
              {
                title: 'Complete Wellness',
                description: 'Address respiratory, skin, and mental health in one session',
                image: '/skin-clarity.jpg',
              },
              {
                title: 'Lasting Clarity',
                description: 'Real, sustained improvements without constant treatment',
                image: '/mental-clarity.jpg',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-colors"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button - Bottom */}
        <div className="pt-8">
          <Button
            size="lg"
            onClick={handleStartQuiz}
            className="h-12 px-8 text-base font-semibold hover:shadow-lg transition-shadow"
          >
            👉 Click here to find out if halo therapy is for you 👈
          </Button>
        </div>
      </div>
    </div>
  );
}
