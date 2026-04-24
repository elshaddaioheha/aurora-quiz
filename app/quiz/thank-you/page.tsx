'use client';

import { useEffect } from 'react';
import { useRouter } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, MapPin } from 'lucide-react';
import Script from 'next/script';

const PIXEL_ID = '2498497057335985';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=605%20A%20Park%20Grove%20Dr%2C%20Katy%2C%20TX%2077450';
const FRONT_DESK_PHONE = '832-462-5642';

export default function ThankYou() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground py-8 sm:py-12">
      {/* Facebook Pixel Lead Event */}
      <Script id="meta-pixel-lead" strategy="afterInteractive">
        {`
          if(typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
          }
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=Lead&noscript=1`}
          alt=""
        />
      </noscript>
      <div className="max-w-2xl mx-auto px-4 space-y-6 sm:space-y-8">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground">
            Thank you for booking with Aurora Recovery
          </h1>
          <p className="text-lg text-muted-foreground">
            You&apos;ll receive a confirmation text via SMS and a reminder on the day of your session.
          </p>
        </div>

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            {
              icon: MapPin,
              label: 'Google Maps Address Link',
              value: '605 A Park Grove Dr, Katy, TX 77450',
              desc: 'Open directions in Google Maps',
              href: MAPS_URL,
            },
            {
              icon: Phone,
              label: 'Front Desk Number',
              value: FRONT_DESK_PHONE,
              desc: 'Call the front desk for help',
              href: `tel:${FRONT_DESK_PHONE.replace(/[^\d+]/g, '')}`,
            },
          ].map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <a
                key={idx}
                href={contact.href}
                target={idx === 0 ? '_blank' : undefined}
                rel={idx === 0 ? 'noreferrer' : undefined}
                className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center space-y-2 hover:border-accent/60 transition-colors"
              >
                <Icon className="w-8 h-8 text-accent mx-auto" />
                <h3 className="font-semibold text-foreground">{contact.label}</h3>
                <p className="text-sm font-medium text-foreground wrap-break-word">{contact.value}</p>
                <p className="text-xs text-muted-foreground">{contact.desc}</p>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
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
          <h3 className="font-semibold text-foreground">What happens next</h3>
          <div className="space-y-4 text-sm">
            {[
              {
                q: 'Your booking is confirmed',
                a: "You'll get a confirmation text via SMS shortly after booking.",
              },
              {
                q: 'Reminder on session day',
                a: "We'll send a reminder on the day of your appointment.",
              },
              {
                q: 'Need help finding us?',
                a: 'Use the Google Maps link above or call the front desk at 832-462-5642.',
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
