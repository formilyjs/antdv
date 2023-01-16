import { inject } from 'vue-demi'
import { ConfigConsumerProps } from 'ant-design-vue/es/config-provider/configConsumerProps'

import type { ConfigProvider as ConfigProviderProps } from 'ant-design-vue'

export const usePrefixCls = (
  suffixCls: string,
  customizePrefixCls?: string
) => {
  const configProvider = inject<ConfigProviderProps>(
    'configProvider',
    () => ConfigConsumerProps
  )
  return configProvider.getPrefixCls(suffixCls, customizePrefixCls)
}
