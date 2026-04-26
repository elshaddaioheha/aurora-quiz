'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useQuiz } from '@/lib/quiz-context';
import { QuizProgress } from '@/components/quiz-progress';
import { ChevronLeft } from 'lucide-react';

const options = [
  'Antihistamines / Allergy medications',
  'Prescription inhalers',
  'Steroid creams / Topical treatments',
  'Nasal sprays / Decongestants',
  'Supplements (Melatonin, Ashwagandha, Vitamin C, etc.)',
  'Meditation apps / Breathing exercises',
  'Dietary changes',
  'Nothing yet',
];

export default function Question3() {
  const router = useRouter();
  const { answers, setAnswers } = useQuiz();
  const [selected, setSelected] = useState<string>(answers.question3 || '');

  const handleSelect = (option: string) => {
    setSelected(option);
    setAnswers({ question3: option });
    router.push('/quiz/question-4');
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
              What have you already tried?
            </h1>
            <p className="text-muted-foreground">Select one option</p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <RadioGroup value={selected} onValueChange={handleSelect} className="space-y-4">
              {options.map((option) => (
                <label
                  key={option}
                  htmlFor={`question-3-${option}`}
                  className={`w-full p-6 text-left rounded-lg border-2 transition-all cursor-pointer flex items-center gap-3 ${
                    selected === option
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border bg-card hover:border-accent/50'
                  }`}
                >
                  <RadioGroupItem
                    id={`question-3-${option}`}
                    value={option}
                    className="size-5 border-2 data-[state=checked]:border-accent data-[state=checked]:text-accent"
                  />
                  <span className="font-semibold text-lg">{option}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pt-8">
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
