# Mastra-meilix

A toolkit for integrating [Mastra](https://mastra.ai) into existing apps quickly and safely. At its core is a **standard questionnaire** that an AI coding agent runs with you. It helps a **vibe coder** (who has the vision for an app) and an **experienced developer** (who keeps it safe and stable) decide together how Mastra should be used, then turns the answers into an integration plan, a transparent score and a rough timeline.

> **Status:** early. The questionnaire (Part 1 and Part 2), contributor docs and blueprint templates are in place. The first real test will be integrating Mastra into Hyperlines, one of the maintainer's TypeScript apps.

## Why Mastra

Mastra is an open-source TypeScript framework for AI agents. These points from *Principles of Building AI Agents* (Sam Bhagwat, 3rd ed.) shape this project:

- **Agents are a key building block of AI development.** "Agents are a layer on top of LLMs: they can execute code, store and access memory, and communicate with other agents." (p. xiii)
- **RAG** "helps you search through large corpuses of (typically proprietary) information." (p. xiii)
- **Mastra can improve how you work**, and how you code with agents.
- **Model choice can change later.** "Perhaps you eventually move some of your workload to SoTA open-source providers like Qwen, Kimi, Deepseek, Minimax. But make it work, make it right, make it fast/cheap — in that order." (p. 5)

## Main purposes

1. **Faster onboarding:** a structured path from "we want AI in our app" to a concrete integration plan.
2. **A consulting offering:** a repeatable method for advising teams on Mastra integrations.
3. **Open source for vibe coders:** help vibe coders build better systems that they can still understand.
4. **Transparent scores:** every recommendation and score traces back to an answer.
5. **Timeline prediction:** a rough estimate for a Mastra-supported MVP and the full rollout.

## What it does, and doesn't do

| It does | It doesn't |
|---|---|
| Give AI agents a standard set of questions to ask, and how to ask them | Integrate Mastra into your app automatically |
| Produce a written integration plan with a score and rough timeline | Guarantee the timeline; the estimates are uncalibrated drafts |
| Provide templates: env file, strategy file, connector catalogue | Store or need your secrets |
| Include a Mastra backend and a Next.js UI for learning and testing | Replace the [Mastra docs](https://mastra.ai/docs) |

## How to use it

1. **Clone this repository** next to your project (or projects; a system of several repositories works too).
2. **Start Claude Code in your project and add this repo:**

   ```bash
   cd your-app
   claude --add-dir ../Mastra-meilix
   ```

   In a running session, `/add-dir ../Mastra-meilix` does the same.
3. **Ask the agent:**

   > Read Mastra-meilix/AGENTS.md and run the Mastra integration questionnaire for this project.

4. **Answer the questions** one at a time, ideally together with your developer.
5. **Review the plan** (`mastra-integration-plan.md`) and decide what to build first.

To do it without an agent, read [questionnaire/README.md](questionnaire/README.md).

## Repository structure

```
Mastra-meilix/
├── README.md              ← you are here
├── AGENTS.md              ← instructions for AI agents (and CLAUDE.md, which imports it)
├── CONTRIBUTING.md        ← issues, branches, naming, PRs, review process
├── LICENSE.md             ← GNU GPL v3
├── questionnaire/         ← the questions, routing table, scoring, plan template
├── blueprint/
│   ├── connectors/        ← catalogue of agent SDKs, providers and services
│   ├── .env.example       ← template for all API keys
│   └── strategy.template.yaml  ← data sources, what matters, frequency, metrics
├── docs/wiki/             ← source for the GitHub wiki (FAQ, guides)
├── scripts/               ← repo checks used by CI
├── .github/               ← issue templates, CODEOWNERS, CI workflow
├── mastra-meilix/         ← Mastra backend (agent, tools, memory; Studio on :4111)
└── web/                   ← Next.js learning UI (AI SDK UI + AI Elements)
```

## Docs in this repo

| File | Purpose |
|---|---|
| [AGENTS.md](AGENTS.md) | How agents run the questionnaire in another project, and how agents and people contribute here |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Issue scope, fork and branch, naming conventions, PR and review process, bug and feature reports |
| [.github/ISSUE_TEMPLATE/](.github/ISSUE_TEMPLATE/) | Templates for bug reports, feature requests and general issues |
| [LICENSE.md](LICENSE.md) | GNU General Public License v3.0 |
| [docs/wiki/](docs/wiki/) | FAQ, guides and repository settings, published to the GitHub wiki |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | Lint, type check, build, questionnaire format check |

## The blueprint

A modular structure for every integration:

1. **[Connectors](blueprint/connectors/README.md)** to agent SDKs and services: model providers, MCP, AI SDK UI, storage, GitHub.
2. **[Template env file](blueprint/.env.example)** with all the API keys an integration may need.
3. **[Strategy template](blueprint/strategy.template.yaml)** to define your own data sources, what matters in them, how often they're read, and how metrics are computed.

## Running the included projects

Requirements: Node.js ≥ 22.13.

```bash
# Mastra backend + Studio (http://localhost:4111)
cd mastra-meilix
cp .env.example .env      # add DEEPSEEK_API_KEY (the agent uses DeepSeek)
npm install
npm run dev

# Next.js learning UI (http://localhost:3000)
cd web
npm install
npm run dev
```

The backend is auth-agnostic; a Supabase-based reference setup is planned.

## Contributing and license

Contributions are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md). This project is licensed under the [GNU GPL v3.0](LICENSE.md).
