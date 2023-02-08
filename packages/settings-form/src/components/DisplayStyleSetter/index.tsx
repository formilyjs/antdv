import { defineComponent, unref } from 'vue-demi'
import { Radio } from 'ant-design-vue'
import { useField, Field } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { FormItem } from '@formily/antdv'
import { usePrefix, IconWidget, useStyle } from '@formily/antdv-designable'
import { FlexStyleSetter } from '../FlexStyleSetter'
import './styles.less'

import type { VueComponent } from '@formily/vue'
import type { Field as FieldType } from '@formily/core'

export interface IDisplayStyleSetterProps {
  value?: string
}

export const DisplayStyleSetter = observer(
  defineComponent({
    props: {
      value: { type: String },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const prefixRef = usePrefix('display-style-setter')
      const fieldRef = useField<FieldType>()

      return () => {
        const prefix = unref(prefixRef)
        const field = unref(fieldRef)
        const style = useStyle()

        return (
          <div>
            <FormItem.BaseItem
              class={prefix}
              style={style}
              attrs={{
                label: field.title,
              }}
            >
              <Radio.Group
                class={prefix + '-radio'}
                props={{
                  value: props.value,
                  size: 'small',
                }}
                onChange={(e) => {
                  emit('change', e)
                }}
                onInput={() => ({})}
              >
                <Radio.Button value={'block'}>
                  <IconWidget infer="DisplayBlock" size={16} />
                </Radio.Button>
                <Radio.Button value={'inline-block'}>
                  <IconWidget infer="DisplayInlineBlock" size={16} />
                </Radio.Button>
                <Radio.Button value={'inline'}>
                  <IconWidget infer="DisplayInline" size={16} />
                </Radio.Button>
                <Radio.Button value={'flex'}>
                  <IconWidget infer="DisplayFlex" size={16} />
                </Radio.Button>
              </Radio.Group>
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
          </div>
        )
      }
    },
  })
) as VueComponent
