# Connectors

Connectors link a Mastra project to agent SDKs, model providers and services. This page lists the connector types the blueprint supports. Each entry says what the connector is for, which questionnaire answer leads to it, and which environment variables it needs (see [.env.example](../.env.example)).

> **Status:** catalogue only. Implementations will be added as separate folders here, one per connector.

## Model providers (via the Mastra model router)

You don't need a provider SDK. Set the model as `provider/model` and add the API key. Related: Q02, Q07.

| Provider | Example model string | Env variable |
|---|---|---|
| OpenAI | `openai/<model>` | `OPENAI_API_KEY` |
| Anthropic | `anthropic/<model>` | `ANTHROPIC_API_KEY` |
| Google Gemini | `google/<model>` | `GOOGLE_GENERATIVE_AI_API_KEY` (or `GOOGLE_API_KEY`) |
| xAI | `xai/<model>` | `XAI_API_KEY` |
| DeepSeek | `deepseek/deepseek-v4-pro` | `DEEPSEEK_API_KEY` |
| Qwen (Alibaba) | `alibaba/<model>` | `DASHSCOPE_API_KEY` |
| Kimi (Moonshot) | `moonshotai/<model>` | `MOONSHOT_API_KEY` |
| MiniMax | `minimax/<model>` | `MINIMAX_API_KEY` |
| Mistral | `mistral/<model>` | `MISTRAL_API_KEY` |
| OpenRouter (gateway) | `openrouter/<provider>/<model>` | `OPENROUTER_API_KEY` |

Variable names were taken from the provider registry in `@mastra/core` 1.75. Full model list: <https://mastra.ai/models>.

## Agent SDKs and protocols

| Connector | Use it when | Related |
|---|---|---|
| **MCP client** (`@mastra/mcp`) | Your agent should use third-party tools (calendar, email, CRM, GitHub …) | Q08 |
| **MCP server** (`@mastra/mcp`) | Other agents should be able to use your tools | Q08, U6 |
| **AI SDK UI** (`@mastra/ai-sdk` + `@ai-sdk/react`) | A web UI uses `useChat`, `useCompletion` or `useObject` | Q16 |
| **Mastra Client SDK** | A frontend or another service calls your agents and workflows over HTTP | Q16 |

## Data and storage

| Connector | Use it when | Related |
|---|---|---|
| Postgres + pgvector | You already use Postgres (including Supabase) | Q09, Q01 |
| LibSQL / SQLite | Local development; this repo's default | Q19 |
| Chroma, Turbopuffer, or your cloud's managed vector DB | New projects needing RAG without Postgres | Q01, Q09 |

## Services

| Connector | Use it when | Env variable | Related |
|---|---|---|---|
| GitHub (read-only token) | PR review, issue triage | `GITHUB_TOKEN` | U4, Q20 |
| Observability (OpenTelemetry exporter) | Traces in production | Provider-specific | Q06, Q11 |

## Rules for every connector

- **Least privilege:** read-only credentials unless writing is required, and then only with an approval step (Q18).
- **Vet third-party MCP servers** like any third-party API before connecting them (booklet p. 39).
- **Secrets go only in `.env`.** This folder holds names and documentation, never values.
