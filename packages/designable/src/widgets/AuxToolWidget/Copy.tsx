// import React from 'react'
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue-demi'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { useStyle } from '../../shared/util'
import { IconWidget } from '../IconWidget'
import { useOperation, usePrefix } from '../../hooks'

import type { PropType } from 'vue-demi'
import type { TreeNode } from '@designable/core'

export interface ICopyProps {
  node: TreeNode
}

const CopyComponent = defineComponent({
  name: 'DnCopy',
  props: { node: { type: Object as PropType<TreeNode> } },
  setup(props) {
    const operationRef = useOperation()
    const prefixRef = usePrefix('aux-copy')
    const style = useStyle()
    return () => {
      if (props.node === props.node.root) return null
      return (
        <Button
          class={prefixRef.value}
          style={style}
          type="primary"
          onClick={() => {
            operationRef.value.cloneNodes([props.node])
          }}
        >
          <IconWidget infer="Clone" />
        </Button>
      )
    }
  },
})

export const Copy = composeExport(CopyComponent, { displayName: 'Copy' })
