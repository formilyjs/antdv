import { FormPath } from '@formily/core'
import { toJS } from '@formily/reactive'
import {
  ArrayField,
  Field as InternalField,
  ObjectField,
  Schema,
  VoidField,
  h as CreateElement,
} from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { FormItem } from '@formily/antdv'
import { each, reduce } from '@formily/shared'
import { createBehavior } from '@designable/core'
import {
  useComponents,
  useDesigner,
  useTreeNode,
} from '@formily/antdv-designable'
import { isArr, isFn, isStr } from '@designable/shared'
import { defineComponent } from 'vue-demi'
import { composeExport } from '@formily/antdv/esm/__builtins__'
import { Container } from '../../common/Container'
import { AllLocales } from '../../locales'
import type { DnFC } from '@formily/antdv-designable'
import type { ISchema } from '@formily/vue'

Schema.silent(true)

const SchemaStateMap = {
  title: 'title',
  description: 'description',
  default: 'value',
  enum: 'dataSource',
  readOnly: 'readOnly',
  writeOnly: 'editable',
  required: 'required',
  'x-content': 'content',
  'x-value': 'value',
  'x-editable': 'editable',
  'x-disabled': 'disabled',
  'x-read-pretty': 'readPretty',
  'x-read-only': 'readOnly',
  'x-visible': 'visible',
  'x-hidden': 'hidden',
  'x-display': 'display',
  'x-pattern': 'pattern',
}

const NeedShownExpression = {
  title: true,
  description: true,
  default: true,
  'x-content': true,
  'x-value': true,
}

const isExpression = (val: any) => isStr(val) && /^\{\{.*\}\}$/.test(val)

const filterExpression = (val: any) => {
  if (typeof val === 'object') {
    const isArray = isArr(val)
    const results = reduce(
      val,
      (buf: any, value, key) => {
        if (isExpression(value)) {
          return buf
        } else {
          const results = filterExpression(value)
          if (results === undefined || results === null) return buf
          if (isArray) {
            return buf.concat([results])
          }
          buf[key] = results
          return buf
        }
      },
      isArray ? [] : {}
    )
    return results
  }
  if (isExpression(val)) {
    return
  }
  return val
}

const toDesignableFieldProps = (
  schema: ISchema,
  components: any,
  nodeIdAttrName: string,
  id: string
) => {
  const results: any = {}
  each(SchemaStateMap, (fieldKey, schemaKey) => {
    const value = schema[schemaKey]
    if (isExpression(value)) {
      if (!NeedShownExpression[schemaKey]) return
      if (value) {
        results[fieldKey] = value
        return
      }
    } else if (value) {
      results[fieldKey] = filterExpression(value)
    }
  })
  if (!components['FormItem']) {
    components['FormItem'] = FormItem
  }
  const decorator =
    schema['x-decorator'] && FormPath.getIn(components, schema['x-decorator'])
  const component =
    schema['x-component'] && FormPath.getIn(components, schema['x-component'])
  const decoratorProps = schema['x-decorator-props'] || {}
  const componentProps = schema['x-component-props'] || {}

  if (decorator) {
    results.decorator = [decorator, toJS(decoratorProps)]
  }
  if (component) {
    // 有的是functional 有的是 正常的 vueComponent
    results.component = [
      isFn(component)
        ? component
        : Object.assign({}, component, { Behavior: null, Resource: null }),
      toJS(componentProps),
    ]
  }
  if (decorator) {
    FormPath.setIn(results['decorator'][1], nodeIdAttrName, id)
  } else if (component) {
    FormPath.setIn(results['component'][1], nodeIdAttrName, id)
  }
  // vue为异步渲染需要进行缓存 不然就变成了函数
  const title = results.title
  results.title =
    results.title && (() => <span data-content-editable="title">{title}</span>)
  // TODO::formily vue 貌似不支持呢
  results.description = results.description // (() => <span data-content-editable="description">{description}</span>)
  return results
}
//
const FieldComponent = observer(
  defineComponent({
    name: 'DnField',
    setup(props: ISchema, { slots, attrs }) {
      const designerRef = useDesigner()
      const componentsRef = useComponents()
      const nodeRef = useTreeNode()
      props = attrs as ISchema
      return () => {
        if (!nodeRef.value) return null
        const fieldProps = toDesignableFieldProps(
          props,
          componentsRef.value,
          designerRef.value.props.nodeIdAttrName,
          nodeRef.value.id
        )
        if (props.type === 'object') {
          return (
            <Container>
              <ObjectField {...{ ...fieldProps, name: nodeRef.value.id }}>
                {slots.default?.()}
              </ObjectField>
            </Container>
          )
        } else if (props.type === 'array') {
          return CreateElement(
            ArrayField,
            { attrs: { ...fieldProps, name: nodeRef.value.id } },
            slots
          )
        } else if (nodeRef.value.props.type === 'void') {
          return CreateElement(
            VoidField,
            { attrs: { ...fieldProps, name: nodeRef.value.id } },
            slots
          )
        }
        return CreateElement(
          InternalField,
          { props: {}, attrs: { ...fieldProps, name: nodeRef.value.id } },
          {}
        )
      }
    },
  })
)

export const Field: DnFC<Vue.Component<any, any, any, any>> = composeExport(
  FieldComponent,
  {
    Behavior: createBehavior({
      name: 'Field',
      selector: 'Field',
      designerLocales: AllLocales.Field,
    }),
  }
)
