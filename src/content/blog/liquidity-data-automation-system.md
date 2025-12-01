## General Info  

**Year:** 2025  
**Role:** Junior Portfolio Manager  


**Abstract**
Python-based automation that centralizes clients' cash balances from multiple banks, adjusting for pending trades and temporarily unbooked OTC structured products delivering a unified liquidity report that eliminates manual reconciliation and improves accuracy, operational efficiency and higher quality investment decisions.

---
## Key Libraries

**Data manipulation**
- **pandas** — core library for reading Excel/CSV exports, cleaning data, and merging datasets.  
- **numpy** — numeric computations such as percentages and derived metrics.

**Excel processing**
- **openpyxl** — creation of the final liquidity report and preservation of formulas/formatting when needed.

**File handling & utilities**
- **glob / os** — automated file discovery (latest exports, pattern-based selection).  
- **re** — text cleaning and pattern extraction (ISINs, account IDs, currencies).  
- **datetime** — date parsing, formatting, and timestamping of generated reports.


---

## Problem


➡️ **Outdated PMS Data**
- The Portfolio Management System (PMS) was updated only with end-of-day data.
- With numerous clients and high intraday trading volumes, the team lacked real-time visibility on available liquidity across currencies.

➡️ **Limitations of E-Banking Data**
- Clients' e-banking platforms showed real-time cash balances only for direct equity and bond trades.
- Monitoring was not feasible across hundreds of clients and multiple custodian banks.
- Mutual fund subscriptions appeared only in separate “pending” transactions sections until settlement, preventing accurate cash consolidation.
- Structured products took several days to be booked, did not appear in pending trades, then temporarily distorted liquidity figures.

**To sum up:**

- PMS provided only previous-day data → no real-time liquidity overview.  
- E-banking fragmented across custodians → impossible to monitor centrally.  
- Mutual fund transactions delayed in pending sections → unreliable cash balances.  
- Structured product transactions not visible until booking → liquidity blind spots.


---

## Solution Overview

➡️ **Data Consolidation Across Multiple Custodian E-Banking Platforms**  
- Gathered and standardized real-time cash balances for every client across all custodian banks into a single unified dataset.  
- Extracted and consolidated all pending transaction sections (mutual funds and other products) to correct real cash availability.  
- Aggregated for each client their money market fund holdings and Asset Under Management (AUM).

➡️ **Centralized Database for Structured Products Transactions**
- Built a dedicated repository (Structured Product Transactions Database) capturing all structured product transactions per client, enabling accurate tracking of liquidity impact
  → *(see project: [Structured Products Monitoring](#))*.

➡️ **Automated Report Generation for Portfolio Decisions**  
- Produced a consolidated **Liquidity Report** summarizing, for each client:  
  - total AUM
  - cash balance automatically adjusted for pending transactions and structured products not yet booked
  - money market exposure  
  - liquidity ratios 
  - automated notes indicating structured product subscriptions/redemptions already reflected in cash
  - automated liquidity-limit checks (e.g., identifying breaches when a client requires a minimum 5% liquidity relative to AUM)
 

---

## Results

* **Operational efficiency:**  reduction of manual time to consolidate daily liquidity data (from >2 h to <30 min). 
* **Data quality:** fewer reconciliation errors thanks to rule-based validation
* **Real-time Liquidity Visibility**: real-time overview of AUM and liquidity per client, enabling faster portfolio actions
- **Higher Quality Investment Decisions**
  Portfolio managers could confidently allocate excess liquidity or plan new investments based on accurate, up-to-date balances.
- **Automated Compliance with Client Liquidity Constraints**  
  Immediate identification of liquidity-limit breaches (e.g., minimum 5% cash vs. AUM), strengthening risk management.


---

## Challenges Ecountered

* **Non-standardized and fragmented data sources** → Data from custodian banks lacked uniformity, and even within the same bank information was often scattered across multiple Excel and CSV files. This required creating a canonical schema and flexible parsers to reliably aggregate and standardize all inputs.
* **Complex reconciliation logic** v1 → encoded business rules for pending trades and multi-currency handling. Moreover, ensuring accurate cash balances required a robust mechanism able to incorporate not-yet-booked structured product transactions—since they are not reflected in the e-banking cash accounts and therefore need to be temporarily added. Once those same transactions become booked and are already included in the e-banking balances, the system must recognize this and stop adjusting the cash, preventing any double counting.
* **Complex reconciliation logic** v2 → encoded business rules for pending trades, multi-currency handling. Moreover, ensuring accurate cash balances required a robust logic to incorporate structured product transactions while preventing double counting once they are booked and therefore already included in the e-banking cash accounts.
* **Heterogeneous data formats across custodians** → Reconciling datasets with different identifiers (e.g., ISIN vs. Valor codes) and structures made standardization and matching of financial instruments complex.


---

## Possible Improvements

**Web-based interface for direct access**  
Develop a dedicated web application to view the Liquidity Report, enabling faster navigation, filtering, and on-demand updates.

**Extension to full asset-class coverage**  
Include additional asset classes other than liquidity (equity, fixed income, alternatives) and calculate their weights relative to AUM. 

**Automated email alerts**
Implement real-time notifications for any asset class breach ensuring immediate awareness without checking the report manually.


---


