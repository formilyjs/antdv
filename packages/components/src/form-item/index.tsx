import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'
import { Popover, Tooltip } from 'ant-design-vue'
import ResizeObserver from 'resize-observer-polyfill'
import type { Component, Ref } from 'vue'
import { defineComponent, onBeforeUnmount, provide, ref, watch } from 'vue'
import { composeExport, resolveComponent, usePrefixCls } from '../__builtins__'
import { FormLayoutShallowContext, useFormLayout } from '../form-layout'
import useStyle from './style'

export type FormItemProps = {
  className?: string
  required?: boolean
  label?: string | Component
  colon?: boolean
  tooltip?: string | Component
  layout?: 'vertical' | 'horizontal' | 'inline'
  labelStyle?: Record<string, any>
  labelAlign?: 'left' | 'right'
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  labelCol?: number
  wrapperCol?: number
  wrapperAlign?: 'left' | 'right'
  wrapperWrap?: boolean
  wrapperStyle?: Record<string, any>
  fullness?: boolean
  addonBefore?: string | Component
  addonAfter?: string | Component
  size?: 'small' | 'default' | 'large'
  extra?: string
  feedbackText?: string | Component
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none' | (string & unknown)
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & unknown)
  tooltipLayout?: 'icon' | 'text'
  feedbackIcon?: string | Component
  asterisk?: boolean
  gridSpan?: number
  bordered?: boolean
  inset?: boolean
}

const useOverflow = (containerRef: Ref<HTMLElement>) => {
  const overflow = ref(false)
  let resizeObserver: ResizeObserver | undefined

  const cleanup = () => {
    if (resizeObserver && containerRef.value) {
      resizeObserver.unobserve(containerRef.value)
      resizeObserver = null
    }
  }

  const observer = () => {
    const container = containerRef.value
    if (!container) return
    const content = container.querySelector('label')
    const containerWidth = container.getBoundingClientRect().width
    const contentWidth = content?.getBoundingClientRect().width

    if (containerWidth !== 0) {
      if (+contentWidth.toFixed(2) > +containerWidth.toFixed(2)) {
        overflow.value = true
      } else {
        overflow.value = false
      }
    }
  }

  const stopWatch = watch(
    () => containerRef.value,
    (el) => {
      cleanup()

      if (el) {
        resizeObserver = new ResizeObserver(observer)
        resizeObserver.observe(el)
      }
    },
    { immediate: true, flush: 'post' }
  )

  onBeforeUnmount(() => {
    cleanup()
    stopWatch()
  })

  return overflow
}

const ICON_MAP = {
  error: () => <CloseCircleOutlined />,
  success: () => <CheckCircleOutlined />,
  warning: () => <ExclamationCircleOutlined />
}

export const FormBaseItem = defineComponent({
  name: 'FormItem',
  props: {
    className: {},
    required: {},
    label: {},
    colon: {},
    layout: {},
    tooltip: {},
    labelStyle: {},
    labelAlign: {},
    labelWrap: {},
    labelWidth: {},
    wrapperWidth: {},
    labelCol: {},
    wrapperCol: {},
    wrapperAlign: {},
    wrapperWrap: {},
    wrapperStyle: {},
    fullness: {},
    addonBefore: {},
    addonAfter: {},
    size: {},
    extra: {},
    feedbackText: {},
    feedbackLayout: {},
    tooltipLayout: {},
    feedbackStatus: {},
    feedbackIcon: {},
    asterisk: {},
    gridSpan: {},
    bordered: { default: true },
    inset: { default: false }
  },
  setup(_props, { attrs, slots }) {
    const props = _props as FormItemProps
    const active = ref(false)
    const deepLayoutRef = useFormLayout()

    const prefixCls = usePrefixCls('formily-form-item', attrs.prefixCls as string)

    const containerRef = ref()
    const overflow = useOverflow(containerRef)

    provide(FormLayoutShallowContext, ref(null))

    const [wrapSSR, hashId] = useStyle(prefixCls)

    return () => {
      const deepLayout = deepLayoutRef.value
      const {
        label,
        colon = deepLayout.colon ?? true,
        layout = deepLayout.layout ?? 'horizontal',
        tooltip,
        labelStyle = {},
        labelWrap = deepLayout.labelWrap ?? false,
        labelWidth = deepLayout.labelWidth,
        wrapperWidth = deepLayout.wrapperWidth,
        labelCol = deepLayout.labelCol,
        wrapperCol = deepLayout.wrapperCol,
        wrapperAlign = deepLayout.wrapperAlign ?? 'left',
        wrapperWrap = deepLayout.wrapperWrap,
        wrapperStyle = {},
        fullness = deepLayout.fullness,
        addonBefore,
        addonAfter,
        size = deepLayout.size,
        extra,
        feedbackText,
        feedbackLayout = deepLayout.feedbackLayout ?? 'loose',
        tooltipLayout = deepLayout.tooltipLayout ?? 'icon',
        feedbackStatus,
        feedbackIcon,
        asterisk,
        bordered = deepLayout.bordered,
        inset = deepLayout.inset
      } = props
      const labelAlign =
        deepLayout.layout === 'vertical'
          ? props.labelAlign ?? deepLayout.labelAlign ?? 'left'
          : props.labelAlign ?? deepLayout.labelAlign ?? 'right'

      // 固定宽度
      let enableCol = false

      const getWidth = (width?: number | string) => {
        if (Number.isNaN(+width)) {
          return width === 'auto' ? undefined : width
        }
        return `${width}px`
      }

      if (labelWidth || wrapperWidth) {
        if (labelWidth) {
          const _labelWidth = getWidth(labelWidth)
          labelStyle.width = _labelWidth
          labelStyle.maxWidth = _labelWidth
        }
        if (wrapperWidth) {
          const _wrapperWidth = getWidth(wrapperWidth)
          wrapperStyle.width = _wrapperWidth
          wrapperStyle.maxWidth = _wrapperWidth
        }
        // 栅格模式
      } else if (labelCol || wrapperCol) {
        enableCol = true
      }

      const formatChildren =
        feedbackLayout === 'popover' ? (
          <Popover
            autoAdjustOverflow
            placement="top"
            content={
              <div
                class={{
                  [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                  [`${prefixCls}-help`]: true,
                  [hashId.value]: true
                }}
              >
                {feedbackStatus && ['error', 'success', 'warning'].includes(feedbackStatus) ? (
                  <span style={{ marginInlineEnd: '6px' }}>{ICON_MAP[feedbackStatus]()}</span>
                ) : (
                  ''
                )}
                {resolveComponent(feedbackText)}
              </div>
            }
          >
            <div>{slots.default?.()}</div>
          </Popover>
        ) : (
          slots.default?.()
        )

      const renderLabelText = () => {
        const labelChildren = (
          <div class={`${prefixCls}-label-content`} ref={containerRef}>
            {asterisk && <span class={`${prefixCls}-asterisk`}>*</span>}
            <label>{resolveComponent(label)}</label>
          </div>
        )
        const isTextTooltip = tooltip && tooltipLayout === 'text'
        if (isTextTooltip || overflow.value) {
          return (
            <Tooltip
              placement="top"
              title={
                <div>
                  {overflow.value && resolveComponent(label)}
                  {isTextTooltip && resolveComponent(tooltip)}
                </div>
              }
            >
              {labelChildren}
            </Tooltip>
          )
        } else {
          return labelChildren
        }
      }
      const renderTooltipIcon = () => {
        if (tooltip && tooltipLayout === 'icon') {
          return (
            <span class={`${prefixCls}-label-tooltip ${prefixCls}-label-tooltip-icon`}>
              <Tooltip
                placement="top"
                title={
                  <div class={`${prefixCls}-label-tooltip-content`}>
                    {resolveComponent(tooltip)}
                  </div>
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          )
        }
      }
      const renderLabel = label && (
        <div
          class={{
            [`${prefixCls}-label`]: true,
            [`${prefixCls}-label-tooltip`]: (tooltip && tooltipLayout === 'text') || overflow.value,
            [`${prefixCls}-item-col-${labelCol}`]: enableCol && !!labelCol
          }}
          style={labelStyle}
        >
          {renderLabelText()}
          {renderTooltipIcon()}
          {label && <span class={`${prefixCls}-colon`}>{colon ? ':' : ''}</span>}
        </div>
      )

      const renderFeedback = !!feedbackText &&
        feedbackLayout !== 'popover' &&
        feedbackLayout !== 'none' && (
          <div
            class={{
              [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
              [`${prefixCls}-help`]: true,
              [`${prefixCls}-help-enter`]: true,
              [`${prefixCls}-help-enter-active`]: true
            }}
          >
            {resolveComponent(feedbackText)}
          </div>
        )

      const renderExtra = extra && <div class={`${prefixCls}-extra`}>{resolveComponent(extra)}</div>
      const renderContent = (
        <div
          class={{
            [`${prefixCls}-control`]: true,
            [`${prefixCls}-item-col-${wrapperCol}`]: enableCol && !!wrapperCol && label
          }}
        >
          <div class={`${prefixCls}-control-content`}>
            {addonBefore && (
              <div class={`${prefixCls}-addon-before`}>{resolveComponent(addonBefore)}</div>
            )}
            {
              <div
                class={{
                  [`${prefixCls}-control-content-component`]: true,
                  [`${prefixCls}-control-content-component-has-feedback-icon`]: !!feedbackIcon
                }}
                style={wrapperStyle}
              >
                {formatChildren}
                {feedbackIcon && (
                  <div class={`${prefixCls}-feedback-icon`}>
                    {typeof feedbackIcon === 'string' ? (
                      <i class={feedbackIcon} />
                    ) : (
                      resolveComponent(feedbackIcon)
                    )}
                  </div>
                )}
              </div>
            }
            {addonAfter && (
              <div class={`${prefixCls}-addon-after`}>{resolveComponent(addonAfter)}</div>
            )}
          </div>
          {renderFeedback}
          {renderExtra}
        </div>
      )
      return wrapSSR(
        <div
          data-grid-span={props.gridSpan}
          class={{
            [`${prefixCls}`]: true,
            [`${prefixCls}-layout-${layout}`]: true,
            [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
            [`${prefixCls}-feedback-has-text`]: !!feedbackText,
            [`${prefixCls}-size-${size}`]: !!size,
            [`${prefixCls}-feedback-layout-${feedbackLayout}`]: !!feedbackLayout,
            [`${prefixCls}-fullness`]: !!fullness || !!inset || !!feedbackIcon,
            [`${prefixCls}-inset`]: !!inset,
            [`${prefixCls}-active`]: active.value,
            [`${prefixCls}-inset-active`]: !!inset && active.value,
            [`${prefixCls}-label-align-${labelAlign}`]: true,
            [`${prefixCls}-control-align-${wrapperAlign}`]: true,
            [`${prefixCls}-label-wrap`]: !!labelWrap,
            [`${prefixCls}-control-wrap`]: !!wrapperWrap,
            [`${prefixCls}-bordered-none`]: bordered === false || !!inset || !!feedbackIcon,
            [`${hashId.value}`]: true
          }}
          onFocus={() => {
            if (feedbackIcon || inset) {
              active.value = true
            }
          }}
          onBlur={() => {
            if (feedbackIcon || inset) {
              active.value = false
            }
          }}
        >
          {renderLabel}
          {renderContent}
        </div>
      )
    }
  }
})

const Item = connect(
  FormBaseItem,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      const takeMessage = () => {
        const split = (messages: any[]) => {
          return messages.reduce((buf, text, index) => {
            if (!text) return buf
            return index < messages.length - 1 ? buf.concat([text, ', ']) : buf.concat([text])
          }, [])
        }
        if (field.validating) return
        if (props.feedbackText) return props.feedbackText
        if (field.selfErrors.length) return split(field.selfErrors)
        if (field.selfWarnings.length) return split(field.selfWarnings)
        if (field.selfSuccesses.length) return split(field.selfSuccesses)
      }
      const errorMessages = takeMessage()
      return {
        feedbackText: Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages,
        extra: props.extra || field.description
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      return {
        feedbackStatus:
          field.validateStatus === 'validating'
            ? 'pending'
            : (Array.isArray(field.decorator) && field.decorator[1]?.feedbackStatus) ||
              field.validateStatus
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props

      if (!field) return props
      let asterisk = false
      if (field.required && field.pattern !== 'readPretty') {
        asterisk = true
      }
      if ('asterisk' in props) {
        asterisk = props.asterisk
      }
      return {
        asterisk
      }
    }
  )
)

export const FormItem = composeExport(Item, {
  BaseItem: FormBaseItem
})

export default FormItem
