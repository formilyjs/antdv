import { globalConfig } from 'ant-design-vue/es/config-provider'

export const usePrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
  const configProvider = globalConfig()
  return configProvider.getPrefixCls(suffixCls, customizePrefixCls)
}
