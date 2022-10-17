import { defineComponent, reactive } from 'vue-demi'
import { FragmentComponent as Fragment } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Button, InputNumber } from 'ant-design-vue'
import { CursorType, ScreenType } from '@designable/core'
import cls from 'classnames'
import {
  useCursor,
  useHistory,
  useScreen,
  usePrefix,
  useWorkbench,
} from '../../hooks'
import { useStyle } from '../../shared/util'
import { IconWidget } from '../IconWidget'
import './styles.less'

type DesignerToolsType = 'HISTORY' | 'CURSOR' | 'SCREEN_TYPE'

export type IDesignerToolsWidgetProps = {
  use?: DesignerToolsType[]
}

const DesignerToolsWidgetComponent = defineComponent<IDesignerToolsWidgetProps>(
  {
    props: {
      use: { type: Array, default: () => ['HISTORY', 'CURSOR', 'SCREEN_TYPE'] },
    },
    setup(props) {
      const screenRef = useScreen()
      const cursorRef = useCursor()
      const workbenchRef = useWorkbench()
      const historyRef = useHistory()
      const sizeRef = reactive<{ width?: any; height?: any }>({
        width: null,
        height: null,
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
                size="mini"
                controls={false}
                value={screenRef.value.width}
                style={{ width: '110px', textAlign: 'center' }}
                vOn:change={(value) => {
                  sizeRef.width = value
                }}
                vOn:keyup_native={(e: KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    screenRef.value.setSize(
                      sizeRef.width,
                      screenRef.value.height
                    )
                  }
                }}
              />
              <IconWidget
                size="10px"
                infer="Close"
                // @ts-ignore
                style={{ padding: '0 3px', color: '#999' }}
              />
              <InputNumber
                size="mini"
                controls={false}
                value={screenRef.value.height}
                style={{
                  width: '110px',
                  textAlign: 'center',
                  marginRight: '10px',
                }}
                vOn:change={(value) => {
                  sizeRef.height = value
                }}
                vOn:keyup_native={(e: KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    screenRef.value.setSize(
                      screenRef.value.width,
                      sizeRef.height
                    )
                  }
                }}
              />
              {(screenRef.value.width !== '100%' ||
                screenRef.value.height !== '100%') && (
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
                // @ts-ignore
                style={{
                  transition: 'all .15s ease-in',
                  transform: screenRef.value.flip ? 'rotate(-90deg)' : '',
                }}
                infer="Flip"
              />
            </Button>
          )
        }

        const renderHistoryController = () => {
          if (!props.use.includes('HISTORY')) return null
          return (
            <Button.Group
              style={{ marginRight: '20px' }}
              key="renderHistoryController"
              size="small"
            >
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
          return (
            <Button.Group
              style={{ marginRight: '20px' }}
              key="renderCursorController"
              // size="small"
            >
              <Button
                size="small"
                disabled={cursorRef.value.type === CursorType.Move}
                onClick={() => {
                  cursorRef.value.setType(CursorType.Move)
                }}
              >
                <IconWidget infer="Move" />
              </Button>
              <Button
                size="small"
                disabled={cursorRef.value.type === CursorType.Selection}
                onClick={() => {
                  cursorRef.value.setType(CursorType.Selection)
                }}
              >
                <IconWidget infer="Selection" />
              </Button>
            </Button.Group>
          )
        }
        return (
          <div style={style} class={cls(prefixRef.value)}>
            {renderHistoryController()}
            {renderCursorController()}
            {renderScreenTypeController()}
            {renderMobileController()}
            {renderResponsiveController()}
          </div>
        )
      }
    },
  }
)
export const DesignerToolsWidget = observer(DesignerToolsWidgetComponent)
