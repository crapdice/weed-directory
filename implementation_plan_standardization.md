# Implementation Plan: Illinois Cannabis Data Standardization

This plan outlines the steps to harden the data layer, enforce strict regulatory laws via the **Illinois Cannabis Data Management** skill, and implement high-fidelity UI features.

## Phase 1: Skill & Data Hardening
### 1.1 Data Schema Expansion
Modify `data.json` (in both app and skill resources) to include:
- **`famous_growers_spotlight`**: A new top-level object documenting Master Breeders (e.g., Dustin Shroyer, Zack Bigg, Ben).
- **`social_media`**: A mandatory object for all entries, with strict enforcement for "Craft Growers".
- **Partner Suffixes**: Verify "1906", "Lowell Herb Co.", "Fig Farms", and "UpNorth" are explicitly tagged with `(Partner)`.

### 1.2 Skill "Final Laws" Integration
Update `SKILL.md` to include the **Three Final Laws**:
1. **Law of Parentage**: No brand rendered without its parent licensee.
2. **Law of Disclosure**: `(Partner)` suffix MUST trigger the "Produced by" tooltip.
3. **Law of Presence**: Social media links are mandatory for all Craft Growers.

---

## Phase 2: Automated Validation
### 2.1 Validator Upgrade
Update `scripts/validate_data.py` to:
- Enforce the presence of the `famous_growers_spotlight` object.
- Enforce mandatory `social_media` handles for all cultivators with `license_type: "Craft Grower"`.
- Verify the `(Partner)` suffix on required guest brands.

### 2.2 Execution
Run validation and block all UI updates until `Exit Code 0` is achieved.

---

## Phase 3: UI Integration
### 3.1 Breeder Spotlight Section
- Create a premium "Master Breeders" section in `App.tsx`.
- Implement **Genetic Badges**: High-contrast, interactive chips for famous strains.
- Design: Documentation-style cards with subtle hover glows.

### 3.2 Attribution Layer
- Refine `/sources` to ensure 100% adherence to the TASL standard.
- Link the "Data Accuracy Timestamp" to the last entry in `VERIFICATION_LOG.md`.

### 3.3 Integrity Verification
- Final build check (`npm run build`).
- Cross-reference UI output against the validated `data.json`.

---

## Success Criteria
- [ ] `validate_data.py` returns `0` on the hardened JSON.
- [ ] No member of a Craft Grower list is missing a social handle.
- [ ] All Guest Brands trigger the Regulatory Disclosure tooltip.
- [ ] Breeder Spotlight correctly maps breeders to their signature strains.
