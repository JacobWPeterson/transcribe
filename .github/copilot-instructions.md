<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this repo -->

# Copilot / AI Agent Instructions — transcribe

**Xeirographa**: A guided learning platform for reading Greek manuscripts using IIIF manifests and interactive transcription exercises.

Purpose: Help AI agents be immediately productive by explaining architecture, workflows, patterns, and integration points.

## Architecture

- **Tech Stack**: Single-page React app (v19) + Vite + TypeScript. UI via Bootstrap + CSS Modules (SCSS). Testing via Vitest.
- **Entry Point**: `src/app/App.tsx` → renders `AppWrapper` (navbar, settings) → `Routes` (React Router).
- **Pages**: `Home`, `Workspace` (core), `Help/{Guide,Glossary,Resources}`, `About`, `E404`. Routes in `src/app/Routes.tsx`.
- **Core Feature**: `Workspace` page composes two major components:
  - **Mirador** (`src/pages/Workspace/Mirador/`) — IIIF manuscript viewer (uses Mirador 4.0 library + image-tools plugin).
  - **TranscriptionArea** (`src/pages/Workspace/TranscriptionArea/`) — Input forms, validation, progress tracking via localStorage.
- **Manifest-Driven Model**: All lesson content (manifests, canvases, lines to transcribe) defined in `src/files/manifests.ts`. The `Workspace` page reads manifests dynamically by lesson ID and lesson set (CORE, UoEDiv).
- **Theme System**: `ThemeContext` provides dark mode, high contrast, and font size settings; persisted to localStorage; applied via CSS custom properties to root element.

## Data Flow & Integration Points

- **Manifest Loading**: `Workspace.tsx` reads `manifests[set][id]` (set = "lessons" | "UoEDiv", id = lesson number). Manifest object defines IIIF URL, canvas index, and array of transcription lines with metadata.
- **Mirador ↔ App Communication**:
  - `Mirador/index.tsx` initializes Mirador viewer with manifest + canvas index, subscribes to store.
  - On canvas change, extracts `canvasId`, parses page number using `specialIndexHandlingStart`/`specialIndexHandlingEnd` (optional string slices for non-standard ID formats).
  - Calls `setPageNumber()` callback to sync `Workspace` state; triggers alert if user navigates to wrong page.
- **Transcription Validation**: `src/pages/Workspace/TranscriptionArea/validators.ts` → `evaluateSubmission(guess, answer, requireSpaces)` returns `[boolean, string]` (correct status + feedback message).
  - Normalizes input: removes spaces (unless `requireSpaces=true`), converts final-sigma (ς/ϲ) to σ, lowercases.
  - Returns short/long messages for length mismatches; "correct" or "Answer is incorrect" for exact-length mismatches.
- **Progress Tracking**: `TranscriptionArea.tsx` reads/writes to localStorage via `loadLessonProgress()` / `saveLessonProgress()` (file: `src/utils/localStorage.ts`). Stores per-lesson answers and completion status.

## Project Conventions

- **CSS Modules**: Every component has a colocated `.module.scss` file (e.g., `Alert.tsx` + `Alert.module.scss`). Import as `import styles from "./Alert.module.scss"` and apply classes via `styles.ClassName`. Global vars via `@use "@styles/theme"` (sass mixins/variables).
- **Testing**: `.test.tsx` files colocated next to components. Use `@testing-library/react` + `jsdom`. Tests import component and call `render()`, then query DOM with `screen.getBy*()`. Setup in `vitestSetup.ts` (auto-cleanup after each test).
- **State Management**: React hooks (`useState`, `useEffect`, `useCallback`, `useContext`). No Redux/external store except Mirador's internal store (accessed via `miradorInstance.store.getState()`).
- **Forms**: `react-hook-form` used in `TranscriptionArea` for input handling (see `SingleLine.tsx` for example pattern).
- **Type Definitions**: Types in component files (e.g., `interface TranscriptionAreaProps`) or dedicated enum files (e.g., `singleLine.enum.ts` for `LessonStatus`).
- **Comments**: Prefer self-documenting code; use comments for non-obvious logic, especially around Mirador canvas ID parsing.

## Developer Workflows & Commands

| Task             | Command                          | Notes                                                        |
| ---------------- | -------------------------------- | ------------------------------------------------------------ |
| Install          | `npm install`                    | Required before dev.                                         |
| Dev Server       | `npm run start:dev`              | Vite + tsc watch in parallel. Port 3000. Hot reload enabled. |
| Build            | `npm run build`                  | Outputs to `dist/`.                                          |
| Preview          | `npm run preview`                | Test production build locally.                               |
| Tests            | `npm run test`                   | Vitest (single run, headless).                               |
| Tests (watch)    | `npx vitest -w`                  | Interactive rerun on file change.                            |
| Snapshots        | `npm run test-u`                 | Update snapshots.                                            |
| Lint             | `npm run lint`                   | Prettier + ESLint + Stylelint (check mode).                  |
| Lint Fix         | `npm run lint-fix`               | Auto-fix formatting + linting issues.                        |
| Single Test File | `npx vitest run src/...test.tsx` | Run one file.                                                |

## Key Files by Task

| Change Type                         | Files                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Add a lesson**                    | `src/files/manifests.ts` (add entry to `CORE` or `UoEDiv` set)                                          |
| **Change transcription rules**      | `src/pages/Workspace/TranscriptionArea/validators.ts`                                                   |
| **Fix canvas parsing**              | `src/pages/Workspace/Mirador/index.tsx` (ID extraction logic) + `manifests.ts` (special handling flags) |
| **Add a page/route**                | `src/app/Routes.tsx` + new page in `src/pages/*/`                                                       |
| **App-level UI (navbar, settings)** | `src/app/AppWrapper/AppWrapper.tsx`                                                                     |
| **Theme/styling**                   | `src/styles/` (global vars), component `.module.scss` files                                             |
| **Error handling**                  | `src/components/ErrorBoundary/` (specialized + generic boundaries)                                      |
| **localStorage**                    | `src/utils/localStorage.ts`                                                                             |
| **Email contact form**              | `src/components/ContactModal/ContactModal.tsx` (uses @emailjs/browser)                                  |

## Examples & Tips

**Add a lesson**:

```typescript
// src/files/manifests.ts
[ManifestSets.CORE]: {
  N: {
    manifestId: "https://...", // IIIF manifest URL
    canvasIndex: 123,          // Starting canvas index
    canvasIndexToPageNumberAdj: 0, // Adjust displayed page number
    lines: [
      { text: "αβγ", isTitle: true },
      { text: "δεζ", caption: "Abbreviation example" },
      { text: "ηθι", newConcept: "Ligature" },
    ],
  },
}
```

**Fix canvas ID parsing**:

- If `Mirador/index.tsx` fails to extract page numbers for a manifest, add to the manifest entry:
  ```typescript
  specialIndexHandlingStart: "/canvas/", // Start slice after this string
  specialIndexHandlingEnd: "/anno",      // End slice before this string
  ```
- Update the slice logic in `Mirador/index.tsx` if needed for complex IDs.

**Debug Mirador**:

- Open DevTools, navigate to `Mirador/index.tsx` line with `miradorInstance.store.subscribe()`.
- Log `miradorInstance.store.getState()` to inspect canvas ID and window state.

**Style changes**:

- Prefer component `.module.scss` for scoped styles; avoid global CSS to prevent unintended side effects.
- Use CSS custom properties (defined in `src/styles/theme.scss`) for dark mode / high-contrast support.

## Testing Guidance

- **Libraries**: Vitest + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` environment.
- **Setup**: `vitestSetup.ts` runs before tests (auto-cleanup via `afterEach(cleanup())`).
- **Patterns**: Use `render(<Component />)`, then `screen.getBy*()` (query by role, label, text). Example: `screen.getByRole("button", { name: "Submit" })`.
- **Snapshots**: Rarely used; prefer explicit assertions. Update with `npm run test-u`.
- **CI**: GitHub Actions runs `npm run test` on push/PR (headless). Reproduce locally before submitting.

## External Dependencies & APIs

- **Mirador 4.0**: IIIF viewer. Config in `src/pages/Workspace/Mirador/config.ts`. Plugins: `mirador-image-tools`.
- **React Router v7**: Client-side routing. Routes in `src/app/Routes.tsx`.
- **React Hook Form**: Form state in `TranscriptionArea` + `SingleLine`.
- **react-bootstrap**: Pre-styled components (navbar, modals, etc.).
- **EmailJS**: Contact form (`ContactModal`) sends emails without backend.
- **jsPDF**: PDF export of lesson answers.
- **Pluralize**: Utility for word pluralization in messages.
