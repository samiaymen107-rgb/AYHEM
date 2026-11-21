# ADR-0001: Cross-Repository Contract Validation

- Status: Proposed
- Date: 2026-11-21
- Owners: AYHEM maintainers
- Scope: the eight-repository AYHEM federation

## Context

The federation contains independently versioned repositories. Local JSON Schema validation and repository CI are useful, but passing local checks does not prove that a producer and consumer in different private repositories agree on the same contract. The repositories must remain private, and workflows must not receive broad repository credentials.

The current baseline includes versioned contracts in AYHEM-LINK and schema-validation work in the service repositories. The open pull requests and their CI results are evidence of proposed changes, not proof of cross-repository runtime connectivity.

## Decision

Adopt a staged, least-privilege validation model.

### Stage 1 — repository-local validation (available now)

Each repository validates the schemas and fixtures it owns in its own CI workflow. The workflow must:
- use a pinned validator version and lockfile;
- validate positive and negative synthetic fixtures;
- run with read-only repository permissions unless a job demonstrably needs more;
- publish no private schema contents to public repositories or logs;
- report the commit SHA and schema version tested.

This stage proves only that each repository's own declared schemas pass its local checks.

### Stage 2 — compatibility declarations (metadata-only)

Each producer/consumer pair maintains a small, reviewable compatibility declaration containing:
- stable contract identifier;
- provider and consumer repository identifiers;
- supported major/minor contract range;
- schema version and immutable schema digest;
- declaration revision and source commit SHA.

The central AYHEM integration inventory may compare identifiers, version ranges, and pinned digests. It must not infer semantic compatibility from matching names or hashes. A digest proves identity of bytes, not that a consumer correctly implements a schema.

Declarations must be generated or reviewed alongside the contract change. Do not hand-edit a digest without re-running the owning repository's validator.

### Stage 3 — semantic cross-repository validation (not enabled)

A future gate may retrieve private schemas and validate consumer fixtures against provider schemas. This requires a dedicated GitHub App or equivalent narrowly scoped read-only identity, restricted to the exact repositories and contents required. It must not use a personal access token with broad account access.

Do not create credentials, add repository secrets, change organization permissions, or enable this stage until the owner explicitly approves the exact repositories, permissions, and secret-management plan. Until then, semantic cross-repository validation remains unavailable.

## Security and data boundaries

- No schema copying from private service repositories into a public repository.
- No broad PAT, write token, or credential embedded in workflow files.
- No secret values in logs, artifacts, commits, issues, or pull-request comments.
- Workflow permissions default to read-only and are narrowed per job.
- Treat downloaded schemas, fixtures, and metadata as untrusted input.
- Never let validation workflows deploy services, mutate production data, or trigger external actions.

## Compatibility policy

- Backward-compatible additive changes may remain within the same major version only when the contract's compatibility rules and fixtures support that claim.
- Breaking changes require a new major version and an explicit migration/deprecation plan.
- Unknown, missing, or stale declarations fail closed as `unverified`; they must not be reported as compatible.
- A passing local validator, metadata comparison, or CI badge is not evidence of live API connectivity or end-to-end interoperability.

## Consequences

Positive:
- Improves traceability without widening credentials.
- Keeps private schemas within their owning repositories.
- Makes the limits of each validation stage explicit.

Trade-offs:
- Stage 2 checks metadata consistency, not full semantic compatibility.
- Stage 3 requires a separately approved, carefully scoped identity and additional workflow design.

## Acceptance criteria

1. Every repository-local schema check reports the tested commit and schema version.
2. Compatibility declarations identify both sides of each contract and immutable source revisions.
3. Missing or stale metadata is reported as unverified, never compatible.
4. No workflow receives broad private-repository read access by default.
5. Semantic cross-repository validation is not claimed until an approved narrow-read mechanism and consumer/provider fixture tests exist.
6. No deployment, migration, or external side effect is performed by this gate.

## Current status

This ADR records the staged design. Stage 1 exists in repository-local validation workflows and must be reviewed/merged independently. Stage 2 has an initial metadata-only implementation proposed in [AYHEM-LINK PR #4](https://github.com/samiaymen107-rgb/AYHEM-LINK/pull/4): one LINK event-envelope to AYHEM_WEB adapter declaration, pinned revisions, local provider-schema Git blob verification, and fail-closed `unverified` status. Its CI run 44943575386 passed. This does not prove semantic compatibility; the declaration remains unverified and PR #4 is open. Stage 3 is intentionally disabled pending explicit approval of narrowly scoped credentials.
