import {
  computed,
  defineComponent,
  onBeforeUnmount,
  provide,
  ref,
  shallowRef,
} from 'vue-demi'
import { Empty } from 'ant-design-vue'
import { createForm } from '@formily/core'
import { Form } from '@formily/antdv'
import {
  IconWidget,
  NodePathWidget,
  useCurrentNode,
  useOperation,
  usePrefix,
  useSelected,
  useWorkbench,
  useEffect,
} from '@formily/antdv-designable'
import { cancelIdle, requestIdle } from '@designable/shared'
import { SchemaField } from './SchemaField'
import { SettingsFormSymbol } from './shared/context'
import { useLocales, useSnapshot } from './effects'
import './styles.less'

// eslint-disable-next-line
const GlobalState = {
  idleRequest: null,
}

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

// className?: string
// style?: CSSProperties
// uploadAction?: string | (file) => Promise
// uploadMethod?: "post"
// components?: Record<string, VueComponent<any>>
// effects?: (form: Form) => void
// scope?: any

export const SettingsForm = defineComponent({
  name: 'DnSettingsForm',
  inheritAttrs: false,
  props: [
    'uploadAction',
    'headers',
    'uploadProps',
    'components',
    'effects',
    'scope',
  ],
  setup(props, { attrs }) {
    const workbenchRef = useWorkbench()
    const prefixRef = usePrefix('settings-form')

    const currentWorkspace =
      workbenchRef.value?.activeWorkspace ||
      workbenchRef.value?.currentWorkspace
    const currentWorkspaceId = currentWorkspace?.id

    const operationRef = useOperation(currentWorkspaceId)
    const nodeRef = useCurrentNode(currentWorkspaceId)
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

    useEffect(() => {
      idleTaskRef.value && cancelIdle(idleTaskRef.value)
      idleTaskRef.value = requestIdle(() => {
        formRef.value = createForm({
          initialValues: nodeRef.value?.designerProps?.defaultProps,
          values: nodeRef.value?.props,
          effects(form) {
            useLocales(nodeRef.value)
            useSnapshot(operationRef.value, keyupRef)
            props.effects?.(form)
          },
        })
      })
    }, [
      nodeRef,
      () => nodeRef.value?.props,
      schemaRef,
      operationRef,
      isEmptyRef,
    ])

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
                attrs={{
                  form: formRef.value,
                  colon: false,
                  labelWidth: 110,
                  labelAlign: 'left',
                  wrapperAlign: 'right',
                  feedbackLayout: 'none',
                  tooltipLayout: 'text',
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
          <div attrs={attrs} class={prefix + '-wrapper'}>
            {!isEmpty && <NodePathWidget workspaceId={currentWorkspaceId} />}
            <div class={prefix + '-content'}>{render()}</div>
          </div>
        </IconWidget.Provider>
      )
    }
  },
})
