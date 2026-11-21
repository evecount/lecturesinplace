import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Clock3, FileX2, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { IntakeForm } from '@/components/intake-form';
import salonImage from '@/assets/salon-room-lines.png';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Lectures in Place — Dense ideas. Unusual rooms.' },
    { name: 'description', content: '20-minute unannounced talks in secret urban spaces in Singapore. 25 seats. No pitches. Enter the blind ballot.' },
    { property: 'og:title', content: 'Lectures in Place — Dense ideas. Unusual rooms.' },
    { property: 'og:description', content: 'An underground intellectual salon in Singapore. 20 minutes. 25 seats. Enter the ballot.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Index() {
  const [proposal, setProposal] = useState<'host' | 'talk' | null>(null);
  return <>
    <div className="page-width">
    <header className="site-nav"><a href="#" className="brand" aria-label="Lectures in Place home"><img className="brand-logo rounded-full" src="/lectures-mark.png" alt="Lectures in Place" width={52} height={52} /><span>lectures in place</span></a><div className="flex items-center gap-9"><span className="eyebrow nav-city text-muted-foreground">Singapore / 2nd Thursday / Undisclosed</span><Button variant="editorial" asChild><a href="#ballot">Enter the ballot <ArrowUpRight /></a></Button></div></header>
    <main>
      <section className="hero">
        <img src={salonImage} className="hero-image" alt="Charcoal and coral line illustration of a room full of people listening to a standing speaker" width={1264} height={848} fetchPriority="high" />
        <div className="hero-content"><p className="eyebrow text-primary flex gap-3 items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full" />An underground intellectual salon</p><h1>Lectures<br />in Place<span className="text-primary">.</span></h1><p className="hero-subtitle">20-minute unannounced talks<br />in secret urban spaces.</p><p className="hero-note">Every second Thursday of the month. Doors 7:30 sharp.<br />Capped at 25 seats. $24 for 1 pax + an automatic plus-one (or PWYC — suggested $12 for 1 person), always with a proper non-alcoholic pour.</p><div className="hero-entries"><Button variant="editorial" asChild className="hero-entry hero-entry-primary"><a href="#ballot">Enter the ballot <ArrowRight /></a></Button><Button variant="editorial" className="hero-entry" onClick={() => setProposal('talk')}>Propose a talk <ArrowUpRight /></Button><Button variant="editorial" className="hero-entry" onClick={() => setProposal('host')}>Host a room <ArrowUpRight /></Button></div></div>
        <span className="hero-caption mono">01 / SOMEWHERE IN SINGAPORE</span>
      </section>
      <section className="section"><div className="section-label eyebrow"><span>01 /</span><h2>The three-beat loop</h2></div><div className="steps">
        <article><div className="step-number">[ 01 ]</div><h3>Enter the Ballot</h3><p>Join the list and choose your areas of curiosity — frontier AI, systems, media, urban geography, and more. Let chance do the rest.</p></article>
        <article><div className="step-number">[ 02 ]</div><h3>The 24-Hour Ping</h3><p>If your name is drawn, the secret coordinates and room access instructions drop into your inbox 24 hours before doors — the Wednesday before, 7:30. Not drawn? You're first in line for the next one.</p></article>
        <article><div className="step-number">[ 03 ]</div><h3>In-Situ</h3><p>Arrive, take your included pour — alcoholic or not, both done properly — hear one sharp 20-minute lecture, then stay for the debate. The evening runs 90 minutes; the topic is revealed only when the speaker takes the floor.</p></article>
      </div></section>
      <section className="section"><div className="section-label eyebrow"><span>02 /</span><h2>The salon rules</h2><span className="text-muted-foreground ml-auto hidden sm:inline">Non-negotiable.</span></div><div className="rules">
        <article><h3 className="rule-title"><Clock3 />Doors close sharply.</h3><p>7:30 pm on the second Thursday, every month. No late entries once the talk begins.</p></article>
        <article><h3 className="rule-title"><FileX2 />No slide decks.</h3><p>Speakers talk from memory or handwritten notes.</p></article>
        <article><h3 className="rule-title"><EyeOff />Off the record.</h3><p>Chatham House Rule applies.</p></article>
      </div><details className="easter-egg"><summary>One more thing.</summary><p>We will never, ever, ever do talks on money, markets, or crypto. Not once. Not ironically. Some rooms stay pure.</p></details></section>
      <section className="section" id="upcoming"><div className="section-label eyebrow"><span>03 /</span><h2>Upcoming rooms</h2><span className="text-muted-foreground ml-auto hidden sm:inline">Plan 3 months ahead.</span></div><div className="steps">
        <article><div className="step-number">DEC 10, 2026</div><h3>Thu · 7:30 PM SGT</h3><p>First Edition — somewhere historic near Victoria Theatre. 25 seats, 1 pax + automatic plus-one. Coordinates drop 24h prior.</p></article>
        <article><div className="step-number">JAN 14, 2027</div><h3>Thu · 7:30 PM SGT</h3><p>Second Thursday salon — undisclosed Singapore urban space. Unannounced 20-minute talk, no slides, off-record.</p></article>
        <article><div className="step-number">FEB 11, 2027</div><h3>Thu · 7:30 PM SGT</h3><p>Second Thursday salon — undisclosed Singapore urban space. Put your name in early or mark your calendar now.</p></article>
      </div></section>
      <section className="intake-section" id="ballot"><div><p className="eyebrow text-primary">04 / Put your name in</p><h2>25 seats.<br />One blind ballot.</h2><p className="intake-copy">Once a month, on the second Thursday.<br />Curiosity is the only prerequisite.<br />Leave your details. We'll leave the rest to chance.</p><p className="eyebrow text-muted-foreground mt-7">$24 — entry for 1 pax + an automatic plus-one, the room, and a pour each (non-alcoholic done properly). PWYC also available — suggested donation $12 for 1 person.</p></div><IntakeForm /></section>
      <section className="section"><div className="section-label eyebrow"><span>05 /</span><h2>Before you ask</h2></div><div className="rules">
        <article><h3 className="rule-title">What should I wear?</h3><p>Shoes you can climb stairs in. Some rooms have floor cushions, some have scaffolding. Dress for an adventure, not a conference.</p></article>
        <article><h3 className="rule-title">Can I get a refund?</h3><p>Transferable to a friend, anytime. Refundable up to 5 working days before the event — after that, the room is counting on you.</p></article>
        <article><h3 className="rule-title">I don't drink alcohol.</h3><p>Neither do we, some Thursdays. Your included pour is a proper non-alcoholic option — good pour-over, house-made soda, whatever the room does best.</p></article>
        <article><h3 className="rule-title">Is there an age limit?</h3><p>18+. The conversations assume an adult room.</p></article>
        <article><h3 className="rule-title">What if I'm not drawn?</h3><p>You stay in the ballot and go first in line for the next one. No need to re-enter.</p></article>
        <article><h3 className="rule-title">Can I bring a friend?</h3><p>Yes — every paid ticket is for 1 pax and automatically includes a plus-one, so it doubles as an effortless date night (or bring a curious friend).</p></article>
      </div></section>
    </main>
    <footer><div className="footer-links"><div className="footer-invite"><p className="footer-invite-q">Have an unusual space in Singapore?</p><p className="footer-invite-note">A stairwell, a rooftop, a shuttered shop. We bring the room of 25.</p><Button variant="editorial" className="footer-cta" onClick={() => setProposal('host')}>Host a room <ArrowUpRight /></Button></div><div className="footer-invite"><p className="footer-invite-q">Have a thesis you've spent 5 years obsessing over?</p><p className="footer-invite-note">Twenty minutes, no slide deck, one room that actually listens.</p><Button variant="editorial" className="footer-cta" onClick={() => setProposal('talk')}>Propose a talk <ArrowUpRight /></Button></div><div className="footer-invite"><p className="footer-invite-q">Want to start a chapter in your city?</p><p className="footer-invite-note">Join our decentralized Hub-and-Spoke network. Claim your pre-made city branch, customize your frontend, and host events on the global map.</p><Button variant="editorial" className="footer-cta" asChild><a href="https://github.com/evecount/lecturesinplace" target="_blank" rel="noopener noreferrer">Claim a branch <ArrowUpRight /></a></Button></div></div><div className="footer-bottom eyebrow"><span>© 2026 Lectures in Place</span><span><a href="https://instagram.com/lecturesinplace" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@lecturesinplace</a></span><span>Singapore, somewhere.</span></div></footer>
    <Dialog open={proposal !== null} onOpenChange={open => { if (!open) setProposal(null); }}><DialogContent className="max-h-[90dvh] overflow-y-auto w-[calc(100%-32px)]"><DialogTitle>{proposal === 'host' ? 'Host a room.' : 'Propose a talk.'}</DialogTitle><DialogDescription>{proposal === 'host' ? 'An unusual space in Singapore. Room for 25 curious people.' : 'One sharp idea. Twenty minutes. No slide deck.'}</DialogDescription>{proposal && <IntakeForm key={proposal} kind={proposal} />}</DialogContent></Dialog>
  </div>
  </>;
}
