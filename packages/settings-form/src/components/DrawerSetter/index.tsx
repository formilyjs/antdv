import { defineComponent, ref, onMounted } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useField, FragmentComponent } from '@formily/vue'
import { FormLayout } from '@formily/antdv'
import { IconWidget, usePrefix } from '@formily/antdv-designable'
import { Button } from 'ant-design-vue'
import cls from 'classnames'
import './styles.less'

export const DrawerSetter = observer(
  defineComponent({
    props: ['text', 'children'],
    setup(props, { slots }) {
      const field = useField()
      const visible = ref(false)
      const remove = ref(false)
      const root = ref<Element>()
      const prefix = usePrefix('drawer-setter')
      const formWrapperCls = usePrefix('settings-form-wrapper')
      onMounted(() => {
        const wrapper = document.querySelector('.' + formWrapperCls.value)
        if (wrapper) {
          root.value = wrapper
        }
      })
      const renderDrawer = () => {
        if (root.value && visible.value) {
          return (
            <div
              class={cls(
                prefix.value,
                'animate__animated animate__slideInRight',
                {
                  animate__slideOutRight: remove.value,
                }
              )}
            >
              <div class={prefix.value + '-header'} onClick={handleClose}>
                <IconWidget infer="Return" size={18} />
                <span class={prefix.value + '-header-text'}>
                  {props.text || field.value.title}
                </span>
              </div>
              <div class={prefix.value + '-body'}>
                <FormLayout
                  colon={false}
                  labelWidth={120}
                  labelAlign="left"
                  wrapperAlign="right"
                  feedbackLayout="none"
                  tooltipLayout="text"
                >
                  {slots?.default?.()}
                </FormLayout>
              </div>
            </div>
          )
        }
        return null
      }

      const handleOpen = () => {
        visible.value = true
      }

      const handleClose = () => {
        remove.value = true
        setTimeout(() => {
          visible.value = false
          remove.value = false
        }, 150)
      }

      return () => (
        <FragmentComponent>
          <Button block onClick={handleOpen}>
            {props.text || field.value.title}
          </Button>
          {renderDrawer()}
        </FragmentComponent>
      )
    },
  })
)
