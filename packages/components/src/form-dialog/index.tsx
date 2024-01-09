import type { Form, IFormProps } from '@formily/core'
import { createForm } from '@formily/core'
import { toJS } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import type { IMiddleware } from '@formily/shared'
import { applyMiddleware, isBool, isFn, isNum, isStr } from '@formily/shared'
import { FormProvider } from '@formily/vue'
import type { ModalProps } from 'ant-design-vue'
import { Button, Modal } from 'ant-design-vue'
import type { App, Component, VNode } from 'vue'
import { Teleport, createApp, defineComponent, ref } from 'vue'
import {
  createPortalProvider,
  getPortalContext,
  isValidElement,
  loading,
  resolveComponent,
  usePrefixCls
} from '../__builtins__'

const PORTAL_TARGET_NAME = 'FormDialogFooter'

type FormDialogRenderer = VNode | ((ctx: { form: Form }) => VNode)

type ModalTitle = string | number | Component | VNode | (() => VNode)

const isModalTitle = (props: any): props is ModalTitle => {
  return isNum(props) || isStr(props) || isBool(props) || isValidElement(props)
}

const getModelProps = (props: any): IModalProps => {
  if (isModalTitle(props)) {
    return {
      title: props
    } as IModalProps
  } else {
    return props
  }
}

export interface IFormDialog {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDialog
  forConfirm(middleware: IMiddleware<Form>): IFormDialog
  forCancel(middleware: IMiddleware<Form>): IFormDialog
  open(props?: IFormProps): Promise<any>
  close(): void
}

export interface IModalProps extends ModalProps {
  onOk?: (event?: MouseEvent) => void | boolean
  onCancel?: (event?: MouseEvent) => void | boolean
  loadingText?: string
}

export function FormDialog(
  title: IModalProps,
  id: string,
  renderer: FormDialogRenderer
): IFormDialog
export function FormDialog(title: IModalProps, renderer: FormDialogRenderer): IFormDialog
export function FormDialog(title: ModalTitle, id: string, renderer: FormDialogRenderer): IFormDialog
export function FormDialog(title: ModalTitle, renderer: FormDialogRenderer): IFormDialog

export function FormDialog(
  title: ModalTitle | IModalProps,
  id: string | FormDialogRenderer,
  renderer?: FormDialogRenderer
): IFormDialog {
  if (isFn(id) || isValidElement(id)) {
    renderer = id as FormDialogRenderer
    id = 'form-dialog'
  }

  const prefixCls = usePrefixCls('formily-form-dialog')
  const env = {
    root: document.createElement('div'),
    form: null,
    promise: null,
    instance: null as App,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: []
  }

  document.body.appendChild(env.root)

  const props = getModelProps(title)

  const dialogProps: IModalProps = {
    ...props,
    afterClose: () => {
      props.afterClose?.()
      setTimeout(() => {
        env.instance.unmount()
        env.instance = null
        env.root = undefined
      }, 500)
    }
  }

  const DialogContent = observer(
    defineComponent({
      setup() {
        return () => <>{resolveComponent(renderer, { form: env.form })}</>
      }
    })
  )
  const openRef = ref(false)

  const renderDialog = (visible = true, resolve?: () => any, reject?: () => any) => {
    if (!env.instance) {
      const ComponentConstructor = observer(
        defineComponent({
          props: ['dialogProps'],
          setup(props) {
            return () => {
              const {
                onOk,
                onCancel,
                title,
                footer,
                okText = '确定',
                okType = 'primary',
                okButtonProps,
                cancelButtonProps,
                cancelText = '取消',
                ...dialogProps
              } = props.dialogProps

              const renderFooter = () => {
                const FooterPortalTarget = <div id={PORTAL_TARGET_NAME}></div>

                if (footer === null) {
                  return FooterPortalTarget
                } else if (footer) {
                  return (
                    <>
                      {resolveComponent(footer)}
                      {FooterPortalTarget}
                    </>
                  )
                }
                return (
                  <>
                    <Button
                      {...cancelButtonProps}
                      onClick={(e) => {
                        onCancel?.(e)
                        reject()
                      }}
                    >
                      {resolveComponent(cancelText)}
                    </Button>
                    <Button
                      {...okButtonProps}
                      type={okType}
                      loading={env.form.submitting}
                      onClick={(e) => {
                        onOk?.(e)
                        resolve()
                      }}
                    >
                      {resolveComponent(okText)}
                    </Button>
                    {FooterPortalTarget}
                  </>
                )
              }
              return (
                <Modal
                  class={prefixCls}
                  {...dialogProps}
                  open={openRef.value}
                  onUpdate:open={(val) => {
                    openRef.value = val
                  }}
                  onCancel={(e) => {
                    if (onCancel?.(e) !== false) {
                      reject?.()
                    }
                  }}
                  onOk={(e) => {
                    if (onOk?.(e) !== false) {
                      resolve?.()
                    }
                  }}
                  title={resolveComponent(title)}
                  footer={renderFooter()}
                >
                  <FormProvider form={env.form}>
                    <DialogContent />
                  </FormProvider>
                </Modal>
              )
            }
          }
        })
      )

      const app = createApp({
        render() {
          const target = getPortalContext(id as string)
          if (target) {
            return (
              <Teleport to={`#${id}`}>
                <ComponentConstructor dialogProps={dialogProps}></ComponentConstructor>
              </Teleport>
            )
          }
          return <ComponentConstructor dialogProps={dialogProps}></ComponentConstructor>
        }
      })
      app.mount(env.root)
      env.instance = app
    }
    openRef.value = visible
  }

  const formDialog = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }
      return formDialog
    },
    forConfirm: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware)
      }
      return formDialog
    },
    forCancel: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware)
      }
      return formDialog
    },
    open: async (props: IFormProps) => {
      if (env.promise) return env.promise
      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(dialogProps.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares)
          )
          env.form = env.form || createForm(props)
        } catch (e) {
          reject(e)
        }

        renderDialog(
          true,
          () => {
            env.form
              .submit(async () => {
                await applyMiddleware(env.form, env.confirmMiddlewares)
                resolve(toJS(env.form.values))
                formDialog.close()
              })
              .catch(reject)
          },
          async () => {
            await loading(dialogProps.loadingText, () =>
              applyMiddleware(env.form, env.cancelMiddlewares)
            )
            formDialog.close()
          }
        )
      })
      return env.promise
    },
    close: () => {
      if (!env.root) return
      renderDialog(false)
    }
  }
  return formDialog
}

const DialogFooter = defineComponent({
  name: 'DialogFooter',
  setup(props, { slots }) {
    return () => {
      return <Teleport to={PORTAL_TARGET_NAME}>{slots.default?.()}</Teleport>
    }
  }
})

FormDialog.Footer = DialogFooter
FormDialog.Portal = createPortalProvider('form-dialog')

export default FormDialog
