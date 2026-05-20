# ♿ Accessibility (a11y) Testing Report

This report summarizes the automated accessibility testing performed on the SauceDemo web application. The objective is to identify accessibility barriers and ensure the application is usable by everyone, including people relying on assistive technologies like screen readers.

## 🛠️ Tools & Standards Used
- **Automation Framework:** Playwright
- **Accessibility Engine:** `@axe-core/playwright`
- **Target Standard:** WCAG 2.1 (Level A and AA)

---

## 📊 Executive Summary
An automated scan was executed across 4 core pages of the application. 

- **Total Test Cases:** 4
- **Passed:** 3
- **Failed:** 1 🔴
- **Total Violations Found:** 1 (Critical)

| Test Case ID | Page Tested | Status | axe-core Violations |
| :--- | :--- | :--- | :--- |
| TC-A11Y-001 | Login Page (`/`) | ✅ Passed | 0 |
| TC-A11Y-002 | Product Listing (`/inventory.html`) | ❌ **Failed** | 1 Critical |
| TC-A11Y-003 | Product Detail (`/inventory-item.html`) | ✅ Passed | 0 |
| TC-A11Y-004 | Cart Page (`/cart.html`) | ✅ Passed | 0 |

---

## 🐞 Bug Details

### **[BUG-A11Y-001] Missing Accessible Name on Product Sort Dropdown**

- **Rule ID:** `select-name`
- **Impact Level:** 🔴 **CRITICAL**
- **WCAG Reference:** WCAG 4.1.2 (Name, Role, Value)

#### **Issue Description:**
The dropdown menu used for sorting products lacks an accessible name. When a visually impaired user navigates to this element using a Screen Reader (e.g., NVDA, VoiceOver), the software will only announce it as a "Combo box" or "Drop-down menu". The user will have no context that this dropdown is used for sorting products, making the feature completely inaccessible to them.

#### **Element Affected:**
```html
<select class="product_sort_container" data-test="product-sort-container">
  <option value="az">Name (A to Z)</option>
  <option value="za">Name (Z to A)</option>
  ...
</select>
```

#### **How to Fix (Remediation):**
The developer needs to provide an explicit accessible name for the <select> element. The most straightforward solution without breaking the current UI design is to add an aria-label attribute.

**Suggested Code Fix:**

```html
<select class="product_sort_container" data-test="product-sort-container" aria-label="Sort products by">
```
---

## ✅ Conclusion

Automated accessibility scanning identified 1 critical violation on the Product Listing page. 
The remaining 3 pages passed WCAG 2.1 AA checks with no violations detected.

The sort dropdown issue (BUG-A11Y-001) should be prioritized for remediation as it 
completely blocks screen reader users from accessing the sort feature.