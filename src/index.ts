import chalk from 'chalk'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import * as msg from './messages'

const steps = [
  { name: 'Lint', cmd: 'npm run lint', script: 'lint' },
  { name: 'Test', cmd: 'npm run test', script: 'test' },
  { name: 'CSpell', cmd: 'npm run cspell', script: 'cspell' },
  { name: 'TypeScript Check', cmd: 'npm run ts-check', script: 'ts-check' },
  { name: 'Build', cmd: 'npm run build', script: 'build' }
]

const start = Date.now()

console.log(chalk.bgBlue.white.bold(msg.HEADER))
console.log(chalk.white.bold(msg.INFO('0.1.0', 'juandrepanther')))

let scripts: Record<string, string> = {}
try {
  const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))
  scripts = pkg.scripts || {}
} catch {
  console.log(chalk.red(msg.COULD_NOT_READ_PKG))
  process.exit(1)
}

const executedSteps: string[] = []
const skippedSteps: string[] = []

for (const step of steps) {
  if (!scripts[step.script]) {
    skippedSteps.push(step.name)
    console.log(chalk.yellow(msg.SKIP_STEP(step.name, step.script)))
    continue
  }

  const stepStart = Date.now()

  try {
    console.log(chalk.blueBright(msg.STEP_START(step.name)))
    execSync(step.cmd, { stdio: 'inherit' })
    const stepTime = ((Date.now() - stepStart) / 1000).toFixed(2)
    console.log(chalk.green(msg.STEP_SUCCESS(step.name, stepTime)))
    executedSteps.push(step.name)
  } catch (error) {
    console.log(chalk.red(msg.STEP_FAIL(step.name, chalk.bold.bgBlackBright(error))))
    console.log(chalk.yellow(msg.FAIL_HINT(chalk.bold.bgBlackBright('npm run ch'))))
    process.exit(1)
  }
}

const totalTime = ((Date.now() - start) / 1000).toFixed(2)
console.log(chalk.green(msg.ALL_STEPS_FINISHED(totalTime)))

console.log(chalk.bold(msg.STEP_SUMMARY))
console.log(chalk.green(msg.EXECUTED(executedSteps)))
console.log(chalk.yellow(msg.SKIPPED(skippedSteps)))

if (skippedSteps.length > 0) {
  console.log(chalk.yellow.bold(msg.SKIP_WARNING))
}

if (executedSteps.length === steps.length) {
  console.log(chalk.bold.green(msg.ALL_PASSED))
}
