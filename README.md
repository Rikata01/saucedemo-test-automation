# 🧪 SauceDemo Test Automation

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Allure](https://img.shields.io/badge/Allure-brightgreen?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyeiIvPjwvc3ZnPg==&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![k6](https://img.shields.io/badge/k6-7D64FF?style=for-the-badge&logo=k6&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

A personal QA Automation portfolio built on [SauceDemo](https://www.saucedemo.com), demonstrating real-world testing practices using modern tools and industry-standard design patterns.

---

## 📌 About This Project

This project is part of a structured **QA Automation learning program** focused on building practical, job-ready skills. Topics covered include STLC, Test Case Design, Page Object Model, API Testing, Performance Testing, and Accessibility Testing.

---

## ⚡ Key Features

- **Page Object Model (POM)** — Maintainable and scalable test architecture
- **Cross-browser Testing** — Chromium, Firefox, and WebKit
- **Mobile Testing** — Pixel 5 and iPhone 12 viewports
- **CI/CD Integration** — Automated test runs on every push via GitHub Actions
- **API Testing** — Full CRUD coverage with Postman
- **Allure Reporting** — Rich HTML reports with steps, screenshots, and environment info
- **Bug Tracking** — Documented bug reports with screenshots and automated verification

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright + TypeScript | Web UI Automation |
| Page Object Model (POM) | Test architecture pattern |
| Postman | API Testing |
| Allure Report | Test Reporting |
| GitHub Actions | CI/CD pipeline |
| k6 | Performance / Load Testing |
| axe-core | Accessibility Testing |

---

## 📂 Project Structure

```
saucedemo-test-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
├── allure-results/
│   ├── desktop/                    # Allure raw results (desktop)
│   └── mobile/                     # Allure raw results (mobile)
├── allure-report/
│   ├── desktop/                    # Generated Allure report (desktop)
│   └── mobile/                     # Generated Allure report (mobile)
├── docs/
│   └── bug-reports/                # Bug reports & Documentation
│       ├── assets/
│       │   └── BUG-001-screenshot.png
│       └── BUG-001.md              # Empty cart checkout bug
├── k6/                             # Performance & Load Testing
│   ├── scripts/
│   │   ├── smoke-test.js           # 2 VUs, 1 minute
│   │   ├── load-test.js            # 20 VUs, 5 minutes
│   │   └── stress-test.js          # 100 VUs, 12 minutes
│   └── PERFORMANCE-REPORT.md       # Test results & findings
├── pages/                          # Page Object classes (POM)
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   └── product/
│       └── productData.ts
├── postman/                        # API Test with Postman
│   ├── ReqRes API Tests.postman_collection.json
│   └── ReqRes ENV.postman_environment.json
├── tests/                          # Test scripts (.spec.ts)
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── login.spec.ts
│   └── mobile.spec.ts
├── playwright.config.ts            # Desktop config
├── playwright.config.mobile.ts     # Mobile config
└── README.md
```

---

## ✅ Test Coverage

### Login Tests (`login.spec.ts`)
| Test Case | Description |
|-----------|-------------|
| Login with valid credentials | Standard user can login successfully |
| Login with invalid credentials | Error message displayed for wrong credentials |
| Login with empty fields | Error message displayed when fields are empty |
| Login with locked out user | Correct error message shown for locked account |
| Login with problem user | Login succeeds but UI bugs are noted |

### Cart Tests (`cart.spec.ts`)
| Test Case | Description |
|-----------|-------------|
| TC-CART-001 | Multiple items added and count updates correctly |
| TC-CART-002 | Item removed from cart correctly |
| TC-CART-003 | ⚠️ BUG-001 — System allows checkout with empty cart |
| TC-CART-004 | Cart retains items after navigation |
| TC-CART-005 | Add items and proceed to checkout successfully |

### Checkout Tests (`checkout.spec.ts`)
| Test Case | Description |
|-----------|-------------|
| TC-CHK-001 | Valid checkout information — proceeds to order summary |
| TC-CHK-002 | Empty first name field — error message displayed |
| TC-CHK-003 | Special characters in form fields — system accepts without error |

### Mobile Tests (`mobile.spec.ts`)
| Test Case | Description | Devices |
|-----------|-------------|---------|
| TC-M01 | Login successful on mobile | Pixel 5, iPhone 12 |
| TC-M02 | Important elements visible in mobile viewport | Pixel 5, iPhone 12 |
| TC-M03 | Add to cart — badge updates correctly | Pixel 5, iPhone 12 |
| TC-M04 | Hamburger menu opens and closes correctly | Pixel 5, iPhone 12 |
| TC-M05 | Portrait → Landscape rotation does not break layout | Pixel 5, iPhone 12 |
| TC-M06 | Slow 3G Network — page still usable | Pixel 5 (CDP/Chromium only) |

> TC-M06 runs on Chromium only. CDP (Chrome DevTools Protocol) is not supported on WebKit/Safari — this is a known Playwright limitation.

### Performance Tests (k6 — test.k6.io)
| Scenario | VUs | Duration | p95 | Error Rate | Result |
|----------|-----|----------|-----|------------|--------|
| Smoke Test | 2 | 1m | 291ms | 0% | ✅ PASS |
| Load Test | 20 | 5m | 299ms | 0% | ✅ PASS |
| Stress Test | 100 | 12m | 302ms | 0% | ✅ PASS |

> Full report → [PERFORMANCE-REPORT.md](k6/PERFORMANCE-REPORT.md)

### Accessibility Tests (`tests/accessibility/a11y.spec.ts`)
| Test Case | Page Tested | Status |
|-----------|-------------|--------|
| TC-A11Y-001 | Login Page | ✅ PASS |
| TC-A11Y-002 | Product Listing | ❌ FAIL (1 Critical) |
| TC-A11Y-003 | Product Detail | ✅ PASS |
| TC-A11Y-004 | Cart Page | ✅ PASS |

> Full report → [ACCESSIBILITY-REPORT.md](docs\ACCESSIBILITY-REPORT\ACCESSIBILITY-REPORT.md)

### API Tests (Postman — ReqRes API)
| Test Case | Method | Endpoint |
|-----------|--------|----------|
| Get users list | GET | `/api/users?page=2` |
| Get single user | GET | `/api/users/1` |
| Get non-existent user | GET | `/api/users/999` |
| Create user | POST | `/api/users` |
| Update user | PUT | `/api/users/2` |
| Delete user | DELETE | `/api/users/2` |
| Login success | POST | `/api/login` |
| Login missing password | POST | `/api/login` |

---

## 📋 Quality Documentation

| Document | Description |
|----------|-------------|
| [Test Cases & Strategy](https://docs.google.com/spreadsheets/d/18EphiQlZ8sJxZU7Gdbc2ieTyk36txAUgZPcUXw7Bjlo/edit?usp=sharing) | Full test case documentation with expected results |
| [Performance Report](k6/PERFORMANCE-REPORT.md) | k6 load test results — smoke, load, stress |
| [Accessibility Report](docs\ACCESSIBILITY-REPORT\ACCESSIBILITY-REPORT.md) | axe-core WCAG 2.1 AA scan results |

---

## 🐛 Bug Reports

Bug reports are tracked in the [Test Cases & Strategy Sheet](https://docs.google.com/spreadsheets/d/18EphiQlZ8sJxZU7Gdbc2ieTyk36txAUgZPcUXw7Bjlo/edit?usp=sharing).

> `BUG-001.md` in this repo is an **example of bug report format only** — not an active bug tracker. All active bugs are documented in the Sheet above.

| Bug ID | Title | Severity | Status |
|--------|-------|----------|--------|
| [BUG-001](docs/bug-reports/BUG-001.md) | System allows checkout with empty cart | High | Open |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Java 17+ (required for Allure CLI)

### Installation

```bash
git clone https://github.com/Rikata01/saucedemo-test-automation.git
cd saucedemo-test-automation
npm install
npx playwright install
```

### Run Tests

```bash
# Run all desktop tests
npx playwright test

# Run specific test file
npx playwright test tests/login.spec.ts

# Run mobile tests
npx playwright test --config=playwright.config.mobile.ts

# Run in headed mode (see browser)
npx playwright test --headed

# View Playwright HTML report (desktop)
npx playwright show-report playwright-report-desktop

# View Playwright HTML report (mobile)
npx playwright show-report playwright-report-mobile
```

### Allure Reports

> Requires Java 17+ — download from [Adoptium](https://adoptium.net)

```bash
# Generate and open desktop Allure report
npx allure generate allure-results/desktop --clean -o allure-report/desktop
npx allure open allure-report/desktop

# Generate and open mobile Allure report
npx allure generate allure-results/mobile --clean -o allure-report/mobile
npx allure open allure-report/mobile
```

Allure reports include:
- ✅ Test steps in human-readable format
- ✅ Severity labels and ownership metadata
- ✅ Screenshots on failure (automatic)
- ✅ Video recordings on failure
- ✅ Environment information (OS, Node version, project details)
- ✅ Separate reports for desktop and mobile

### Run Performance Tests

> Requires [k6](https://k6.io/docs/get-started/installation/)

```bash
# Smoke test — 2 VUs, 1 minute
k6 run k6/scripts/smoke-test.js

# Load test — 20 VUs, 5 minutes
k6 run k6/scripts/load-test.js

# Stress test — 100 VUs, 12 minutes
k6 run k6/scripts/stress-test.js
```

### Run API Tests
1. Import `postman/ReqRes API Tests.postman_collection.json` into Postman
2. Import `postman/ReqRes ENV.postman_environment.json` as Environment
3. Set `api_key` variable with your key from [app.reqres.in](https://app.reqres.in)
4. Run Collection

---

## 🔄 CI/CD

Tests run automatically on every push via **GitHub Actions** across Chromium, Firefox, and WebKit.