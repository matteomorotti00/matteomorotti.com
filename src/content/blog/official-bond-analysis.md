---
title: 'Bond Analysis'
description: "Automated Python workflow that consolidates a client’s multi-bank holdings and performs structured analyses across fixed-income and equity segments, delivering faster monthly reporting, improved data accuracy, standardized analytics, and significantly reduced manual effort."
date: 2024-09
authors: ['matteomorotti']
---

## Key Libraries

### **Data manipulation & analysis**
- **pandas** — core engine for reading Excel files, cleaning datasets, merging bank statements, and building the security master.  
- **numpy** — numerical operations, coercing values, handling missing data, and computing weighted metrics.    
- **dateutil.relativedelta / datetime** — date handling, coupon schedules, and managing month-to-month reporting updates.
### **Excel processing & formatting**
- **openpyxl** — reading/writing Excel workbooks, inserting formulas (YIELD, DURATION), formatting cells, generating tables for PPT links, and manipulating sheets.  
- **xlsxwriter** — creating formatted Excel outputs, writing formulas, adjusting styles, and automating table creation. 
### **File handling & system utilities**
- **os / glob** — navigating directories, loading all bank files automatically, deleting temporary outputs, and path management.  
- **re** — text cleanup, pattern extraction, classification of instruments, and harmonization of bank-provided fields.



---

## Problem

The project originated from the need to consolidate and analyze a client’s overall investment position, which was spread across three different accounts and included multiple asset classes—equities, bonds, mutual funds, both equity- and fixed-income-linked structured products, a small allocation to alternatives, and cash or money-market holdings.

The monthly analysis required not only capturing the updated portfolio composition—adding newly acquired positions and removing those no longer held—but also producing detailed metrics for each asset class:

- **Fixed-income & structured notes:**
  - Security-level analytics: *Yield to Maturity (YTM), duration, coupon*.  
  - Portfolio-level metrics: corporate vs. government allocation, currency exposure, weighted-average YTM and duration.

- **Equities:**
  - Security-level dividend tracking.  
  - Portfolio-level analysis: sector, geographic, and currency breakdowns.

This process was highly manual and time-consuming, requiring a unified and automated workflow to deliver accurate consolidated reporting every month.

---

## Solution Overview

The core of the project was the creation of a **centralized security master**—a single dataset containing *all* positions held across the three banking relationships. This master file consolidated every security together with its key attributes, combining:

- **Bank-provided fields:**  
  ISIN, maturity, coupon, next coupon payment date, currency, purchase price, and current price.

- **Bloomberg- and termsheet-derived fields:**  
  credit rating, dividend per share, sector classification, *clean vs. dirty price type* (critical for accurate YTM calculations, especially for structured notes), and all other analytical attributes required for monthly reporting.

Each month, the system compared the securities already stored in the master dataset with those appearing in the newly downloaded bank statements, automatically detecting **new positions**. Newly identified instruments were added and enriched with Bloomberg fields, while existing entries were refreshed with updated analytics (e.g., ratings, dividend forecasts).

A second automated script generated the **fully consolidated portfolio**, merging all accounts into a single Excel output. From this structure, the workflow produced two pre-formatted tables—one for fixed income and structured notes, and one for equities—each including metrics such as YTM (clean/dirty adjusted), duration, maturity, coupon, dividends, and other relevant indicators.

Additional summary tabs provided portfolio-level analytics including weighted-average YTM and duration, and currency and geographic allocation. All outputs were automatically linked to a **pre-configured PowerPoint deck**, ensuring a streamlined and consistent monthly reporting process.

---

## Results

The automation delivered significant improvements in efficiency, accuracy, and process standardization:

- **Time savings:**  
  Previously, maintaining two separate Excel files (fixed income and equities) required extensive manual work. Monthly updates involved multiple XLOOKUP/VLOOKUP operations across bank statements, manual insertion of new securities, and removal of those no longer held.  
  With the automated workflow and live links between Excel and PowerPoint, the monthly update time decreased from **≈ 4 hours to ~30 minutes**, limited to reviewing outputs and running sample checks.

- **Higher data quality:**  
  Structured bonds often lacked complete Bloomberg data, and Bloomberg frequently did not distinguish between clean and dirty prices—resulting in inconsistent YTM values.  
  The new enriched dataset and pricing logic delivered **more accurate and consistent analytics**, strengthening the reliability of the entire reporting process.

- **Process standardization and transferability:**  
  The standardized workflow made the process **repeatable and easily transferable** across team members. Even colleagues not involved in development can now execute monthly updates safely, without risk of disrupting formulas or misapplying manual steps as in the previous Excel-driven workflow.

---

## Challenges Encountered

- **Clean vs. dirty pricing for YTM calculations**  
  Structured notes report prices inconsistently (clean vs. dirty). Proper YTM computation required dedicated logic to adjust prices correctly and ensure consistent analytics across issuers and data sources.

- **Dual-rating structure in CLN products**  
  Credit-Linked Notes reference both the issuer and the underlying credit. The analytics needed a rule to determine which rating to use. The project adopted a **“worst-rating” rule**, applying the lower of the two ratings for conservative and consistent classification.

- **Sector classification for equity funds**  
  While equities have direct sector tags from Bloomberg, equity funds required a look-through approach. A dedicated dataset captured each fund’s sector allocation with corresponding weights, allowing the code to produce precise portfolio-level sector analytics.

---

## Possible Improvements

- **Reliance on Excel formulas for YTM and Duration**  
  The current workflow computes YTM and Duration by using **openpyxl** to write Excel formulas (e.g., `YIELD`, `DURATION`) directly into the output file.  
  While this approach works, it creates a dependency on Excel’s calculation engine and prevents full automation outside the spreadsheet environment.  
  A more robust improvement would be to:
  - implement custom YTM and Duration functions directly in Python, or  
  - rely on a dedicated fixed-income library such as **QuantLib**,  
  thereby eliminating the need to embed Excel formulas and ensuring full reproducibility and independence from Excel.

- **Direct report generation**  
  The process still depends on Excel–PowerPoint links to assemble the final client report. These connections can occasionally break or require manual refreshing.  
  A next step is enabling the script to **generate a fully formatted PDF report directly**, avoiding fragile inter-application links and enabling a complete end-to-end automated pipeline.

---

