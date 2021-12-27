import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { DatePicker as AntdDatePicker } from 'ant-design-vue'
import type { DatePicker as AntdDatePickerProps } from 'ant-design-vue/types/date-picker/date-picker'
import { formatMomentValue, composeExport } from '../__builtins__'
import { PreviewText } from '../preview-text'

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
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any) => {
    const format = props['format'] || getDefaultFormat(props)
    const onChange = props.onChange
    return {
      ...props,
      format: format,
      valueFormat: props.valueFormat || getDefaultFormat(props),
      on: {
        change: (value: moment.Moment | moment.Moment[]) => {
          if (onChange) {
            onChange(formatMomentValue(value, format))
          }
        },
      },
    }
  }
}

export const _DatePicker = connect(
  AntdDatePicker,
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
