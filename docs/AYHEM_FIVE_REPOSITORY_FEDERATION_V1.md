# AYHEM Five-Repository Federation — V1

Status: architecture specification prepared in a protected development branch. The five repositories themselves are not yet created because the connected GitHub actions currently expose repository read/write operations but no repository-creation operation.

## Mission

Extend the original AYHEM repositories with five independently versioned services. Each service has a clear bounded context, API contract, tests, security boundary, and release lifecycle. The five services complement rather than replace AYHEM, AYHEM_WEB, and astro-blog-starter-template.

## Proposed repositories

### 1. AYHEM-MEMORY
Purpose: durable, provenance-aware memory.
- Append-only source records and versioned normalized memories.
- PostgreSQL-compatible storage adapter and object-storage backup adapter.
- Search index abstraction; no vendor lock-in.
- Encryption-at-rest integration points, retention, export, restore verification.
- Corrections supersede prior assertions; never silently rewrite history.
- Tests: idempotency, migration, backup/restore, provenance completeness, access isolation.

### 2. AYHEM-COGNITION
Purpose: reasoning and retrieval orchestration.
- Retrieval pipeline with source references and confidence metadata.
- Contradiction detection and temporal reasoning.
- Explicit distinction between fact, context, hypothesis, and inference.
- Evaluation datasets and regression scoring.
- Prompt-injection-resistant treatment of retrieved content as untrusted data.
- Tests: citation coverage, retrieval relevance, contradiction cases, unsupported-claim rate.

### 3. AYHEM-AUTONOMY
Purpose: controlled task planning and execution.
- Deterministic policy engine remains authoritative over model proposals.
- Job queue, task state machine, approval checkpoints, idempotency keys.
- Sandboxed execution adapters; no arbitrary shell or self-granted privileges.
- Kill switch, quotas, retry limits, rollback plans, human-readable audit events.
- Tests: privilege escalation, replay, duplicate jobs, denied actions, approval bypass.

### 4. AYHEM-GUARD
Purpose: security, privacy, governance, and observability.
- Secret-handling guidance and secret scanning gates.
- Authentication/authorization interfaces, rate limits, abuse detection.
- Privacy classification, redaction, retention and deletion workflows.
- Signed audit checkpoints and alerting contracts.
- Threat model, incident response playbooks, dependency and supply-chain checks.
- Tests: access control, secret leakage, log redaction, rate-limit enforcement.

### 5. AYHEM-LINK
Purpose: integration and interoperability.
- Versioned API schemas and event contracts between all AYHEM components.
- Adapters for web UI, worker gateway, storage, scheduler, and future clients.
- Contract tests, compatibility matrix, retry/dead-letter conventions.
- Health/readiness endpoints and service discovery configuration.
- Tests: schema compatibility, timeout handling, duplicate delivery, partial outages.

## System boundaries

- AYHEM remains the canonical product vision, domain model, and system architecture.
- AYHEM_WEB remains the web application and current edge gateway integration.
- astro-blog-starter-template remains the public-facing experience/site.
- AYHEM-MEMORY owns durable memory persistence.
- AYHEM-COGNITION owns retrieval and reasoning orchestration.
- AYHEM-AUTONOMY owns scheduled jobs and controlled execution.
- AYHEM-GUARD owns cross-cutting security and governance controls.
- AYHEM-LINK owns service contracts and adapters.

No service may read another service's database directly. Services communicate through versioned APIs or signed events. Every event carries a schema version, event ID, creation time, producer identity, and trace ID. Secrets are injected at runtime and never committed.

## Repository baseline required for each service

Each repository must contain:
- README with purpose, boundaries, local development, deployment and incident notes.
- LICENSE and SECURITY.md, with license choice confirmed by owner before public release.
- CODEOWNERS and contribution guidance.
- Versioned API/event schemas.
- Unit and contract tests.
- CI workflow with least-privilege token permissions.
- Dependency lockfile and automated dependency/security checks.
- .gitignore and secret-scanning guidance.
- Threat model and data classification.
- ADR log for architectural decisions.

## Integration sequence

1. Create the five private repositories under the founder's account, with no initial public exposure.
2. Add their initial scaffold and CI independently; do not fork or copy legacy secrets.
3. Connect contracts through AYHEM-LINK before implementing cross-service calls.
4. Implement AYHEM-GUARD policy and observability requirements before exposing endpoints.
5. Implement AYHEM-MEMORY storage and verified restore before moving any legacy memory.
6. Implement AYHEM-COGNITION against synthetic and explicitly approved test data.
7. Implement AYHEM-AUTONOMY last, initially in dry-run mode with all external actions disabled.
8. Run end-to-end failure, privacy, security, and recovery exercises.
9. Only then propose production integration and deployment for founder review.

## Non-negotiable safety gates

- No production deployment, permission changes, financial actions, secret access/rotation, external disclosure, or permanent deletion without explicit founder approval.
- Do not copy exposed credentials into new repositories. Revoke any previously exposed key at its issuer and issue a replacement into the runtime secret store.
- Never claim persistent memory or continuous autonomous operation until durable storage, scheduler, monitoring, backup, and restore are operationally verified.
- Preserve all legacy repositories and records. Migrations must be additive, reversible, and tested against copies.
- Keep all five repositories private until their contents and licensing are reviewed.

## Current execution limitation

The connected GitHub toolset can inspect repositories and create branches, files, commits, and pull requests, but it does not currently expose the GitHub repository-creation endpoint. Therefore this document is an implementation-ready federation specification, not evidence that the five repositories already exist. Once repository creation is available, create the five named repositories as private repositories and apply this baseline to each.
