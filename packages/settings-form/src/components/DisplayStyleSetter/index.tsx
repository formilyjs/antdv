import type { VueComponent } from '@formily/vue'
import { useField, Field, FragmentComponent } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { FormItem } from '@formily/antdv'
import { RadioButton, RadioGroup } from 'ant-design-vue'
import { usePrefix, IconWidget, useStyle } from '@formily/antdv-designable'
import { FlexStyleSetter } from '../FlexStyleSetter'
import cls from 'classnames'
import './styles.less'
import { defineComponent, unref } from 'vue-demi'

export interface IDisplayStyleSetterProps {
  value?: string
}

export const DisplayStyleSetter = observer(
  defineComponent({
    props: {
      value: { type: String },
    },
    setup(props, { emit }) {
      const prefixRef = usePrefix('display-style-setter')
      const fieldRef = useField<Formily.Core.Models.Field>()

      return () => {
        const prefix = unref(prefixRef)
        const field = unref(fieldRef)
        const style = useStyle()

        return (
          <FragmentComponent>
            <FormItem.BaseItem
              label={field.title}
              class={cls(prefix)}
              style={style}
            >
              <RadioGroup
                class={prefix + '-radio'}
                value={props.value}
                size="mini"
                vOn:input={(e) => {
                  emit('change', e)
                }}
              >
                <RadioButton props={{ label: 'block' }}>
                  <IconWidget infer="DisplayBlock" size={16} />
                </RadioButton>
                <RadioButton props={{ label: 'inline-block' }}>
                  <IconWidget infer="DisplayInlineBlock" size={16} />
                </RadioButton>
                <RadioButton props={{ label: 'inline' }}>
                  <IconWidget infer="DisplayInline" size={16} />
                </RadioButton>
                <RadioButton props={{ label: 'flex' }}>
                  <IconWidget infer="DisplayFlex" size={16} />
                </RadioButton>
              </RadioGroup>
            </FormItem.BaseItem>
            <Field
              name="flex"
              basePath={field.address.parent()}
              visible={false}
              reactions={(flexField) => {
                flexField.visible = field.value === 'flex'
              }}
              component={[FlexStyleSetter]}
            />
          </FragmentComponent>
        )
      }
    },
  })
) as VueComponent<IDisplayStyleSetterProps>
