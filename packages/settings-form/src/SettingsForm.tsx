import { createForm } from '@formily/core'
import { Form as ElForm } from '@formily/antdv'
import { observe } from '@formily/reactive'
import {
  IconWidget,
  NodePathWidget,
  useCurrentNode,
  useOperation,
  usePrefix,
  useSelected,
  useWorkbench,
} from '@formily/antdv-designable'
import { Empty } from 'ant-design-vue'
import cls from 'classnames'
import './styles.less'
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  watch,
} from 'vue-demi'
import { uid, cancelIdle, requestIdle } from '@designable/shared'
import { SchemaField } from './SchemaField'
import { SettingsFormSymbol } from './shared/context'
import { useLocales, useSnapshot } from './effects'
// eslint-disable-next-line
const GlobalState = {
  idleRequest: null,
}
// className?: string
// style?: CSSProperties
// uploadAction?: string
// components?: Record<string, VueComponent<any>>
// effects?: (form: Form) => void
// scope?: any
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
  props: ['uploadAction', 'components', 'effects', 'scope', 'headers'],
  setup(props) {
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
    const sources = reactive({
      key: nodeRef.value.id,
      schema: nodeRef.value?.designerProps?.propsSchema,
      isEmpty: !(
        nodeRef.value &&
        nodeRef.value.designerProps?.propsSchema &&
        selectedRef.value.length === 1
      ),
    })

    // [node, node?.props, schema, operation, isEmpty]
    const formRef = ref()

    const requestIdleTask = () => {
      cancelIdle(idleTaskRef.value)
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
        sources.key = nodeRef.value.id
        sources.schema = nodeRef.value?.designerProps?.propsSchema
        sources.isEmpty = !(
          nodeRef.value &&
          nodeRef.value.designerProps?.propsSchema &&
          selectedRef.value.length === 1
        )
      })
    }
    requestIdleTask()

    // observe(nodeRef.value, () => {
    //   nextTick(() => {
    //     requestIdleTask()
    //   })
    // })

    watch(selectedRef, () => {
      nextTick(() => {
        requestIdleTask()
      })
    })

    provide(
      SettingsFormSymbol,
      computed(() => props)
    )

    return () => {
      const prefix = prefixRef.value
      const render = () => {
        if (!sources.isEmpty && formRef.value) {
          return (
            <div class={cls(prefix)} key={sources.key}>
              <ElForm
                // key={uid()}
                form={formRef.value}
                labelWidth={110}
                labelAlign="left"
                wrapperAlign="right"
                feedbackLayout="none"
                tooltipLayout="text"
              >
                <SchemaField
                  schema={sources.schema}
                  components={props.components}
                  scope={props.scope}
                />
              </ElForm>
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
          <div class={prefix + '-wrapper'}>
            {!sources.isEmpty && (
              <NodePathWidget workspaceId={currentWorkspaceId} />
            )}
            <div class={prefix + '-content'}>{render()}</div>
          </div>
        </IconWidget.Provider>
      )
    }
  },
})
