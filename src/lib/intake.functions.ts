import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { intakeSchema } from './intake-schema';

export const submitIntake = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => intakeSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { success: true };
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    const url = process.env['SUPABASE_URL'];
    if (!key || !url) throw new Error('Entries are temporarily unavailable. Please try again later.');
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.rpc('submit_salon_intake', {
      p_kind: data.kind, p_name: data.name, p_email: data.email,
      p_topics: data.topics, p_details: data.details, p_contact: data.contact,
      p_partner_email: data.partnerEmail,
    });
    if (error) throw new Error('Your entry could not be saved. Please try again.');
    return { success: true };
  });