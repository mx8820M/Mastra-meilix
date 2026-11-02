# Wiki source

These pages are the source for the GitHub wiki: FAQ, guides and background docs. They live here so they can be reviewed in pull requests like any other change.

GitHub wikis are a separate Git repository (`<repo>.wiki.git`) and only exist after the repository is on GitHub with the wiki enabled. To publish:

```bash
# once: enable the wiki in the repo settings and create any first page in the browser
git clone https://github.com/<owner>/<repo>.wiki.git ../wiki
cp docs/wiki/*.md ../wiki/ && rm ../wiki/README.md
cd ../wiki && git add . && git commit -m "Sync wiki from docs/wiki" && git push
```

| Page | Content |
|---|---|
| [Home](Home.md) | Wiki start page |
| [Agent-Setups](Agent-Setups.md) | The six agent setups (questionnaire Q10) |
| [FAQ](FAQ.md) | Short answers to recurring questions |
| [Repository-Settings](Repository-Settings.md) | GitHub settings that can't live in files: branch protection, security features |
