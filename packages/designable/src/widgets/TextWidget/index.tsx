import { isStr, isPlainObj } from '@designable/shared'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/reactive-vue'
import { defineComponent } from 'vue-demi'
import { FragmentComponent as Fragment } from '@formily/vue'
import type { IDesignerMiniLocales } from '@designable/core'

export interface ITextWidgetProps {
  componentName?: string
  sourceName?: string
  token?: string | IDesignerMiniLocales
  defaultMessage?: string | IDesignerMiniLocales
}

const TextWidgetComponent = defineComponent({
  props: {
    componentName: String,
    sourceName: String,
    token: String,
    defaultMessage: String,
  },
  setup(props: ITextWidgetProps, { slots }) {
    const takeLocale = (message: string | IDesignerMiniLocales) => {
      if (isStr(message)) return message
      if (isPlainObj(message)) {
        const lang = GlobalRegistry.getDesignerLanguage()
        for (const key in message) {
          if (key.toLocaleLowerCase() === lang) return message[key]
        }
        return
      }
      return message
    }

    const takeMessage = (token: any) => {
      if (!token) return
      const message = isStr(token)
        ? GlobalRegistry.getDesignerMessage(token)
        : token
      if (message) return takeLocale(message)
      return token
    }
    /**
     * 子节点为TextNode的vnode
     * 子节点为i18n对象
     */
    return () => (
      <Fragment>
        {takeMessage(slots.default?.()?.[0].text) ||
          takeMessage(slots.default?.()?.[0]) ||
          takeMessage(props.token) ||
          takeMessage(props.defaultMessage)}
      </Fragment>
    )
  },
})

export const TextWidget = observer(TextWidgetComponent)
