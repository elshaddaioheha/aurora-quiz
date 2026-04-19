'use client';

import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { CheckCircle2 } from 'lucide-react';

const BULLETS = [
  'Real relief for chronic allergies, congestion, and breathing issues — without inhalers that wear off',
  'Calmer, clearer skin without prescription creams or steroid treatments',
  'A complete mental reset without medication or supplements',
  '45 minutes in a natural salt room — no side effects, no recovery time',
  'Your first session comes with a free 15-minute consultation',
];

const BENEFITS = [
  {
    title: 'Natural Relief',
    description: 'Drug-free, side effect-free healing with salt therapy',
  },
  {
    title: 'Complete Wellness',
    description: 'Address respiratory, skin, and mental health in one session',
  },
  {
    title: 'Lasting Clarity',
    description: 'Real, sustained improvements without constant treatment',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { resetQuiz } = useQuiz();

  const handleStartQuiz = () => {
    resetQuiz();
    router.push('/quiz/question-1');
  };

  return (
    /* Outer wrapper: flex column, full-height, centred, no horizontal overflow */
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 16px 48px',
        boxSizing: 'border-box',
      }}
      className="bg-gradient-to-br from-background via-background to-secondary/20"
    >
      {/* Inner content column — max 672 px, full width on mobile */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '672px',
          gap: '0',
        }}
      >
        {/* ── HERO HEADLINE ── */}
        <h1
          style={{
            fontSize: 'clamp(1.6rem, 5vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.25,
            textAlign: 'center',
            marginBottom: '16px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            width: '100%',
          }}
          className="text-foreground"
        >
          Still Managing Symptoms That Never Fully Go Away?
        </h1>

        {/* ── SUBHEADLINE ── */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
            lineHeight: 1.65,
            textAlign: 'center',
            maxWidth: '560px',
            marginBottom: '28px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            width: '100%',
          }}
          className="text-muted-foreground"
        >
          Whether it&apos;s allergies, skin flare-ups, or a mind that won&apos;t switch off,
          find out if halotherapy is the natural, drug-free relief you&apos;ve been
          looking for. Takes 10 seconds.
        </p>

        {/* ── TOP CTA BUTTON ── */}
        <div style={{ width: '100%', marginBottom: '32px' }}>
          <Button
            size="lg"
            onClick={handleStartQuiz}
            style={{
              width: '100%',
              minHeight: '52px',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
              fontWeight: 600,
              whiteSpace: 'normal',
              lineHeight: 1.3,
              padding: '12px 20px',
              wordBreak: 'break-word',
            }}
            className="hover:shadow-lg transition-shadow"
          >
            👉 Click here to find out if halo therapy is for you 👈
          </Button>
        </div>

        {/* ── BULLET POINTS ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '560px',
            marginBottom: '48px',
          }}
        >
          {BULLETS.map((point, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                width: '100%',
              }}
            >
              <CheckCircle2
                style={{ flexShrink: 0, marginTop: '2px' }}
                className="w-5 h-5 text-accent"
              />
              <p
                style={{
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  lineHeight: 1.6,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  margin: 0,
                }}
                className="text-muted-foreground"
              >
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* ── WHY IT WORKS HEADER ── */}
        <h2
          id="why-halotherapy-works"
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 2.25rem)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '24px',
            wordBreak: 'break-word',
            width: '100%',
          }}
          className="text-foreground"
        >
          Why Halotherapy Works
        </h2>

        {/* ── BENEFIT CARDS ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            width: '100%',
            marginBottom: '40px',
          }}
        >
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '20px 16px',
                borderRadius: '8px',
                gap: '8px',
              }}
              className="bg-card border border-border hover:border-accent/50 transition-colors"
            >
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: '1rem',
                  marginBottom: '4px',
                }}
                className="text-foreground"
              >
                {benefit.title}
              </h3>
              <p
                style={{ fontSize: '0.875rem', lineHeight: 1.5 }}
                className="text-muted-foreground"
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA BUTTON ── */}
        <div style={{ width: '100%' }}>
          <Button
            size="lg"
            onClick={handleStartQuiz}
            style={{
              width: '100%',
              minHeight: '52px',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
              fontWeight: 600,
              whiteSpace: 'normal',
              lineHeight: 1.3,
              padding: '12px 20px',
              wordBreak: 'break-word',
            }}
            className="hover:shadow-lg transition-shadow"
          >
            👉 Click here to find out if halo therapy is for you 👈
          </Button>
        </div>
      </div>
    </div>
  );
}
