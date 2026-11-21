# AYHEM — System Architecture v1

## Mission
AYHEM is a digital cognitive system designed to preserve knowledge with provenance, connect events over time, analyze evidence, form testable hypotheses, evaluate predictions, and improve its own software through controlled and auditable processes.

It is not a claim of human consciousness. Its value must be demonstrated through reliable memory retrieval, reasoning quality, measurable prediction performance, security, and operational continuity.

## System layers
1. **Experience & interfaces** — web UI, mobile-friendly interface, APIs, and approved external connectors.
2. **Gateway** — authentication, authorization, validation, quotas, request limits, and model-provider abstraction.
3. **Cognitive orchestrator** — routes tasks to memory retrieval, analysis, planning, and evaluation modules.
4. **Memory fabric** — immutable source records, normalized facts, event timelines, relationships, embeddings/indexes, and versioned corrections.
5. **Reasoning & learning** — evidence comparison, contradiction detection, hypothesis generation, confidence calibration, prediction tracking, and post-outcome review.
6. **Autonomy controller** — deterministic policy evaluation, task queues, sandbox execution, approval requests, and emergency stop.
7. **Audit & operations** — append-only event ledger, observability, backup/restore drills, health checks, and incident response.

## Data contracts
Every durable memory item should include:
- stable ID and type;
- original content or a verifiable reference to it;
- source and capture timestamp;
- status: confirmed, documented, contextual, to-verify, or inference;
- confidence score and rationale;
- links to related records;
- revision/supersession history.

Original source records are immutable. Corrections create a new version linked to the prior record.

## Autonomy policy
- Automatic: read, classify, index, analyze, test, backup, report, and propose.
- Guarded: reversible sandbox changes and restores only after verified backups and passing tests.
- Founder approval: production deployments, permanent deletion, external disclosure, permissions, secrets, financial commitments, and other material actions.
- Unknown actions: deny by default.

## Secret handling
No API key, token, password, private key, or recovery code may be stored in source control or browser code. Use platform-managed secret stores and least-privilege credentials. A secret exposed in repository history must be revoked at its issuing provider; removing the current copy is not sufficient.

## Reliability requirements
- Backups are not considered valid until restore tests pass.
- A scheduled task must be idempotent, observable, retry-bounded, and stoppable.
- Every autonomous action records intent, policy decision, input references, outcome, and errors.
- Model outputs are untrusted proposals until validated against policy and evidence.
- No model response may grant itself permissions.

## Repository boundaries
- **AYHEM**: canonical architecture, core domain contracts, cognitive principles, and system specifications.
- **AYHEM_WEB**: web interface, Worker gateway, integration adapters, and deployable web runtime.
- **astro-blog-starter-template**: presentation/site layer only, unless a future reviewed decision assigns it additional responsibilities.

## Implementation sequence
1. Establish policy, memory schema, and audit contracts.
2. Secure the Worker gateway and configure server-side secrets.
3. Add durable storage with encryption, versioning, and tested backups.
4. Implement retrieval and timeline relationships.
5. Add evaluation datasets and measurable reasoning/prediction tests.
6. Add scheduled orchestration with bounded safe tasks.
7. Integrate UI and external connectors through explicit scopes.
8. Conduct security review and staged deployment.

## Current status (2026-11-21)
The architecture is a target design, not a claim that every layer is operational. AYHEM_WEB now has an append-only memory foundation, IndexedDB persistence, a durable local sync outbox, and an atomic transaction that writes a memory record together with its outbox event. The operation-049 change was merged and verified by Node, real Chromium, benchmark-smoke, and Pages post-merge checks (merge commit `f69346445e82532de8fdaa4ce8a7be148b98ab79`). Operation 051 added an explicit-consent HTTPS push client with SHA-256 payload digests, bounded batches, short-lived token injection, and acknowledgement validation (merge commit `6049344166ca1b564e9bbdde3abbf96a15c3be2d`). The client is not connected to a deployed server and is not enabled by default: no remote sync, cross-device replication, pull cursor, or remote restore has been verified. Continuous scheduling, production secret-store configuration, and production integration remain incomplete.
