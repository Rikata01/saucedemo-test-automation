# 🧪 SauceDemo Test Automation

A personal QA Automation project built on [SauceDemo](https://www.saucedemo.com), demonstrating real-world testing practices using modern tools and design patterns.

## 📌 About This Project

This project is part of a structured **14-day QA Automation learning program** focused on building practical, job-ready skills. Topics covered include STLC, Test Case Design, POM, API Testing, Performance Testing, and Accessibility Testing.

> **Status:** 🟢 Active — updated regularly as new skills are added

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright + TypeScript | Web UI Automation |
| Page Object Model (POM) | Test architecture pattern |
| Postman | API Testing |
| GitHub Actions | CI/CD pipeline |
| k6 | Performance / Load Testing *(coming soon)* |
| Allure | Test Reporting *(coming soon)* |

---

## ✅ Test Coverage

### Login Tests (`login.spec.ts`)
| Test Case | Description |
|-----------|-------------|
| Valid credentials | Standard user can login successfully |
| Invalid credentials | Error message displayed for wrong user/pass |
| Empty fields | Error message displayed when fields are empty |
| Locked out user | Correct error message shown for locked account |
| Problem user | Login succeeds but UI bugs are noted |

### Cart Tests (`cart.spec.ts`)
| Test Case | Description |
|-----------|-------------|
| Add single item | Item added to cart correctly |
| Add multiple items | Multiple items added and count updates |
| Remove item | Item removed from cart correctly |
| Cart persistence | Cart retains items after navigation |
| Special characters | Boundary test with special char inputs |

### Checkout Tests (`checkout.spec.ts`)
| Test Case | Description |
|-----------|-------------|
| Complete checkout flow | Full purchase flow completes successfully |
| Empty field validation | Error shown when required fields are missing |
| Price calculation | Total price matches sum of items |

> ⚠️ BUG-001 detected — The system allows user to checkout form with Empty field validation

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

## 📋 Test Cases & Bug Reports
[View Test Case Documentation](https://docs.google.com/spreadsheets/d/18EphiQlZ8sJxZU7Gdbc2ieTyk36txAUgZPcUXw7Bjlo/edit?usp=sharing)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Rikata01/saucedemo-test-automation.git
cd saucedemo-test-automation
npm install
npx playwright install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run with HTML report
npx playwright test --reporter=html

# Run specific test file
npx playwright test tests/login.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed
```

### Run API Tests
1. Import `postman/ReqRes_API_Tests.postman_collection.json` into Postman
2. Import `postman/ReqRes_ENV.postman_environment.json` as Environment
3. Set `api_key` variable with your key from [app.reqres.in](https://app.reqres.in)
4. Run Collection

---

## 🔄 CI/CD

Tests run automatically on every push via **GitHub Actions** across Chromium, Firefox, and WebKit.

---
