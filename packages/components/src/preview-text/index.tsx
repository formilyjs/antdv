import type { Field } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { isArr, isValid } from '@formily/shared'
import { useField } from '@formily/vue'
import type { CascaderProps, DatePickerProps, SelectProps, TimePickerProps } from 'ant-design-vue'
import { Tag } from 'ant-design-vue'
import type { CascaderOptionType } from 'ant-design-vue/es/cascader'
import type { RangePickerProps } from 'ant-design-vue/es/date-picker'
import { computed, defineComponent } from 'vue'
import {
  composeExport,
  createContext,
  formatDayjsValue,
  resolveComponent,
  useContext,
  usePrefixCls
} from '../__builtins__'
import { Space } from '../space'
import useStyle from './style'

const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: any) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value) && value !== '' ? value : resolveComponent(placeholderCtx.value) || 'N/A'
  })

  return placeholder
}

const Select = observer(
  defineComponent({
    name: 'PreviewTextSelect',
    props: [],
    setup(_props, { attrs }) {
      const prefixCls = usePrefixCls('formily-preview-text', attrs.prefixCls as string)
      const [wrapSSR, hashId] = useStyle(prefixCls)
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as SelectProps
      const placeholder = usePlaceholder()
      const getSelected = () => {
        const value = props.value
        if (props.mode === 'multiple' || props.mode === 'tags') {
          if (props.labelInValue) {
            return isArr(value) ? value : []
          }
          return isArr(value) ? value.map((val) => ({ label: val, value: val })) : []
        } else {
          if (props.labelInValue) {
            return isValid(value) ? [value] : []
          }
          return isValid(value) ? [{ label: value, value }] : []
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        const dataSource: any[] = field?.dataSource?.length
          ? field.dataSource
          : props?.options?.length
          ? props.options
          : []
        if (!selected.length) {
          return <Tag>{placeholder.value}</Tag>
        }
        return selected.map((target, key) => {
          const text =
            dataSource?.find((item) => item.value == target?.value)?.label || target?.label
          return <Tag key={key}>{text || placeholder.value}</Tag>
        })
      }

      return () => {
        return wrapSSR(<Space class={[prefixCls, hashId.value]}>{getLabels()}</Space>)
      }
    }
  })
)

const Input = observer(
  defineComponent({
    name: 'PreviewTextInput',
    setup(_props, { attrs, slots }) {
      const prefixCls = usePrefixCls('formily-preview-text', attrs.prefixCls as string)
      const [wrapSSR, hashId] = useStyle(prefixCls)
      return () => {
        const placeholder = usePlaceholder(attrs.value)
        return wrapSSR(
          <Space class={[prefixCls, hashId.value]}>
            {slots?.prepend?.()}
            {slots?.prefix?.()}
            {placeholder.value}
            {slots?.suffix?.()}
            {slots?.append?.()}
          </Space>
        )
      }
    }
  })
)

const Text = defineComponent({
  name: 'PreviewText',
  setup(_props, { attrs }) {
    const prefixCls = usePrefixCls('formily-preview-text', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const placeholder = usePlaceholder()

    return () => {
      return wrapSSR(<div class={[prefixCls, hashId.value]}>{placeholder.value}</div>)
    }
  }
})

export type PreviewCascaderProps = CascaderProps & {
  options: CascaderOptionType[]
}
const Cascader = observer(
  defineComponent({
    name: 'PreviewTextCascader',
    props: [],
    setup(_props, { attrs }) {
      const prefixCls = usePrefixCls('formily-preview-text', attrs.prefixCls as string)
      const [wrapSSR, hashId] = useStyle(prefixCls)
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as PreviewCascaderProps

      const placeholder = usePlaceholder()
      const getSelected = (): any[] => {
        return isArr(props.value) ? props.value : []
      }

      const getLabels = () => {
        const dataSource: any[] = field?.dataSource?.length
          ? field.dataSource
          : props?.options?.length
          ? props.options
          : []
        const selected = getSelected()
        if (!selected?.length) {
          return <Tag>{placeholder.value}</Tag>
        }

        return selected
          .reduce<{
            dataSource?: any[]
            labels: any[]
          }>(
            (pre, cur) => {
              const result = pre.dataSource?.find((item) => item.value == cur)
              if (result) {
                pre.labels.push(result.label)
                pre.dataSource = result.children
              } else {
                pre.labels.push(cur)
                pre.dataSource = []
              }
              return pre
            },
            {
              dataSource,
              labels: [] as any[]
            }
          )
          .labels.map((label, key) => {
            return <Tag key={key}>{label || placeholder.value}</Tag>
          })
      }

      return () => {
        return wrapSSR(<Space class={[prefixCls, hashId.value]}>{getLabels()}</Space>)
      }
    }
  })
)

const TimePicker = defineComponent({
  name: 'PreviewTextTimePicker',
  setup(_props, { attrs }) {
    const props = attrs as unknown as TimePickerProps
    const prefixCls = usePrefixCls('formily-preview-text', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const placeholder = usePlaceholder()
    const getLabels = () => {
      const labels = formatDayjsValue(props.value, props.format, placeholder.value)
      return isArr(labels) ? labels.join('~') : labels
    }
    return () => {
      return wrapSSR(<div class={[prefixCls, hashId.value]}>{getLabels()}</div>)
    }
  }
})

const DatePicker = defineComponent({
  name: 'PreviewTextDatePicker',
  setup(_props, { attrs }) {
    const props = attrs as unknown as DatePickerProps
    const prefixCls = usePrefixCls('formily-preview-text', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const placeholder = usePlaceholder()
    const getLabels = () => {
      const labels = formatDayjsValue(props.value, props.format, placeholder.value)
      return isArr(labels) ? labels.join('~') : labels
    }
    return () => {
      return wrapSSR(<div class={[prefixCls, hashId.value]}>{getLabels()}</div>)
    }
  }
})

const DateRangePicker = defineComponent({
  name: 'PreviewTextDatePicker',
  setup(_props, { attrs }) {
    const props = attrs as unknown as RangePickerProps
    const prefixCls = usePrefixCls('formily-preview-text', attrs.prefixCls as string)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const placeholder = usePlaceholder()
    const getLabels = () => {
      const labels = formatDayjsValue(props.value, props.format, placeholder.value)
      return isArr(labels) ? labels.join('~') : labels
    }
    return () => {
      return wrapSSR(<div class={[prefixCls, hashId]}>{getLabels()}</div>)
    }
  }
})

export const PreviewText = composeExport(Text, {
  Input,
  Select,
  Cascader,
  DatePicker,
  DateRangePicker,
  TimePicker,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder
})

export default PreviewText
