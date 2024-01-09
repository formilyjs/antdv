import type { Form, IFormProps } from '@formily/core'
import { createForm } from '@formily/core'
import { toJS } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import type { IMiddleware } from '@formily/shared'
import { applyMiddleware, isBool, isFn, isNum, isStr } from '@formily/shared'
import { FormProvider } from '@formily/vue'
import type { DrawerProps } from 'ant-design-vue'
import { Button, Drawer, Space } from 'ant-design-vue'
import type { App, Component, VNode } from 'vue'
import { Teleport, createApp, defineComponent, ref } from 'vue'
import { usePrefixCls } from '../__builtins__'
import {
  createPortalProvider,
  getPortalContext,
  isValidElement,
  loading,
  resolveComponent
} from '../__builtins__/shared'

const PORTAL_TARGET_NAME = 'FormDrawerFooter'

type FormDrawerRenderer = VNode | ((ctx: { form: Form }) => VNode)

type DrawerTitle = string | number | Component | VNode | (() => VNode)

const isDrawerTitle = (props: any): props is DrawerTitle => {
  return isNum(props) || isStr(props) || isBool(props) || isValidElement(props)
}

const getDrawerProps = (props: any): IDrawerProps => {
  if (isDrawerTitle(props)) {
    return {
      title: props
    } as IDrawerProps
  } else {
    return props
  }
}

export interface IFormDrawer {
  forOpen(middleware: IMiddleware<IFormProps>): IFormDrawer
  forConfirm(middleware: IMiddleware<Form>): IFormDrawer
  forCancel(middleware: IMiddleware<Form>): IFormDrawer
  open(props?: IFormProps): Promise<any>
  close(): void
}

export interface IDrawerProps extends DrawerProps {
  onOk?: (event?: MouseEvent) => void | boolean
  onClose?: (event?: MouseEvent) => void | boolean
  loadingText?: string
}

export function FormDrawer(
  title: IDrawerProps,
  id: string,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(title: IDrawerProps, renderer: FormDrawerRenderer): IFormDrawer
export function FormDrawer(
  title: DrawerTitle,
  id: string,
  renderer: FormDrawerRenderer
): IFormDrawer
export function FormDrawer(title: DrawerTitle, renderer: FormDrawerRenderer): IFormDrawer

export function FormDrawer(
  title: DrawerTitle | IDrawerProps,
  id: string | symbol | FormDrawerRenderer,
  renderer?: FormDrawerRenderer
): IFormDrawer {
  if (isFn(id) || isValidElement(id)) {
    renderer = id as FormDrawerRenderer
    id = 'form-drawer'
  }

  const prefixCls = usePrefixCls('formily-form-drawer')
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
  const props = getDrawerProps(title)

  const drawerProps: IDrawerProps = {
    ...props,
    width: '40%',
    onClose: () => {
      props.onClose?.()
    },
    onAfterOpenChange: (visible: boolean) => {
      props?.onAfterOpenChange?.(visible)
      if (visible) return
      setTimeout(() => {
        env.instance.unmount()
        env.instance = null
        env.root?.parentNode?.removeChild(env.root)
        env.root = undefined
      }, 500)
    }
  }

  const DrawerContent = observer(
    defineComponent({
      setup() {
        return () => <>{resolveComponent(renderer, { form: env.form })}</>
      }
    })
  )
  const openRef = ref(false)

  const renderDrawer = (visible = true, resolve?: () => any, reject?: () => any) => {
    if (!env.instance) {
      const ComponentConstructor = observer(
        defineComponent({
          props: ['drawerProps'],

          setup(props) {
            return () => {
              const {
                onOk,
                onClose,
                title,
                footer,
                okText = '确定',
                okType = 'primary',
                okButtonProps,
                cancelButtonProps,
                cancelText = '取消',
                ...drawerProps
              } = props.drawerProps
              return (
                <Drawer
                  {...drawerProps}
                  class={prefixCls}
                  open={openRef.value}
                  // onUpdate:open={(val) => {
                  //   openRef.value = val
                  // }}
                  onClose={(e: MouseEvent) => {
                    if (onClose?.(e) !== false) {
                      reject?.()
                    }
                  }}
                  onOk={(e) => {
                    if (onOk?.(e) !== false) {
                      resolve?.()
                    }
                  }}
                  title={resolveComponent(title)}
                >
                  <FormProvider form={env.form}>
                    <div class={`${prefixCls}-body`}>
                      <DrawerContent></DrawerContent>
                    </div>
                    <div class={`${prefixCls}-footer`}>
                      <Space>
                        {footer === null ? (
                          <div id={PORTAL_TARGET_NAME}></div>
                        ) : footer ? (
                          <>
                            {resolveComponent(footer)}
                            <div id={PORTAL_TARGET_NAME}></div>
                          </>
                        ) : (
                          <>
                            <Button
                              {...cancelButtonProps}
                              onClick={(e) => {
                                onClose?.(e)
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
                            <div id={PORTAL_TARGET_NAME}></div>
                          </>
                        )}
                      </Space>
                    </div>
                  </FormProvider>
                </Drawer>
              )
            }
          }
        })
      )

      const app = createApp(
        {
          render() {
            const target = getPortalContext(id as string)
            if (target) {
              return (
                <Teleport to={`#${id as string}`}>
                  <ComponentConstructor drawerProps={drawerProps}></ComponentConstructor>
                </Teleport>
              )
            }
            return <ComponentConstructor drawerProps={drawerProps}></ComponentConstructor>
          }
        },
        {
          drawerProps
        }
      )
      env.instance = app
      app.mount(env.root)
    }
    openRef.value = visible
  }

  const formDrawer = {
    forOpen: (middleware: IMiddleware<IFormProps>) => {
      if (isFn(middleware)) {
        env.openMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forConfirm: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.confirmMiddlewares.push(middleware)
      }
      return formDrawer
    },
    forCancel: (middleware: IMiddleware<Form>) => {
      if (isFn(middleware)) {
        env.cancelMiddlewares.push(middleware)
      }
      return formDrawer
    },
    open: async (props: IFormProps) => {
      if (env.promise) return env.promise
      env.promise = new Promise(async (resolve, reject) => {
        try {
          props = await loading(drawerProps.loadingText, () =>
            applyMiddleware(props, env.openMiddlewares)
          )
          env.form = env.form || createForm(props)
        } catch (e) {
          reject(e)
        }

        renderDrawer(
          true,
          () => {
            env.form
              .submit(async () => {
                await applyMiddleware(env.form, env.confirmMiddlewares)
                resolve(toJS(env.form.values))
                formDrawer.close()
              })
              .catch(reject)
          },
          async () => {
            formDrawer.close()
          }
        )
      })
      return env.promise
    },
    close: () => {
      if (!env.root) return
      renderDrawer(false)
    }
  }
  return formDrawer
}

const DrawerFooter = defineComponent({
  name: 'DrawerFooter',
  setup(props, { slots }) {
    return () => {
      return <Teleport to={PORTAL_TARGET_NAME}>{slots.default?.()}</Teleport>
    }
  }
})

FormDrawer.Footer = DrawerFooter
FormDrawer.Portal = createPortalProvider('form-drawer')

export default FormDrawer
