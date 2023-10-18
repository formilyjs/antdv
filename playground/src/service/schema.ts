import { transformToSchema, transformToTreeNode } from '@pind/designable-formily-transformer'
import { message } from 'ant-design-vue'
import type { Engine } from '@pind/designable-core'

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  message.success('Save Success')
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    const tree = transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema')))
    designer.setCurrentTree(tree)
  } catch (err) {}
}
