/*
 * 支持文本、数字、布尔、表达式
 * Todo: JSON、富文本，公式
 */
import { Select, Popover, Button } from 'ant-design-vue'
import { InputNumber, Input } from '@formily/antdv'
import { TextWidget } from '@formily/antdv-designable'
import { defineComponent } from 'vue'
import { createPolyInput } from '../PolyInput'
import { MonacoInput } from '../MonacoInput'

const STARTTAG_REX =
  /<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/

const EXPRESSION_REX = /^\{\{([\s\S]*)\}\}$/

const isNumber = (value: any) => typeof value === 'number'

const isBoolean = (value: any) => typeof value === 'boolean'

const isExpression = (value: any) => {
  return typeof value === 'string' && EXPRESSION_REX.test(value)
}

const isRichText = (value: any) => {
  return typeof value === 'string' && STARTTAG_REX.test(value)
}

const isNormalText = (value: any) => {
  return typeof value === 'string' && !isExpression(value) && !isRichText(value)
}

const takeNumber = (value: any) => {
  const num = String(value).replace(/[^\d\.]+/, '')
  if (num === '') return
  return Number(num)
}

export const ValueInput = createPolyInput([
  {
    type: 'TEXT',
    icon: 'Text',
    component: Input,
    checker: isNormalText
  },
  {
    type: 'EXPRESSION',
    icon: 'Expression',
    component: defineComponent({
      props: ['value'],
      emits: ['change'],
      setup(props, { emit }) {
        return () => (
          <Popover trigger="click" placement="bottomRight">
            {{
              content: () => (
                <div
                  style={{
                    width: '400px',
                    height: '200px',
                    marginLeft: '-16px',
                    marginRight: '-16px',
                    marginBottom: '-12px'
                  }}
                >
                  <MonacoInput
                    value={props.value}
                    language="javascript.expression"
                    onChange={(value) => {
                      emit('change', value)
                    }}
                  />
                </div>
              ),
              default: () => (
                <Button block>
                  <TextWidget token="SettingComponents.ValueInput.expression" />
                </Button>
              )
            }}
          </Popover>
        )
      }
    }),
    checker: isExpression,
    toInputValue: (value) => {
      if (value === '{{}}') return
      const matched = String(value).match(EXPRESSION_REX)
      return matched?.[1] || value || ''
    },
    toChangeValue: (value) => {
      if (value === '{{}}') return
      const matched = String(value).match(EXPRESSION_REX)
      return `{{${matched?.[1] || value || ''}}}`
    }
  },
  {
    type: 'BOOLEAN',
    icon: 'Boolean',
    component: defineComponent({
      props: ['value'],
      emits: ['change'],
      setup(props, { emit }) {
        return () => {
          return (
            <Select
              value={props.value}
              onChange={(value) => {
                emit('change', value)
              }}
            >
              <Select.Option value={true}>True</Select.Option>
              <Select.Option value={false}>False</Select.Option>
            </Select>
          )
        }
      }
    }),
    checker: isBoolean,
    toInputValue: (value) => {
      return !!value
    },
    toChangeValue: (value) => {
      return !!value
    }
  },
  {
    type: 'NUMBER',
    icon: 'Number',
    component: InputNumber,
    checker: isNumber,
    toInputValue: takeNumber,
    toChangeValue: takeNumber
  }
])
