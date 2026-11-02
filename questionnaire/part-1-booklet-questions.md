# Part 1 — Questions derived from the booklet

Q01–Q13 as defined in *Mastra AI – booklet review and Questionnaire*. Each question keeps its original wording, the booklet text it was derived from, and the expected answer. **Guidance** lines are additions that say what each answer changes in the integration.

Where a question refers to the booklet text ("this"), show the booklet text first, then ask.

← [Questionnaire overview](README.md) · Next: [Part 2](part-2-collaboration-and-safety.md)

---

### Q01 — Do you have a lot of information and data to scan before generating an output?

- **Booklet text:** "RAG helps you search through large corpuses of (typically proprietary) information." (p. xiii)
- **Expected answer:** Ask the user for text input.
- **Guidance:**
  - No → skip RAG.
  - Fits in the context window → try search tools or the full context first: "build an agent first. Use RAG as a fallback." (p. 70–71)
  - Large or proprietary corpus → a RAG pipeline: chunk → embed → upsert → index → query → rerank (p. 65–67). The vector store depends on Q09.

### Q02 — Do you know which model you will use, or can you test with a subset of data before rolling out a complete solution?

- **Booklet text:** "Perhaps you eventually move some of your workload to SoTA open-source providers like Qwen, Kimi, Deepseek, Minimax. But make it work, make it right, make it fast/cheap — in that order." (p. 5)
- **Expected answer:** Ask the user for text input, and which model they intend to use.
- **Guidance:**
  - The booklet recommends starting with a hosted provider (OpenAI, Anthropic, Google Gemini).
  - The chosen model becomes the model-router string (`provider/model`) plus its API key in the [env template](../blueprint/.env.example).
  - A subset of data to test on becomes the first eval dataset (Q13).

### Q03 — Do you think structured or markdown input can help improve your system, and do you have information or data in that format that shall be further processed?

- **Booklet text:** "XML-like structure or markdown can help models follow instructions more precisely." (p. 10)
- **Expected answer:** Ask the user for a rating from 1 to 5, to identify how important they think structured or markdown input is.
- **Guidance:**
  - 4–5 → keep reference docs and review standards as Markdown skill files, structure prompts with XML-style tags or Markdown headings, and use format-aware chunking (p. 65–66).
  - Existing Markdown or JSON data can feed the agent without conversion.

### Q04 — How complex are the interactions and processes in your case? (Score from 1-10)

- **Booklet text:** "But for ongoing, complex interactions with models, you typically need to build an agent on top. Think of agents as AI employees rather than contractors: they maintain context, have specific roles, and can use tools to accomplish tasks." (p. 15)
- **Expected answer:** Ask the user for a score from 1 to 10 and a text input describing the interactions and processes. Accept either one on its own if the user can't give both.
- **Guidance:**
  - If only text is given, propose a score from it and let the user confirm it.
  - 1–3 → a direct model call or a simple workflow may be enough.
  - 4–7 → a single agent with tools.
  - 8–10 → consider a multi-agent setup (Q10).
  - The score feeds the [complexity score](README.md#step-2-score-and-timeline-draft).

### Q05 — How would you try to give your agent more autonomy?

- **Booklet text:** "To give an agent more autonomy, it could use Binary or scores with pre defined weights" (review note on p. 15–16, levels of autonomy)
- **Expected answer:** Ask the user for text input.
- **Guidance:** the booklet describes three levels (p. 15–16):
  - Low: binary choices in a decision tree → a workflow with conditions, using yes/no checks or weighted scores defined in code.
  - Medium: memory, tool calls, retries → a single agent.
  - High: planning, subtasks, parallel subagents, self-correction → add approvals (Q18) and evals (Q12).

### Q06 — Are you aware that agents use up tokens quickly? Can you give your agent a limited budget? We've heard of many developers burning through their tokens until they had no budget left to continue, or running out of tokens for a session too fast.

- **Booklet text:** "It's worth noting that unlike a single model call, agents accumulate tokens quickly. Tool results, memory, and conversation history all add up. This make context management and cost key things you'll need to figure out — not necessarily when you're initially building, but certainly as you begin rolling out your agent to users." (p. 17)
- **Expected answer:** Ask the user for text input.
- **Guidance:** budget controls to set up:
  - A step limit per run (`maxSteps`).
  - Memory processors such as `TokenLimiter` and `ToolCallFilter` (p. 27–28).
  - Prompt caching (p. 28).
  - Cheaper models via routing (Q07).
  - Usage tracking through tracing, with alerts.
  - Agree what happens when the budget runs out: stop, switch to a cheaper model, or ask the user.

### Q07 — Can you already define which task to route to which model?

- **Booklet text:** "Structured output and model routing actually compose nicely together. You can usually route to a cheaper/faster model specifically for structured extraction tasks" (p. 19)
- **Expected answer:** Ask the user for text input.
- **Guidance:** set a model per agent or per workflow step. Example from this repo: `deepseek-v4-pro` for the main agent, `deepseek-flash` for memory compression.

### Q08 — Does this sound like a good idea for you?

- **Booklet text:** "Is it worth looking at building an MCP client that could access third party tools and services? Conversely, if you're building a tool that you want other agents to use, you should consider shipping an MCP server." (p. 39)
- **Expected answer:** Ask the user for text input.
- **Guidance:**
  - Third-party services → `MCPClient` with a vetted list of servers; see [connectors](../blueprint/connectors/README.md). The booklet: treat third-party MCP servers "with the same trust level as any third-party API — vet them carefully".
  - Offering a tool to other agents → `MCPServer`.

### Q09 — Are you using Postgres databases?

- **Booklet text:** "If you're already using Postgres for your app backend, pgvector is a fine choice." (p. 64)
- **Expected answer:** Ask for a yes or no answer and allow them to provide some more context if desired.
- **Guidance:**
  - Yes (Supabase and Neon count) → pgvector for vectors and Postgres for Mastra storage. No extra service.
  - No → Chroma or Turbopuffer for new projects, or the cloud provider's managed vector DB (p. 64).

### Q10 — Which type of agent setup would you prefer?

- **Booklet text:** the six setups in the diagram on p. 76. "When you're building, start with the simplest version first."
- **Expected answer:** Select one option (or "unsure"):

| Option | What it is |
|---|---|
| **Single agent** | One LLM calling tools in a loop |
| **Network** | Agents talk to each other directly, peer to peer, with no coordinator |
| **Supervisor** | One coordinating agent delegates to subagents; they report back to it, not to each other |
| **Supervisor (as tools)** | The supervisor calls subagents as if they were tools, inside its own loop (p. 77) |
| **Hierarchical** | Supervisors of supervisors: a tree of teams ("designs are fractal") |
| **Custom** | Any graph you define, typically a workflow mixing agents and deterministic steps |

- **Guidance:** see the [Agent setups](../docs/wiki/Agent-Setups.md) page for when each fits. The choice feeds the score.

### Q11 — Which of the following problems do you think is the most important for your mission?

- **Booklet text:** Data security, accuracy or token cost? (see also p. 85: "accuracy and token cost. The answer for both: observability.")
- **Expected answer:** Select 1 or more options or ask the user to rank these problems by importance.
- **Guidance:**
  - Security first → least-privilege tools, guardrails, provider choice, PII handling.
  - Accuracy first → evals early (Q12), larger models, workflows.
  - Cost first → routing (Q07) and budgets (Q06).
  - Tracing is set up in every case.

### Q12 — Do you need more predictable results?

- **Booklet text:** "Evals help bridge this gap by providing quantifiable metrics for measuring agent quality. There will always be some randomness in each result (due to the way LLMs work), but on the whole and over time there should be a correlation between application performance and test results." (p. 89)
- **Expected answer:** Ask for a yes or no answer and allow them to provide some more context if desired.
- **Guidance:**
  - Yes → scorers (evals) from the start and a score check on each PR.
  - Prefer workflows where possible, "a more deterministic technique" (p. 47).
  - Pick an LLM judge from a different model family than the agent (p. 92).

### Q13 — Which of the three ways to get a dataset of test cases would you prefer to get started? *(optional)*

Did you "Hand-curate" data (input & output), can you generate input & output synthetically (checking the output is advised, because the "training" data is essential), or can you import user or production / log data? The more, the merrier.

- **Booklet text:** "There are three ways to get a dataset of test cases." Hand-curate, generate synthetically, mine production logs. "A mature eval dataset is a mix of all three." (p. 91)
- **Expected answer:** Select 1 or more options or ask the user to rank which of the 3 datasets can be provided the easiest, or which one the user thinks is best suited for their use case.
- **Guidance:** the first dataset lives in Mastra Studio's Datasets view. As bugs are found, add each one as a test case to prevent regressions.
