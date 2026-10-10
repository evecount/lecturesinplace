const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

/**
 * Send a Telegram message through the connector gateway.
 * Server-side only — never call from browser code.
 */
export async function sendTelegramMessage(
  chatId: number | string,
  text: string,
): Promise<{ ok: boolean; error?: string }> {
  const LOVABLE_API_KEY = process.env['LOVABLE_API_KEY'];
  const TELEGRAM_API_KEY = process.env['TELEGRAM_API_KEY'];
  if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');
  if (!TELEGRAM_API_KEY) throw new Error('TELEGRAM_API_KEY is not configured');

  const response = await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': TELEGRAM_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  const body = await response.text();
  if (!response.ok) {
    console.error(`Telegram send failed [${response.status}]: ${body}`);
    return { ok: false, error: `Telegram send failed [${response.status}]: ${body}` };
  }
  try {
    const parsed = JSON.parse(body) as { ok?: boolean; description?: string };
    if (parsed.ok === false) {
      return { ok: false, error: parsed.description ?? 'Telegram reported failure' };
    }
  } catch {
    // Non-JSON 2xx — treat as sent.
  }
  return { ok: true };
}
