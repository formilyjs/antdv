import { unref, defineComponent } from 'vue'
import { usePrefix } from '@formily/antdv-designable'
import { useField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { FoldItem } from '../FoldItem'
import { ColorInput } from '../ColorInput'
import { SizeInput } from '../SizeInput'
import { InputItems } from '../InputItems'

export interface IBoxShadowStyleSetterProps {
  value?: string
}

export const BoxShadowStyleSetter = observer(
  defineComponent({
    props: { value: String },
    setup(props, { attrs, emit }) {
      const fieldRef = useField()
      const prefixRef = usePrefix('shadow-style-setter')

      return () => {
        const field = unref(fieldRef)
        const prefix = unref(prefixRef)
        const createBoxShadowConnector = (position: number) => {
          const splited = String(props.value || '')
            .trim()
            .split(' ')
          const result = {
            value: splited[position] || '',
            onChange: (value: any) => {
              splited[position] = value
              emit(
                'change',
                `${splited[0] || ''} ${splited[1] || ''} ${splited[2] || ''} ${splited[3] || ''} ${
                  splited[4] || ''
                }`
              )
            }
          }
          return result
        }
        // TODO::响应式有点问题
        const connectors = [
          createBoxShadowConnector(0),
          createBoxShadowConnector(1),
          createBoxShadowConnector(2),
          createBoxShadowConnector(3),
          createBoxShadowConnector(4)
        ]
        return (
          <FoldItem class={prefix} label={field.title}>
            {{
              base: () => (
                <ColorInput
                  {...attrs}
                  value={connectors[4].value}
                  onChange={connectors[4].onChange}
                />
              ),
              extra: () => (
                <InputItems width="50%">
                  <InputItems.Item icon="AxisX">
                    <SizeInput
                      exclude={['auto']}
                      value={connectors[0].value}
                      onChange={connectors[0].onChange}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="AxisY">
                    <SizeInput
                      exclude={['auto']}
                      value={connectors[1].value}
                      onChange={connectors[1].onChange}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="Blur">
                    <SizeInput
                      exclude={['auto']}
                      value={connectors[2].value}
                      onChange={connectors[2].onChange}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="Shadow">
                    <SizeInput
                      exclude={['auto']}
                      value={connectors[3].value}
                      onChange={connectors[3].onChange}
                    />
                  </InputItems.Item>
                </InputItems>
              )
            }}
          </FoldItem>
        )
      }
    }
  })
)
