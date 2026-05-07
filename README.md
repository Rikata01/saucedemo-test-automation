# 🧪 SauceDemo Test Automation

A personal QA Automation portfolio built on [SauceDemo](https://www.saucedemo.com), demonstrating real-world testing practices using modern tools and design patterns.




## 📌 About This Project

This project is part of a structured **14-day QA Automation learning program** focused on building practical, job-ready skills. Topics covered include STLC, Test Case Design, POM, API Testing, Performance Testing, and Accessibility Testing.

> **Status:** 🟢 Active — updated regularly as new skills are added

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright + TypeScript | Web UI Automation |
| Page Object Model (POM) | Test architecture pattern |
| GitHub Actions | CI/CD pipeline |
| Postman | API Testing *(coming soon)* |
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

---

## 🔄 CI/CD

Tests run automatically on every push via **GitHub Actions** across Chromium, Firefox, and WebKit.

---
