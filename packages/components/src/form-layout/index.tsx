import type { InjectionKey, PropType, Ref } from 'vue'
import { defineComponent, inject, provide, ref, watch } from 'vue'
import type { PropTypes } from '../__builtins__'
import { usePrefixCls } from '../__builtins__'
import { useResponsiveFormLayout } from './useResponsiveFormLayout'
import useStyle from './style'

export const getFormLayoutProps = () => {
  return {
    className: {
      type: String as PropType<string>
    },
    colon: { default: true },
    labelAlign: {
      type: [String, Array] as PropType<'right' | 'left' | ('right' | 'left')[]>
    },
    wrapperAlign: {
      type: [String, Array] as PropType<'right' | 'left' | ('right' | 'left')[]>
    },
    labelWrap: { default: false },
    labelWidth: {
      type: Number
    },
    wrapperWidth: {
      type: Number
    },
    wrapperWrap: { default: false },
    labelCol: {
      type: [Number, Array] as PropType<number | number[]>
    },
    wrapperCol: {
      type: [Number, Array] as PropType<number | number[]>
    },
    fullness: { default: false },
    size: { default: 'default' },
    layout: {
      type: [String, Array] as PropType<'vertical' | 'horizontal' | 'inline'>,
      default: 'horizontal'
    },
    direction: { default: 'ltr' },
    shallow: { default: true },
    feedbackLayout: { type: null },
    tooltipLayout: { type: null },
    bordered: { default: true },
    inset: { default: false },
    breakpoints: { type: Array as PropType<number[]> },
    spaceGap: {},
    gridColumnGap: {},
    gridRowGap: {}
  }
}

export type FormLayoutProps = PropTypes<typeof getFormLayoutProps>

export const FormLayoutDeepContext: InjectionKey<Ref<FormLayoutProps>> =
  Symbol('FormLayoutDeepContext')

export const FormLayoutShallowContext = Symbol('FormLayoutShallowContext')

export const useFormDeepLayout = (): Ref<FormLayoutProps> => inject(FormLayoutDeepContext, ref({}))

export const useFormShallowLayout = (): Ref<FormLayoutProps> =>
  inject(FormLayoutShallowContext, ref({}))

export const useFormLayout = (): Ref<FormLayoutProps> => {
  const shallowLayout = useFormShallowLayout()
  const deepLayout = useFormDeepLayout()
  const formLayout = ref<Record<string, any>>({
    ...deepLayout.value,
    ...shallowLayout.value
  })

  watch(
    [shallowLayout, deepLayout],
    () => {
      formLayout.value = {
        ...deepLayout.value,
        ...shallowLayout.value
      }
    },
    {
      deep: true
    }
  )
  return formLayout
}

export const FormLayout = defineComponent({
  name: 'FFormLayout',
  props: getFormLayoutProps(),
  setup(customProps, { attrs, slots }) {
    const prefixCls = usePrefixCls('formily-form', attrs.prefixCls as string)

    const [wrapSSR, hashId] = useStyle(prefixCls)
    const rootRef = ref()
    const { props } = useResponsiveFormLayout(customProps, rootRef)

    const deepLayout = useFormDeepLayout()
    const newDeepLayout = ref({
      ...deepLayout
    })
    const shallowProps = ref({})

    watch(
      [props, deepLayout],
      () => {
        shallowProps.value = props.value.shallow ? props.value : undefined
        if (!props.value.shallow) {
          Object.assign(newDeepLayout.value, props.value)
        } else {
          if (props.value.size) {
            newDeepLayout.value = {
              ...newDeepLayout.value,
              size: props.value.size
            }
          }
          if (props.value.colon) {
            newDeepLayout.value.colon = props.value.colon
          }
        }
      },
      { deep: true, immediate: true }
    )

    provide(FormLayoutDeepContext, newDeepLayout)
    provide(FormLayoutShallowContext, shallowProps)

    return () => {
      const classNames = {
        [`${prefixCls}-${props.value.layout}`]: true,
        [`${prefixCls}-rtl`]: props.value.direction === 'rtl',
        [`${prefixCls}-${props.value.size}`]: props.value.size !== undefined,
        [`${props.value.className}`]: props.value.className !== undefined,
        [`${hashId.value}`]: true
      }
      return wrapSSR(
        <div ref={rootRef} class={classNames}>
          {slots.default?.()}
        </div>
      )
    }
  }
})

export default FormLayout
