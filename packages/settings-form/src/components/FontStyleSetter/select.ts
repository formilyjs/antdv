import { connect, mapProps, h, mapReadPretty } from '@formily/vue'
import { defineComponent } from '@vue/composition-api'
import { PreviewText } from '@formily/antdv'
import { Select as ElSelect, Option as ElOption } from 'ant-design-vue'
import { resolveComponent } from '@formily/antdv/esm/__builtins__'
import type {
  Select as ElSelectProps,
  Option as ElOptionProps,
} from 'ant-design-vue'
export type SelectProps = ElSelectProps & {
  options?: Array<ElOptionProps & { component: Vue.Component }>
}

const SelectOption = defineComponent<SelectProps>({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots, listeners }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      ElOption,
                      { props: { value: option, label: option } },
                      {
                        default: () => [
                          resolveComponent(slots?.option, { option }),
                        ],
                      }
                    )
                  } else {
                    return h(
                      ElOption,
                      {
                        props: {
                          ...option,
                        },
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? option.component, {
                            option,
                          }),
                        ],
                      }
                    )
                  }
                }),
            }
          : slots
      return h(
        ElSelect,
        {
          attrs: {
            ...attrs,
          },
          on: listeners,
        },
        children
      )
    }
  },
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
