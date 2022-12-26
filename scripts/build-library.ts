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

  execa('tsc', params).stdout.pipe(process.stdout)
}

const buildDefault = ({
  outDir = 'lib',
  env = 'cjs',
}: { outDir?: string; env?: string } = {}) => {
  typeCheck(['--outDir', outDir, '--sourceRoot', outDir])
  execa('babel', [
    'src',
    '--out-dir',
    outDir,
    '--env-name',
    env,
    '--extensions',
    '.ts,.tsx',
    '--copy-files',
  ]).stdout.pipe(process.stdout)
}

const buildEsm = async () => {
  buildDefault({ outDir: 'esm', env: 'es' })
}

export const buildLibrary = async () => {
  await typeCheck()
  await buildDefault()
  await buildEsm()
}
