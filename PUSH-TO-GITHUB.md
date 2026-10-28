# Pushing the October builds to GitHub

Ten new commits are in `sma-updates.bundle`, each dated to when that build was
actually made. They sit directly on top of what GitHub already has, so this is a
straight fast-forward — no force push this time.

Run this from Terminal, as one block:

```sh
cd ~/"SMA Analytics Dashboard"

# 1. clear the stale lock (my sandbox can create files in .git but not delete them)
rm -f .git/index.lock .git/HEAD.lock

# 2. check the bundle
git bundle verify sma-updates.bundle

# 3. bring the commits in and move your branch onto them
git fetch sma-updates.bundle main:newer
git reset --hard newer
git branch -d newer

# 4. look before you push
git log --oneline -12

# 5. push
git push
```

`git reset --hard` is safe here: your working copy of `SMA Dashboard.html` is
byte-identical to the final commit in the bundle, so there is nothing of yours to
throw away. That was checked before the bundle was made.

Step 5 should not ask for a password — the token went into your keychain last time.
If it does ask: username `TheIncredibleMsM`, password is the token, and it stays
invisible as you paste.

## Afterwards

Safe to delete once pushed: `sma-updates.bundle`, `PUSH-TO-GITHUB.md`, and the
older `sma-history.bundle` if it is still lying around.
