/* eslint-disable @typescript-eslint/no-empty-interface */
import type { ComponentRenderProxy, VNode } from 'vue-demi'
import type { Engine, IResource, IBehavior } from '@designable/core'
import type { DefineComponent } from '@formily/vue'

export interface IDesignerLayoutProps {
  prefixCls?: string
  theme?: 'dark' | 'light' | (string & {})
}
export interface IDesignerProps extends IDesignerLayoutProps {
  engine: Engine
}

export interface IDesignerComponents {
  [key: string]: DnFC<any>
}

export interface IDesignerLayoutContext {
  theme?: 'dark' | 'light' | (string & {})
  prefixCls: string
}

export interface IWorkspaceContext {
  id: string
  title?: string
  description?: string
}

export type DnFC<P = {}> = DefineComponent<P> & {
  Resource?: IResource[]
  Behavior?: IBehavior[]
}

export type DnComponent<P = {}> = DefineComponent<P> & {
  Resource?: IResource[]
  Behavior?: IBehavior[]
}

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
