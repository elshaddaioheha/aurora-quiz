'use client';

import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/lib/booking-context';
import { ProgressIndicator } from '@/components/progress-indicator';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

const SERVICE_DETAILS: Record<string, { name: string; price: string; duration: string }> = {
  consultation: { name: 'Free 15-Minute Salt Therapy Consultation', price: 'Free', duration: '15 minutes' },
  'first-session': { name: 'First Salt Therapy Session', price: 'Book Now', duration: '45 minutes' },
  'wellness-plan': { name: 'Ongoing Wellness Plan', price: 'Custom', duration: 'Varies' },
};

export default function ConfirmPage() {
  const router = useRouter();
  const { data, setCurrentStep } = useBooking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const service = SERVICE_DETAILS[data.service || ''] || SERVICE_DETAILS.consultation;

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
  };

  const handleNewBooking = () => {
    setCurrentStep(0);
    router.push('/booking/service');
  };

  const handleHome = () => {
    setCurrentStep(0);
    router.push('/');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl text-center space-y-8">
          <div className="flex justify-center pt-8">
            <CheckCircle className="w-20 h-20 text-primary" strokeWidth={1.5} />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Your appointment has been successfully scheduled.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 space-y-4 text-left">
            <h2 className="font-semibold text-foreground text-lg">Confirmation Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-muted-foreground text-sm">Service</p>
                <p className="text-foreground font-semibold">{service.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Price</p>
                  <p className="text-foreground font-semibold">{service.price}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p className="text-foreground font-semibold">{service.duration}</p>
                </div>
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <p className="text-muted-foreground text-sm">Confirmation sent to</p>
                <p className="text-foreground font-semibold">{data.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 border border-border rounded-lg p-6 text-left">
            <p className="text-sm text-muted-foreground mb-2">What&apos;s Next?</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Check your email for confirmation and appointment details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Save the date and time in your calendar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Arrive 5-10 minutes early on the day of your appointment</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" onClick={handleHome} className="flex-1">
              Back to Home
            </Button>
            <Button onClick={handleNewBooking} className="flex-1">
              Book Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <ProgressIndicator currentStep={3} totalSteps={4} labels={['Service', 'Contact', 'Details', 'Confirm']} />

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Review Your Booking</h1>
            <p className="text-muted-foreground">Please review all details before confirming</p>
          </div>

          <div className="space-y-4">
            {/* Service Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm text-muted-foreground font-semibold uppercase tracking-wide mb-3">
                Service
              </h3>
              <p className="text-2xl font-bold text-foreground">{service.name}</p>
              <div className="flex justify-between mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-muted-foreground text-sm">Duration</p>
                  <p className="text-foreground font-semibold">{service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Price</p>
                  <p className="text-primary text-xl font-bold">{service.price}</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm text-muted-foreground font-semibold uppercase tracking-wide mb-4">
                Your Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-sm">Name</p>
                  <p className="text-foreground font-medium">{data.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                  <p className="text-foreground font-medium">{data.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Phone</p>
                  <p className="text-foreground font-medium">{data.phone}</p>
                </div>
                {data.notes && (
                  <div>
                    <p className="text-muted-foreground text-sm">Notes</p>
                    <p className="text-foreground font-medium">{data.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Link */}
            <button
              onClick={() => {
                setCurrentStep(2);
                router.push('/booking/details');
              }}
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              ← Edit booking details
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentStep(2);
                router.push('/booking/details');
              }}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Confirming...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
