'use client';

import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/lib/booking-context';
import { ProgressIndicator } from '@/components/progress-indicator';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const SERVICES = [
  { id: 'consultation', name: 'Free 15-Minute Salt Therapy Consultation', description: 'A quick intro to see whether halotherapy is a fit', price: 'Free' },
  { id: 'first-session', name: 'First Salt Therapy Session', description: 'Your guided first visit in the salt room', price: 'Book Now' },
  { id: 'wellness-plan', name: 'Ongoing Wellness Plan', description: 'Support for clients who want continued sessions', price: 'Custom' },
];

export default function ServicePage() {
  const router = useRouter();
  const { data, updateData, setCurrentStep } = useBooking();
  const [selectedService, setSelectedService] = useState(data.service || '');

  const handleNext = () => {
    if (!selectedService) return;
    updateData({ service: selectedService });
    setCurrentStep(1);
    router.push('/booking/contact');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <ProgressIndicator currentStep={0} totalSteps={4} labels={['Service', 'Contact', 'Details', 'Confirm']} />

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Choose Your Next Step</h1>
            <p className="text-muted-foreground">Start with the free consultation or move straight into your first salt therapy session</p>
          </div>

          <div className="space-y-3">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full p-6 rounded-lg border-2 transition-all text-left group ${
                  selectedService === service.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-accent">{service.price}</p>
                    <div
                      className={`w-5 h-5 rounded-full border-2 mt-2 ${
                        selectedService === service.id
                          ? 'bg-accent border-accent'
                          : 'border-muted-foreground'
                      }`}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
            <Button onClick={handleNext} disabled={!selectedService} className="flex-1 gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
