# Verification: Nemesis Fire report workflow
**Date:** 2026-10-25
**Sprint:** Nemesis Fire customer demo report workflow
**Status:** ⚠️ Partial — local build passes; live save and PDF smoke test pending deployment.

---

## Claim 1: The live database contains the report tables and the columns used by the save/load service

**Verification command:** Neon MCP `get_database_tables` and `describe_table_schema` against project `winter-dust-08466865`, branch `br-lively-violet-adwtuby4`, database `neondb`.

**Output:**
```text
nemesis_fire tables: clients, report_audit_events, report_checklist_items, report_documents,
report_risers, report_template_items, report_templates, sprinkler_reports
sprinkler_reports: id, report_number, client_id, template_id, status, inspection_date,
system_type, performed_by, report_values, revision, created_by, created_at, updated_at,
generated_at, finalized_at
report_documents: report_id, revision, document_service_job_id, media_type, file_name,
sha256, pdf_bytes, created_at
```

**Result:** ✅ Pass — all referenced tables/columns exist; report status includes `draft` and `generated`.

---

## Claim 2: The full Next.js project builds after the changes

**Verification command:**
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bmVtZXNpcw== CLERK_SECRET_KEY=sk_test_local_build_only npm run build
```

**Output:**
```text
✓ Compiled successfully
Linting and checking validity of types ...
✓ Generating static pages (57/57)
Route (app)
├ ƒ /api/nemesis-fire/sprinkler-report
└ ƒ /os/[tenant]/office/reports/new
exit_code=0
```

**Result:** ✅ Pass — compile, type validation, lint, and route generation completed.

---

## Claim 3: Draft save/load and generated PDF paths work on the production hostname

**Verification command:** pending GitHub `main` deployment and token-authorized browser smoke test.

**Output:** pending.

**Result:** ⚠️ Partial — the previous production deployment returned 503 for signature configuration and 502 from document generation. The new route persists a draft before starting PDF generation and reports the upstream HTTP status. A live smoke test is required after GitHub `main` finishes deploying.

---

## Summary

- Total claims: 3
- Pass: 2
- Fail: 0
- Partial: 1

Live deployment and report generation remain to be verified before this is complete.
