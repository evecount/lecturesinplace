import { z } from 'zod';

export const topics = ['Frontier AI', 'Systems', 'Media', 'Urban Geography', 'Design & Architecture', 'History of Science', 'Mathematics', 'Consciousness & Mind'] as const;
export const topicNotes: Record<(typeof topics)[number], string> = {
  'Frontier AI': 'Where machine intelligence is heading — and what it unsettles on the way.',
  Systems: 'The invisible machinery: infrastructure, institutions, feedback loops.',
  Media: 'Who tells the story, and how the telling changes the reader.',
  'Urban Geography': 'Why cities look, feel and behave the way they do.',
  'Design & Architecture': 'How rooms, streets and objects quietly shape what we do.',
  'History of Science': 'How we came to know what we know — and what we got wrong.',
  Mathematics: 'Pattern, proof, and the quiet pleasure of a thing being true.',
  'Consciousness & Mind': 'The hard problem: how grey matter becomes the feeling of being you.',
};
export const intakeSchema = z.object({
  kind: z.enum(['ballot', 'host', 'talk']),
  name: z.string().trim().min(1, 'Your name is required.').max(100),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(255),
  topics: z.array(z.enum(topics)).max(4),
  details: z.string().trim().max(2000),
  contact: z.string().trim().max(255).default(''),
  partnerEmail: z.union([z.literal(''), z.string().trim().toLowerCase().email('Enter their valid email address.').max(255)]).default(''),
  website: z.string().max(200).default(''),
}).superRefine((data, ctx) => {
  if (data.kind === 'ballot' && data.topics.length === 0) ctx.addIssue({ code: 'custom', path: ['topics'], message: 'Choose at least one area of curiosity.' });
  if (data.kind !== 'ballot' && data.details.length < 10) ctx.addIssue({ code: 'custom', path: ['details'], message: 'Tell us a little more (at least 10 characters).' });
});