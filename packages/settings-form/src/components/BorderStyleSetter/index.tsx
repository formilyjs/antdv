import type { Field as FieldType } from '@formily/core'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { camelCase } from '@formily/shared'
import { Field, useField } from '@formily/vue'
import { usePrefix } from '@formily/antdv-designable'
import { defineComponent, unref } from 'vue'
import { ColorInput } from '../ColorInput'
import { FoldItem } from '../FoldItem'
import { Select } from '../FontStyleSetter/select'
import { PositionInput } from '../PositionInput'
import { SizeInput } from '../SizeInput'
import './styles.less'

const Positions = ['center', 'top', 'right', 'bottom', 'left']

const BorderStyleOptions = [
  {
    label: 'None',
    value: 'none'
  },
  {
    component: () => <span class="border-style-solid-line" />,
    label: 'solid',
    value: 'solid'
  },
  {
    component: () => <span class="border-style-dashed-line" />,
    label: 'dashed',
    value: 'dashed'
  },
  {
    component: () => <span class="border-style-dotted-line" />,
    label: 'dotted',
    value: 'dotted'
  }
]

const createBorderProp = (position: string, key: string) => {
  const insert = position === 'center' ? '' : `-${position}`
  return camelCase(`border${insert}-${key}`)
}

const parseInitPosition = (field: FieldType) => {
  const basePath = field.address.parent()
  for (let i = 0; i < Positions.length; i++) {
    const position = Positions[i]
    const stylePath = `${basePath}.${createBorderProp(position, 'style')}`
    const widthPath = `${basePath}.${createBorderProp(position, 'width')}`
    const colorPath = `${basePath}.${createBorderProp(position, 'color')}`
    if (
      field.query(stylePath).value() ||
      field.query(widthPath).value() ||
      field.query(colorPath).value()
    ) {
      return position
    }
  }
  return 'center'
}

export const BorderStyleSetter = observer(
  defineComponent({
    setup() {
      const prefixRef = usePrefix('border-style-setter')
      const fieldRef = useField<FieldType>()
      const currentPosition = observable({
        value: parseInitPosition(fieldRef.value)
      })
      return () => {
        const prefix = unref(prefixRef)
        const field = unref(fieldRef)
        const createReaction = (position: string) => (field: FieldType) => {
          field.display = currentPosition.value === position ? 'visible' : 'hidden'
          if (position !== 'center') {
            const borderStyle = field.query('.borderStyle').value()
            const borderWidth = field.query('.borderWidth').value()
            const borderColor = field.query('.borderColor').value()
            if (borderStyle || borderWidth || borderColor) {
              field.value = undefined
            }
          }
        }
        return (
          <FoldItem label={field.title}>
            {{
              extra: () => (
                <div class={prefix}>
                  <div class={prefix + '-position'}>
                    <PositionInput
                      value={currentPosition.value}
                      onChange={(value) => {
                        currentPosition.value = value
                      }}
                    />
                  </div>
                  <div>
                    {Positions.map((position, key) => {
                      return (
                        <div
                          class={prefix + '-input'}
                          key={key}
                          style={{
                            display: currentPosition.value == position ? 'block' : 'none'
                          }}
                        >
                          <Field
                            name={createBorderProp(position, 'style')}
                            basePath={field.address.parent()}
                            dataSource={BorderStyleOptions}
                            reactions={createReaction(position)}
                            component={[Select, { placeholder: 'Please Select' }]}
                          />
                          <Field
                            name={createBorderProp(position, 'width')}
                            basePath={field.address.parent()}
                            reactions={createReaction(position)}
                            component={[SizeInput, { exclude: ['auto'] }]}
                          />
                          <Field
                            name={createBorderProp(position, 'color')}
                            basePath={field.address.parent()}
                            reactions={createReaction(position)}
                            component={[ColorInput]}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }}
          </FoldItem>
        )
      }
    }
  })
)
