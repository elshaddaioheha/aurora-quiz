'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/lib/quiz-context';
import { QuizProgress } from '@/components/quiz-progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const options = [
  'Allergies / Congestion / Breathing difficulties',
  'Skin condition (Eczema, Psoriasis, Acne)',
  'Stress / Anxiety / Sleep issues',
  'Post-viral symptoms (lingering cough, chest tightness)',
  'General wellness / Immune support',
];

export default function Question1() {
  const router = useRouter();
  const { answers, setAnswers } = useQuiz();
  const [selected, setSelected] = useState<string>(answers.question1?.[0] || '');
  const [isAdvancing, setIsAdvancing] = useState(false);

  const handleSelect = (option: string) => {
    if (isAdvancing) return;
    setSelected(option);
    setAnswers({ question1: [option] });
    setIsAdvancing(true);
    setTimeout(() => {
      router.push('/quiz/question-2');
    }, 120);
  };

  const handleNext = () => {
    if (selected) {
      setAnswers({ question1: [selected] });
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
              What are you currently dealing with?
            </h1>
            <p className="text-muted-foreground">Select one option</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selected === option
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border bg-card hover:border-accent/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      selected === option
                        ? 'border-accent bg-accent'
                        : 'border-border'
                    }`}
                  >
                    {selected === option && (
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
              disabled={!selected || isAdvancing}
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
