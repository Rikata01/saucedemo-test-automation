# 🧪 SauceDemo Test Automation

![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

A personal QA Automation portfolio built on [SauceDemo](https://www.saucedemo.com), demonstrating real-world testing practices using modern tools and industry-standard design patterns.

---

## 📌 About This Project

This project is part of a structured **QA Automation learning program** focused on building practical, job-ready skills. Topics covered include STLC, Test Case Design, Page Object Model, API Testing, Performance Testing, and Accessibility Testing.

---

## ⚡ Key Features

- **Page Object Model (POM)** — Maintainable and scalable test architecture
- **Cross-browser Testing** — Chromium, Firefox, and WebKit
- **CI/CD Integration** — Automated test runs on every push via GitHub Actions
- **API Testing** — Full CRUD coverage with Postman
- **Bug Tracking** — Documented bug reports with screenshots and automated verification

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

## 📂 Project Structure

```
saucedemo-test-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline
├── docs/
│   └── bug-reports/             # Bug reports & Documentation
│       ├── assets/
│       │   └── BUG-001-screenshot.png
│       └── BUG-001.md           # Empty cart checkout bug
├── pages/                       # Page Object classes (POM)
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   ├── LoginPage.ts
│   └── product/                 # Data constants & locators
│       └── productData.ts
├── postman/                     #API Test with Postman
│   ├── ReqRes API Tests.postman_collection.json
│   └── ReqRes ENV.postman_environment.json
├── tests/                       # Test scripts (.spec.ts)
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── login.spec.ts
├── playwright.config.ts
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
| [BUG-001](docs/bug-reports/BUG-001.md) | System allows checkout with empty cart |

---

## 🐛 Bug Reports

| Bug ID | Title | Severity | Status |
|--------|-------|----------|--------|
| [BUG-001](docs/bug-reports/BUG-001.md) | System allows checkout with empty cart | High | Open |

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

# Run specific test file
npx playwright test tests/login.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# View HTML report
npx playwright show-report
```

### Run API Tests
1. Import `postman/ReqRes API Tests.postman_collection.json` into Postman
2. Import `postman/ReqRes ENV.postman_environment.json` as Environment
3. Set `api_key` variable with your key from [app.reqres.in](https://app.reqres.in)
4. Run Collection

---

## 🔄 CI/CD

Tests run automatically on every push via **GitHub Actions** across Chromium, Firefox, and WebKit.