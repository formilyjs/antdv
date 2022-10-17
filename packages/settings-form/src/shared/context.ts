import type { InjectionKey, Ref } from 'vue-demi'
import type { ISettingFormProps } from '../types'

export const SettingsFormSymbol: InjectionKey<Ref<ISettingFormProps>> = Symbol(
  'SettingsFormContext'
)
