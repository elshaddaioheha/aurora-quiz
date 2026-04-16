'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { QuizProgress } from '@/components/quiz-progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const options = [
  'Very important - I actively manage my health',
  'Important - I try to maintain wellness routines',
  'Somewhat important - I want to improve',
  'Not very important - Just curious',
];

export default function Question3() {
  const router = useRouter();
  const { answers, setAnswers } = useQuiz();
  const [selected, setSelected] = useState<string[]>(answers.question3 || []);

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
      setAnswers({ question3: selected });
      router.push('/quiz/question-4');
    }
  };

  const handleBack = () => {
    router.push('/quiz/question-2');
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <QuizProgress currentStep={3} totalSteps={4} />

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              How important is wellness to you?
            </h1>
            <p className="text-muted-foreground">Select the statement that resonates most</p>
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
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selected.includes(option)
                        ? 'border-accent bg-accent'
                        : 'border-border'
                    }`}
                  >
                    {selected.includes(option) && (
                      <span className="text-accent-foreground text-xs font-bold">●</span>
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
