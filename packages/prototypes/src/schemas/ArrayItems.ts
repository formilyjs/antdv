import type { ISchema } from '@formily/vue'
import { ArrayTable } from './ArrayTable'

export const ArrayItems: ISchema & { Addition?: ISchema } = {
  type: 'object',
  properties: {}
}

ArrayItems.Addition = ArrayTable.Addition
