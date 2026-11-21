import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const schema = JSON.parse(await readFile(
  new URL("../../contracts/ai-gateway/v1/contract.schema.json", import.meta.url),
  "utf8",
));
const openapi = await readFile(
  new URL("../../contracts/ai-gateway/v1/openapi.yaml", import.meta.url),
  "utf8",
);

test("AI request contract is bounded and rejects extra properties", () => {
  const request = schema.$defs.AIRequest;
  assert.deepEqual(request.required, ["input"]);
  assert.equal(request.additionalProperties, false);
  assert.equal(request.properties.input.maxLength, 8000);
  assert.equal(request.properties.input.minLength, 1);
});

test("AI response contract requires the stable unit and request identifier", () => {
  const response = schema.$defs.AIResponse;
  assert.deepEqual(response.required, ["unit", "output", "requestId"]);
  assert.equal(response.properties.unit.const, "U01-Σ");
  assert.equal(response.properties.requestId.format, "uuid");
});

test("health contract exposes readiness dependencies", () => {
  const health = schema.$defs.HealthResponse;
  for (const field of ["aiConfigured", "rateLimitConfigured", "originConfigured", "ready"]) {
    assert.ok(health.required.includes(field), `missing health field: ${field}`);
    assert.equal(health.properties[field].type, "boolean");
  }
});

test("OpenAPI document references the same routes, auth and schemas", () => {
  assert.match(openapi, /openapi: 3\.1\.0/);
  assert.match(openapi, /\/health:/);
  assert.match(openapi, /CloudflareAccess/);
  assert.match(openapi, /AIRequest/);
  assert.match(openapi, /AIResponse/);
  assert.match(openapi, /HealthResponse/);
});
