# Contributing

Thanks for helping improve this project. Contributions of all sizes are welcome: a reworded question, a new connector, a bug fix, a better guide.

The maintainer reviews every pull request and decides what gets merged. AI-assisted contributions are fine. Please read [AGENTS.md](AGENTS.md) if an agent helps you.

## 1. Before you open an issue

- **Search first.** Check open and closed issues for the same topic.
- **One topic per issue.** A bug, a feature idea, or a question. If you have three ideas, open three issues.
- **Keep the scope small enough to finish in one pull request.** If it's bigger, describe the goal and propose how to split it.
- **Use a template:**
  - **Bug report:** something doesn't work as documented. Include steps to reproduce, expected vs. actual result, and your environment.
  - **Feature request:** a new question, connector, guide or UI feature. Describe the problem first, then your proposed solution.
  - **General issue:** questions, documentation gaps, discussion.
- **Security problems:** don't open a public issue. Use GitHub's *Report a vulnerability* button on the Security tab.

## 2. Fork and branch

1. Fork the repository on GitHub and clone your fork.
2. Create a branch from `main`:

   ```bash
   git checkout -b <type>/<short-description>
   ```

   | Type | Use for | Example |
   |---|---|---|
   | `feat/` | New functionality | `feat/useobject-review-view` |
   | `fix/` | Bug fixes | `fix/env-template-google-key` |
   | `docs/` | Documentation and wiki pages | `docs/agent-setups-examples` |
   | `question/` | Questionnaire changes | `question/q21-data-residency` |
   | `chore/` | Tooling, CI, dependencies | `chore/ci-node-24` |

3. Keep your branch up to date with `main` and rebase if needed.

## 3. Naming conventions

- **Files and folders:** `kebab-case` (`part-2-collaboration-and-safety.md`). Wiki pages use `Title-Case` (`Agent-Setups.md`), as GitHub wikis expect.
- **Question IDs:** `Q` + two digits (`Q21`). IDs are permanent: never renumber, reuse or delete one.
- **Intended uses:** `U` + digit (`U7`), same rules.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`, for example `docs(questionnaire): clarify Q09 for Supabase`.
- **Code:** follow the style of the surrounding file. TypeScript in strict mode.

## 4. Submitting a pull request

1. Run the checks locally (CI runs the same ones):

   ```bash
   node scripts/check-questionnaire.mjs
   cd web && npm ci && npm run lint && npx tsc --noEmit && npm run build
   cd ../mastra-meilix && npm ci && npx tsc --noEmit
   ```

2. Open the PR against `main`. In the description:
   - link the issue (`Closes #12`)
   - say **what** changed and **why**
   - mention anything you're unsure about
3. Keep PRs focused. Unrelated changes go into separate PRs.
4. Never commit secrets, `.env` files or personal data.

## 5. Review process

1. **CI must pass:** lint, type check, build, and the questionnaire check.
2. **Automated AI review, if enabled, is advisory only.** It can point out problems; it never approves or merges.
3. **The maintainer reviews.** Changes to Part 1 of the questionnaire (Q01–Q13), CI, dependencies, or the files listed in [.github/CODEOWNERS](.github/CODEOWNERS) always need maintainer approval.
4. Expect questions or change requests; that's normal. Push follow-up commits to the same branch.
5. The maintainer merges with *squash and merge*. Thank you!

## 6. Questionnaire contributions

- **Part 1 (Q01–Q13)** is defined by the maintainer. Suggest changes through an issue instead of editing it directly. Only the **Guidance** lines are open for improvement.
- **New questions:** open a feature request first, with:
  - the question
  - the expected answer type
  - the source (booklet page, docs link, or experience)
  - which intended uses (U1–U6) it applies to

  Once accepted, add it to the assigned part and to the routing table.

## License

By contributing, you agree that your contributions are licensed under the [GNU General Public License v3.0](LICENSE.md).
