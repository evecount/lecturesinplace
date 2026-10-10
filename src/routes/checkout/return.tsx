import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => {
    const sessionId = search['session_id'];
    return typeof sessionId === "string" ? { session_id: sessionId } : {};
  },
  head: () => ({ meta: [
    { title: "Seat reserved — Lectures in Place" },
    { name: "description", content: "Your Lectures in Place salon seat is reserved. Coordinates arrive 24 hours before doors." },
    { property: 'og:title', content: 'Seat reserved — Lectures in Place' },
    { property: 'og:description', content: 'Your salon seat is reserved. Coordinates arrive 24 hours before doors.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const { session_id: sessionId } = Route.useSearch();

  return (
    <div className="page-width">
      <main className="section" style={{ minHeight: '60dvh', display: 'grid', placeItems: 'center' }}>
        <div className="form-success" role="status" style={{ textAlign: 'center' }}>
          <Check className="text-primary mb-5" />
          {sessionId ? (
            <>
              <h1 className="text-2xl mb-3">Seat reserved.</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your place in the room is paid for. The secret coordinates arrive in your inbox 24 hours before doors open.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl mb-3">No session found.</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you completed a payment, it may still be processing — check your inbox for a receipt.
              </p>
            </>
          )}
          <p className="mt-7"><Link to="/" className="eyebrow text-primary">← Back to the salon</Link></p>
        </div>
      </main>
    </div>
  );
}
