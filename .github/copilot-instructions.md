<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this repo -->

# Copilot / AI Agent Instructions — transcribe

Purpose: Help an AI agent be immediately productive in this codebase by explaining the architecture, developer workflows, patterns, and exact file examples to change.

- Big picture
  - Single-page React app built with Vite + TypeScript. Entry: `src/app/App.tsx`.
  - Routes (client router) defined in `src/app/Routes.tsx` — pages include `Home`, `Workspace`, `Help/*`, and `About`.
  - The core interactive feature is the `Workspace` page which composes two major parts:
    - `Mirador` (IIIF viewer) in `src/pages/Workspace/Mirador/*` — renders manuscript canvases.
    - `TranscriptionArea` in `src/pages/Workspace/TranscriptionArea/*` — UI for entering and validating transcriptions.
  - Manifest-driven lessons: lesson data lives in `src/files/manifests.ts`. Add/modify lessons by editing that file (see examples below).

- Key integration points & patterns
  - Mirador config: `src/pages/Workspace/Mirador/config.ts` — windows are injected at runtime by `Mirador/index.tsx`.
  - Mirador -> app communication: `Mirador` subscribes to the Mirador store and extracts `canvasId` to compute current page number (see `specialIndexHandlingStart` / `specialIndexHandlingEnd` fields in `manifests.ts`). If you change how canvas ids look, update the parsing logic in `Mirador/index.tsx`.
  - Transcription validation is centralized in `src/pages/Workspace/TranscriptionArea/validators.ts`. This function normalizes input (removes spaces, normalizes characters like final nu) and returns either `[true, 'correct']` or `[false, <message>]`.
  - Lesson content format: entries in `manifests.ts` follow the `Manifest` type. Each lesson has `manifestId`, `canvasIndex`, optional `specialIndexHandling*`, and `lines: {text, caption?, newConcept?, isTitle?}[]`.

- Project-specific conventions
  - CSS Modules: styles use `.module.scss` files colocated with components (e.g., `src/components/Alert/Alert.module.scss`).
  - Tests live next to implementation files with `.test.tsx` suffix (e.g., `src/pages/Home/Home.test.tsx`). Use Vitest for running tests.
  - Small enums and consts are placed alongside components (e.g., `components/Badge/badge.enum.ts`).
  - Use `react-hook-form` for forms in transcription components (look at `TranscriptionArea` files for examples).

- Developer workflows (exact commands)
  - Install dependencies: `npm install`
  - Local dev (runs Vite server + tsc watch): `npm run start:dev` (this uses `npm-run-all` to run `vite` and `tsc --noEmit --watch` in parallel)
  - Build production bundle: `npm run build`
  - Preview production build: `npm run preview`
  - Run tests: `npm run test` (update snapshots: `npm run test-u`)
  - Lint & format: `npm run lint` and fixes with `npm run lint-fix` (these orchestrate `prettier`, `eslint`, and `stylelint` via `npm-run-all`).

- Files to inspect when making changes
  - App bootstrap: `src/app/App.tsx` and `index.html` (root div id is `app`).
  - Routes: `src/app/Routes.tsx` — add new pages or route params here.
  - Workspace: `src/pages/Workspace/Workspace.tsx` — main orchestration between Mirador and TranscriptionArea.
  - Mirador: `src/pages/Workspace/Mirador/*` — change viewer behavior and canvas parsing here.
  - Lesson data: `src/files/manifests.ts` — add lessons, adjust `canvasIndexToPageNumberAdj`, or provide `specialIndexHandlingStart/End` to parse different manifest id formats.
  - Validation: `src/pages/Workspace/TranscriptionArea/validators.ts` — update rules for answer matching and user feedback.

- Helpful examples and tips
  - To add a lesson: copy an object in `src/files/manifests.ts`, set `manifestId` to the IIIF manifest URL, set the visible `canvasIndex` and provide `lines` (array of `{text, caption?, newConcept?, isTitle?}`).
  - If canvas id extraction fails for a new manifest, add `specialIndexHandlingStart` and/or `specialIndexHandlingEnd` to the manifest entry and Mirador will use them to slice the canvasId string before extracting digits.
  - When changing UI styles, prefer updating the component's `.module.scss` file to avoid global side effects.

  - Unit tests use Vitest; component tests reference DOM via `@testing-library/*` packages. Look for `vitestSetup.ts` for any global test setup.
  - Mirador runs in the browser; to debug viewer state, open the devtools and inspect `miradorInstance.store.getState()` in `Mirador/index.tsx` (the code already subscribes and extracts `canvasId`).

Automated test guidance

- Running tests (single run): `npm run test` (runs `vitest run`).
- Update snapshots: `npm run test-u` (alias for `vitest run -u` via package script).
- Interactive / watch mode: use `npx vitest` or `npx vitest -w` for a watch/re-run workflow (the `test` script uses `vitest run` and is not a watch command).
- Run a single test file: `npx vitest run src/pages/Workspace/TranscriptionArea/TranscriptionArea.test.tsx`.
- Test file conventions: tests live next to implementation and use the `.test.tsx` suffix (e.g., `src/pages/Home/Home.test.tsx`).
- Global test setup: `vitestSetup.ts` is used by the test environment — inspect it for DOM globals or mock setup.
- Libraries: tests use `@testing-library/react`, `@testing-library/dom`, and `@testing-library/jest-dom` with `jsdom` as the runtime.
- CI note: the repository has a GitHub Actions workflow (see `README.md` badge). The CI runs tests in headless mode; reproduce locally with `npm run test`.
  If anything in these instructions is unclear or you want additional examples (e.g., a sample new lesson object or step-by-step for adding a route), tell me which section to expand and I will iterate.
