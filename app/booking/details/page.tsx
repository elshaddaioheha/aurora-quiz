'use client';

import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/lib/booking-context';
import { ProgressIndicator } from '@/components/progress-indicator';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function DetailsPage() {
  const router = useRouter();
  const { data, updateData, setCurrentStep } = useBooking();
  const [notes, setNotes] = useState(data.notes || '');

  const handleNext = () => {
    updateData({ notes });
    setCurrentStep(3);
    router.push('/booking/confirm');
  };

  const handleBack = () => {
    setCurrentStep(1);
    router.push('/booking/contact');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <ProgressIndicator currentStep={2} totalSteps={4} labels={['Service', 'Contact', 'Details', 'Confirm']} />

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Additional Details</h1>
            <p className="text-muted-foreground">Tell us anything else we should know (optional)</p>
          </div>

          <div className="space-y-6 bg-card border border-border rounded-lg p-8">
            <div className="space-y-2">
              <label htmlFor="notes" className="text-foreground font-semibold block">
                Special Requests or Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about any special requirements, preferences, or additional information..."
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={6}
              />
              <p className="text-xs text-muted-foreground">This field is optional</p>
            </div>
          </div>

          <div className="bg-secondary/30 border border-border rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-foreground">Upcoming Summary</h3>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Service:</span> {data.service}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Name:</span> {data.name}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span> {data.email}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span> {data.phone}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
            <Button onClick={handleNext} className="flex-1 gap-2">
              Review & Confirm <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
