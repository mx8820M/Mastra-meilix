# Part 2 — Collaboration and safety

Q14–Q20 add what Part 1 doesn't cover: how the vibe coder and the experienced developer split the work, where results appear, and the safety boundaries.

← [Part 1](part-1-booklet-questions.md) · [Questionnaire overview](README.md)

---

### Q14 — What should the AI do, and what must it never do on its own?

- **Ask:** Name one or two concrete jobs for the AI. Then list the red lines: actions it must never take without a human, such as deleting data, spending money, merging code or emailing users.
- **Expected answer:** text input (two short lists: *do* and *never*)
- **Guidance:**
  - *Do* list → the tools to build. Write this list out before you start coding (p. 22).
  - *Never* list → no tool for it at all, or a human approval step (Q18).

### Q15 — Who owns which parts, and who makes the final call?

- **Ask:** Which parts do you shape yourself, and which does your developer own and approve? Typical areas: vision and agent instructions, review standards, UI, tools, credentials, data access, deployment, merging.
- **Expected answer:** text input, or a table of area → owner
- **Guidance:**
  - Turns into `CODEOWNERS` entries and branch-protection rules.
  - Also decides who approves suspended workflow steps (Q18).
  - A typical split: the vibe coder owns instructions, skill files and UI; the developer owns tools, permissions, schemas and deployment.

### Q16 — Who uses it, and where does the result appear?

- **Ask:** Who interacts with the AI (end users, your team, only you)? Where does the result show up?
- **Expected answer:** select 1 or more:
  - A conversation in the app
  - A one-shot button that returns text
  - A structured result rendered in the UI
  - A background job with no UI
  - Another channel: Slack, email, GitHub, voice
- **Guidance:** picks the UI hook:
  - Conversation → `useChat`
  - One-shot text → `useCompletion`
  - Structured result → `useObject`, with a schema both people agree on
  - Background job → a workflow with a schedule
  - Another channel → an integration for that channel

### Q17 — Does your domain have a fixed vocabulary of entities and relationships?

- **Ask:** Is there a defined set of things your domain talks about (products, customers, contracts …) and how they relate? Is it written down?
- **Expected answer:** yes / no + optional context
- **Origin:** the margin note "Ontology framework?!" next to "Extract entities and relationships" (p. 71).
- **Guidance:**
  - Yes → extract entities with structured output and store them as metadata for hybrid queries (p. 67).
  - No → start without.

### Q18 — Which actions need a human to approve them first?

- **Ask:** Are there steps where the AI must pause and wait for a person, such as publishing, paying, deleting, merging or contacting customers? Who approves?
- **Expected answer:** yes / no + list of actions and approvers
- **Booklet:** "For high-stakes or irreversible actions, consider adding human-in-the-loop checkpoints" (p. 33). Workflows can `.suspend()` and `.resume()` (p. 52), with durable storage (p. 55).
- **Guidance:** Yes → workflows with suspend and resume, plus an approval UI (Studio or your own). The approver comes from Q15.

### Q19 — What should the AI remember, and for how long?

- **Ask:** Should it remember nothing beyond the current conversation, facts about each user, or past conversations?
- **Expected answer:** single choice:
  - Nothing beyond the current conversation
  - Facts about the user (working memory)
  - Similar past conversations (semantic recall)
  - Long sessions compressed into observations (observational memory)
- **Booklet:** the three types of agent memory (p. 24–25).
- **Guidance:** sets the `Memory` configuration and its storage (Q09). Anything stored beyond the conversation raises a privacy question: what is kept, for how long, and who can delete it.

### Q20 — Does the AI read input you don't control?

- **Ask:** Will the AI read content written by other people or found online? For example: end-user messages, uploaded documents, web pages, GitHub issues or pull requests, emails.
- **Expected answer:** select 1 or more, or "none"
- **Booklet:** guardrails against prompt injection (p. 31). The Cline attack started with a malicious GitHub issue title (p. 32). "Agent & MCP security will continue to be a challenge." (p. 119)
- **Guidance:**
  - Any untrusted source → input and output guardrails, plus a strict split:
    - *Reader* agents get read-only tools and return structured output.
    - Actions with side effects run in separate steps that need approval (Q18).
  - Agent-generated code runs only in a sandbox (p. 109).
