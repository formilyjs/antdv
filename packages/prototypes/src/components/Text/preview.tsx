import { createBehavior, createResource } from '@pind/designable-core'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { defineComponent } from 'vue'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

export interface IDesignableTextProps {
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
  style?: Record<string, any>
  className?: string
}

export const Text = composeExport(
  defineComponent({
    props: ['mode', 'content'],
    setup(props, { attrs }) {
      const TagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode
      return () => {
        return (
          <TagName
            class={'dn-text'}
            {...props}
            {...{
              ...attrs,
              'data-content-editable': 'x-component-props.content'
            }}
          >
            {props.content}
          </TagName>
        )
      }
    }
  }),
  {
    Behavior: createBehavior({
      name: 'Text',
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === 'Text',
      designerProps: {
        propsSchema: createVoidFieldSchema(AllSchemas.Text)
      },
      designerLocales: AllLocales.Text
    }),

    Resource: createResource({
      icon: 'TextSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'string',
            'x-component': 'Text'
          }
        }
      ]
    })
  }
)
