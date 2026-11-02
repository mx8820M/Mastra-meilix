# Agent setups

The six setups from the diagram in *Principles of Building AI Agents* (p. 76), used as answer options for questionnaire question Q10.

The booklet's advice: multi-agent design is like designing an organization, "designs are fractal", and "when you're building, start with the simplest version first."

| Setup | Shape | How control flows | Choose it when | Watch out for |
|---|---|---|---|---|
| **Single agent** | One LLM plus a set of tools | The LLM calls tools in a loop until the goal is reached | Almost every first version; one clear job | Too many tools in one agent makes tool choice unreliable |
| **Network** | Agents connected to each other, no centre | Any agent can talk to any other; no single decision-maker | Open-ended exploration or brainstorming between specialists | Hard to predict, debug and budget; loops between agents |
| **Supervisor** | One coordinator (highlighted) with subagents around it | The supervisor delegates; subagents report back only to it | Distinct specialist roles with one agent making decisions | The supervisor becomes the bottleneck and the single point of failure |
| **Supervisor (as tools)** | One LLM whose tools are other agents | Subagents are ordinary tool calls inside the supervisor's loop (p. 77) | The simplest way to add specialists to a single agent | Each subagent call costs a full agent run; watch tokens (Q06) |
| **Hierarchical** | A tree: a supervisor of supervisors | Requests go down the levels, results come back up | Large systems with separate "departments" | Latency and cost multiply with each level |
| **Custom** | Any graph you design | Defined by you, usually as a workflow mixing agents and deterministic steps | A process with a known order, rules and approval points | You own the design; keep each step to one job (p. 51) |

## Supervisor vs. supervisor (as tools)

These two are easy to confuse.

- In **supervisor (as tools)**, the subagents are just tools. The supervisor's LLM decides when to call one, gets a result back, and keeps going in its own loop. Nothing else changes.
- The plain **supervisor** pattern is the organizational idea: one manager, specialist team members who report only to the manager. Wrapping subagents as tools is the most straightforward way to implement it (p. 77).

## How they map to Mastra

- **Single agent:** an `Agent` with `tools`.
- **Supervisor / supervisor (as tools) / hierarchical:** agents that use other agents as tools or subagents. A hierarchy repeats this one level down.
- **Custom:** a workflow (`createWorkflow`, `createStep`) with `.then()`, branching, conditions and `.suspend()` / `.resume()` for approvals. Workflows can also be passed to agents as tools (p. 79).
- **Network:** possible, but rarely the right first choice.

Check the [Mastra docs](https://mastra.ai/docs) for the current API names before you implement; they change between versions.
