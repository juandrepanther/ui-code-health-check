# TESTING NEW PACKAGE, NOT FOR USE YET

# UI Code Health Check

**UI Code Health Check** is a CLI tool that helps you maintain high code quality in your TypeScript projects. It automates common checks such as linting, testing, spell checking, type checking, and building, running only the steps that are configured in your project.

## Features

- **Linting**: Runs ESLint to enforce code style and best practices.
- **Testing**: Executes your project's test suite (if defined).
- **Spell Checking**: Uses cspell to catch spelling mistakes (if defined).
- **TypeScript Checking**: Runs TypeScript type checks (if defined).
- **Build**: Executes your build script (if defined).
- **Smart Skipping**: Automatically skips any step if the corresponding script is missing in your `package.json`.

## Installation

Add this package as a dev dependency:

```bash
npm install --save-dev ui-code-health-check
# or
pnpm add -D ui-code-health-check
# or
yarn add -D ui-code-health-check
```

## Usage

After installation, you can run the health check from your project root:

```bash
npx ch
```

Or add it as a script in your `package.json` (example):

```json
{
  "scripts": {
    "ch": "npx ch"
  }
}
```

## How It Works

The tool checks your `package.json` for the following scripts and runs them in order if they exist:

1. `lint`
2. `test`
3. `cspell`
4. `ts-ch`
5. `build`

If a script is missing, that step is skipped.

Then run:

```bash
npm run ch
```

## Configuration

- **ESLint**: Ensure you have a `lint` script in your `package.json` (e.g., `"lint": "eslint ."`).
- **Testing**: Add a `test` script (e.g., `"test": "vitest run"`).
- **Spell Checking**: Add a `cspell` script (e.g., `"cspell": "cspell '**'"`).
- **Type Checking**: Add a `ts-ch` script (e.g., `"ts-ch": "tsc --noEmit"`).
- **Build**: Add a `build` script (e.g., `"build": "tsc"` or your build tool).

## Example `package.json` Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "cspell": "cspell \"src/**/*.{ts,tsx,md}\" ",
    "ts-ch": "npx tsc --noemit",
    "build": "tsc && vite build"
  }
}
```

## License

MIT
