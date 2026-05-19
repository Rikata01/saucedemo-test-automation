# Performance Test Report — k6

**Tool:** k6 v2.0.0-rc1  
**Target:** https://test.k6.io (Public Performance Testing Sandbox)  
**Execution:** Local CLI  
**Date:** 2026-05-19

---

## Test Scenarios

| Scenario | VUs | Duration | Strategy |
|----------|-----|----------|----------|
| Smoke Test | 2 | 1m | Constant — verify script works |
| Load Test | 20 | 5m | Ramp-up → Steady → Ramp-down |
| Stress Test | 100 | 12m | Multi-stage escalation to find limits |

**Think Time:** Randomized `sleep(1–3s)` per iteration to simulate realistic user behavior.

---

## Thresholds (SLA Criteria)

| Metric | Criteria |
|--------|----------|
| `http_req_duration` p95 | < 2000ms (Load) / < 3000ms (Stress) |
| `http_req_duration` p99 | < 3000ms |
| `http_req_failed` | < 1% (Smoke) / < 5% (Load) / < 10% (Stress) |

---

## Results Summary

| Scenario | VUs | avg (ms) | p95 (ms) | p99 (ms) | Error Rate | Throughput | Result |
|----------|-----|----------|----------|----------|------------|------------|--------|
| Smoke | 2 | 157ms | 291ms | — | 0% | 2.97 req/s | ✅ PASS |
| Load | 20 | 162ms | 299ms | 308ms | 0% | 13.76 req/s | ✅ PASS |
| Stress | 100 | 165ms | 302ms | — | 0% | 53.56 req/s | ✅ PASS |

---

## Key Findings

1. **No performance degradation under load** — p95 increased by only 11ms despite a 50x increase in VUs (2 → 100).
2. **Zero errors across all scenarios** — error rate remained at 0% throughout smoke, load, and stress tests.
3. **Linear throughput scaling** — throughput scaled from 2.97 to 53.56 req/s proportionally with VU increase.

---

## Scripts

| File | Scenario |
|------|----------|
| `scripts/smoke-test.js` | 2 VUs, 1 minute |
| `scripts/load-test.js` | 20 VUs, 5 minutes, 3 stages |
| `scripts/stress-test.js` | 100 VUs, 12 minutes, 5 stages |