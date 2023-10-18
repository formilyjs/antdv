import { Switch } from '@formily/antdv'
import { defineComponent } from 'vue'

export interface IFormItemSwitcherProps {
  value?: string
}

export const FormItemSwitcher = defineComponent({
  props: { value: {} },
  emits: ['change'],
  setup(props, { emit }) {
    return () => {
      return (
        <Switch
          checked={props.value === 'FormItem'}
          onChange={(value) => {
            emit('change', value ? 'FormItem' : undefined)
          }}
        />
      )
    }
  }
})
