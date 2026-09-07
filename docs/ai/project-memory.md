# PREIshare Project Memory

Updated: 2026-09-06

## Product

PREIshare helps people make better real-estate decisions by turning property and market data into clear intelligence.

## Current stack

- React with the JSX transform
- TypeScript in strict mode
- Vite
- ESLint with `typescript-eslint`, React Hooks, and React Refresh rules
- No database, authentication, TanStack Start, Supabase, or pgvector integration is present in this checkout yet

## Source map

- `src/App.tsx`: current application composition and visible tracker UI
- `src/models`: domain model definitions
- `src/project-tracker`: tracker types, sample data, validation, and public exports
- `src/utils`: reusable project calculations and formatting helpers
- `src/data`: app data fixtures
- `src/sandbox`: exploratory examples; do not treat these as production APIs
- `docs/onboarding`: team workflow and orientation notes

## Domain facts

`Project` currently requires `id`, `name`, `owner`, `status`, and non-negative `estimateHours`; `notes` is optional. The current `ProjectStatus` union is `planned | active | done`. The validator accepts unknown input and returns either a validated project or a list of errors.

The UI currently references `blocked` and `tags`, which are not present in the current shared `Project` type. Treat that as an existing model/UI mismatch and confirm the intended contract before changing it.

## Contribution workflow

Contributors work from a fork on a feature branch, keep the change small, open a pull request, and describe verification steps. Do not add secrets, real customer/property data, or unrelated refactors.

## Verification

Use `npx tsc -b` for TypeScript/build validation and `npx eslint .` for lint validation. The current `package.json` does not define npm scripts, so direct commands are the dependable baseline until scripts are intentionally added.
