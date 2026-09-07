# PREIshare AI development guidance

## Project context

PREIshare is a real-estate intelligence web app. The repository currently uses React, TypeScript, and Vite. The longer-term product direction described in `docs/onboarding/team-orientation-notes.md` includes TanStack Start, Supabase, PostgreSQL, and pgvector; do not assume those systems exist in the current checkout unless the code or task establishes them.

## Repository conventions

- Keep changes small, reviewable, and scoped to the requested behavior.
- Use strict TypeScript. Preserve `tsconfig.app.json` settings, including `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `noUncheckedSideEffectImports`.
- Prefer existing modules and types over new abstractions. Put shared project-domain behavior in `src/project-tracker` or `src/utils` according to ownership.
- Use `import type` for type-only imports.
- Treat external or unknown values as untrusted. Validate them before constructing a typed `Project`.
- Preserve the discriminated `ProjectStatus` union and update all consumers when it changes.
- Avoid unrelated dependency upgrades, formatting churn, and generated `dist` changes.
- Do not add secrets, production credentials, or real customer/property data.

## Working and verification

- Read the nearest implementation and test/call site before editing.
- Run a focused check after each substantive change. At minimum, use `npx tsc -b` for TypeScript changes and `npx eslint .` for lint-sensitive changes.
- Inspect the final diff and report any pre-existing failures separately from failures introduced by the change.
- The package currently has no reliable npm scripts; use the direct `npx` commands above unless scripts are added deliberately.
- Work on a feature branch and use the fork/PR workflow described in `docs/onboarding/team-orientation-notes.md`. Never push directly to the upstream team repository.

## Current known context

- `src/project-tracker/types.ts` defines `planned`, `active`, and `done` statuses.
- `src/App.tsx` currently references `blocked` and project `tags`, so typecheck may expose existing model/UI drift. Do not silently broaden the model just to make an unrelated task pass; confirm the intended product behavior first.
- `docs/ai/project-memory.md` is the maintained project context. Update it when a durable architectural or workflow decision is made.
