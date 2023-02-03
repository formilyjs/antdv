import { InputNumber } from 'ant-design-vue'
import { defineComponent } from 'vue-demi'
import { createPolyInput } from '../PolyInput'

const takeNumber = (value: any) => {
  const num = String(value)
    .trim()
    .replace(/[^\d\.]+/, '')
  if (num === '') return
  return Number(num)
}

const createUnitType = (type: string) => {
  return {
    type,
    component: defineComponent({
      name: 'DnUnitType',
      props: ['value'],
      emits: ['change'],
      setup(props, { attrs, emit }) {
        return () => {
          return (
            <InputNumber
              value={props.value}
              attrs={attrs}
              props={{ 'controls-position': 'right', ...props }}
              onChange={(cb) => {
                emit('change', cb)
              }}
            ></InputNumber>
          )
        }
      },
    }),
    checker(value: any) {
      return String(value).includes(type)
    },
    toInputValue(value: any) {
      return takeNumber(value)
    },
    toChangeValue(value: any) {
      return `${value || 0}${type}`
    },
  }
}

const createSpecialSizeOption = (type: string) => ({
  type: type,
  checker(value: any) {
    if (value === type) return true
    return false
  },
  toChangeValue() {
    return type
  },
})

const NormalSizeOptions = [
  createSpecialSizeOption('inherit'),
  createSpecialSizeOption('auto'),
  createUnitType('px'),
  createUnitType('%'),
  createUnitType('vh'),
  createUnitType('em'),
  createUnitType('rem'),
]

export const SizeInput = createPolyInput(NormalSizeOptions)

export const BackgroundSizeInput = createPolyInput([
  createSpecialSizeOption('cover'),
  createSpecialSizeOption('contain'),
  createUnitType('px'),
  createUnitType('%'),
  createUnitType('vh'),
  createUnitType('em'),
  createUnitType('rem'),
])
