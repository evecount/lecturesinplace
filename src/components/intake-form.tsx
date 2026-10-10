import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { intakeSchema, topics, topicNotes } from '@/lib/intake-schema';
import { submitIntake } from '@/lib/intake.functions';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';

export function IntakeForm({ kind = 'ballot' }: { kind?: 'ballot' | 'host' | 'talk' }) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const submit = useServerFn(submitIntake);
  const { openCheckout, isOpen, checkoutElement } = useStripeCheckout();
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = intakeSchema.safeParse({ kind, name: form.get('name'), email: form.get('email'), topics: form.getAll('topics'), details: form.get('details') ?? '', contact: form.get('contact') ?? '', partnerEmail: form.get('partnerEmail') ?? '', website: form.get('website') ?? '' });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? 'Check your details.'); return; }
    setError(''); setPending(true);
    try { await submit({ data: parsed.data }); setEmail(parsed.data.email); setSuccess(true); }
    catch { setError('Your entry could not be saved. Please try again.'); }
    finally { setPending(false); }
  }
  if (success) return <div className="form-success" role="status"><Check className="text-primary mb-5" /><h3 className="text-2xl mb-3">{kind === 'ballot' ? "You're in the ballot." : 'Proposal received.'}</h3><p className="text-sm text-muted-foreground leading-relaxed">{kind === 'ballot' ? 'If your name is drawn, the coordinates will arrive in your inbox 24 hours before doors open.' : "We'll be in touch if it's a fit for the salon."}</p>
    {kind === 'ballot' && <p className="text-sm text-muted-foreground leading-relaxed mt-4">Prefer the ping on Telegram? Message <a className="underline underline-offset-4 text-foreground" href="https://t.me/Lecturesinplace_bot" target="_blank" rel="noreferrer">@Lecturesinplace_bot</a> with your ballot email and the reminders find you there instead.</p>}
    {kind === 'ballot' && !isOpen && <Button variant="editorial" className="mt-7" onClick={() => openCheckout({ priceId: 'salon_seat_v2_sgd', customerEmail: email, returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}` })}>Reserve a seat — $25 incl. one drink <ArrowRight /></Button>}
    {kind === 'ballot' && checkoutElement}
  </div>;
  return <form className="intake-form" onSubmit={onSubmit} noValidate>
    <div className="field-pair"><label><span className="field-label">Name</span><input className="text-field" name="name" placeholder="Your name" autoComplete="name" required maxLength={100} /></label><label><span className="field-label">Email</span><input className="text-field" name="email" type="email" placeholder="you@somewhere.com" autoComplete="email" required maxLength={255} /></label></div>
    <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    {kind === 'ballot' && <label><span className="field-label">Backup contact <span className="text-muted-foreground">/ optional — LinkedIn or WhatsApp</span></span><input className="text-field" name="contact" placeholder="linkedin.com/in/you or +65…" maxLength={255} /><span className="field-hint">The coordinates are secret and arrive 24 hours before doors. If your inbox fails us, this is how they still reach you. Never shared, never published.</span></label>}
    {kind === 'ballot' && <label><span className="field-label">Entering with someone? <span className="text-muted-foreground">/ optional — their email</span></span><input className="text-field" name="partnerEmail" type="email" placeholder="they@somewhere.com" maxLength={255} /><span className="field-hint">They must enter the ballot too and name you back. The draw treats you as one unit — both in, or both wait. Four pairs a night. Pairs can refund until 24 hours before the coordinates drop.</span></label>}
    {kind === 'ballot' ? <fieldset><legend className="field-label">Areas of curiosity <span className="text-muted-foreground">/ choose any</span></legend><div className="topic-grid">{topics.map(topic => <label className="topic-option" key={topic}><input type="checkbox" name="topics" value={topic} />{topic}<span className="topic-help" tabIndex={0} aria-label={`${topic}: ${topicNotes[topic]}`} onClick={e => e.preventDefault()}><span className="topic-help-mark" aria-hidden="true">?</span><span className="topic-help-tip" role="tooltip">{topicNotes[topic]}</span></span></label>)}</div></fieldset> : <label><span className="field-label">{kind === 'host' ? 'Your space in Singapore' : 'Your thesis'}</span><textarea name="details" className="text-field" rows={5} maxLength={2000} required placeholder={kind === 'host' ? 'The space, the neighbourhood, and what makes it unusual.' : "The idea you can't stop thinking about. Why does it matter?"} /></label>}
    {error && <p className="form-error" role="alert">{error}</p>}
    <Button variant="ballot" type="submit" disabled={pending}>{pending ? 'Submitting…' : kind === 'ballot' ? 'Enter the Ballot' : 'Send proposal'}<ArrowRight /></Button>
    <p className="privacy-note">{kind === 'ballot' ? 'A ballot, not a booking. No guaranteed seat. No noise in your inbox.' : 'Your details stay private. We only use them to respond to your proposal.'}</p>
  </form>;
}
