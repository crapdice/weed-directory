---
name: Illinois Cannabis Data Management
description: Enables accurate management, display, and filtering of Illinois cannabis cultivation and brand data, ensuring strict hierarchy and preventing hallucinations.
---

# Skill: Illinois Cannabis Data Management

## Description
This skill enables the agent to accurately manage, display, and filter Illinois cannabis cultivation and brand data. It ensures a strict hierarchy between licensed cultivators and their retail brands.

## Context & Ground Truth
- **Data Source:** `src/data/market-data.json`.
- **Region:** Illinois (IDOA regulated).
- **Date Validity:** February 2026.

## UI/UX Protocol: SEO Portal (Late 1990s)
- **Aesthetic:** Raw, structural, high-density link directory. 
- **Layout:** 3-column category grid. All data is flat and visible by default.
- **Palette:** Background `#000000`, Headers `Hot Pink` (#FF00FF), Links `Lime Green` (#00FF00), Sub-text `#555555`.
- **Typography:** System-Mono / Sans-Serif (MS Sans Serif, Arial). 1px solid borders.
- **Rules:** No hover previews, no glassmorphism, no "cutesy" or metaphysical verbiage. Use plain English.

## Data Branding Laws
- **Strict Hierarchy:** A brand must always be associated with its licensed cultivator in every display instance.
- **Partner Suffix:** `(Partner)` is mandatory for 3rd-party brands and must be highlighted in `Hot Pink` italic text.
- **Privacy Policy:** Do not display "Lead/Head Grower" if listed as "Not Publicly Listed."
- **Validation:** Always run `python scripts/validate_data.py src/data/market-data.json` before deployment.

## Agent Constraints
- **NO HALLUCINATIONS:** Only use mappings found in `market-data.json`.
- **NO STYLING DRIFT:** Do not add modern gradients, shadows, or rounded corners unless specifically asked to break the 90s theme.

## Verification Rule
Deployments must pass the automated gate: `python scripts/validate_data.py`. Non-zero exit codes block the build.