import { createForm } from '@formily/core'
import { cancelIdle, requestIdle } from '@pind/designable-shared'
import { Form } from '@formily/antdv'
import {
  IconWidget,
  NodePathWidget,
  useEffect,
  useOperation,
  usePrefix,
  useSelected,
  useSelectedNode,
  useWorkbench
} from '@formily/antdv-designable'
import { Empty } from 'ant-design-vue'
import { computed, defineComponent, onBeforeUnmount, provide, ref, shallowRef } from 'vue'
import { SchemaField } from './SchemaField'
import { useLocales, useSnapshot } from './effects'
import { SettingsFormSymbol } from './shared/context'
import './styles.less'

function useKeyUp() {
  const keyboardRef = ref(false)

  const listener = () => {
    keyboardRef.value = true
  }
  window.addEventListener('keyup', listener)

  onBeforeUnmount(() => {
    window.removeEventListener('keyup', listener)
  })

  return keyboardRef
}

export const SettingsForm = defineComponent({
  name: 'DnSettingsForm',
  inheritAttrs: false,
  props: [
    'uploadAction',
    'uploadMethod',
    'uploadCustomRequest',
    'headers',
    'components',
    'effects',
    'scope'
  ],
  setup(props, { attrs }) {
    const workbenchRef = useWorkbench()
    const prefixRef = usePrefix('settings-form')

    const currentWorkspaceId = computed(() => {
      const currentWorkspace =
        workbenchRef.value?.activeWorkspace || workbenchRef.value?.currentWorkspace
      return currentWorkspace?.id
    })

    const operationRef = useOperation(currentWorkspaceId)
    const nodeRef = useSelectedNode(currentWorkspaceId)
    const selectedRef = useSelected(currentWorkspaceId)
    const keyupRef = useKeyUp()
    const idleTaskRef = ref(null)

    // [node, node?.props, schema, operation, isEmpty]
    const formRef = shallowRef()
    const schemaRef = computed(() => nodeRef.value?.designerProps?.propsSchema)
    const isEmptyRef = computed(
      () =>
        !(
          nodeRef.value &&
          nodeRef.value.designerProps?.propsSchema &&
          selectedRef.value.length === 1
        )
    )

    useEffect(
      () => {
        idleTaskRef.value && cancelIdle(idleTaskRef.value)
        idleTaskRef.value = requestIdle(() => {
          formRef.value = createForm({
            initialValues: nodeRef.value?.designerProps?.defaultProps,
            values: nodeRef.value?.props,
            effects(form) {
              useLocales(nodeRef.value)
              useSnapshot(operationRef.value, keyupRef)
              props.effects?.(form)
            }
          })
        })
      },
      () => [
        nodeRef.value,
        nodeRef.value?.props,
        schemaRef.value,
        operationRef.value,
        isEmptyRef.value
      ]
    )

    provide(
      SettingsFormSymbol,
      computed(() => props)
    )

    return () => {
      const node = nodeRef.value
      const prefix = prefixRef.value
      const schema = schemaRef.value
      const isEmpty = isEmptyRef.value
      const render = () => {
        if (!isEmpty && formRef.value) {
          return (
            <div class={prefix} key={node.id}>
              <Form
                {...{
                  form: formRef.value,
                  colon: false,
                  labelWidth: 110,
                  labelAlign: 'left',
                  wrapperAlign: 'right',
                  feedbackLayout: 'none',
                  tooltipLayout: 'text'
                }}
              >
                <SchemaField
                  schema={schema}
                  components={props.components}
                  scope={{ $node: node, ...props.scope }}
                />
              </Form>
            </div>
          )
        }
        return (
          <div class={prefix + '-empty'}>
            <Empty />
          </div>
        )
      }

      return (
        <IconWidget.Provider tooltip>
          <div
            {...{
              attrs
            }}
            class={prefix + '-wrapper'}
          >
            {!isEmpty && <NodePathWidget workspaceId={currentWorkspaceId} />}
            <div class={prefix + '-content'}>{render()}</div>
          </div>
        </IconWidget.Provider>
      )
    }
  }
})
