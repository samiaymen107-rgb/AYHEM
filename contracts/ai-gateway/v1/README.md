# AI Gateway Contract V1

This directory is the canonical, versioned interface definition for the AYHEM AI gateway.

- `openapi.yaml`: HTTP routes, authentication, response codes, and OpenAPI schemas.
- `contract.schema.json`: machine-readable JSON Schemas for request, response, health, and error payloads.

Compatibility rules:
- Additive optional response fields may be introduced within V1.
- Do not change route names, required fields, enum/const values, or authentication semantics incompatibly in V1.
- Breaking changes require a new version directory (for example, `v2/`) and a migration plan.
- Every contract change must update tests and produce an operation report.
