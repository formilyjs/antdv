import { useField, FragmentComponent } from '@formily/vue'
import { usePrefix } from '@formily/antdv-designable'
import cls from 'classnames'
import { defineComponent, unref } from 'vue-demi'
import { uid } from '@formily/shared'
import { FoldItem } from '../FoldItem'
import { SizeInput } from '../SizeInput'
import { InputItems } from '../InputItems'

type Position = 'top' | 'right' | 'left' | 'bottom' | 'all'
export interface IMarginStyleSetterProps {
  labels?: Vue.Component[]
  value?: string
  onChange?: (value: string) => void
}

const PositionMap = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  all: 1,
}

const BoxRex =
  /([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+)(?:\s+([\d\.]+[^\d\s\.+-]+))?)?)?/

export const BoxStyleSetter = defineComponent({
  name: 'DnBoxStyleSetter',
  props: {
    value: String,
    labels: {
      type: Array,
      default: () => ['Top', 'Right', 'Bottom', 'Left'],
    },
  },
  setup(props, { emit }) {
    const fieldRef = useField()
    const prefixRef = usePrefix('box-style-setter')

    const createPositionHandler = (
      position: Position,
      props: IMarginStyleSetterProps
    ) => {
      const matched = String(props.value).match(BoxRex) || []
      const value = matched[PositionMap[position]]
      const v1 = matched[1]
      const v2 = matched[2]
      const v3 = matched[3]
      const v4 = matched[4]
      const allEqualls = v1 === v2 && v2 === v3 && v3 === v4
      return {
        ...props,
        value: position === 'all' ? (allEqualls ? v1 : undefined) : value,
        onChange(value: string) {
          if (position === 'all') {
            emit(
              'change',
              `${value || '0px'} ${value || '0px'} ${value || '0px'} ${
                value || '0px'
              }`
            )
          } else {
            matched[PositionMap[position]] = value
            emit(
              'change',
              `${matched[1] || '0px'} ${matched[2] || '0px'} ${
                matched[3] || '0px'
              } ${matched[4] || '0px'}`
            )
          }
        },
      }
    }

    return () => {
      const field = unref(fieldRef)
      const prefix = unref(prefixRef)

      const positionHandlers = {
        all: createPositionHandler('all', props),
        top: createPositionHandler('top', props),
        right: createPositionHandler('right', props),
        bottom: createPositionHandler('bottom', props),
        left: createPositionHandler('left', props),
      }
      return (
        <FoldItem class={cls(prefix)} label={field.title}>
          <FragmentComponent slot="base" key={uid()}>
            <SizeInput
              value={positionHandlers.all.value}
              vOn:change={positionHandlers.all.onChange}
              exclude={['auto', 'inherit']}
            />
          </FragmentComponent>
          <FragmentComponent slot="extra" key={uid()}>
            <InputItems width="50%">
              <InputItems.Item icon={props.labels[0]}>
                <SizeInput
                  value={positionHandlers.top.value}
                  vOn:change={positionHandlers.top.onChange}
                  exclude={['auto', 'inherit']}
                />
              </InputItems.Item>
              <InputItems.Item icon={props.labels[1]}>
                <SizeInput
                  value={positionHandlers.right.value}
                  vOn:change={positionHandlers.right.onChange}
                  exclude={['auto', 'inherit']}
                />
              </InputItems.Item>
              <InputItems.Item icon={props.labels[2]}>
                <SizeInput
                  value={positionHandlers.bottom.value}
                  vOn:change={positionHandlers.bottom.onChange}
                  exclude={['auto', 'inherit']}
                />
              </InputItems.Item>
              <InputItems.Item icon={props.labels[3]}>
                <SizeInput
                  value={positionHandlers.left.value}
                  vOn:change={positionHandlers.left.onChange}
                  exclude={['auto', 'inherit']}
                />
              </InputItems.Item>
            </InputItems>
          </FragmentComponent>
        </FoldItem>
      )
    }
  },
})
