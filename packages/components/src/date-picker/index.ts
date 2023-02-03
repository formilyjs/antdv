import { DatePicker as AntdDatePicker } from 'ant-design-vue'
import { connect, mapProps, mapReadPretty, h } from '@formily/vue'
import { composeExport, transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'

import type { DatePicker as AntdDatePickerProps } from 'ant-design-vue/types/date-picker/date-picker'

const mapDateFormat = function () {
  const getDefaultFormat = (props: AntdDatePickerProps) => {
    if (props['mode'] === 'month') {
      return 'YYYY-MM'
    } else if (props['mode'] === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (props['mode'] === 'year') {
      return 'YYYY'
    } else if (props['mode'] === 'week') {
      return 'gggg-wo'
    } else if (props['mode'] === 'time') {
      return 'HH:mm:ss'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any) => {
    const format = props.format || getDefaultFormat(props)
    const valueFormat = props.valueFormat || getDefaultFormat(props)

    return {
      ...props,
      format,
      valueFormat,
    }
  }
}

const TransformElDatePicker = transformComponent<AntdDatePickerProps>(
  AntdDatePicker,
  { change: 'panelChange' }
)

export const _DatePicker = connect(
  TransformElDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
)

export const _RangePicker = connect(
  AntdDatePicker.RangePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DateRangePicker)
)

export const _WeekPicker = connect(AntdDatePicker.WeekPicker)

export const _MonthPicker = connect(AntdDatePicker.MonthPicker)

export const DatePicker = composeExport(_DatePicker, {
  RangePicker: _RangePicker,
  WeekPicker: _WeekPicker,
  MonthPicker: _MonthPicker,
})

export default DatePicker
