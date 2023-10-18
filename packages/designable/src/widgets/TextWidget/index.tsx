import { observer } from '@formily/reactive-vue'
import type { IDesignerMiniLocales } from '@pind/designable-core'
import { GlobalRegistry } from '@pind/designable-core'
import { isPlainObj, isStr } from '@pind/designable-shared'
import { defineComponent } from 'vue'

const TextWidgetComponent = defineComponent({
  name: 'DnTextWidget',
  props: {
    componentName: String,
    sourceName: String,
    token: String,
    defaultMessage: String
  },
  setup(props, { slots }) {
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
      const message = isStr(token) ? GlobalRegistry.getDesignerMessage(token) : token
      if (message) return takeLocale(message)
      return token
    }
    /**
     * 子节点为TextNode的vnode
     * 子节点为i18n对象
     */
    return () => {
      return (
        <>
          {takeMessage(slots.default?.()?.[0]?.children) ||
            takeMessage(slots.default?.()?.[0]) ||
            takeMessage(props.token) ||
            takeMessage(props.defaultMessage)}
        </>
      )
    }
  }
})

export const TextWidget = observer(TextWidgetComponent)
