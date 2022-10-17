import { Button } from 'ant-design-vue'
import { usePrefix, IconWidget } from '@formily/antdv-designable'
import cls from 'classnames'
import './styles.less'
import { defineComponent, ref, unref, watch } from 'vue-demi'
import { uid } from '@formily/shared'

export interface IInput {
  value: any
  onChange: (value: any) => void
  exclude?: string[]
  include?: string[]
}

export interface IPolyType {
  type: string
  title?: string
  icon?: string
  component?: any
  checker: (value: any) => boolean
  toInputValue?: (value: any) => any
  toChangeValue?: (value: any) => any
}

export type PolyTypes = IPolyType[]

const isValid = (val: any) => val !== undefined && val !== null

const getEventValue = (event: any) => {
  if (event?.target) {
    if (isValid(event.target.value)) return event.target.value
    if (isValid(event.target.checked)) return event.target.checked
    return
  }
  return event
}

const createTypes = (
  types: PolyTypes,
  exclude: string[],
  include: string[]
) => {
  return types.filter(({ type }) => {
    if (Array.isArray(include) && include.length) {
      return include.includes(type)
    }
    if (Array.isArray(exclude) && exclude.length) {
      return !exclude.includes(type)
    }
    return true
  })
}

export function createPolyInput(polyTypes: PolyTypes = []) {
  return defineComponent({
    name: 'DnPolyInput',
    props: ['value', 'exclude', 'include'],
    setup(props, { attrs, emit }) {
      const prefixRef = usePrefix('poly-input')
      const types = createTypes(polyTypes, props.exclude, props.include)
      const current = ref(types?.[0]?.type)

      const typesValue = ref({})

      watch(
        () => props.value,
        () => {
          types?.forEach(({ checker, type }) => {
            if (checker(props.value)) {
              current.value = type
            }
          })
        },
        { immediate: true }
      )

      const getNextType = () => {
        const currentIndex = types?.findIndex(
          ({ type }) => type === unref(current)
        )
        const nextIndex =
          currentIndex + 1 > types?.length - 1 ? 0 : currentIndex + 1
        return types[nextIndex]
      }

      const transformOnChangeValue = (value: any, type: IPolyType) => {
        return type?.toChangeValue ? type?.toChangeValue(value) : value
      }

      return () => {
        const type = types?.find(({ type }) => type === current.value)
        const component = type?.component
        return (
          // style={style} className
          <div class={cls(prefixRef.value)} key={uid()}>
            {component && (
              <div class={prefixRef.value + '-content'}>
                <component
                  attrs={{ ...attrs, size: 'mini' }}
                  value={
                    type?.toInputValue
                      ? type?.toInputValue(props.value)
                      : props.value
                  }
                  onChange={(event: any) => {
                    const value = getEventValue(event)
                    typesValue.value[type?.type] = event
                    emit('change', transformOnChangeValue(value, type))
                  }}
                ></component>
              </div>
            )}
            <Button
              class={prefixRef.value + '-controller'}
              style={{
                width: !component ? '100%' : 'auto',
              }}
              size="small"
              onClick={() => {
                const nextType = getNextType()
                if (nextType === type) return
                current.value = nextType?.type
                emit(
                  'change',
                  transformOnChangeValue(
                    typesValue.value[nextType?.type],
                    nextType
                  )
                )
              }}
            >
              {type?.icon ? (
                <IconWidget infer={type.icon} />
              ) : (
                type?.title || type?.type
              )}
            </Button>
          </div>
        )
      }
    },
  })
}
