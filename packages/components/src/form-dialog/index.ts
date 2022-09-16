import { Button, Modal } from 'ant-design-vue'
import type { Modal as ModalProps } from 'ant-design-vue/types/modal'
import { FormProvider, h, Fragment } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import type { IMiddleware } from '@formily/shared'
import { isNum, isStr, isBool, isFn, applyMiddleware } from '@formily/shared'
import { toJS } from '@formily/reactive'
import type { Form, IFormProps } from '@formily/core'
import { createForm } from '@formily/core'
import type { Component, VNode } from 'vue'
import Vue from 'vue'
import { stylePrefix } from '../__builtins__/configs'
import { defineComponent } from 'vue-demi'
import { Portal, PortalTarget } from 'portal-vue'

import {
  isValidElement,
  resolveComponent,
  createPortalProvider,
  getProtalContext,
  loading,
} from '../__builtins__/shared'

const PORTAL_TARGET_NAME = 'FormDialogFooter'

type FormDialogRenderer = VNode | ((form: Form) => VNode)

type ModalTitle = string | number | Component | VNode | (() => VNode)

const isModalTitle = (props: any): props is ModalTitle => {
  return isNum(props) || isStr(props) || isBool(props) || isValidElement(props)
}

const getModelProps = (props: any): IModalProps => {
  if (isModalTitle(props)) {
    return {
      title: props,
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
export function FormDialog(
  title: IModalProps,
  renderer: FormDialogRenderer
): IFormDialog
export function FormDialog(
  title: ModalTitle,
  id: string,
  renderer: FormDialogRenderer
): IFormDialog
export function FormDialog(
  title: ModalTitle,
  renderer: FormDialogRenderer
): IFormDialog

export function FormDialog(
  title: ModalTitle | IModalProps,
  id: string | symbol | FormDialogRenderer,
  renderer?: FormDialogRenderer
): IFormDialog {
  if (isFn(id) || isValidElement(id)) {
    renderer = id as FormDialogRenderer
    id = 'form-dialog'
  }

  const prefixCls = `${stylePrefix}-form-dialog`
  const env = {
    root: document.createElement('div'),
    form: null,
    promise: null,
    instance: null,
    openMiddlewares: [],
    confirmMiddlewares: [],
    cancelMiddlewares: [],
  }

  document.body.appendChild(env.root)
  const props = getModelProps(title)

  const dialogProps = {
    ...props,
    afterClose: () => {
      props.afterClose?.()
      env.instance.$destroy()
      env.instance = null
      env.root?.parentNode?.removeChild(env.root)
      env.root = undefined
    },
  }

  const DialogContent = observer(
    // eslint-disable-next-line vue/one-component-per-file
    defineComponent({
      setup() {
        return () =>
          h(
            Fragment,
            {},
            {
              default: () => resolveComponent(renderer, { form: env.form }),
            }
          )
      },
    })
  )

  const renderDialog = (
    visible = true,
    resolve?: () => any,
    reject?: () => any
  ) => {
    if (!env.instance) {
      // eslint-disable-next-line vue/one-component-per-file
      const ComponentConstructor = observer(
        Vue.extend({
          props: ['dialogProps'],
          data() {
            return {
              visible: false,
            }
          },
          render() {
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
            } = this.dialogProps
            return h(
              Modal,
              {
                class: prefixCls,
                props: {
                  ...dialogProps,
                  visible: this.visible,
                },
                on: {
                  'update:visible': (val) => {
                    this.visible = val
                  },
                  cancel: (e) => {
                    if (onCancel?.(e) !== false) {
                      reject?.()
                    }
                  },
                  ok: (e) => {
                    if (onOk?.(e) !== false) {
                      resolve?.()
                    }
                  },
                },
              },
              {
                default: () =>
                  h(
                    FormProvider,
                    {
                      props: {
                        form: env.form,
                      },
                    },
                    {
                      default: () => [h(DialogContent, {}, {})],
                    }
                  ),
                title: () =>
                  h(Fragment, {}, { default: () => resolveComponent(title) }),
                footer: () =>
                  h(
                    Fragment,
                    {},
                    {
                      default: () => {
                        const FooterProtalTarget = h(
                          PortalTarget,
                          {
                            props: {
                              name: PORTAL_TARGET_NAME,
                              slim: true,
                            },
                          },
                          {}
                        )
                        if (footer === null) {
                          return [null, FooterProtalTarget]
                        } else if (footer) {
                          return [resolveComponent(footer), FooterProtalTarget]
                        }
                        return [
                          h(
                            Button,
                            {
                              attrs: cancelButtonProps,
                              on: {
                                click: (e) => {
                                  onCancel?.(e)
                                  reject()
                                },
                              },
                            },
                            {
                              default: () => resolveComponent(cancelText),
                            }
                          ),
                          h(
                            Button,
                            {
                              attrs: {
                                ...okButtonProps,
                                type: okType,
                                loading: env.form.submitting,
                              },
                              on: {
                                click: (e) => {
                                  onOk?.(e)
                                  resolve()
                                },
                              },
                            },
                            {
                              default: () => resolveComponent(okText),
                            }
                          ),
                          FooterProtalTarget,
                        ]
                      },
                    }
                  ),
              }
            )
          },
        })
      )
      env.instance = new ComponentConstructor({
        propsData: {
          dialogProps,
        },
        parent: getProtalContext(id as string | symbol),
      })
      env.instance.$mount(env.root)
    }
    env.instance.visible = visible
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
    },
  }
  return formDialog
}

// eslint-disable-next-line vue/one-component-per-file
const DialogFooter = defineComponent({
  name: 'DialogFooter',
  setup(props, { slots }) {
    return () => {
      return h(
        Portal,
        {
          props: {
            to: PORTAL_TARGET_NAME,
          },
        },
        slots
      )
    }
  },
})

FormDialog.Footer = DialogFooter
FormDialog.Portal = createPortalProvider('form-dialog')

export default FormDialog
