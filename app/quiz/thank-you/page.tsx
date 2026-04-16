'use client';

import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function ThankYou() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background text-foreground py-12">
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        {/* Company Name */}
        <div className="text-center pb-4 border-b border-border">
          <h2 className="text-2xl font-bold text-accent">Aurora Recovery</h2>
          <p className="text-sm text-muted-foreground mt-1">Katy, TX</p>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            You&apos;re All Set!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your appointment has been scheduled at Aurora Recovery. We&apos;re excited to support your wellness journey.
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="font-semibold text-foreground text-lg">What Happens Next</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Check your email for confirmation details and appointment reminder</li>
              <li>Arrive 10-15 minutes early on the day of your appointment</li>
              <li>Bring any medical documents if applicable</li>
              <li>Our specialist will guide you through your first session</li>
            </ol>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Phone,
              label: 'Call Us',
              value: '(713) 000-0000',
              desc: 'Mon-Fri, 9am-6pm',
            },
            {
              icon: Mail,
              label: 'Email',
              value: 'hello@aurorarecovery.com',
              desc: 'We reply within 24 hours',
            },
            {
              icon: MapPin,
              label: 'Visit Us',
              value: 'Katy, TX',
              desc: 'Aurora Recovery Center',
            },
          ].map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div key={idx} className="bg-card border border-border rounded-lg p-6 text-center space-y-2">
                <Icon className="w-8 h-8 text-accent mx-auto" />
                <h3 className="font-semibold text-foreground">{contact.label}</h3>
                <p className="text-sm font-medium text-foreground">{contact.value}</p>
                <p className="text-xs text-muted-foreground">{contact.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex gap-4 pt-8">
          <Button
            onClick={() => router.push('/')}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg font-semibold rounded-full"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => router.push('/quiz')}
            variant="outline"
            className="flex-1 py-6 rounded-full"
          >
            Take Another Quiz
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            {[
              {
                q: 'What should I bring to my appointment?',
                a: 'Bring a photo ID and any relevant medical records. Wear comfortable clothing.',
              },
              {
                q: 'Can I reschedule my appointment?',
                a: 'Yes! Contact us at least 24 hours in advance to reschedule.',
              },
              {
                q: 'Is halotherapy safe?',
                a: 'Yes, halotherapy is a safe, non-invasive wellness treatment suitable for most people.',
              },
            ].map((faq, idx) => (
              <div key={idx}>
                <p className="font-semibold text-foreground mb-1">{faq.q}</p>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
