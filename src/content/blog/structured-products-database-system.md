---
title: 'Structured Products Database System'
description: "Automating the creation of a single consolidated dataset that integrates all client structured-product transactions, combining trade amounts and product identifiers with full product attributes such as issuer, underlying, maturity, and observation dates. This unified view enables clear monitoring of potential call events and more accurate analysis of exposures across issuers, underlyings, and clients."
date: 2024-07-25
authors: ['matteomorotti']
---

## Problem

- **No integrated mapping between trades and product characteristics**  
  Client-level transaction internal records (that of Liquidity Project) contained structured product trades (with only amounts and product identifier), but this file did **not** include product attributes such as underlying, issuer, maturity, or observation schedule.

- **No centralized database for OTC structured products**   
  Each structured products distributing platform generated separate CSV file with all the trades closed. With dozens of trades per platform, portfolio managers lacked a unified view of maturities, observation dates, issuers, underlying exposures.


**As a result**, the team lacked a single source of truth for structured notes, could not track upcoming maturities or callable events, could not analyze exposure by underlying or client, and struggled to reflect pending structured settlements in liquidity calculations.

---

## Solution

### 1. Multi-platform data extraction and consolidation
Collected structured product datasets exported from all the distributing platforms

Standardized and merged exports into a unified master dataset including:
- ISIN  
- Issuer  
- Underlying  
- Transaction date  
- Value date  
- Observation date(s)  
- Maturity  
- Nominal / trade amount

---

### 2. Merge with client-level transaction database
Through ISIN matching, merged platform product data with internal client-level transaction records (Link al database), producing an enriched dataset linking each trade with full product characteristics (underlying, maturity, observation schedule, issuer, etc.).

---
## Key Libraries

**Excel processing**

- **openpyxl** — lettura e modifica di file Excel (.xlsx), gestione di workbook, worksheet, celle e salvataggio.    

**File handling & environment**

- **os** — gestione dei percorsi, verifica dell’esistenza dei file, costruzione dinamica delle directory.
    
- **getpass** — recupero del nome utente locale per generare percorsi utente-dipendenti.

---

## Results

- Full **visibility** on OTC structured products across platforms and clients.  
- **Proactive management** of maturities, observation dates, and callable events, enabling timely coordination of product rollovers.
- **Exposure analytics** by underlying, issuer, and client

---

## Limitations

- Automatic alerts for upcoming observation/maturity events  
- user friendly dashboards for PMs
- In the long run, Excel-based datasets would be insufficient, requiring a transition to a relational database (e.g., SQL-based systems or Microsoft Access).

---
