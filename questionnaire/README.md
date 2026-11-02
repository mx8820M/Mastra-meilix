# Mastra integration questionnaire

A standard set of questions to answer before adding [Mastra](https://mastra.ai) to an existing app. The answers decide how the integration looks: which agent setup, which models, whether you need RAG, memory, MCP, approvals, and evals. They also produce a transparent complexity score and a rough timeline.

The questions are written for a **vibe coder** (who has the vision for the app) and an **experienced developer** (who keeps it safe and stable and usually makes the final call). Answer them together where you can.

The Part 1 questions are derived from *Principles of Building AI Agents*, 3rd edition, by Sam Bhagwat (Mastra). Page numbers refer to that book.

## How to run it

**With an AI coding agent (recommended).** Add this repository to a Claude Code session next to the project you want to integrate Mastra into, then ask the agent to run the questionnaire. [AGENTS.md](../AGENTS.md) tells the agent how: inspect the target project first, ask one question at a time, skip what doesn't apply, then write an integration plan.

**By hand.** Pick your intended use in step 0, then work through the questions marked for it in the [routing table](#step-1-which-questions-to-answer).

## The parts

| Part | Questions | Source |
|---|---|---|
| [Part 1](part-1-booklet-questions.md) | Q01–Q13 (Q13 optional) | Derived from the booklet *Principles of Building AI Agents* |
| [Part 2](part-2-collaboration-and-safety.md) | Q14–Q20 | Collaboration between vibe coder and developer, approvals, memory, untrusted input |

More questions will be added in later parts.

## Step 0: Pick your intended use

Choose one or more. The choice decides which questions are worth asking.

| ID | Intended use | Example |
|---|---|---|
| U1 | Chat or assistant inside an app | Support agent, onboarding assistant |
| U2 | Search and answers over your own documents | Internal knowledge base, docs Q&A |
| U3 | Background automation and metrics | Scheduled reports from your data sources (see the [strategy template](../blueprint/strategy.template.yaml)) |
| U4 | Developer workflow | PR review, issue triage, coding agents |
| U5 | Structured extraction or classification | Parse invoices, tag tickets, extract entities |
| U6 | Tool provider for other agents | Ship an MCP server so other agents can use your service |

## Step 1: Which questions to answer

● ask · ○ optional · – skip

| ID | Question (short) | Part | U1 | U2 | U3 | U4 | U5 | U6 |
|---|---|---|---|---|---|---|---|---|
| Q01 | Lots of data to scan first? | 1 | ○ | ● | ● | ○ | ○ | – |
| Q02 | Which model; can you test on a subset first? | 1 | ● | ● | ● | ● | ● | ● |
| Q03 | Structured / Markdown input (rating 1–5) | 1 | ○ | ○ | ● | ● | ● | ○ |
| Q04 | How complex are the interactions? (1–10) | 1 | ● | ● | ● | ● | ● | ● |
| Q05 | How to give the agent more autonomy? | 1 | ● | ○ | ● | ● | – | ○ |
| Q06 | Limited token budget? | 1 | ● | ● | ● | ● | ● | ● |
| Q07 | Which task to route to which model? | 1 | ○ | ○ | ● | ○ | ● | – |
| Q08 | MCP client or server? | 1 | ○ | ○ | ● | ● | – | ● |
| Q09 | Using Postgres? | 1 | ○ | ● | ○ | – | ○ | – |
| Q10 | Which agent setup? | 1 | ● | ○ | ● | ● | – | ○ |
| Q11 | Most important: data security, accuracy, token cost | 1 | ● | ● | ● | ● | ● | ● |
| Q12 | Need more predictable results? | 1 | ● | ● | ● | ● | ● | ● |
| Q13 | Test-case dataset source *(optional)* | 1 | ○ | ○ | ○ | ○ | ○ | ○ |
| Q14 | What should the AI do, and never do? | 2 | ● | ● | ● | ● | ● | ● |
| Q15 | Who owns what, who decides? | 2 | ● | ● | ● | ● | ● | ● |
| Q16 | Who uses it, where does the result appear? | 2 | ● | ● | ● | ● | ● | ● |
| Q17 | Fixed vocabulary / entities (ontology)? | 2 | ○ | ● | ○ | – | ● | – |
| Q18 | Which actions need human approval? | 2 | ○ | – | ● | ● | ○ | ○ |
| Q19 | Memory across sessions? | 2 | ● | ○ | ○ | ○ | – | – |
| Q20 | Does the AI read untrusted input? | 2 | ● | ● | ● | ● | ● | ● |

**Question IDs are stable.** IDs are never reused or renumbered; new questions get the next free number (see [CONTRIBUTING.md](../CONTRIBUTING.md)).

## Answer types

| Type | How to ask |
|---|---|
| Text input | Open question; offer 2–3 example answers if the person is stuck |
| Rating 1–5 / Score 1–10 | Ask for the number first, then an optional sentence why |
| Yes / no + context | Ask yes or no, then allow optional context |
| Single choice | Show the options; "unsure" is always allowed |
| Select 1 or more / rank | Let the person pick several, or order them by importance |

"Unsure" and "skip" are valid answers to every question. Record them as open questions in the plan rather than guessing.

## Step 2: Score and timeline (draft)

The score makes the estimate transparent: every point traces back to an answer. **The point values and timelines below are uncalibrated starting assumptions.** Adjust them after the first real integrations.

| Answer | Points |
|---|---|
| Q04 complexity score | 1–10 (as given, or proposed from the text answer and confirmed) |
| Q10 setup | Single agent 0 · Supervisor (as tools) 2 · Supervisor 3 · Custom 3 · Hierarchical 5 · Network 5 |
| Q01: needs search or RAG over a large corpus | +2 |
| Q08: each external system reached via MCP | +1 (max +3) |
| Q12: needs evals before launch | +1 |
| Q18: at least one approval step | +1 |
| Q19: memory beyond a single conversation | +1 |
| Q20: reads untrusted input | +2 |

| Total | Size | MVP (rough) | Full rollout (rough) |
|---|---|---|---|
| ≤ 8 | Small | 1–2 weeks | ~2× MVP |
| 9–16 | Medium | 3–6 weeks | ~2–3× MVP |
| ≥ 17 | Large | 2–3 months | ~3× MVP; plan in phases |

The booklet's guidance applies throughout: *"make it work, make it right, make it fast/cheap — in that order"* (p. 5).

## Step 3: Output — the integration plan

At the end, write `mastra-integration-plan.md` in the target project (ask before writing). Use these sections:

1. **Summary**: one paragraph on what Mastra will do in this project
2. **Intended use**: U-IDs from step 0
3. **Answers**: table of question ID, short answer, "unsure" marked
4. **Recommended architecture**: agent setup, models and routing, memory, data / RAG, tools and MCP, UI hook (`useChat` / `useCompletion` / `useObject` / none)
5. **Ownership**: who owns which files and decisions (Q15)
6. **Safety**: guardrails, approvals, permission boundaries (Q14, Q18, Q20)
7. **Quality**: eval plan and test-case sources (Q12, Q13)
8. **Budget**: limits and alerts (Q06)
9. **Score and timeline**: points per answer, total, size band
10. **Open questions**: everything answered "unsure" or skipped
