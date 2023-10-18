import type { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'element',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    '@formily/antdv': 'Formily.Antdv'
  }
}
