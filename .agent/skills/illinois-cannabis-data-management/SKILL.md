---
name: Illinois Cannabis Data Management
description: Enables accurate management, display, and filtering of Illinois cannabis cultivation and brand data, ensuring strict hierarchy and preventing hallucinations.
---

# Skill: Illinois Cannabis Data Management

## Description
This skill enables the agent to accurately manage, display, and filter Illinois cannabis cultivation and brand data. It ensures a strict hierarchy between licensed cultivators and their retail brands to prevent data hallucinations in the UI.

## Context & Ground Truth
- **Data Source:** Refer to `data.json` in the `resources` directory for all cultivator/brand mappings.
- **Region:** Illinois (IDOA regulated).
- **Date Validity:** Information is current as of February 2026.

## Logic & Rules
### 1. Data Hierarchy
- **Strict Mapping:** A "Brand" must always be nested under its "Cultivator." 
- **Display Rule:** When a user selects or searches for a brand (e.g., "Ozone"), the UI must prominently display the 'cultivator' name in the sub-header (e.g., "Licensed Cultivator: [Name]"). This link must be visible on every instance of the brand.
- **MSO vs Craft:** Distinguish clearly between "Cultivation Centers" (Large MSOs) and "Craft Growers" in all filters and category labels.
- **Routing Rule:** Whenever a 'Partner' brand tooltip is hovered in the UI, include a small 'Learn More about our Sources' link that directs the user to the `/sources` attribution page.

### 2. Branding Guidelines
- **Primary Labels:** Use the `name` field from `data.json` for headers.
- **Sub-labels:** Use the `brands` array for tags or chips in the UI.
- **Partner Brands:** For brands like "Cookies" or "93 Boyz," display them as "Produced by [Licensee Name]" to satisfy regulatory transparency.

### 3. Handling "Head Growers"
- **Public Visibility:** Only display the `head_grower` field if it contains a specific name (e.g., Dustin Shroyer, Ben). 
- **Privacy Rule:** If the value is "Not Publicly Listed," do not show the field in the front-end UI; keep it for internal metadata only.

### 4. Breeder Spotlight Logic
- **Genetic Linkage:** When displaying a 'Famous Strain,' the UI must include the `specialization` of the head grower to justify its 'Legendary' status.
- **Cross-Referencing:** If a user searches for a strain in `legendary_strains`, Antigravity should automatically highlight the parent `cultivator` card on the landing page.
- **UI Tooltip:** Strains in the `legendary_strains` array should trigger a secondary 'Grower Notes' tooltip containing the `profile` text.

## UI/UX Protocol: SEO Directory (Zero-Scroll)
- **Layout:** 3-column grid, text-heavy, category-based.
- **Palette:** Background `#0A0A0A`, Headers `Hot Pink` (#FF69B4), Links `Lime Green` (#32CD32), Sub-text `#666666`.
- **Interaction:** No scrolling allowed for the main directory core. Use 'Glassmorphism' hover-previews for deep brand data.
- **Typography:** 12px System-Mono (Courier/SF Mono) for directory links. 1px solid borders for category containment.

## Data Branding Laws
- **Partner Suffix:** `(Partner)` is mandatory in `market-data.json` for 3rd-party brands.
- **Visual Trigger:** `(Partner)` must render as a 'Vintage Quality Stamp' in the preview window.
- **Validation:** Always run `python scripts/validate_data.py` before any UI refactor.
- **Category Logic:** Map `license_type` to top-level directory categories.

## 3. The "Spotlight" Component Prompt
Use this prompt when generating the Breeder Spotlight UI:
"Create a high-fidelity documentation-style grid for the 'Master Breeders'. Each card should feature a high-contrast portrait (or icon), their 'Legendary Strains' as interactive genetic badges, and a specialization tag. Hovering a strain badge should reveal the breeder's 'Grower Notes' tooltip."

## UI/UX Protocol: SEO Directory (Zero-Scroll)
- **Layout:** 3-column grid, text-heavy, category-based.
- **Palette:** Background `#0A0A0A`, Headers `Hot Pink` (#FF69B4), Links `Lime Green` (#32CD32), Sub-text `#666666`.
- **Interaction:** No scrolling allowed for the main directory core. Use 'Glassmorphism' hover-previews for deep brand data.
- **Typography:** 12px System-Mono (Courier/SF Mono) for directory links. 1px solid borders for category containment.

## Data Branding Laws
- **Partner Suffix:** `(Partner)` is mandatory in `market-data.json` for 3rd-party brands.
- **Visual Trigger:** `(Partner)` must render as a 'Vintage Quality Stamp' in the preview window.
- **Validation:** Always run `python scripts/validate_data.py` before any UI refactor.
- **Category Logic:** Map `license_type` to top-level directory categories.

## Agent Constraints (Do Not Hallucinate)
- **DO NOT** assume a brand belongs to a cultivator if it is not explicitly mapped in `data.json`.
- **DO NOT** suggest that MSO brands are "Craft" or vice versa.
- **DO NOT** create "master grower" names for facilities where they are listed as "Not Publicly Listed."

## Example Agent Task
"Build a 3-column SEO link directory. Each column represents a license_type. Each row is a cultivator link in Lime Green. Hovering reveal a Hot Pink background with a floating brands list."

## Verification Rule
Before deploying any UI changes or updating the master list, run the validation script: `python scripts/validate_data.py data.json`. If it returns a non-zero exit code, do not proceed with the build and report the specific errors to the user.

## Sources & Attributions
To maintain legal and market accuracy, this skill cross-references the following authoritative bodies. Use these citations for UI footers and data transparency.

### 1. Primary Regulatory Source
- **Entity:** Illinois Department of Agriculture (IDOA)
- **Data Point:** License Status, Facility Locations, Parent Entity Names.
- **Reference:** [IDOA Cannabis Licensee Directory (2026)](https://agr.illinois.gov/cannabis.html)
- **Usage:** Legal verification of "Cultivation Center" vs. "Craft Grower" status.

### 2. Market & Branding Source
- **Entity:** Illinois Cannabis Training Center (ICTC)
- **Data Point:** Brand-to-Cultivator Mapping, Industry Leadership.
- **Reference:** [ICTC Illinois Cultivator Database](https://www.illinoiscannabistrainingcenter.com/cultivators-database)
- **Usage:** Mapping consumer labels (e.g., "Rythm") to licensees (GTI).

### 3. Retail Performance Source
- **Entity:** Headset.io
- **Data Point:** Brand Popularity, Product Categories, Market Share.
- **Reference:** [Headset Illinois Market Real-Time Data](https://www.headset.io/markets/illinois)
- **Usage:** Identifying active vs. defunct brands based on retail availability.

### 4. Wholesale Inventory Source
- **Entity:** Leaf Trade
- **Data Point:** Current Product Catalogs, White-Label Partnerships.
- **Reference:** [Leaf Trade Wholesale Marketplace](https://leaf.trade/)
- **Usage:** Verifying which cultivators are currently producing third-party "Guest Brands."