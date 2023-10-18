import { CursorType, ScreenType } from '@pind/designable-core'
import { observer } from '@formily/reactive-vue'
import { FragmentComponent as Fragment } from '@formily/vue'
import { Button, InputNumber } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent, reactive } from 'vue'
import { useCursor, useHistory, usePrefix, useScreen, useWorkbench } from '../../hooks'
import { useStyle } from '../../shared'
import { IconWidget } from '../IconWidget'
import './styles.less'

type DesignerToolsType = 'HISTORY' | 'CURSOR' | 'SCREEN_TYPE'

export type IDesignerToolsWidgetProps = {
  use?: DesignerToolsType[]
}

const DesignerToolsWidgetComponent = defineComponent({
  name: 'DnDesignerToolsWidget',
  props: {
    use: {
      type: Array as PropType<DesignerToolsType[]>,
      default: () => ['HISTORY', 'CURSOR', 'SCREEN_TYPE']
    }
  },
  setup(props) {
    const screenRef = useScreen()
    const cursorRef = useCursor()
    const workbenchRef = useWorkbench()
    const historyRef = useHistory()
    const sizeRef = reactive<{ width?: any; height?: any }>({
      width: null,
      height: null
    })
    const prefixRef = usePrefix('designer-tools')
    const style = useStyle()

    return () => {
      const renderResponsiveController = () => {
        if (!props.use.includes('SCREEN_TYPE')) return null
        if (screenRef.value.type !== ScreenType.Responsive) return null
        return (
          <Fragment>
            <InputNumber
              {...{
                size: 'small'
              }}
              controls={false}
              value={screenRef.value.width}
              style={{ width: '110px', textAlign: 'center' }}
              onChange={(value) => {
                sizeRef.width = value
              }}
              onPressEnter={() => {
                screenRef.value.setSize(sizeRef.width, screenRef.value.height)
              }}
            />
            <IconWidget size="10px" infer="Close" style={{ padding: '0 3px', color: '#999' }} />
            <InputNumber
              {...{
                size: 'small'
              }}
              controls={false}
              value={screenRef.value.height}
              style={{
                width: '110px',
                textAlign: 'center',
                marginRight: '10px'
              }}
              onChange={(value) => {
                sizeRef.height = value
              }}
              onPressEnter={() => {
                screenRef.value.setSize(screenRef.value.width, sizeRef.height)
              }}
            />
            {(screenRef.value.width !== '100%' || screenRef.value.height !== '100%') && (
              <Button
                style={{ marginRight: '20px' }}
                size="small"
                onClick={() => {
                  screenRef.value.resetSize()
                }}
              >
                <IconWidget infer="Recover" />
              </Button>
            )}
          </Fragment>
        )
      }

      const renderScreenTypeController = () => {
        if (!props.use.includes('SCREEN_TYPE')) return null
        return (
          <Button.Group
            style={{ marginRight: '20px' }}
            key="renderScreenTypeController"
            size="small"
          >
            <Button
              size="small"
              disabled={screenRef.value.type === ScreenType.PC}
              onClick={() => {
                screenRef.value.setType(ScreenType.PC)
              }}
            >
              <IconWidget infer="PC" />
            </Button>
            <Button
              size="small"
              disabled={screenRef.value.type === ScreenType.Mobile}
              onClick={() => {
                screenRef.value.setType(ScreenType.Mobile)
              }}
            >
              <IconWidget infer="Mobile" />
            </Button>
            <Button
              size="small"
              disabled={screenRef.value.type === ScreenType.Responsive}
              onClick={() => {
                screenRef.value.setType(ScreenType.Responsive)
              }}
            >
              <IconWidget infer="Responsive" />
            </Button>
          </Button.Group>
        )
      }

      const renderMobileController = () => {
        if (!props.use.includes('SCREEN_TYPE')) return null
        if (screenRef.value.type !== ScreenType.Mobile) return
        return (
          <Button
            style={{ marginRight: '20px' }}
            size="small"
            onClick={() => {
              screenRef.value.setFlip(!screenRef.value.flip)
            }}
          >
            <IconWidget
              style={{
                transition: 'all .15s ease-in',
                transform: screenRef.value.flip ? 'rotate(-90deg)' : ''
              }}
              infer="Flip"
            />
          </Button>
        )
      }

      const renderHistoryController = () => {
        if (!props.use.includes('HISTORY')) return null
        return (
          <Button.Group style={{ marginRight: '20px' }} key="renderHistoryController" size="small">
            <Button
              size="small"
              disabled={!historyRef.value?.allowUndo}
              onClick={() => {
                historyRef.value.undo()
              }}
            >
              <IconWidget infer="Undo" />
            </Button>
            <Button
              size="small"
              disabled={!historyRef.value?.allowRedo}
              onClick={() => {
                historyRef.value.redo()
              }}
            >
              <IconWidget infer="Redo" />
            </Button>
          </Button.Group>
        )
      }
      const renderCursorController = () => {
        if (workbenchRef.value.type !== 'DESIGNABLE') return null
        if (!props.use.includes('CURSOR')) return null
        const cursor = cursorRef.value
        return (
          <Button.Group style={{ marginRight: '20px' }} key="renderCursorController" size="small">
            <Button
              size="small"
              disabled={cursor.type === CursorType.Normal}
              onClick={() => {
                cursor.setType(CursorType.Normal)
              }}
            >
              <IconWidget infer="Move" />
            </Button>
            <Button
              size="small"
              disabled={cursor.type === CursorType.Selection}
              onClick={() => {
                cursor.setType(CursorType.Selection)
              }}
            >
              <IconWidget infer="Selection" />
            </Button>
          </Button.Group>
        )
      }
      return (
        <div style={style} class={prefixRef.value}>
          {renderHistoryController()}
          {renderCursorController()}
          {renderScreenTypeController()}
          {renderMobileController()}
          {renderResponsiveController()}
        </div>
      )
    }
  }
})
export const DesignerToolsWidget = observer(DesignerToolsWidgetComponent)
