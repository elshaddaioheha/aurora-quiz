'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useQuiz } from '@/lib/quiz-context';
import { QuizProgress } from '@/components/quiz-progress';
import { ChevronLeft } from 'lucide-react';

const options = [
  { label: 'Just browsing', value: 'A' },
  { label: 'Somewhat interested', value: 'B' },
  { label: 'Very ready to try something new', value: 'C' },
];

export default function Question4() {
  const router = useRouter();
  const { answers, setAnswers } = useQuiz();
  const [selected, setSelected] = useState<string>(answers.question4 || '');

  const flowRoute = {
    A: '/quiz/response-a',
    B: '/quiz/response-b',
    C: '/quiz/response-c',
  } as const;

  const handleSelect = (value: string) => {
    setSelected(value);
    setAnswers({
      question4: value,
      responseFlow: value as 'A' | 'B' | 'C',
    });
    router.push(flowRoute[value as 'A' | 'B' | 'C']);
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
          <RadioGroup value={selected} onValueChange={handleSelect} className="space-y-3">
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={`question-4-${option.value}`}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all cursor-pointer flex items-center gap-3 ${
                  selected === option.value
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
              >
                <RadioGroupItem
                  id={`question-4-${option.value}`}
                  value={option.value}
                  className="size-5 border-2 data-[state=checked]:border-accent data-[state=checked]:text-accent"
                />
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="pt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
