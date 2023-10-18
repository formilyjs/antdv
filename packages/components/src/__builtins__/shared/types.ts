import type { Component, ExtractPropTypes, VNode } from 'vue'

export type SlotTypes =
  | Component
  | string
  | number
  | ((props: Record<string, any>) => VNode[] | VNode)
  | VNode

export type PropTypes<T extends (...args: any) => any> = Partial<ExtractPropTypes<ReturnType<T>>>
