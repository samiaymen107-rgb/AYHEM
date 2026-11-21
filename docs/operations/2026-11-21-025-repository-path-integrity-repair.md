# AYHEM 025 — Restore valid architecture path and repair checkout failure

- Date: 2026-11-21
- Repository: `samiaymen107-rgb/AYHEM`
- Branch: `fix/025-restore-architecture-path-ci-checkout`
- Base commit: `9243197a0d3d04d3f5ab44b832632ad937eef3a8`
- Status: IMPLEMENTED ON BRANCH / CI PENDING / NOT MERGED
- Stage completion: **85%** (content preserved, invalid path removed from branch, README corrected, path-integrity guard added; CI and merge pending)
- Overall AYHEM engineering progress: **44.75% provisional recalibration**; dashboard synchronization in AYHEM_WEB is pending.

## Objective

Repair the repository checkout failure that prevented the AI gateway contract workflow from reaching its tests.

## Root cause — VERIFIED

The root of AYHEM contained a file whose filename was a 909-character Arabic/Markdown architecture passage. GitHub Actions failed during checkout with `File name too long`, before Node setup or contract tests. The failed run was `44875005613`, job `136757677356`.

## Changes

- Preserved the exact contents of the malformed file in the valid root path `ARCHITECTURE.md`.
- Removed only the malformed long path from the development branch using a Git tree update. The original blob remains in Git history; the architecture text is preserved in the new file.
- Rewrote `README.md` to describe AYHEM as a project under development, remove unsupported claims of completed self-learning/non-erasable storage, and link the architecture and progress dashboard.
- Added `scripts/check-repository-paths.mjs` to check tracked UTF-8 path lengths.
- Added `.github/workflows/repository-path-integrity.yml` to run the path guard on pull requests and pushes to main.

## Progress recalibration

The initial 41% scorecard omitted a merged foundation that already exists in AYHEM_WEB PR #4: deterministic autonomy policy, append-only audit ledger, memory schema, adversarial boundary tests, and operational charter. This is evidence of a partial AUTONOMY foundation, not a continuous autonomous runtime.

The AUTONOMY workstream is therefore recalibrated from 0% to 25%, adding 3.75 weighted points. The revised provisional overall engineering estimate is **44.75%**. The authoritative scorecard and dashboard in AYHEM_WEB must be synchronized in a follow-up change before this revised value is considered published.

## Verification

- Confirmed the malformed path is absent from the branch root.
- Confirmed `ARCHITECTURE.md` exists and contains the recovered source.
- CI for this repair branch: pending.
- The original contract workflow failure is confirmed to occur during checkout; contract tests did not run in that failed attempt.

## Safety and preservation

- The architecture text was copied before removing the malformed path.
- No unrelated source files, user data, secrets, or production services were changed.
- The malformed path is removed only from the current branch tree; Git history remains intact.

## Next steps

1. Merge this repair after path-integrity verification.
2. Re-run AYHEM PR #6 contract checks against the repaired main branch and fix any real test failures.
3. Review AYHEM PRs #4 and #5 and the Astro PR #1; decide their merge readiness based on scope, checks, and cross-repository compatibility.
4. Synchronize the revised 44.75% scorecard and dashboard in AYHEM_WEB.
