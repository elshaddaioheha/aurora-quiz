'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useQuiz } from '@/lib/quiz-context';
import { QuizProgress } from '@/components/quiz-progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const options = [
  'A few days',
  'A few weeks',
  'Several months',
  'Over a year',
  'Multiple years',
];

export default function Question2() {
  const router = useRouter();
  const { answers, setAnswers } = useQuiz();
  const [selected, setSelected] = useState<string>(answers.question2 || '');

  const handleSelect = (option: string) => {
    setSelected(option);
    setAnswers({ question2: option });
    router.push('/quiz/question-3');
  };

  const handleNext = () => {
    if (selected) {
      setAnswers({ question2: selected });
      router.push('/quiz/question-3');
    }
  };

  const handleBack = () => {
    router.push('/quiz/question-1');
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        <QuizProgress currentStep={2} totalSteps={4} />

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              How long have you been dealing with this?
            </h1>
            <p className="text-muted-foreground">Select one option</p>
          </div>

          {/* Options */}
          <RadioGroup value={selected} onValueChange={handleSelect} className="space-y-3">
            {options.map((option) => (
              <label
                key={option}
                htmlFor={`question-2-${option}`}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all cursor-pointer flex items-center gap-3 ${
                  selected === option
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
              >
                <RadioGroupItem
                  id={`question-2-${option}`}
                  value={option}
                  className="size-5 border-2 data-[state=checked]:border-accent data-[state=checked]:text-accent"
                />
                <span className="font-medium">{option}</span>
              </label>
            ))}
          </RadioGroup>

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
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
