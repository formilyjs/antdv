import { isStr } from '@pind/designable-shared'
import type { VNode } from 'vue'
import { getCurrentInstance } from 'vue'

/**
 * 复制一个现有VNode对象
 * @param VNode
 * @param props
 * @returns
 */
export function cloneElement(VNode: VNode, _props = {}) {
  const props = { ...VNode?.props, ..._props }
  const data = { ...VNode, props }

  return { ...VNode, data }
}

const css2obj = (css) => {
  const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
    o = {}
  css.replace(r, (m, p, v) => (o[p] = v))
  return o
}
/**
 * 获取组件外层绑定的style对象
 * @returns
 */
export function useStyle() {
  const { proxy } = getCurrentInstance()
  let style = proxy.$attrs?.style
  if (isStr(style)) {
    style = css2obj(style)
  }
  if (Array.isArray(style)) {
    style = Object.assign({}, ...style)
  }
  return style as Record<string, any>
}

const isObj = (val: unknown): val is any => typeof val === 'object'
export function isVNode(val: unknown): (val: unknown) => val is VNode {
  return isObj(val) && val?.context?._isVue
}
