# AYHEM Eight-Repository Federation — V1

Status: the eight-repository federation is established as an architecture and contract map. The five service repositories have initial versioned contract baselines. AYHEM_WEB PR #42 (federation baseline) is merged. AYHEM_WEB PR #43 adds the eight-repository integration graph; its foundation, browser integration, and cognition benchmark CI jobs passed. PR #43 remains open and is not merged. No claim of live cross-repository network connectivity is made.

## Mission

Extend the original AYHEM repositories with five independently versioned services. All eight repositories form one coordinated federation. Each repository retains a clear bounded context, versioned contract, tests, security boundary, and release lifecycle. The five services complement rather than replace AYHEM, AYHEM_WEB, and astro-blog-starter-template.

## The eight repositories

### Original foundation

1. **AYHEM** — canonical product vision, domain model, architecture, and federation decisions.
2. **AYHEM_WEB** — user-facing web application, portal, and current local integration adapters.
3. **astro-blog-starter-template** — public-facing site and presentation layer.

### Federated services

4. **AYHEM-MEMORY** — provenance-aware, append-only memory records and lifecycle.
5. **AYHEM-COGNITION** — reasoning results, evidence classification, retrieval and contradiction handling.
6. **AYHEM-AUTONOMY** — task planning, orchestration policy, approvals and dry-run controls.
7. **AYHEM-GUARD** — authorization contracts, security boundaries and governance.
8. **AYHEM-LINK** — shared versioned federation envelopes and integration contracts.

## Service boundaries

- AYHEM remains the canonical product vision, domain model, and system architecture.
- AYHEM_WEB remains the web application and current edge gateway integration.
- astro-blog-starter-template remains the public-facing experience/site.
- AYHEM-MEMORY owns memory record schemas and lifecycle rules.
- AYHEM-COGNITION owns reasoning-result schemas and evidence semantics.
- AYHEM-AUTONOMY owns task-request schemas and controlled orchestration policy.
- AYHEM-GUARD owns authorization-request schemas and security policy contracts.
- AYHEM-LINK owns shared event envelopes and cross-service integration contracts.

No service may read another service's database directly. Services communicate through versioned APIs or events. Every event carries a schema version, event ID, creation time, producer identity, and trace ID. Secrets are injected at runtime and never committed.

## Integration topology and dependency direction

The integration graph is maintained in AYHEM_WEB at `core/black-box/contracts/federation-v1.manifest.json`, with automated topology tests and an architecture note.

- The graph lists all eight repositories exactly once and records consumer-to-provider contract boundaries.
- AYHEM-LINK is the shared federation-contract layer; it does not import another service's implementation.
- AYHEM-MEMORY is the first domain service using the LINK event envelope. The dependency is one-way at the contract boundary: MEMORY consumes LINK contracts; LINK does not depend on MEMORY implementation.
- AYHEM_WEB currently has a local memory-event adapter that transforms records into a LINK envelope. It does not send network requests, mirror user memory, or migrate data.
- COGNITION, AUTONOMY, and GUARD have versioned service schemas and policy baselines; live event delivery and authenticated remote calls are not yet implemented.

The graph describes intended architecture and contract dependencies. It does not imply that every pair of repositories directly calls one another or that production connectivity exists.

## Repository baseline required for each service

Each repository should maintain:
- README with purpose, boundaries, local development, deployment and incident notes.
- LICENSE and SECURITY.md, with license choice confirmed by owner before public release.
- CODEOWNERS and contribution guidance.
- Versioned API/event schemas.
- Unit and contract tests.
- CI workflow with least-privilege token permissions.
- Dependency lockfile and automated dependency/security checks where dependencies exist.
- .gitignore and secret-scanning guidance.
- Threat model and data classification.
- ADR log for architectural decisions.

## Integration sequence

1. [Complete] Preserve and inventory the three original repositories.
2. [Complete] Establish the five service repositories and their initial contract baselines.
3. [Complete] Merge the AYHEM_WEB federation memory adapter and baseline contract/topology tests (PR #41 and PR #42).
4. [CI passed; review pending] Add the eight-repository integration graph and tests (AYHEM_WEB PR #43).
5. [CI passed; review pending] Add repository-local JSON Schema Draft 2020-12 validation with Ajv for LINK, MEMORY, COGNITION, AUTONOMY, and GUARD. This validates each repository's own schemas and synthetic fixtures; cross-repository retrieval and runtime interoperability remain separate gates.
6. Add authenticated API/event adapters and integration tests only after interface ownership, authentication, authorization, replay protection, idempotency, and tenant isolation are defined.
7. Implement persistent memory storage and verified restore before moving any legacy memory.
8. Implement COGNITION against synthetic and explicitly approved test data.
9. Implement AUTONOMY last, initially in dry-run mode with all external actions disabled.
10. Run end-to-end failure, privacy, security, and recovery exercises before proposing production integration.

## Non-negotiable safety gates

- No production deployment, permission changes, financial actions, secret access/rotation, external disclosure, or permanent deletion without explicit founder approval.
- Do not copy exposed credentials into new repositories. Revoke any previously exposed key at its issuer and issue a replacement into the runtime secret store.
- Never claim persistent memory or continuous autonomous operation until durable storage, scheduler, monitoring, backup, and restore are operationally verified.
- Preserve all legacy repositories and records. Migrations must be additive, reversible, and tested against copies.
- Keep service repositories private until their contents and licensing are reviewed.
- Do not mirror private schema files into a public repository. Prefer narrowly scoped, read-only, authenticated contract retrieval or reviewed non-sensitive compatibility metadata.

## Current execution evidence and limitations

- AYHEM_WEB PR #41: merged; memory-event adapter is local transformation only.
- AYHEM_WEB PR #42: merged; federation contract baseline and eight-repository inventory.
- AYHEM_WEB PR #43: open, not merged; its foundation, browser integration, and cognition benchmark jobs completed successfully on head `e81646991a12aacb5bf060979d85e3c54572bdca`.
- AYHEM-LINK PR #2: merged; local event-envelope and service-registration schemas are validated with Ajv 8 / Draft 2020-12 and synthetic positive/negative fixtures.
- AYHEM-LINK PR #3: open, not merged; service registration coverage and expanded negative event fixtures passed CI.
- AYHEM_WEB PR #44: open, not merged; adapter SHA-256 conformance, invalid producer/event IDs, invalid clock and digest failure tests passed foundation, browser integration, and cognition benchmark jobs.
- AYHEM-MEMORY PR #2, AYHEM-COGNITION PR #2, AYHEM-AUTONOMY PR #2, and AYHEM-GUARD PR #2: open, not merged; each repository-local Ajv Draft 2020-12 validation workflow passed on its current head. The checks use synthetic fixtures and validate only schemas owned by that repository.
- AYHEM PR #11: open, not merged; path-integrity CI completed successfully on its current head.
- These checks do not retrieve or validate private schemas across repository boundaries in one workflow. They also do not prove deployed service connectivity, authentication, authorization enforcement, or end-to-end interoperability.
- No deployed cross-repository APIs, message broker, cloud synchronization, background worker, or end-to-end remote service communication is established by these changes.

This document is the central architecture record. Service-specific implementation details remain owned by their respective repositories and must be versioned independently.
