import { FormGrid as FormilyGird } from '@formily/antdv'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from '@formily/antdv-designable'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { defineComponent } from 'vue-demi'
import { LoadTemplate } from '../../common/LoadTemplate'
import { createFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

export const FormGrid = composeExport(
  defineComponent({
    inheritAttrs: false,
    setup(props, { slots, attrs }) {
      const nodeRef = useTreeNode()
      const nodeIdRef = useNodeIdProps()

      return () => {
        if (nodeRef.value.children.length === 0)
          return <DroppableWidget attrs={attrs} />
        const totalColumns = nodeRef.value.children.reduce(
          (buf, child) =>
            buf + (child.props?.['x-component-props']?.gridSpan ?? 1),
          0
        )
        return (
          <div class="dn-grid" attrs={nodeIdRef.value}>
            <FormilyGird attrs={attrs} key={totalColumns}>
              {slots.default?.()}
            </FormilyGird>
            <LoadTemplate
              actions={[
                {
                  title: nodeRef.value.getMessage('addGridColumn'),
                  icon: 'AddColumn',
                  onClick: () => {
                    const column = new TreeNode({
                      componentName: 'Field',
                      props: {
                        type: 'void',
                        'x-component': 'FormGrid.GridColumn',
                      },
                    })
                    nodeRef.value.append(column)
                  },
                },
              ]}
            />
          </div>
        )
      }
    },
  }),
  {
    GridColumn: defineComponent({
      props: { gridSpan: { default: 1 } },
      setup(props, { attrs, slots }) {
        return () => {
          return (
            <DroppableWidget
              {...{
                attrs: attrs,
                style: {
                  gridColumnStart: `span ${props.gridSpan || 1}`,
                },
              }}
              data-span={props.gridSpan}
            >
              {slots.default?.()}
            </DroppableWidget>
          )
        }
      },
    }),
    Behavior: createBehavior(
      {
        name: 'FormGrid',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormGrid',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props['x-component'] !== 'FormGrid',
          propsSchema: createFieldSchema(AllSchemas.FormGrid),
        },
        designerLocales: AllLocales.FormGrid,
      },
      {
        name: 'FormGrid.GridColumn',
        extends: ['Field'],
        selector: (node) => node.props['x-component'] === 'FormGrid.GridColumn',
        designerProps: {
          droppable: true,
          allowDrop: (node) => node.props['x-component'] === 'FormGrid',
          propsSchema: createFieldSchema(AllSchemas.FormGrid.GridColumn),
        },
        designerLocales: AllLocales.FormGridColumn,
      }
    ),
    Resource: createResource({
      icon: 'GridSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid',
          },
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
              },
            },
          ],
        },
      ],
    }),
  }
)
