import format from 'dateformat'
import { defineComponent } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { usePrefix, useWorkbench } from '../../hooks'
import { TextWidget } from '../TextWidget'
import './styles.less'

export const HistoryWidget = observer(
  defineComponent({
    name: 'DnHistory',
    props: [],
    setup() {
      const workbenchRef = useWorkbench()
      const prefixRef = usePrefix('history')

      return () => {
        const currentWorkspace =
          workbenchRef.value?.activeWorkspace ||
          workbenchRef.value?.currentWorkspace
        if (!currentWorkspace) return null
        return (
          <div class={prefixRef.value}>
            {currentWorkspace.history.list().map((item, index) => {
              const type = item.type || 'default_state'
              const token = type.replace(/\:/g, '_')
              return (
                <div
                  class={[
                    prefixRef.value + '-item',
                    {
                      active: currentWorkspace.history.current === index,
                    },
                  ]}
                  key={item.timestamp}
                  onClick={() => {
                    currentWorkspace.history.goTo(index)
                  }}
                >
                  <span class={prefixRef.value + '-item-title'}>
                    <TextWidget token={`operations.${token}`} />
                  </span>
                  <span class={prefixRef.value + '-item-timestamp'}>
                    {' '}
                    {format(item.timestamp, 'yy/mm/dd HH:MM:ss')}
                  </span>
                </div>
              )
            })}
          </div>
        )
      }
    },
  })
)
