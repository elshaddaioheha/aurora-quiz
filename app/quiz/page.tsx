'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { useQuiz } from '@/lib/quiz-context';

export default function QuizLanding() {
  const router = useRouter();
  const { resetQuiz } = useQuiz();

  useEffect(() => {
    resetQuiz();
    router.replace('/quiz/question-1');
  }, [resetQuiz, router]);

  return null;
}
