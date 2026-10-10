import { createFileRoute } from '@tanstack/react-router';
import { createHash, timingSafeEqual } from 'crypto';

function deriveTelegramWebhookSecret(telegramApiKey: string): string {
  return createHash('sha256')
    .update(`telegram-webhook:${telegramApiKey}`)
    .digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const GREETING = [
  'Lectures in Place.',
  '',
  'Reply with the email address you used for the ballot, and this chat will be linked for the quiet pings: the draw result, the 24-hour coordinates, and one gentle nudge on the day.',
  '',
  'No broadcasts. No noise.',
].join('\n');

const LINKED = [
  'Linked. You will hear from us only when it matters:',
  'the draw, the coordinates, the evening itself.',
].join('\n');

const UNRECOGNISED = [
  'Send just an email address — the one you used for the ballot — and we will link this chat for reminders.',
].join('\n');

export const Route = createFileRoute('/api/public/telegram/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const TELEGRAM_API_KEY = process.env['TELEGRAM_API_KEY'];
        if (!TELEGRAM_API_KEY) {
          return new Response('Not configured', { status: 500 });
        }

        const expectedSecret = deriveTelegramWebhookSecret(TELEGRAM_API_KEY);
        const actualSecret = request.headers.get('X-Telegram-Bot-Api-Secret-Token') ?? '';
        if (!safeEqual(actualSecret, expectedSecret)) {
          return new Response('Unauthorized', { status: 401 });
        }

        const update = (await request.json()) as {
          update_id?: number;
          message?: {
            chat?: { id?: number };
            from?: { id?: number; username?: string; first_name?: string };
            text?: string;
          };
        };
        const message = update.message;
        const chatId = message?.chat?.id;
        if (!chatId || typeof update.update_id !== 'number') {
          return Response.json({ ok: true, ignored: true });
        }

        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { sendTelegramMessage } = await import('@/lib/telegram.server');

        const text = (message.text ?? '').trim();
        const isStart = text.startsWith('/start');
        const email = EMAIL_RE.test(text) ? text.toLowerCase() : null;

        const { error } = await supabaseAdmin.from('telegram_links').upsert(
          {
            chat_id: chatId,
            email: email ?? '',
            username: message.from?.username ?? '',
            first_name: message.from?.first_name ?? '',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'chat_id' },
        );
        if (error) {
          console.error(`telegram_links upsert failed: ${error.message}`);
          return Response.json({ error: error.message }, { status: 500 });
        }

        const reply = isStart ? GREETING : email ? LINKED : UNRECOGNISED;
        const sent = await sendTelegramMessage(chatId, reply);
        if (!sent.ok) {
          return Response.json({ error: sent.error }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
