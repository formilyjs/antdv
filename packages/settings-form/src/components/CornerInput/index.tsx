import { usePrefix } from '@formily/designable'
import cls from 'classnames'
import { defineComponent, ref, watchEffect } from 'vue-demi'
import './styles.less'

export interface ICornerInputProps {
  value?: string
}

export const CornerInput = defineComponent({
  props: ['value'],
  emits: ['change'],
  setup(props: ICornerInputProps, { emit }) {
    const prefixRef = usePrefix('corner-input')
    const currentRef = ref(props.value)
    watchEffect(() => {
      if (!props.value) {
        currentRef.value = 'all'
      }
    })
    const createCellProps = (type: string) => ({
      className: cls(prefixRef.value + '-cell', {
        active: currentRef.value === type,
      }),
      onClick() {
        currentRef.value = type
        emit('change', type)
      },
    })
    return () => {
      const prefix = prefixRef.value
      return (
        <div class={cls(prefix)}>
          <div class={prefix + '-column'}>
            <div {...createCellProps('topLeft')}>┏</div>
            <div {...createCellProps('bottomLeft')}>┗</div>
          </div>
          <div class={prefix + '-column'}>
            <div {...createCellProps('all')}>╋</div>
          </div>
          <div class={prefix + '-column'}>
            <div {...createCellProps('topRight')}>┓</div>
            <div {...createCellProps('bottomRight')}>┛</div>
          </div>
        </div>
      )
    }
  },
})
