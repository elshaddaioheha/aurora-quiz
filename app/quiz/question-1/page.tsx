'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { QuizProgress } from '@/components/quiz-progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const options = [
  'Stress relief & relaxation',
  'Better sleep quality',
  'Improved breathing & respiratory health',
  'Energy boost & vitality',
  'General wellness',
];

export default function Question1() {
  const router = useRouter();
  const { answers, setAnswers } = useQuiz();
  const [selected, setSelected] = useState<string[]>(answers.question1 || []);

  const handleSelect = (option: string) => {
    setSelected((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleNext = () => {
    if (selected.length > 0) {
      setAnswers({ question1: selected });
      router.push('/quiz/question-2');
    }
  };

  const handleBack = () => {
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <QuizProgress currentStep={1} totalSteps={4} />

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              What are your primary wellness goals?
            </h1>
            <p className="text-muted-foreground">Select all that apply</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selected.includes(option)
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      selected.includes(option)
                        ? 'border-accent bg-accent'
                        : 'border-border'
                    }`}
                  >
                    {selected.includes(option) && (
                      <span className="text-accent-foreground font-bold">✓</span>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={selected.length === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
