import { IconWidget } from '@formily/antdv-designable'
import { defineComponent } from 'vue'
import { BoxStyleSetter } from '../BoxStyleSetter'
export interface IBorderRadiusStyleSetterProps {
  value?: string
  onChange?: (value: string) => void
}

export const BorderRadiusStyleSetter: Vue.Component<IBorderRadiusStyleSetterProps> =
  defineComponent({
    props: { value: String },
    emits: ['change'],
    setup(props, { emit }) {
      return () => {
        return (
          <BoxStyleSetter
            value={props.value}
            onChange={(value) => emit('change', value)}
            labels={[
              <IconWidget infer="TopLeft" size={16} />,
              <IconWidget infer="TopRight" size={16} />,
              <IconWidget infer="BottomRight" size={16} />,
              <IconWidget infer="BottomLeft" size={16} />
            ]}
          />
        )
      }
    }
  })
