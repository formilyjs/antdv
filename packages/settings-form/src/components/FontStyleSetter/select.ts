import { connect, h, mapProps, mapReadPretty } from '@formily/vue'
import { PreviewText } from '@formily/antdv'
import { resolveComponent } from '@formily/antdv/esm/__builtins__'
import type { SelectProps as AntSelectProps } from 'ant-design-vue'
import { Select as AntSelect } from 'ant-design-vue'
import { defineComponent } from 'vue'

const AntOption = AntSelect.Option
type AntOptionProps = typeof AntOption

export type SelectProps = AntSelectProps & {
  options?: Array<AntOptionProps & { component: Vue.Component }>
}
const SelectOption = defineComponent({
  name: 'FSelect',
  props: ['options'],
  setup(customProps, { attrs, slots }) {
    return () => {
      const options = customProps.options || []
      const children =
        options.length !== 0
          ? {
              default: () =>
                options.map((option) => {
                  if (typeof option === 'string') {
                    return h(
                      AntOption,
                      { props: { value: option, label: option } },
                      {
                        default: () => [resolveComponent(slots?.option, { option })]
                      }
                    )
                  } else {
                    return h(
                      AntOption,
                      {
                        props: {
                          ...option
                        }
                      },
                      {
                        default: () => [
                          resolveComponent(slots?.option ?? (option.component || option.label), {
                            option
                          })
                        ]
                      }
                    )
                  }
                })
            }
          : slots
      return h(
        AntSelect,
        {
          ...attrs
        },
        children
      )
    }
  }
})

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
