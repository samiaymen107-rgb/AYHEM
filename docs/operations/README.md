# AYHEM — سجل عمليات الإصلاح والتكامل

هذا الفهرس يوثق عمليات المستودع الأساسي AYHEM. تقارير AYHEM_WEB محفوظة في مستودعها.

## قاعدة التقارير

كل مرحلة تتضمن الهدف، القبول، التغييرات، الاختبارات، حالة النشر، نسبة إنجاز المرحلة، ونسبة تقدم المشروع مع طريقة الحساب والأدلة. لا تُحسب النسبة من عدد الملفات.

## درجات الإثبات

- VERIFIED: تحقق باختبار أو نتيجة GitHub مباشرة.
- IMPLEMENTED: الكود أو التوثيق موجود لكن التحقق لم يكتمل.
- PENDING: ينتظر فحصاً أو إعداداً.
- BLOCKED: توجد عقبة معلومة.
- NOT STARTED: لم يبدأ التنفيذ.

## الفهرس

| التقرير | النطاق | الحالة |
|---|---|---|
| [2026-11-21-025-repository-path-integrity-repair.md](./2026-11-21-025-repository-path-integrity-repair.md) | استعادة ARCHITECTURE.md من اسم ملف معيب وإصلاح فشل checkout وإضافة فحص مسارات | MERGED / PATH CI VERIFIED |
| [2026-11-21-003-web-contract-sync.md](./2026-11-21-003-web-contract-sync.md) | مزامنة العقد مع AYHEM_WEB | CONTRACT SYNCED / CI VERIFIED |
| [2026-11-21-002-ai-gateway-contract-validation.md](./2026-11-21-002-ai-gateway-contract-validation.md) | تصحيح العقد والتحقق المحلي | LOCAL VALIDATION PASSED / CI PENDING |
| [2026-11-21-001-ai-gateway-contract.md](./2026-11-21-001-ai-gateway-contract.md) | عقد AI Gateway V1 | COMMITTED / PENDING integration |
