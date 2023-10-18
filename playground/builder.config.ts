import type { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'ant-design-vue',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    '@formily/antdv': 'Formily.Antdv',
    '@formily/antdv-designable': 'Formily.AntdvDesignable',
    '@formily/antdv-setters': 'Formily.AntdvSetters',
    '@formily/antdv-settings-form': 'Formily.AntdvSettingsForm',
    '@formily/antdv-prototypes': 'Formily.AntdvPrototypes'
  }
}
