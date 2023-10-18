import { genStyleHook } from './../__builtins__'

export default genStyleHook('preview-text', (token) => {
  const { componentCls, antCls, fontSize } = token
  return [
    {
      [componentCls]: {
        fontSize,

        [`${antCls}-tag:last-child`]: {
          marginInlineEnd: 0
        }
      },
      [`${antCls}-space`]: {
        display: 'flex !important'
      }
    }
  ]
})
