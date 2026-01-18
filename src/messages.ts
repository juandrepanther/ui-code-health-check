export const HEADER = `
========== Starting UI Code Health Check ==========
`

export const INFO = (version: string, author: string) =>
  `Version: ${version}
Developed by: ${author}
Date: 2026/01
Run: ${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}
`

export const COULD_NOT_READ_PKG = '❌ Could not read package.json.'

export const SKIP_STEP = (stepName: string, script: string) =>
  `⚠️  Skipping "${stepName}" — missing "${script}" script in package.json.`

export const STEP_START = (stepName: string) => `\n▶ ${stepName}...`

export const STEP_SUCCESS = (stepName: string, time: string) => `✔ ${stepName} finished in ${time}s`

export const STEP_FAIL = (stepName: string, error: unknown) =>
  `❌ ${stepName} failed, ${error}. Please fix the issues above and try again. Before committing, make sure all checks pass.\n`

export const FAIL_HINT = (runCmd: string) =>
  [
    `ℹ️  lint-staged will prevent committing if any of these errors are present.`,
    `You can run ${runCmd} to catch errors before committing.`,
    `\nDetected errors may include:`,
    `- Linting issues (code style, formatting, best practices)`,
    `- Failing tests`,
    `- Spelling mistakes`,
    `- TypeScript type errors`,
    `- Build errors`,
    `\n⚠️  Note: This code health check will stop executing further commands as soon as an error is detected.`,
    `If you get errors from one command, errors from subsequent commands will only appear after you fix the current errors and re-run the script.`,
    `It will not show all errors from all commands at once; you need to resolve issues step by step.`,
    `You need to run ${runCmd} again after fixing each errors group, until all steps succeed.`,
    `\n❗ Please resolve all reported issues to ensure a successful commit.\n`
  ].join('\n')

export const ALL_STEPS_FINISHED = (time: string) => `\n🏁 All steps finished in ${time}s\n`

export const STEP_SUMMARY = 'Step summary:'

export const EXECUTED = (steps: string[]) => `Executed: ${steps.length ? steps.join(', ') : 'None'}`

export const SKIPPED = (steps: string[]) => `Skipped: ${steps.length ? steps.join(', ') : 'None'}`

export const SKIP_WARNING = `
⚠️  Some checks were skipped. It is important to pass all checks to ensure high code quality and maintainability. Please consider adding the missing scripts to your package.json for a complete code health check.
`

export const ALL_PASSED = 'All checks passed! Now you can make a commit. 🚀 \n'
