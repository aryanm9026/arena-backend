#!/usr/bin/env bash
# ORGANIZERS ONLY. Usage: ./scripts/protect.sh OWNER/REPO   (needs: gh auth login, admin rights)
set -euo pipefail
REPO="${1:?usage: protect.sh OWNER/REPO}"
echo "Applying branch ruleset to $REPO ..."
gh api -X POST "repos/$REPO/rulesets" --input .github/ruleset-protect-main.json
echo "Forcing approval before fork-PR workflows run ..."
gh api -X PUT "repos/$REPO/actions/permissions/fork-pr-contributor-approval" -f approval_policy=all_external_contributors || echo "(set manually: Settings > Actions > General > Fork pull request workflows)"
echo "Restricting default workflow token to read-only ..."
gh api -X PUT "repos/$REPO/actions/permissions/workflow" -f default_workflow_permissions=read -F can_approve_pull_request_reviews=false || true
echo "Done. Verify in Settings > Rules. Test: git push --force origin main  (must be rejected)."
