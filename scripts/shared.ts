import path from 'path'
import { cwd } from './constants'

export const getConfigs = (name: string) => {
  try {
    const module = require.resolve(path.resolve(cwd, name))
    return require(module)
  } catch {
    return {} as any
  }
}
