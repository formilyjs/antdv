import { Card as ElCard } from 'ant-design-vue'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { defineComponent } from 'vue-demi'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import type { DnFC } from '@formily/antdv-designable'
import type { VueComponent } from '@formily/vue'

export const Card: DnFC<VueComponent<typeof ElCard>> = composeExport(
  defineComponent({
    props: { title: {} },
    setup(props, { slots }) {
      return () => {
        return (
          <ElCard {...props}>
            <span data-content-editable="x-component-props.title" slot="header">
              {props.title}
            </span>
            {slots.default?.()}
          </ElCard>
        )
      }
    },
  }),
  {
    Behavior: createBehavior({
      name: 'Card',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'Card',
      designerProps: {
        droppable: true,
        propsSchema: createVoidFieldSchema(AllSchemas.Card),
      },
      designerLocales: AllLocales.Card,
    }),
    Resource: createResource({
      icon: 'CardSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Card',
            'x-component-props': {
              title: 'Title',
            },
          },
        },
      ],
    }),
  }
)
