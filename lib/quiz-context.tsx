'use client';

import React, { createContext, useContext, useState } from 'react';

export interface QuizAnswers {
  question1?: string;
  question2?: string;
  question3?: string;
  question4?: string;
  responseFlow?: 'A' | 'B' | 'C';
}

interface QuizContextType {
  answers: QuizAnswers;
  setAnswers: (answers: Partial<QuizAnswers>) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswersState] = useState<QuizAnswers>({});

  const setAnswers = (newAnswers: Partial<QuizAnswers>) => {
    setAnswersState((prev) => ({ ...prev, ...newAnswers }));
  };

  const resetQuiz = () => {
    setAnswersState({});
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswers, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
}
