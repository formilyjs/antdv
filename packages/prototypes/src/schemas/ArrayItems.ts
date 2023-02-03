import { ArrayTable } from './ArrayTable'

import type { ISchema } from '@formily/vue'

export const ArrayItems: ISchema & { Addition?: ISchema } = {
  type: 'object',
  properties: {},
}

ArrayItems.Addition = ArrayTable.Addition
