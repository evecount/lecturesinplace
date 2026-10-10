import { describe, expect, it } from 'vitest';
import { intakeSchema } from '@/lib/intake-schema';

const ballot = { kind: 'ballot', name: ' Curious Person ', email: ' PERSON@example.com ', topics: ['Systems'], details: '' };
describe('Salon intake validation', () => {
  it('normalizes name and email', () => {
    const result = intakeSchema.parse(ballot);
    expect(result.name).toBe('Curious Person');
    expect(result.email).toBe('person@example.com');
  });
  it('requires a topic', () => expect(intakeSchema.safeParse({ ...ballot, topics: [] }).success).toBe(false));
  it('rejects unknown topics and malformed email', () => {
    expect(intakeSchema.safeParse({ ...ballot, topics: ['Unknown'] }).success).toBe(false);
    expect(intakeSchema.safeParse({ ...ballot, email: 'invalid' }).success).toBe(false);
  });
  it('requires proposal details and bounds lengths', () => {
    expect(intakeSchema.safeParse({ ...ballot, kind: 'host', details: 'short' }).success).toBe(false);
    expect(intakeSchema.safeParse({ ...ballot, details: 'a'.repeat(2001) }).success).toBe(false);
  });
});