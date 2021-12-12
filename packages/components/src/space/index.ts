import { Space as AntSpace } from 'ant-design-vue'
import { h } from '@formily/vue'
import type { Space as AntSpaceProps } from 'ant-design-vue/types/space'
import { useFormLayout } from '../form-layout'

import { defineComponent } from '@vue/composition-api'

export const Space = defineComponent<AntSpaceProps>({
  name: 'Space',
  props: ['size', 'align', 'direction'],
  setup(props, { slots }) {
    const layout = useFormLayout()

    return () => {
      return h(
        AntSpace,
        {
          ...props,
          size: props.size || layout.value?.spaceGap,
        },
        slots
      )
    }
  },
})

export default Space
