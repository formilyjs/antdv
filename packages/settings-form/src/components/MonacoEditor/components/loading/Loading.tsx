import { defineComponent } from 'vue-demi'
const isString = (val: unknown): val is string => typeof val === 'string'
const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
const isArray = Array.isArray
const loadingStyles = {
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}
const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:(.+)/
type NormalizedStyle = Record<string, string | number>
function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {}
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE)
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return ret
}
function normalizeStyle(value: unknown): NormalizedStyle | string | undefined {
  if (isArray(value)) {
    const res: NormalizedStyle = {}
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const normalized = isString(item)
        ? parseStringStyle(item)
        : (normalizeStyle(item) as NormalizedStyle)
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key]
        }
      }
    }
    return res
  } else if (isString(value)) {
    return value
  } else if (isObject(value)) {
    return value
  }
}
export default defineComponent((props, { slots }) => {
  return () => (
    <div style={normalizeStyle(loadingStyles)}>{slots.default?.()}</div>
  )
})
