# Antigravity Issues Log

This log acts as a persistent memory for technical hurdles, build errors, and UI/UX edge cases encountered during the development of the Illinois Marijuana project.

## 🛠️ Resolved Issues

| Date | Issue Description | Component | Root Cause | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| 2026-02-01 | PowerShell `&&` Token Error | CLI / Scripting | Using bash-style `&&` in a Windows PowerShell environment. | Replaced `&&` with `;` for sequential command execution. |
| 2026-02-01 | Build Error: Unused Import | `App.tsx` | `Filter` icon was imported but never used in the component. | Removed unused import to satisfy strict TypeScript build rules. |
| 2026-02-01 | `replace_file_content` Failures | Tooling | Target content was non-unique or the range was miscalculated. | Refined the range and ensured `TargetContent` included unique surrounding whitespace/context. |
| 2026-02-01 | JSON Structure Mismatch | `validate_data.py` | Initial script expected a different nesting level than the actual `data.json`. | Updated script to a hybrid version targeting the flat `cultivators` array while maintaining strict domain validation. |

## ⚠️ Known / Recurring Issues
- **npm install timeouts**: Occasional network latency causing partial dependency installation.
- **Tailwind v4 @theme**: Syntax is sensitive to CSS comment placement; ensure custom tokens are placed within the correct block.

---
*Last Updated: 2026-02-01 10:45 AM*
