# 2DReact Monorepo

A monorepo structure containing the 2DReact game library and a consumer application for testing.

## Project Structure

```
2dreact-monorepo/
├── 2DReact/          # The main 2DReact library package
├── consumer/         # Consumer app for testing the library
└── package.json      # Root workspace configuration
```

## Workspace Scripts

The root `package.json` provides convenient scripts for managing both packages:

### Development

- `npm run dev` - Run the 2DReact library in dev mode
- `npm run dev:consumer` - Run the consumer app in dev mode
- `npm run dev:all` - Run both in parallel

### Building

- `npm run build` - Build both packages
- `npm run build:lib` - Build only the 2DReact library
- `npm run build:consumer` - Build only the consumer app

### Other

- `npm run preview` - Preview the consumer app
- `npm run lint` - Lint all packages (if configured)
- `npm run type-check` - Type check all packages

## 2DReact Library

The library is published as `@2dreact/library` and exports:

- Game components
- Hooks (useGame)
- Game constants
- Utilities
- Player and object components

### Building the Library

```bash
npm run build:lib
```

Output: `dist/` folder with ES and CommonJS builds

## Consumer App

A test application that imports and uses the 2DReact library.

### Running the Consumer

```bash
npm run dev:consumer
```

### Adding Dependencies

To add a dependency to the consumer app:

```bash
npm install -w consumer <package-name>
```

To add a dependency to the library:

```bash
npm install -w 2DReact <package-name>
```

## Installation & Setup

1. Clone the repository
2. Install dependencies from the root:
   ```bash
   npm install
   ```
3. npm workspaces will automatically link `@2dreact/library` in the consumer

## Development Workflow

1. Make changes to library code in `2DReact/src/`
2. Export new components from `2DReact/src/index.ts`
3. Use them in the consumer app: `import { Component } from '@2dreact/library'`
4. Run `npm run dev:all` to test both simultaneously

## Publishing the Library

To publish `@2dreact/library` to npm:

```bash
npm run build:lib
cd 2DReact
npm publish
```

Make sure to update the version in `2DReact/package.json` before publishing.
