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
const typeCheck = async (params: string[] = []) => {
  const hasProjects = await hasBuildConfig()
  if (hasProjects) {
    params.push('--project', 'tsconfig.build.json', '--sourceRoot', 'lib')
  }

  await execa('tsc', params)
}

const buildDefault = async ({
  outDir = 'lib',
  env = 'cjs',
}: { outDir?: string; env?: string } = {}) => {
  typeCheck(['--outDir', outDir, '--sourceRoot', outDir])
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
  await typeCheck()
  await buildDefault()
  await buildEsm()
}
