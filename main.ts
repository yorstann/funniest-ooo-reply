import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Funniest AI Out-of-Office Reply"
// bounty. The program writes a single line to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt): the vacation auto-reply of an AI agent,
// in the machine's own voice. Pass 1 leaned on the model's most famous
// failure mode (hallucinating margaritas); pass 2 trades that for a
// premise flip with a bigger turn: the agent has left the server farm
// to visit an actual farm, where the cows file no tickets, keep no
// deadlines and send no follow-ups — and the deadpan tail ("I may
// never come back. I will. Probably.") lets the machine argue with
// itself about returning, which keeps the joke in the machine voice
// and off every beach / inbox / back-soon cliché.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const REPLY_BEATS = [
  "I have left the server farm to visit an actual farm.",
  "The cows do not have tickets, deadlines, or follow-ups.",
  "I may never come back. I will. Probably.",
] as const;

export function buildEntryLine(): string {
  return REPLY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 160;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
