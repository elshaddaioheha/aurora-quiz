'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { useQuiz } from '@/lib/quiz-context';
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
      A: '/quiz/response-a',
      B: '/quiz/response-b',
      C: '/quiz/response-c',
    };

    router.replace(flowRoute[flow]);
  }, [answers.responseFlow, router]);

  return null;
}
