import { defineComponent, onBeforeUnmount, watch, shallowRef } from 'vue-demi'
import { Tooltip } from 'ant-design-vue'
import { parseExpression, parse } from '@babel/parser'
import { isNum, uid } from '@designable/shared'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import {
  TextWidget,
  IconWidget,
  usePrefix,
  useTheme,
} from '@formily/antdv-designable'
import Editor, { loader } from '../MonacoEditor'
import { format } from './format'
import { initMonaco } from './config'
import './styles.less'
import './config'

import type { EditorProps } from '../MonacoEditor'
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import type { PropType } from 'vue-demi'

export type Monaco = typeof monaco
export interface MonacoInputProps extends EditorProps {
  helpLink?: string | boolean
  helpCode?: string
  helpCodeViewWidth?: number | string
  extraLib?: string
  lineNumbers?: string
  wordWrap?: string
  glyphMargin?: boolean
  folding?: boolean
  lineDecorationsWidth?: number
  lineNumbersMinChars?: number
  minimap: Record<string, any>
  onMount?: (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => void
  onChange?: (value: string) => void
}

const MonacoInputInner = defineComponent({
  name: 'MonacoInput',
  props: {
    language: { type: String as PropType<string> },
    defaultLanguage: { type: String as PropType<string> },
    width: { type: [String, Number] },
    height: { type: [String, Number] },
    helpLink: { type: [String, Boolean], default: undefined },
    helpCode: { type: String as PropType<MonacoInputProps['helpCode']> },
    helpCodeViewWidth: { type: [String, Number] },
    onMount: { type: Function as PropType<MonacoInputProps['onMount']> },
    onChange: { type: Function },
    value: { type: String as PropType<MonacoInputProps['value']> },
    defaultValue: {
      type: String as PropType<MonacoInputProps['defaultValue']>,
    },
    extraLib: { type: String },
    options: {
      type: Object as PropType<Omit<MonacoInputProps, keyof EditorProps>>,
    },
  },
  emits: ['change'],
  inheritAttrs: false,
  setup(props: MonacoInputProps, { attrs, emit }) {
    const loadedRef = shallowRef(false)
    const setLoaded = (value: boolean) => (loadedRef.value = value)
    const themeRef = useTheme()
    const valueRef = shallowRef('')
    const validateRef = shallowRef<NodeJS.Timeout>()
    const submitRef = shallowRef<NodeJS.Timeout>()
    const declarationRef = shallowRef<string[]>([])
    const extraLibRef = shallowRef<monaco.IDisposable>()
    const monacoRef = shallowRef<Monaco>()
    const editorRef = shallowRef<monaco.editor.IStandaloneCodeEditor>()
    const computedLanguage = shallowRef<string>(
      props.language! || props.defaultLanguage!
    )
    const realLanguage = shallowRef<string>('')
    const unmountedRef = shallowRef(false)
    const changedRef = shallowRef(false)
    const uidRef = shallowRef(uid())
    const prefixRef = usePrefix('monaco-input')

    const updateExtraLib = () => {
      if (extraLibRef.value) {
        extraLibRef.value.dispose()
      }
      extraLibRef.value =
        monacoRef.value!.languages.typescript.typescriptDefaults.addExtraLib(
          props.extraLib!,
          `${uidRef.value}.d.ts`
        )
    }

    const isFileLanguage = () => {
      const lang = computedLanguage.value
      return lang === 'javascript' || lang === 'typescript'
    }

    const isExpLanguage = () => {
      const lang = computedLanguage.value
      return (
        lang === 'javascript.expression' || lang === 'typescript.expression'
      )
    }

    const renderHelper = () => {
      const prefix = prefixRef.value
      const getHref = () => {
        if (typeof props.helpLink === 'string') return props.helpLink
        if (isFileLanguage()) {
          return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript'
        }
        if (isExpLanguage()) {
          return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators'
        }
      }
      if (props.helpLink === false) return null
      const href = getHref()
      return (
        href && (
          <Tooltip
            title={
              <TextWidget token="SettingComponents.MonacoInput.helpDocument" />
            }
          >
            <div class={prefix + '-helper'}>
              <a target="_blank" href={href} rel="noreferrer">
                <IconWidget infer="Help" />
              </a>
            </div>
          </Tooltip>
        )
      )
    }

    const onMountHandler = (
      editor: monaco.editor.IStandaloneCodeEditor,
      monaco: Monaco
    ) => {
      editorRef.value = editor
      monacoRef.value = monaco
      props.onMount?.(editor, monaco)
      emit('mount', editor, monaco)
      const model = editor.getModel()
      const currentValue = editor.getValue()
      model['getDesignerLanguage'] = () => computedLanguage.value
      if (currentValue) {
        format(computedLanguage.value, currentValue)
          .then((content) => {
            editor.setValue(content)
            setLoaded(true)
          })
          .catch(() => {
            setLoaded(true)
          })
      } else {
        setLoaded(true)
      }
      if (props.extraLib) {
        updateExtraLib()
      }
    }

    const submit = () => {
      clearTimeout(submitRef.value!)
      submitRef.value = setTimeout(() => {
        props.onChange?.(valueRef.value)
        emit('change', valueRef.value)
      }, 1000)
    }

    const validate = () => {
      if (realLanguage.value === 'typescript') {
        clearTimeout(validateRef.value)
        validateRef.value = setTimeout(() => {
          try {
            if (valueRef.value) {
              if (isFileLanguage()) {
                parse(valueRef.value, {
                  sourceType: 'module',
                  plugins: ['typescript', 'jsx'],
                })
              } else if (isExpLanguage()) {
                parseExpression(valueRef.value, {
                  plugins: ['typescript', 'jsx'],
                })
              }
            }
            monacoRef.value!.editor.setModelMarkers(
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              editorRef.value?.getModel()!,
              computedLanguage.value,
              []
            )
            declarationRef.value = editorRef.value!.deltaDecorations(
              declarationRef.value,
              [
                {
                  range: new monacoRef.value!.Range(1, 1, 1, 1),
                  options: {},
                },
              ]
            )
            submit()
          } catch (e) {
            declarationRef.value = editorRef.value!.deltaDecorations(
              declarationRef.value,
              [
                {
                  range: new monacoRef.value!.Range(
                    e.loc.line,
                    e.loc.column,
                    e.loc.line,
                    e.loc.column
                  ),
                  options: {
                    isWholeLine: true,
                    glyphMarginClassName: 'monaco-error-highline',
                  },
                },
              ]
            )
            monacoRef.value!.editor.setModelMarkers(
              editorRef.value!.getModel()!,
              computedLanguage.value,
              [
                {
                  code: '1003',
                  severity: 8,
                  startLineNumber: e.loc.line,
                  startColumn: e.loc.column,
                  endLineNumber: e.loc.line,
                  endColumn: e.loc.column,
                  message: e.message,
                },
              ]
            )
          }
        }, 240)
      } else {
        submit()
        declarationRef.value = editorRef.value!.deltaDecorations(
          declarationRef.value,
          [
            {
              range: new monacoRef.value!.Range(1, 1, 1, 1),
              options: {},
            },
          ]
        )
      }
    }

    const onChangeHandler = (value: string) => {
      changedRef.value = true
      valueRef.value = value
      validate()
    }

    const renderHelpCode = () => {
      if (!props.helpCode) return null
      const helpCodeViewWidth = isNum(props.helpCodeViewWidth)
        ? props.helpCodeViewWidth + 'px'
        : props.helpCodeViewWidth
      const prefix = prefixRef.value
      const theme = themeRef.value

      return (
        <div
          class={prefix + '-view'}
          style={{ width: helpCodeViewWidth || '50%' }}
        >
          <Editor
            value={props.helpCode}
            theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
            defaultLanguage={realLanguage.value}
            language={realLanguage.value}
            options={{
              ...props.options,
              lineNumbers: 'off',
              readOnly: true,
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 0,
              minimap: {
                enabled: false,
              },
              tabSize: 2,
              smoothScrolling: true,
              scrollbar: {
                verticalScrollbarSize: 5,
                horizontalScrollbarSize: 5,
                alwaysConsumeMouseWheel: false,
              },
            }}
            width="100%"
            height="100%"
          />
        </div>
      )
    }

    const disposes = [
      () => {
        if (extraLibRef.value) {
          extraLibRef.value.dispose()
        }
        unmountedRef.value = true
      },
    ]

    watch(
      () => props.extraLib,
      () => {
        if (monacoRef.value && props.extraLib) {
          updateExtraLib()
        }
      }
    )

    unmountedRef.value = false
    initMonaco()

    onBeforeUnmount(() => {
      disposes.forEach((dispose) => dispose())
    })

    return () => {
      const theme = themeRef.value
      const prefix = prefixRef.value
      const loaded = loadedRef.value
      const input = props.value! || props.defaultValue! || ''
      computedLanguage.value = props.language! || props.defaultLanguage!
      realLanguage.value = /(?:javascript|typescript)/gi.test(
        computedLanguage.value
      )
        ? 'typescript'
        : computedLanguage.value
      return (
        <div
          class={[
            prefix,
            {
              loaded,
            },
          ]}
          style={{
            width: isNum(props.width) ? props.width + 'px' : props.width,
            height: isNum(props.height) ? props.height + 'px' : props.height,
          }}
        >
          {renderHelper()}
          <div class={prefix + '-view'}>
            <Editor
              attrs={attrs}
              theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
              defaultLanguage={realLanguage.value}
              language={realLanguage.value}
              options={{
                glyphMargin: true,
                ...props.options,
                tabSize: 2,
                smoothScrolling: true,
                scrollbar: {
                  verticalScrollbarSize: 5,
                  horizontalScrollbarSize: 5,
                  alwaysConsumeMouseWheel: false,
                },
              }}
              value={input}
              width="100%"
              height="100%"
              onMount={onMountHandler}
              onChange={onChangeHandler}
            />
          </div>
          {renderHelpCode()}
        </div>
      )
    }
  },
})

export const MonacoInput = composeExport(MonacoInputInner, {
  loader: loader,
})
