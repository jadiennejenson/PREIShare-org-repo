---
name: PREIshare source conventions
description: Apply when editing React, TypeScript, domain, utility, or styling files in PREIshare source code.
applyTo: "src/**/*.{ts,tsx,css}"
---

# PREIshare source conventions

- Keep components focused on rendering and interaction; keep project calculations and validation in `src/utils` or `src/project-tracker`.
- Reuse the domain types in `src/models` and `src/project-tracker` instead of duplicating object shapes.
- When changing a union, validator, or shared utility, inspect and update its callers in the same change.
- Keep TypeScript strictness intact. Do not use `any`, suppressions, or non-null assertions to bypass an unresolved model mismatch.
- For unknown input, narrow with a type guard or the existing validation helpers before using it.
- Match the existing lightweight Vite app structure and CSS approach unless the task explicitly requests a new UI system.
- Prefer accessible semantic HTML and stable keys for rendered collections.
- Validate source changes with `npx tsc -b`; run `npx eslint .` when touching TypeScript/TSX or lint configuration.
- Summarize changed files, verification commands, and any remaining contract or product questions in the PR description.
