import { observer } from '@formily/reactive-vue'
import { Field, useField } from '@formily/vue'
import { FormItem } from '@formily/antdv'
import { IconWidget, usePrefix, useStyle } from '@formily/antdv-designable'
import { Radio } from 'ant-design-vue'
import { defineComponent, unref } from 'vue'
// eslint-disable-next-line import/order
import { FlexStyleSetter } from '../FlexStyleSetter'
import './styles.less'

import type { Field as FieldType } from '@formily/core'
import type { VueComponent } from '@formily/vue'

export interface IDisplayStyleSetterProps {
  value?: string
}

export const DisplayStyleSetter = observer(
  defineComponent({
    props: {
      value: { type: String }
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
            <FormItem.BaseItem class={prefix} style={style} label={field.title}>
              <Radio.Group
                class={prefix + '-radio'}
                {...{
                  value: props.value,
                  size: 'small'
                }}
                onChange={(e) => {
                  emit('change', e)
                }}
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
    }
  })
) as VueComponent
