import { Switch } from '@formily/antdv'
import { defineComponent } from 'vue-demi'

export interface IFormItemSwitcherProps {
  value?: string
  // onChange?: (value: string) => void
}

export const FormItemSwitcher: Vue.Component<
  any,
  any,
  any,
  IFormItemSwitcherProps
> = defineComponent({
  props: { value: {} },
  emits: ['change'],
  setup(props, { emit }) {
    return () => {
      return (
        <Switch
          value={props.value === 'FormItem'}
          onChange={(value) => {
            emit('change', value ? 'FormItem' : undefined)
          }}
        />
      )
    }
  },
})
