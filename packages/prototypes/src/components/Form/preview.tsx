import { createBehavior, createResource } from '@designable/core'
import { createForm } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { Form as FormilyForm } from '@formily/antdv'
import { usePrefix } from '@formily/antdv-designable'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { computed, defineComponent, unref } from 'vue-demi'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

const FormComponent = observer(
  defineComponent({
    name: 'DnForm',
    setup(props, { slots, attrs }) {
      const prefix = usePrefix('designable-form')
      const formRef = computed(() =>
        createForm({
          designable: true,
        })
      )
      return () => {
        const form = unref(formRef)

        return (
          <FormilyForm class={prefix.value} form={form} attrs={attrs}>
            {slots.default?.()}
          </FormilyForm>
        )
      }
    },
  })
)

export const Form = composeExport(FormComponent, {
  Behavior: createBehavior({
    name: 'Form',
    selector: (node) => node.componentName === 'Form',
    designerProps(node) {
      return {
        draggable: !node.isRoot,
        cloneable: !node.isRoot,
        deletable: !node.isRoot,
        droppable: true,
        propsSchema: AllSchemas.Form,
        defaultProps: {
          labelCol: 6,
          wrapperCol: 12,
          colon: false,
          feedbackLayout: 'loose',
          size: 'default',
          layout: 'horizontal',
          tooltipLayout: 'icon',
          labelAlign: 'right',
          wrapperAlign: 'left',
          shallow: true,
          bordered: true,
        },
      }
    },
    designerLocales: AllLocales.Form,
  }),
  Resource: createResource({
    title: { 'zh-CN': '表单', 'en-US': 'Form' },
    icon: 'FormLayoutSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'object',
          'x-component': 'Form',
        },
      },
    ],
  }),
})
