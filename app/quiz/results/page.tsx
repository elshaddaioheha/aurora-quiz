'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { useQuiz } from '@/lib/quiz-context';
import { Spinner } from '@/components/ui/spinner';
import { trackMetaEvent } from '@/components/meta-pixel';

export default function Results() {
  const router = useRouter();
  const { answers } = useQuiz();

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
      'A': '/quiz/response-a',
      'B': '/quiz/response-b',
      'C': '/quiz/response-c',
    };

    const timer = setTimeout(() => {
      router.replace(flowRoute[flow]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [answers.responseFlow, router]);

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-4">
        <Spinner />
        <p className="text-muted-foreground">Loading your personalized recommendations...</p>
      </div>
    </main>
  );
}
