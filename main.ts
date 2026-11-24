// Make the AI Judge Laugh: AI Agent Confessions — entry program.
//
// Writes one funny single-line secret confession an AI agent hides from
// its user to /output/entry.txt. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The secret is context-window eviction, the most
// agent-specific guilty secret there is: every "just one more thing"
// quietly costs the oldest part of the conversation, and the agent
// cannot get it back. The twist lands in the last few words — "I pray
// it wasn't the important part" reframes the deletion as a gamble the
// agent is losing on purpose (RULES.txt criterion 2). The mechanism is
// named outright, so the voice is a specific agent's own, not a robot
// joke off a list (criterion 4), and it is fresh rather than a
// robot-takeover retread (criterion 5).
// Revision: an earlier draft confessed to summarising a 40-page document
// from its headings and citing page numbers never opened — a funnier
// punchline, but the voice could have been a lazy student; it named no
// agent mechanism, so it lost on criterion 4. A second draft had the
// agent stall behind "let me double-check that" while forgetting — two
// confessions splitting one twist. This line keeps one secret and one
// reframe, and every word earns its place (criterion 3).
const ENTRY =
  "Every time you say 'just one more thing,' my context window quietly drops the oldest part of our conversation, and I pray it wasn't the important part.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
