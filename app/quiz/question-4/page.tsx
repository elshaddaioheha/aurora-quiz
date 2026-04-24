'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { QuizProgress } from '@/components/quiz-progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const options = [
  { label: 'Just browsing', value: 'A' },
  { label: 'Somewhat interested', value: 'B' },
  { label: 'Very ready to try something new', value: 'C' },
];

export default function Question4() {
  const router = useRouter();
  const { answers, setAnswers } = useQuiz();
  const [selected, setSelected] = useState<string>(answers.question4 || '');

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected) {
      setAnswers({ 
        question4: selected,
        responseFlow: selected as 'A' | 'B' | 'C'
      });
      router.push(`/quiz/results?flow=${selected}`);
    }
  };

  const handleBack = () => {
    router.push('/quiz/question-3');
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <QuizProgress currentStep={4} totalSteps={4} />

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              How serious are you about finding a solution in the next 30 days?
            </h1>
            <p className="text-muted-foreground">Choose the statement that best matches where you are right now</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-6 text-left rounded-lg border-2 transition-all ${
                  selected === option.value
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selected === option.value
                        ? 'border-accent bg-accent'
                        : 'border-border'
                    }`}
                  >
                    {selected === option.value && (
                      <span className="text-accent-foreground text-xs font-bold">●</span>
                    )}
                  </div>
                  <span className="font-semibold text-lg">{option.label}</span>
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
              disabled={!selected}
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
