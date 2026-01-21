```
  ____ _   _
 / ___| | | |
| |   | |_| |
| |___|  _  |
 \____|_| |_|
```

**UI Code Health Check** is a simple CLI helper tool that automates your project's key quality checks—**linting**, **testing**, **TypeScript checking**, and **building**—with a single command. Instead of running each script separately, this tool executes your predefined scripts in order, saving you time and ensuring consistency across your workflow.

- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Example `package.json` Scripts](#example-packagejson-scripts)

## Features

- **Linting**: Checks code style with [ESLint](https://eslint.org/).
- **Testing**: Runs your test suite (e.g., [Vitest](https://vitest.dev/)).
- **Spell Checking**: Finds typos with [cspell](https://cspell.org/).
- **Type Checking**: Verifies types with [TypeScript](https://www.typescriptlang.org/).
- **Build**: Runs your build process (e.g., [Vite](https://vitejs.dev/)).
- **Smart Skipping**: Skips any missing scripts automatically.

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
    "your-script-name": "ch"
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
npm run <your-script-name>
```

## Example `package.json` Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "vitest run",
    "cspell": "cspell \"src/**/*.{ts,tsx,md}\"",
    "ts-ch": "npx tsc --noemit",
    "build": "tsc && vite build"
  }
}
```

    > **Note:**
    > The `cspell` and `ts-ch` scripts are enforced by this tool and cannot be renamed or customized.
    > Other scripts like `lint`, `test`, and `build` are chosen for compatibility with industry standards.

## License

MIT
