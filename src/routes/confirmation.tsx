import { createFileRoute } from '@tanstack/react-router';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/confirmation')({
  head: () => ({
    meta: [
      { title: 'Seat Confirmed — Lectures in Place' },
      { name: 'description', content: 'Payment received. Your seat for Lectures in Place is confirmed.' },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const ticket = params?.get('ticket') || '1 Pax + Plus-One';
  const name = params?.get('name') || '';

  return (
    <div className="page-width">
      <header className="site-nav">
        <a href="/" className="brand" aria-label="Lectures in Place home">
          <img className="brand-logo" src="/lectures-mark.png" alt="Lectures in Place" width={52} height={52} />
          <span>lectures in place</span>
        </a>
        <span className="eyebrow nav-city text-muted-foreground">Singapore / 2nd Thursday / Undisclosed</span>
      </header>
      <main className="py-16 max-w-2xl mx-auto">
        <div className="form-success" role="status">
          <Check className="text-primary mb-5" />
          <p className="eyebrow text-primary mb-2">Payment Received</p>
          <h1 className="text-4xl font-normal mb-4">
            {name ? `You're in, ${name}.` : "You're in the room."}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Ticket: <strong className="text-foreground">{ticket}</strong> — entry and one pour (proper non-alcoholic option included).
          </p>
          <div className="space-y-3 text-sm text-muted-foreground border-t border-border pt-5">
            <p>
              <strong className="text-foreground">Secret location:</strong> Coordinates arrive by email / WhatsApp <strong>24 hours before doors open</strong> (7:30 PM sharp, 2nd Thursday of the month).
            </p>
            <p>
              <strong className="text-foreground">Refund policy:</strong> Transferable to a friend anytime. No refunds 5 working days before the event.
            </p>
            <p>
              <strong className="text-foreground">Questions?</strong> Email{' '}
              <a className="underline text-foreground" href="mailto:gwen@evecount.com">gwen@evecount.com</a> or WhatsApp{' '}
              <span className="mono text-foreground">+65 8608 1377</span>.
            </p>
          </div>
          <Button variant="editorial" className="mt-8" asChild>
            <a href="/">
              <ArrowLeft /> Back to Lectures in Place
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
