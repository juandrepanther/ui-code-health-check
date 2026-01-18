import chalk from 'chalk'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const steps = [
  { name: 'Lint', cmd: 'npm run lint', script: 'lint' },
  { name: 'Test', cmd: 'npm run test', script: 'test' },
  { name: 'CSpell', cmd: 'npm run cspell', script: 'cspell' },
  { name: 'TypeScript Check', cmd: 'npm run ts-check', script: 'ts-check' },
  { name: 'Build', cmd: 'npm run build', script: 'build' }
]

const start = Date.now()

console.log(chalk.bgBlue.white.bold('\n========== Starting UI Code Health Check ==========\n'))
console.log(
  chalk.white.bold(
    'Version: 1.0.0\n' +
      'Developed by: IF | Janis Dregeris \n' +
      'Date: 2026/01\n' +
      `Run: ${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, '0')}\n`
  )
)

// Read package.json scripts
let scripts: Record<string, string> = {}
try {
  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
  scripts = pkg.scripts || {}
} catch {
  console.log(chalk.red('❌ Could not read package.json.'))
  process.exit(1)
}

for (const step of steps) {
  if (!scripts[step.script]) {
    console.log(
      chalk.yellow(`⚠️  Skipping "${step.name}" — missing "${step.script}" script in package.json.`)
    )
    continue
  }
  const stepStart = Date.now()
  try {
    console.log(chalk.blueBright(`\n▶ ${step.name}...`))
    execSync(step.cmd, { stdio: 'inherit' })
    const stepTime = ((Date.now() - stepStart) / 1000).toFixed(2)
    console.log(chalk.green(`✔ ${step.name} finished in ${stepTime}s`))
  } catch (error) {
    console.log(
      chalk.red(
        `❌ ${step.name} failed, ${chalk.bold.bgBlackBright(error)}. Please fix the issues above and try again. Before committing, make sure all checks pass.\n`
      )
    )
    console.log(
      chalk.yellow(
        [
          `ℹ️  lint-staged will prevent committing if any of these errors are present.`,
          `You can run ${chalk.bold.bgBlackBright('npm run ch')} to catch errors before committing.`,
          `\nDetected errors may include:`,
          `- Linting issues (code style, formatting, best practices)`,
          `- Failing tests`,
          `- Spelling mistakes`,
          `- TypeScript type errors`,
          `- Build errors`,
          `\n⚠️  Note: This code health check will stop executing further commands as soon as an error is detected.`,
          `If you get errors from one command, errors from subsequent commands will only appear after you fix the current errors and re-run the script.`,
          `It will not show all errors from all commands at once; you need to resolve issues step by step.`,
          `You need to run ${chalk.bold.bgBlackBright('npm run ch')} again after fixing each errors group, until all steps succeed.`,
          `\n❗ Please resolve all reported issues to ensure a successful commit.\n`
        ].join('\n')
      )
    )
    process.exit(1)
  }
}

const totalTime = ((Date.now() - start) / 1000).toFixed(2)
console.log(chalk.green(`\n🏁 All steps finished in ${totalTime}s\n`))
console.log(chalk.bold.green('All checks passed! Now you can make a commit. 🚀 \n'))
