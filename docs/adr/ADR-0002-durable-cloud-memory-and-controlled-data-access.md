# ADR-0002: Durable Cloud Memory and Controlled Cross-Service Data Access

- **Status:** Proposed — awaiting founder review and repository CI
- **Date:** 2026-11-21
- **Owner:** AYHEM Founder
- **Scope:** Architecture and staged implementation policy for the eight-repository federation
- **Related baseline:** `ARCHITECTURE.md` v2.0 and ADR-0001

## 1. Context

AYHEM requires durable knowledge continuity beyond an individual session and reliable access to information owned by its federated services. The current architecture establishes persistent memory as the intended system of record, while correctly prohibiting unrestricted service-to-service database access.

This ADR advances those goals without treating documentation as proof of a deployed capability.

## 2. Decision

### 2.1 Durable cloud memory

Adopt `AYHEM-MEMORY` as the logical owner of persistent memory records and their lifecycle. The implementation shall support:

- durable storage independent of session lifetime;
- versioned records with stable IDs, UTC timestamps, provenance, classification, and integrity metadata;
- indexed retrieval and links between source, derived, corrected, and superseding records;
- encrypted replication and independent backups where supported by the selected provider;
- tested restore procedures, retention controls, audit logs, and documented key custody;
- bounded capacity and retention based on the actual provider and approved configuration.

The session cache is never the authoritative store. No migration of private or legacy records is permitted until a data inventory, classification, migration plan, backup, access policy, and explicit founder approval are recorded.

### 2.2 Cross-service database connectivity

The default integration remains versioned APIs and events. To meet legitimate cases that require database-level access, this ADR permits a **controlled read-only data access gateway** as a narrowly scoped exception:

- A dedicated gateway, not arbitrary peer services, owns database connectors.
- Each connector is separately approved for one named source service and one defined dataset.
- Initial access is read-only, restricted to approved views or equivalent query surfaces, and limited by network policy.
- Credentials are unique per connector, injected at runtime through a secret manager, rotated, and never committed to source control.
- Authentication, authorization, query allowlists, rate limits, timeouts, audit logs, and trace IDs are mandatory.
- Sensitive fields must be minimized or masked; private schemas and records must not be copied into public repositories.
- No cross-service writes, schema mutation, direct table administration, or unrestricted database credentials are permitted.
- APIs/events remain preferred for business workflows, commands, and data requiring transactional consistency.

A service must not independently open an unrestricted connection to another service's database. The gateway exception is not a general relaxation of service ownership.

## 3. Security and governance gates

Before any live connector or cloud-memory deployment:

1. Inventory the actual databases, owners, hosting locations, data classes, and current access paths.
2. Select and document the storage provider, region, encryption model, backup model, retention limits, and recovery objectives.
3. Define threat model, trust boundaries, network restrictions, secret custody, audit retention, and incident response.
4. Publish versioned schemas or approved read-only views; do not expose private schema details publicly.
5. Build synthetic fixtures and test authorization, denied access, query restrictions, isolation, replay, failure handling, and audit completeness.
6. Test backup restoration and verify integrity before declaring recovery operational.
7. Obtain explicit founder approval for credentials, permissions, private-data migration, and production deployment.

## 4. Staged rollout

- **Stage A — Design:** document provider-neutral interfaces, data classification, connector policy, and operational acceptance criteria.
- **Stage B — Synthetic prototype:** implement local/test-only storage and gateway adapters using synthetic data and no production credentials.
- **Stage C — Isolated validation:** run security, integration, backup, restore, and failure tests in a non-production environment.
- **Stage D — Approved pilot:** enable one named connector and a bounded memory dataset only after the required approvals.
- **Stage E — Federation rollout:** expand incrementally across the eight repositories based on measured evidence and per-service approval.

Autonomy remains in dry-run mode until its separate governance and execution controls are verified.

## 5. Compatibility and migration

This ADR supplements the v2.0 architecture. It does not replace the ownership boundaries of the eight repositories, the versioned API/event contracts, provenance requirements, or the no-regression policy. The controlled gateway is a constrained exception to unrestricted direct database access, not permission for peer-to-peer database coupling.

Any legacy-data migration must be additive, reversible, tested against copies, and approved before execution. Existing records and history must remain recoverable.

## 6. Verification and acceptance criteria

The design is not considered operational until evidence demonstrates:

- durable records survive session termination and service restart;
- authorized retrieval returns provenance and version information;
- unauthorized principals and out-of-scope queries are denied;
- connector access is read-only and restricted to approved data;
- all access attempts are attributable through audit and trace records;
- backup restoration succeeds and integrity checks pass;
- synchronization behavior, conflict handling, retention, and failure recovery are tested;
- no secrets or private data are exposed in source, logs, public metadata, or build artifacts.

CI success or a merged ADR alone does not prove cloud persistence, live connectivity, or disaster recovery.

## 7. Consequences

**Benefits:** durable continuity, controlled cross-service visibility, clearer data ownership, and a path to evidence-based federation.

**Costs and risks:** provider and infrastructure selection, operational monitoring, key management, data-protection obligations, connector maintenance, and additional security testing.

**Current status:** proposed design only. No cloud database, replication, production connector, credential, or live service connection is created by this ADR.
