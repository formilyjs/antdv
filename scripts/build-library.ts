import path from 'path'
import fs from 'fs-extra'
import execa from 'execa'
import { cwd } from '@formily/template/lib/constants'

const hasBuildConfig = async () => {
  try {
    await fs.access(path.resolve(cwd, 'tsconfig.build.json'))
    return true
  } catch {
    return false
  }
}

/**
 * ts file type check
 * https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html
 */
const buildType = async (params: string[] = []) => {
  const hasProjects = await hasBuildConfig()
  if (hasProjects) {
    params.unshift('--project', 'tsconfig.build.json')
  }

  await execa('tsc', params)
}

const buildDefault = async ({
  outDir = 'lib',
  env = 'cjs',
}: { outDir?: string; env?: string } = {}) => {
  await buildType([
    '--outDir',
    outDir,
    '--sourceRoot',
    outDir,
    // Only output d.ts files and not JavaScript files.
    '--emitDeclarationOnly',
    // Ensure that Babel can safely transpile files in the TypeScript project
    '--isolatedModules',
  ])
  await execa('babel', [
    'src',
    '--out-dir',
    outDir,
    '--env-name',
    env,
    '--extensions',
    '.ts,.tsx',
    '--copy-files',
  ])
}

const buildEsm = async () => {
  await buildDefault({ outDir: 'esm', env: 'es' })
}

export const buildLibrary = async () => {
  await buildDefault()
  await buildEsm()
}
