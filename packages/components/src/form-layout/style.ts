import { genStyleHook } from './../__builtins__'
export default genStyleHook('form-layout', (token) => {
  const { componentCls } = token
  return {
    [`${componentCls}`]: {
      '&-inline': {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
  }
})
