interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
