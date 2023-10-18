import { defineComponent, unref } from 'vue'
import { useField, Field } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { usePrefix } from '@formily/antdv-designable'
import { Select, Input } from '@formily/antdv'
import { FoldItem } from '../FoldItem'
import { ColorInput } from '../ColorInput'
import { BackgroundSizeInput } from '../SizeInput'
import { BackgroundImageInput } from '../ImageInput'
import { InputItems } from '../InputItems'

export const BackgroundStyleSetter = observer(
  defineComponent({
    setup(props, { attrs }) {
      const fieldRef = useField()
      const prefixRef = usePrefix('background-style-setter')

      return () => {
        const field = unref(fieldRef)
        return (
          <FoldItem class={prefixRef.value} label={field.title}>
            {{
              base: () => (
                <Field
                  name="backgroundColor"
                  basePath={field.address.parent()}
                  component={[ColorInput, attrs]}
                />
              ),
              extra: () => (
                <InputItems>
                  <InputItems.Item icon="Image">
                    <Field
                      name="backgroundImage"
                      basePath={field.address.parent()}
                      component={[BackgroundImageInput]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="ImageSize" width="50%">
                    <Field
                      name="backgroundSize"
                      basePath={field.address.parent()}
                      component={[BackgroundSizeInput]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="Repeat" width="50%">
                    <Field
                      name="backgroundRepeat"
                      basePath={field.address.parent()}
                      component={[Select, { style: { width: '100%' }, placeholder: 'Repeat' }]}
                      dataSource={[
                        {
                          label: 'No Repeat',
                          value: 'no-repeat'
                        },
                        {
                          label: 'Repeat',
                          value: 'repeat'
                        },
                        {
                          label: 'Repeat X',
                          value: 'repeat-x'
                        },
                        {
                          label: 'Repeat Y',
                          value: 'repeat-y'
                        },
                        {
                          label: 'Space',
                          value: 'space'
                        },
                        {
                          label: 'Round',
                          value: 'round'
                        }
                      ]}
                    />
                  </InputItems.Item>
                  <InputItems.Item icon="Position">
                    <Field
                      name="backgroundPosition"
                      basePath={field.address.parent()}
                      component={[Input, { placeholder: 'center center' }]}
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
