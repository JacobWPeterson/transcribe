# Xeirographa

[![Node.js CI](https://github.com/JacobWPeterson/transcribe/actions/workflows/node.js.yml/badge.svg)](https://github.com/JacobWPeterson/transcribe/actions/workflows/node.js.yml)

A guided learning platform for reading Greek manuscripts using IIIF manifests and interactive transcription exercises.

Available at [xeirographa.com](https://www.xeirographa.com)

## Features

- **Interactive Manuscript Viewer**: IIIF-powered viewer (Mirador 4.0) for high-resolution manuscript images
- **Guided Transcription Lessons**: Step-by-step exercises with instant feedback
- **Progress Tracking**: Automatic saving of lesson progress to browser storage
- **Accessibility**: Dark mode, high contrast, and adjustable font sizes
- **Multiple Lesson Sets**: Core lessons and University of Edinburgh Divinity School collection

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI**: Bootstrap 5 + CSS Modules (SCSS)
- **Routing**: React Router v7
- **Testing**: Vitest + Testing Library
- **Manuscript Viewer**: Mirador 4.0 with image-tools plugin

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run start:dev
```

Runs the app in development mode with hot reload at [http://localhost:3000](http://localhost:3000).

### Building

```bash
npm run build
```

## License

This project is licensed under the GPL-3.0-or-later license. See the [LICENSE.md](LICENSE.md) file for details.

````
```

Builds the app for production to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Testing

```bash
# Run tests once
npm run test

# Run tests in watch mode
npx vitest -w

# Update snapshots
npm run test-u
```

## Linting & Formatting

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint-fix
```

## Project Structure

```
src/
├── app/              # App shell (routing, navbar, settings)
├── components/       # Reusable UI components
├── pages/            # Page components
│   ├── Home/
│   ├── Workspace/    # Main lesson interface
│   │   ├── Mirador/           # IIIF viewer integration
│   │   └── TranscriptionArea/ # Input & validation
│   ├── Help/
│   └── About/
├── files/            # Lesson manifests and configurations
├── styles/           # Global styles and theme variables
└── utils/            # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests and linting before committing
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 or later (GPL-3.0-or-later).

This means you are free to:

- Use this software for any purpose
- Study and modify the source code
- Share the software and your modifications

Under the condition that:

- Any derivative works must also be distributed under the same GPL-3.0-or-later license
- You must make the source code available when distributing the software
- You must document any changes made to the original code

See the [LICENSE](LICENSE) file for the full license text.

## Acknowledgments

- Manuscript images provided via [IIIF](https://iiif.io/) manifests from
  - Bayerische Staatsbibliothek
  - Biblioteca Apostolica Vaticana
  - Cambridge University Library
  - Chester Beatty Library
  - Stiftsbibliothek St. Gallen
- Built with [ProjectMirador](https://projectmirador.org/) viewer
````
