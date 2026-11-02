# FAQ

## Mastra

**Should Mastra Studio run on the production server?**
No. Studio is a development tool that can run any agent and tool with your API keys. In production, deploy the Mastra server (`mastra build`) that your app calls. To share Studio, run it locally, behind authentication on a separate staging server, or use Mastra Cloud.

**Can I use DeepSeek, Qwen, Kimi or other models?**
Yes. Mastra's model router supports many providers through a `provider/model` string plus an API key. See [connectors](https://github.com/mx8820M/Mastra-meilix/blob/main/blueprint/connectors/README.md) and <https://mastra.ai/models>. The booklet's advice is to start with a hosted frontier model and move workloads later: "make it work, make it right, make it fast/cheap — in that order."

## Frontend

**What are `useChat`, `useCompletion` and `useObject`?**
React hooks from the AI SDK (`@ai-sdk/react`):

| Hook | Analogy | Use it for |
|---|---|---|
| `useChat` | A messenger conversation that remembers history | Chat with an agent, including tool calls |
| `useCompletion` | A button that returns one text | Summaries, commit messages, one-shot tasks |
| `useObject` | The AI filling in a form with fixed fields | Structured results, such as a list of review findings |

**My app uses Mantine, not shadcn/Radix. Do I need AI Elements?**
No. AI Elements is built on shadcn, Radix and Tailwind, and is only used in this repo's `web/` learning UI. The hooks work with any component library. Adding Tailwind and Radix to a Mantine app adds duplicate dependencies and style conflicts. Build the chat UI with Mantine components and use AI Elements only as a reference.

## Open source

**What are CLA and DCO?**
Two ways to confirm contributors may submit their code:
- A **CLA** (Contributor License Agreement) is a legal document signed once.
- The **DCO** (Developer Certificate of Origin) is a `Signed-off-by:` line in each commit (`git commit -s`).

**What are Dependabot alerts and CodeQL?**
Free GitHub security features for public repos:
- **Dependabot** watches your *dependencies* for known vulnerabilities and opens update PRs.
- **CodeQL** scans *your own code* for vulnerable patterns.

**How do we stay in control of merges when anyone can contribute?**
- Branch protection plus CODEOWNERS: the maintainer approves every merge.
- CI must pass.
- AI review is advisory only and never gets merge rights.

See [Repository settings](Repository-Settings).

**How do we handle prompt injection and malicious PRs?**
- Treat every PR, issue and comment as untrusted input.
- Agents that read them get read-only tools and return structured output.
- Anything with side effects needs human approval.
- For CI: never run fork code with secrets (`pull_request`, not `pull_request_target`), and require approval for first-time contributors' workflows.
- Review changes to workflows, dependencies and install scripts with extra care.
