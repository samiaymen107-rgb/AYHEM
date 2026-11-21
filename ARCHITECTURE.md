# AYHEM — Architecture and Founder Doctrine

**Status:** Canonical architecture baseline  
**Version:** 2.0  
**Policy:** Additive evolution; preserve history; no regression  
**Owner:** Founder — Aymen Sami

## 1. Mission and governing principle

AYHEM is one coordinated digital intelligence system. Its purpose is to preserve and organize knowledge, reason over evidence, learn from validated feedback, coordinate specialized services, and improve continuously under founder governance.

**Founder doctrine — evolution without regression:**
- Every change extends the verified baseline; it must not silently erase, downgrade, or replace prior capabilities or knowledge.
- Preserve history, provenance, version records, and recoverability. Corrections are additive and traceable.
- Detect errors, explain their impact, correct them, and add regression tests so the same failure is less likely to recur.
- Prefer measurable quality, reliability, security, and usefulness over claims of perfection.
- No component may claim a capability is operational until implementation and evidence verify it.
- Where a new design conflicts with a prior decision, record an Architecture Decision Record (ADR), migration path, compatibility impact, and rollback/recovery plan before adoption.
- Founder approval remains required for production deployments, credential or permission changes, external disclosure, financial actions, irreversible deletion, and migration of private or legacy data.

## 2. Canonical architecture layers

The original conceptual layers remain protected and are extended by the eight-repository federation:

1. **CORE** — identity, mission, governing rules, system model, and architecture decisions.
2. **MEMORY** — durable knowledge records, provenance, versioning, retrieval, retention, backup, and restore.
3. **SYMBOLIC TEMPLATES** — normalized knowledge units, schemas, metadata, and reusable representations.
4. **ARCHIVE** — chronological, immutable history of records, events, decisions, and changes.
5. **SIG** — system identity and integrity / attribution layer: AYMEN × AI.
6. **FEDERATION** — the coordinated eight-repository system and its versioned contracts.

These are logical responsibilities, not a claim that all components already run as one deployed service.

## 3. Permanent cloud memory doctrine

**The durable memory is the system of record. A session is only an access context or temporary working cache; ending a session must never be treated as the lifecycle or deletion boundary for durable knowledge.**

Memory lifecycle:
1. Capture an authorized input with source, context, timestamp, and provenance.
2. Normalize and validate it into a versioned knowledge record.
3. Store it in durable persistent storage when the approved storage service is available.
4. Index it for retrieval and connect it to related records without overwriting source records.
5. Record corrections, derived insights, and superseding versions as traceable additions.
6. Back up records and verify restore procedures before declaring disaster recovery operational.
7. Apply authentication, least privilege, encryption in transit and at rest, retention rules, and audit logging.

Memory classes:
- **SESSION / WORKING CACHE:** temporary processing state; may expire, but is not the authoritative store for durable knowledge.
- **PERSISTENT MEMORY:** authoritative durable records, versioned and recoverable.
- **CLOUD REPLICATION:** encrypted remote replication and synchronization, only when a deployed and tested service confirms it.
- **EXTERNAL BACKUP:** independently recoverable encrypted export, with documented key custody and restore verification.
- **ARCHIVE:** append-only historical record of inputs, decisions, versions, and corrections.

No statement that cloud persistence, continuous synchronization, unlimited storage, autonomous background operation, or verified restore is active may be made without operational evidence. Storage capacity and retention are bounded by the actual provider, service configuration, and approved policy; do not promise literal infinity.

## 4. Knowledge unit and provenance

Each durable knowledge unit should include, as applicable:
- stable unique ID;
- schema and record version;
- created and updated timestamps in UTC;
- source, author/producer, and context;
- classification and access policy;
- original content or protected reference to it;
- integrity digest where appropriate;
- links to related, derived, corrected, or superseding records;
- validation status and evidence references.

Preserve original source records. Never silently rewrite historical facts. Distinguish verified evidence, user-provided statements, hypotheses, and machine-generated inferences.

## 5. Intelligence, learning, and quality

AYHEM's intelligence capabilities should improve through controlled retrieval, reasoning, evaluation, and feedback:
- retrieve relevant prior knowledge with provenance;
- compare claims and detect contradictions;
- label uncertainty and distinguish evidence from inference;
- evaluate outputs against reproducible test cases and user-approved criteria;
- incorporate corrections as versioned learning signals;
- measure accuracy, latency, reliability, safety, and regression rates.

AI-generated conclusions are not automatically facts. Learning must not silently alter authoritative records, grant permissions, or execute external actions. The goal is continuous, evidence-based improvement toward the highest attainable quality—not an unverifiable claim of perfect or infallible intelligence.

## 6. Eight-repository federation

The eight repositories form one coordinated system while retaining separate ownership and release boundaries:

### Original foundation
1. **AYHEM** — canonical vision, domain model, architecture, and federation decisions.
2. **AYHEM_WEB** — user-facing web application, portal, and local integration adapters.
3. **astro-blog-starter-template** — public presentation and website layer.

### Federated services
4. **AYHEM-MEMORY** — provenance-aware memory records, persistence lifecycle, retrieval, and retention contracts.
5. **AYHEM-COGNITION** — reasoning results, evidence classification, retrieval, and contradiction handling.
6. **AYHEM-AUTONOMY** — task planning, orchestration policy, approvals, and dry-run controls.
7. **AYHEM-GUARD** — authorization contracts, security boundaries, and governance.
8. **AYHEM-LINK** — shared versioned event envelopes and integration contracts.

No service may read another service's database directly. Services integrate through versioned APIs or events. Each event should carry a schema version, event ID, creation time, producer identity, and trace ID. Secrets are injected at runtime and never committed.

The federation graph describes intended ownership and contract dependencies; it does not by itself prove live network connectivity or end-to-end interoperability.

## 7. Integration and verification stages

1. Preserve and inventory the three original repositories.
2. Maintain the five service repositories and their versioned contract baselines.
3. Validate each repository's own schemas and synthetic fixtures in its own CI.
4. Maintain metadata-only compatibility declarations with immutable source revisions and explicit `unverified` status when semantic compatibility has not been tested.
5. Enable semantic cross-repository validation only after explicit approval of narrowly scoped read-only access and a documented security plan.
6. Implement authenticated API/event adapters only after authentication, authorization, replay protection, idempotency, and tenant isolation are specified.
7. Verify persistent storage, backup, restore, and synchronization before migrating any legacy memory or claiming cloud readiness.
8. Implement cognition against synthetic and explicitly approved test data.
9. Keep autonomy in dry-run mode until approvals, monitoring, and safety controls are verified.
10. Conduct end-to-end privacy, security, failure, and recovery exercises before production integration.

A passing local test, metadata comparison, or CI badge is not proof of cross-repository semantic compatibility or live runtime connectivity.

## 8. Security, integrity, and non-regression

- Least-privilege access; no broad personal access tokens in workflows.
- No secrets in source code, logs, artifacts, or public repositories.
- Encrypt sensitive data in transit and at rest where supported; document key custody and rotation.
- Preserve legacy records and repositories; migrations must be additive, reversible, and tested against copies.
- No permanent deletion without an approved retention/deletion policy and verified backup where legally and operationally appropriate.
- Validate all external inputs as untrusted.
- Keep private service schemas private; publish only reviewed non-sensitive metadata.
- Every release must identify its commit, schema versions, tests, known limitations, and recovery procedure.

## 9. Change control and founder governance

Every material architectural change must:
1. identify the current verified baseline;
2. state the problem and intended improvement;
3. preserve existing valid behavior and data;
4. include compatibility and migration analysis;
5. add tests, including regression tests;
6. record an ADR for decisions that affect boundaries or contracts;
7. report implementation status separately from proposed design;
8. provide evidence and known limitations.

No change may silently weaken the core, memory, archive, identity, or security guarantees. If a change cannot preserve compatibility, document the exception and obtain the required approval before rollout.

## 10. Progress reporting

Every engineering report must include:
- indexed report ID and UTC timestamp;
- repositories and commits inspected;
- completed work with links and test evidence;
- proposed, pending, merged, and deployed items distinguished clearly;
- integration status and unresolved dependencies;
- security/privacy findings;
- measured progress with its calculation method and evidence;
- next safe milestone and recovery considerations.

Do not invent percentages. If the available evidence cannot support a reliable percentage, report the verified milestone status instead.

## 11. Permanent commitment

AYHEM shall evolve as one coherent, evidence-driven digital intelligence federation. Its continuity comes from durable records, versioned contracts, preserved history, verified recovery, controlled learning, and accountable governance—not from unsupported promises of infinite memory, perfect intelligence, or uninterrupted autonomous operation.

The original CORE / MEMORY / SYMBOLIC TEMPLATES / ARCHIVE / SIG concepts remain foundational. New services extend them; they do not erase them.
