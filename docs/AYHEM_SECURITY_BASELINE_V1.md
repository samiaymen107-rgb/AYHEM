# AYHEM Security Baseline v1

## Protect
- Provider API credentials and platform tokens
- Personal and family records
- Memory exports and backups
- GitHub installation and deployment permissions
- Approval and audit records

## Required controls
- Keep credentials out of Git, issues, logs, browser bundles, and chat.
- Use managed secret bindings on the server runtime.
- Rotate any credential that has appeared in source or logs.
- Use least privilege and separate development from production.
- Validate request method, content type, size, and schema.
- Apply rate limits, quotas, and provider spending alerts.
- Avoid rendering model/user text as raw HTML.
- Use explicit output encoding and a restrictive Content Security Policy.
- Encrypt sensitive data at rest and in transit.
- Require authenticated access for private memory operations.
- Log metadata and outcomes, not secrets or unnecessary personal content.
- Test backup restoration and document recovery steps.

## Incident handling
1. Disable or revoke the exposed credential at its issuer.
2. Issue a replacement and store it only in the managed secret store.
3. Review logs and provider usage for suspicious activity.
4. Remove the secret from current source and prevent reintroduction.
5. Consider repository history cleanup separately; coordinate it because history rewrites affect collaborators and forks.
6. Record the incident, response, and verification without copying secret values.

## Release gate
Do not deploy to production until security checks, automated tests, restore verification, rate limiting, and rollback procedures are complete.
