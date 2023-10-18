import type { InjectionKey, Ref } from 'vue'
import type { ISettingFormProps } from '../types'

export const SettingsFormSymbol: InjectionKey<Ref<ISettingFormProps>> =
  Symbol('SettingsFormContext')
