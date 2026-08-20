# QR Website Project — Read Before Editing

I'm working on a shared GitHub repository for our QR website. Another collaborator also pushes to the same repo. Please follow these rules on every action in this project so we don't overwrite each other's work.

## The one rule that matters most
**Always `git pull` before editing. Always `git commit` + `git push` after editing.** Never leave uncommitted changes sitting for long — they cause conflicts.

## Before you touch any file
1. Run `git status` — if there are leftover uncommitted changes, ASK me what to do. Do not discard them.
2. Run `git fetch origin` then `git pull --rebase` to bring in the other collaborator's latest work.
3. If pull reports a conflict, STOP and ask me which version to keep. Never resolve conflicts silently.

## While editing
- Make small, focused commits rather than one giant one — they merge more cleanly.
- If we've been editing for more than ~30 minutes, run `git fetch origin` again to check if the other collaborator pushed. If they did, commit what we have and pull before continuing.
- NEVER run `git reset --hard`, `git checkout .`, `git clean -fd`, or `git push --force` without asking me first. These can wipe the other person's work.

## After editing
1. `git status` — review what changed.
2. `git diff` — sanity check.
3. `git add <specific files>` — name files, don't use `git add .` blindly.
4. `git commit -m "clear description of what and why"`
5. `git pull --rebase` one more time in case the other person just pushed.
6. `git push`

## If push is rejected
The other collaborator pushed while I was editing. Do NOT force-push. Instead:
1. `git pull --rebase`
2. Resolve any conflicts (ask me).
3. `git push` again.

## Never commit
- API keys, passwords, `.env` files, Supabase service keys
- `node_modules/`, `.tmp`, `~$*`, `desktop.ini`
- If you see a secret about to be committed, STOP and warn me before pushing.

## When unsure
If any action might affect the other collaborator's work, ask me first. Better to pause than to overwrite someone's changes.
