// Checks that the questionnaire stays consistent:
// - every question heading has a unique, well-formed ID (Q + two digits)
// - every question has an "Expected answer" field
// - the routing table in questionnaire/README.md lists exactly the questions that exist
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "..", "questionnaire");
const errors = [];

const questions = new Map(); // id -> file
for (const file of readdirSync(dir).filter((f) => /^part-.*\.md$/.test(f))) {
  const text = readFileSync(join(dir, file), "utf8");
  // Split into sections at each "### " heading.
  for (const section of text.split(/^(?=### )/m).filter((s) => s.startsWith("### "))) {
    const heading = section.split("\n", 1)[0];
    const match = heading.match(/^### (Q\d{2}) — \S/);
    if (!match) {
      errors.push(`${file}: heading not in "### Q00 — Title" form: ${heading}`);
      continue;
    }
    const id = match[1];
    if (questions.has(id)) errors.push(`${id} is defined twice (${questions.get(id)} and ${file})`);
    questions.set(id, file);
    if (!/\*\*Expected answer:\*\*/.test(section)) errors.push(`${file}: ${id} has no "Expected answer" field`);
  }
}

const readme = readFileSync(join(dir, "README.md"), "utf8");
const routed = new Set([...readme.matchAll(/^\| (Q\d{2}) \|/gm)].map((m) => m[1]));
for (const id of questions.keys()) if (!routed.has(id)) errors.push(`${id} is missing from the routing table`);
for (const id of routed) if (!questions.has(id)) errors.push(`Routing table lists ${id}, which has no question`);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${questions.size} questions, IDs unique, routing table complete`);
