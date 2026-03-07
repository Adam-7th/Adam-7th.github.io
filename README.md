# ZEC AI Automation Agency Workspace

This folder is a local workspace container.  
The real deployable website project lives in [`ZEC/`](./ZEC).

## Recommended GitHub Repository Root

Use `ZEC/` as the repository root for your production website repo.  
This keeps the GitHub project clean and avoids committing local-only workspace files such as `.history/` and `.vscode/`.

## First Push Workflow (Recommended)

```bash
cd ZEC
git init
git add .
git commit -m "chore: initialize ZEC website repository"
git branch -M main
git remote add origin https://github.com/Adam-7th/Adam-7th.github.io.git
git push -u origin main
```

If a remote already exists, update it instead:

```bash
git remote set-url origin https://github.com/Adam-7th/Adam-7th.github.io.git
```
