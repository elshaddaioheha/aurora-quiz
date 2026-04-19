'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/router';
import { useQuiz } from '@/lib/quiz-context';
import { Spinner } from '@/components/ui/spinner';
import { trackMetaEvent } from '@/components/meta-pixel';

const LOADING_MESSAGES = [
  'Analysing your responses…',
  'Finding your best match…',
  'Preparing your recommendations…',
];

export default function Results() {
  const router = useRouter();
  const { answers } = useQuiz();
  const [messageIndex, setMessageIndex] = useState(0);

  /* Cycle through messages every 500 ms */
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const flowFromUrl = searchParams.get('flow') as 'A' | 'B' | 'C' | null;
    const flow = flowFromUrl || answers.responseFlow;

    if (!flow) {
      router.replace('/quiz');
      return;
    }

    trackMetaEvent('CompleteRegistration', {
      content_name: 'Quiz Completed',
      content_category: 'quiz',
      response_flow: flow,
    });

    const flowRoute = {
      A: '/quiz/response-a',
      B: '/quiz/response-b',
      C: '/quiz/response-c',
    };

    const timer = setTimeout(() => {
      router.replace(flowRoute[flow]);
    }, 1800);

    return () => clearTimeout(timer);
  }, [answers.responseFlow, router]);

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        boxSizing: 'border-box',
      }}
      className="bg-background text-foreground"
    >
      {/* Card */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '28px',
          width: '100%',
          maxWidth: '420px',
          padding: '48px 32px',
          borderRadius: '16px',
          textAlign: 'center',
        }}
        className="bg-card border border-border shadow-lg"
      >
        {/* Spinner */}
        <Spinner style={{ width: '72px', height: '72px' }} />

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
              fontWeight: 700,
              lineHeight: 1.3,
              margin: 0,
            }}
            className="text-foreground"
          >
            Just a moment…
          </h1>

          {/* Animated cycling message */}
          <p
            key={messageIndex}
            style={{
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              lineHeight: 1.6,
              margin: 0,
              transition: 'opacity 0.3s ease',
            }}
            className="text-muted-foreground"
          >
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
          className="bg-secondary"
        >
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              animation: 'progress-fill 1.8s ease-in-out forwards',
            }}
            className="bg-accent"
          />
        </div>
      </div>

      {/* Keyframe for the progress bar */}
      <style>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </main>
  );
}
