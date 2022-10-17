// import React from 'react'
import format from 'dateformat'
import { observer } from '@formily/reactive-vue'
import cls from 'classnames'
import { usePrefix, useWorkbench } from '../../hooks'
import { TextWidget } from '../TextWidget'
import './styles.less'
import { defineComponent } from 'vue-demi'

// export const HistoryWidget: React.FC = observer(() => {
//   const workbench = useWorkbench()
//   const currentWorkspace =
//     workbench?.activeWorkspace || workbench?.currentWorkspace
//   const prefix = usePrefix('history')
//   if (!currentWorkspace) return null
//   return (
//     <div className={prefix}>
//       {currentWorkspace.history.list().map((item, index) => {
//         const type = item.type || 'default_state'
//         const token = type.replace(/\:/g, '_')
//         return (
//           <div
//             className={cls(prefix + '-item', {
//               active: currentWorkspace.history.current === index,
//             })}
//             key={item.timestamp}
//             onClick={() => {
//               currentWorkspace.history.goTo(index)
//             }}
//           >
//             <span className={prefix + '-item-title'}>
//               <TextWidget token={`operations.${token}`} />
//             </span>
//             <span className={prefix + '-item-timestamp'}>
//               {' '}
//               {format(item.timestamp, 'yy/mm/dd HH:MM:ss')}
//             </span>
//           </div>
//         )
//       })}
//     </div>
//   )
// })

export const HistoryWidget = observer(
  defineComponent({
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
                  class={cls(prefixRef.value + '-item', {
                    active: currentWorkspace.history.current === index,
                  })}
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
