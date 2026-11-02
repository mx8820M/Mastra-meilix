# Repository settings

Settings that GitHub stores outside the repository files. Apply them once the repository is on GitHub, and keep this page up to date when they change.

## Branch protection for `main`

*Settings → Rules → Rulesets → New branch ruleset*, target `main`:

- [x] Restrict deletions
- [x] Block force pushes
- [x] Require a pull request before merging
  - Required approvals: 1
  - [x] Require review from Code Owners (uses [.github/CODEOWNERS](https://github.com/mx8820M/Mastra-meilix/blob/main/.github/CODEOWNERS))
  - [x] Dismiss stale approvals when new commits are pushed
- [x] Require status checks to pass: `Questionnaire format`, `Web UI (lint, types, build)`, `Mastra backend (types)`
- [x] Require linear history (fits *squash and merge*)

## Pull requests

*Settings → General → Pull Requests*:

- Allow squash merging only
- Automatically delete head branches

## Actions

*Settings → Actions → General*:

- **Fork pull request workflows from outside collaborators:** require approval for first-time contributors (or all outside contributors).
- **Workflow permissions:** read repository contents only.

## Security

*Settings → Code security*:

- Dependabot alerts and Dependabot security updates: **on**
- CodeQL code scanning (default setup): **on**
- Secret scanning and push protection: **on**
- Private vulnerability reporting: **on** (the Security tab then shows *Report a vulnerability*)

## Features

- Issues: on (uses the templates in `.github/ISSUE_TEMPLATE/`)
- Wiki: on; publish from `docs/wiki/` (see its README)
