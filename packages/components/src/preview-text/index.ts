import { defineComponent, computed } from '@vue/composition-api'
import { h, useField } from '@formily/vue'
import { isArr, isValid } from '@formily/shared'
import {
  createContext,
  resolveComponent,
  useContext,
  composeExport,
} from '../__builtins__/shared'
import { stylePrefix } from '../__builtins__/configs'
import { Input as InputProps } from 'ant-design-vue/types/input/input'

import { Space } from '../space'

const prefixCls = `${stylePrefix}-preview-text`
const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: any) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value) && value !== ''
      ? value
      : resolveComponent(placeholderCtx.value) || 'N/A'
  })

  return placeholder
}

// eslint-disable-next-line vue/one-component-per-file
const Input = defineComponent<InputProps>({
  name: 'PreviewTextInput',
  props: [],
  setup(_props, { attrs, slots }) {
    const placeholder = usePlaceholder(attrs.value)
    return () => {
      return h(
        Space,
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => [
            slots?.prepend?.(),
            slots?.prefix?.(),
            placeholder.value,
            slots?.suffix?.(),
            slots?.append?.(),
          ],
        }
      )
    }
  },
})

// eslint-disable-next-line vue/one-component-per-file
const Text = defineComponent<any>({
  name: 'PreviewText',
  setup(_props, { attrs }) {
    const placeholder = usePlaceholder()

    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => placeholder.value,
        }
      )
    }
  },
})

export const PreviewText = composeExport(Text, {
  Input,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
})

export default PreviewText
