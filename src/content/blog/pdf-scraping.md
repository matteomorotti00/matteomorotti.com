---
title: 'PDF Scraping'
description: "Python-based workflow that parses UBS account statements in PDF format, reconstructs end-of-month client portfolios (AUM, allocations, FX and gold exposure) and generates pre-filled Outlook emails with attached statements, replacing manual end-of-month summaries with a faster and more reliable process."
date: 2025-02
authors: ['matteomorotti']
---

# Monthly Portfolio Snapshot Automation — UBS PDF Statements

## Key Libraries

**PDF parsing & table extraction**  
- **PyPDF2** — reading UBS account statements, iterating pages, and extracting raw text lines used to locate valuation dates and performance fields.  
- **tabula** — parsing entire tables directly from PDFs when the statement layout allows structured extraction (positions, cash accounts, FX tables).

**Data manipulation & calculations**  
- **pandas** — central data layer for structuring scraped holdings, portfolio-level metrics, currency and asset class aggregations, and lookups across auxiliary tables.  
- **numpy** — rounding logic that preserves 100% totals in allocation tables.  
- **math** — controlled rounding for market values in reference currency.

**Excel integration**  
- **openpyxl** — reading configuration files (reference dates, month labels) and supporting lookup tables used during report generation.

**Email automation**  
- **win32com.client (Outlook)** — creation of HTML emails, population of client-specific metrics in a narrative template, and automatic attachment of the correct PDF statement for each client.

**File & runtime utilities**  
- **os / pathlib** — dynamic user paths, directory traversal, file renaming and matching between downloaded PDFs and client portfolios.

---

## Problem

➡️ **Manual monthly extraction of client KPIs for end-of-month summaries**  
- Each month, the team had to  manually extract from account statements (for **client-facing end-of-month recap emails**):  
  - total AUM and reference currency  
  - YTD performance (percentage and absolute)  
  - asset class split (equity, bonds, liquidity, commodities, alternatives)  
  - FX allocation (EUR, CHF, USD, GBP, CAD).  
- These summaries were required **for every client**, always with the same structure and same KPIs.

➡️ **Error-prone copy–paste into client emails**  
- Numbers were copied from PDFs into Outlook emails.  
- After a **careful read-through**, almost every monthly batch still contained **around two errors** on average (incorrect signs, mismatched totals, wrong percentages).

➡️ **High time consumption for a repetitive client communication**  
- Completing all end-of-month portfolio snapshots took **~1h 30min**, largely spent on:  
  - locating values inside PDFs  
  - recalculating percentages  
  - retyping nearly identical narratives.

**To sum up:**  
- Repetitive PDF extraction → slow and fragile.  
- Manual copying → errors detected only after careful re-reading.  
- Monthly client communication with a fixed structure → ideal for automation.

---

## Solution Overview

➡️ **PDF-driven extraction of portfolio KPIs**  
- UBS statements are downloaded and **automatically renamed** based on a mapping between portfolio number and client name.  
- Parsing is performed through:  
  - **PyPDF2** for free-text extraction (performance, currency, valuation date)  
  - **Tabula** for structured table extraction (holdings, cash positions, FX tables)  
- This allows the script to rebuild all necessary KPIs **directly from the PDF**, removing manual interpretation.

➡️ **Automated aggregation of AUM, FX and asset class splits**  
- All positions and cash entries are consolidated into a clean DataFrame 
- The script computes:  
  - **AUM in reference currency**  
  - **Asset class split**  
  - **FX exposure**  
  - **Gold allocation**  
- Rounding rules ensure every table sums to **exactly 100%**, ready for client-facing reporting.

➡️ **Automatic generation of tailored end-of-month client emails (Outlook)**  
- For each client, the script prepares an **HTML Outlook draft** summarizing:  
  - AUM + YTD return (absolute + percentage)  
  - equity vs bond exposure  
  - liquidity level
  - commodities/gold exposure  
  - natural-language FX breakdown  
- The correct **UBS PDF** is attached automatically, and drafts are opened for quick final validation.

---

## Results

* **Efficiency:** processing time dropped from **~1h 30min** to **~20 minutes**, now limited to spot checks.  
* **Error reduction:** where previously each batch contained **on average two errors** (despite careful proofreading), the automated pipeline drastically reduces mistakes thanks to unified extraction and calculation logic.  
* **Consistency across clients:** all summaries follow the same structure, same calculations, and same formatting — improving the quality of the monthly communication.  
* **Scalability:** adding new clients is as simple as dropping their PDF into the folder

---

## Challenges Encountered

* **Parsing semi-structured PDF statements**  
  - UBS PDFs combine tables with irregular free text.  
  - PyPDF2 was used to locate volatile items (performance), while Tabula handled table-like structures.

* **Robust extraction of YTD performance**  
  - Variations in spacing and minus signs required custom logic to reliably capture the `%` return.

* **Stable matching of PDFs to portfolios**  
  - Initial file names are technical; mapping ensures the correct PDF attaches to the correct client every time.

* **Reconciling percentages with AUM**  
  - Asset class, FX, and gold exposures must exactly match total AUM.  
  - Additional rounding checks and correction rules were implemented.

---

## Possible Improvements

**End-to-end scheduling & logging**  
Add automated runs, logs, and alerts for:  
- missing PDFs  
- failed parsing  
- unexpected numbers.

**Optional auto-send & archiving**  
Shift from Outlook drafts to fully automated sending, with secure archiving and KPI storage for historical trend analysis.
