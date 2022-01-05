import type { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'ant-design-vue',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    'ant-design-vue': 'Antd',
  },
}
