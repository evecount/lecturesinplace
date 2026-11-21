import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { intakeSchema, topics, topicNotes } from '@/lib/intake-schema';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScPKrGavytgGNIQTEWRYt0D2WpGSZsqxRg0N3aaOcx5oXrOgQ/formResponse';

export function IntakeForm({ kind = 'ballot' }: { kind?: 'ballot' | 'host' | 'talk' }) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = intakeSchema.safeParse({
      kind,
      name: form.get('name'),
      email: form.get('email'),
      topics: form.getAll('topics'),
      details: form.get('details') ?? '',
      contact: form.get('contact') ?? '',
      partnerEmail: form.get('partnerEmail') ?? '',
      website: form.get('website') ?? '',
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Check your details.');
      return;
    }
    if (parsed.data.website.trim()) {
      setSuccess(true);
      return;
    }
    setError('');
    setPending(true);
    try {
      const kindMap: Record<'ballot' | 'host' | 'talk', string> = {
        ballot: 'I want to attend / join the ballot',
        host: 'I have a venue / unexpected place',
        talk: 'I want to give a lecture',
      };
      const payload = new URLSearchParams();
      payload.append('entry.320523024', parsed.data.name);
      payload.append('entry.1362518333', parsed.data.email);
      payload.append('entry.1446279015', parsed.data.contact.trim() || parsed.data.email);
      payload.append('entry.2133280250', kindMap[parsed.data.kind]);
      const chosenTopics = parsed.data.topics.length ? parsed.data.topics : [topics[0]];
      for (const topic of chosenTopics) {
        payload.append('entry.352574748', `${topic} — ${topicNotes[topic]}`);
      }
      if (parsed.data.details) {
        payload.append('entry.310010463', parsed.data.details);
      }
      if (parsed.data.partnerEmail) {
        payload.append('entry.1871097691', `Plus-one: ${parsed.data.partnerEmail}`);
      }
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });
      setSuccess(true);
    } catch {
      setError('Your entry could not be saved. Please try again.');
    } finally {
      setPending(false);
    }
  }

  if (success)
    return (
      <div className="form-success" role="status">
        <Check className="text-primary mb-5" />
        <h3 className="text-2xl mb-3">{kind === 'ballot' ? "You're in the ballot." : 'Proposal received.'}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {kind === 'ballot'
            ? 'If your name is drawn, the coordinates will arrive in your inbox 24 hours before doors open.'
            : "We'll be in touch if it's a fit for the salon."}
        </p>
        {kind === 'ballot' && (
          <>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              Prefer the ping on Telegram? Message{' '}
              <a className="underline underline-offset-4 text-foreground" href="https://t.me/Lecturesinplace_bot" target="_blank" rel="noreferrer">
                @Lecturesinplace_bot
              </a>{' '}
              with your ballot email and the reminders find you there instead.
            </p>
            <div className="mt-6 p-5 rounded-xl border border-border bg-card/80 flex flex-col sm:flex-row items-center gap-5">
              <img
                src="/paynow-qr.jpg"
                alt="PayNow QR code for Lectures in Place (+65 8608 1377)"
                width={132}
                height={132}
                className="rounded-lg border border-border bg-white p-1 shrink-0"
              />
              <div className="text-left space-y-1.5">
                <p className="eyebrow text-primary">PayNow (Singapore)</p>
                <p className="text-sm font-semibold text-foreground">
                  PayNow to <span className="mono">+65 8608 1377</span>
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>$24</strong> for 1 pax + automatic plus-one, or <strong>PWYC</strong> (suggested <strong>$12</strong>, 1 person only, no plus-one). Enter the amount in your bank app, write the <strong>event date &amp; your email</strong> in the comments, and send your <strong>name, email, phone, and payment screenshot</strong> to <a className="underline text-foreground" href="mailto:gwen@evecount.com">gwen@evecount.com</a> or WhatsApp <strong>+65 8608 1377</strong> so we can send the secret location 24h before. <em>No refunds 5 working days before the event.</em>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    );
  return <form className="intake-form" onSubmit={onSubmit} noValidate>
    <div className="field-pair"><label><span className="field-label">Name</span><input className="text-field" name="name" placeholder="Your name" autoComplete="name" required maxLength={100} /></label><label><span className="field-label">Email</span><input className="text-field" name="email" type="email" placeholder="you@somewhere.com" autoComplete="email" required maxLength={255} /></label></div>
    <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    {kind === 'ballot' && <label><span className="field-label">Backup contact <span className="text-muted-foreground">/ optional — LinkedIn or WhatsApp</span></span><input className="text-field" name="contact" placeholder="linkedin.com/in/you or +65…" maxLength={255} /><span className="field-hint">The coordinates are secret and arrive 24 hours before doors. If your inbox fails us, this is how they still reach you. Never shared, never published.</span></label>}
    {kind === 'ballot' && <label><span className="field-label">Bringing a plus-one? <span className="text-muted-foreground">/ optional — their email (included free)</span></span><input className="text-field" name="partnerEmail" type="email" placeholder="they@somewhere.com" maxLength={255} /><span className="field-hint">Every paid ticket is for 1 pax and automatically includes a plus-one — instant date night or bring a curious friend. Leave their email if you want them on the coordinates drop too.</span></label>}
    {kind === 'ballot' ? <fieldset><legend className="field-label">Areas of curiosity <span className="text-muted-foreground">/ choose any</span></legend><div className="topic-grid">{topics.map(topic => <label className="topic-option" key={topic}><input type="checkbox" name="topics" value={topic} />{topic}<span className="topic-help" tabIndex={0} aria-label={`${topic}: ${topicNotes[topic]}`} onClick={e => e.preventDefault()}><span className="topic-help-mark" aria-hidden="true">?</span><span className="topic-help-tip" role="tooltip">{topicNotes[topic]}</span></span></label>)}</div></fieldset> : <label><span className="field-label">{kind === 'host' ? 'Your space in Singapore' : 'Your thesis'}</span><textarea name="details" className="text-field" rows={5} maxLength={2000} required placeholder={kind === 'host' ? 'The space, the neighbourhood, and what makes it unusual.' : "The idea you can't stop thinking about. Why does it matter?"} /></label>}
    {error && <p className="form-error" role="alert">{error}</p>}
    <Button variant="ballot" type="submit" disabled={pending}>{pending ? 'Submitting…' : kind === 'ballot' ? 'Enter the Ballot' : 'Send proposal'}<ArrowRight /></Button>
    <p className="privacy-note">{kind === 'ballot' ? 'A ballot, not a booking. No guaranteed seat. No noise in your inbox.' : 'Your details stay private. We only use them to respond to your proposal.'}</p>
  </form>;
}
