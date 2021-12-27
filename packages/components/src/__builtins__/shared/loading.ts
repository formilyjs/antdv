import { message } from 'ant-design-vue'
import type { MessageType } from 'ant-design-vue/types/message'

export const loading = async (
  loadingText = 'Loading...',
  processor: () => Promise<any>
) => {
  let loadingInstance: MessageType = null
  const loading = setTimeout(() => {
    loadingInstance = message.loading(loadingText)
  }, 100)
  try {
    return await processor()
  } finally {
    loadingInstance?.()
    clearTimeout(loading)
  }
}
