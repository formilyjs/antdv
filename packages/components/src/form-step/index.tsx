import type { Form, VoidField } from '@formily/core'
import type { Schema, SchemaKey } from '@formily/json-schema'
import { action, model, observable } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@formily/vue'
import type { StepProps, StepsProps } from 'ant-design-vue'
import { Steps } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { composeExport, usePrefixCls } from '../__builtins__'

const { Step } = Steps

export interface IFormStep {
  connect: (steps: SchemaStep[], field: VoidField) => void
  current: number
  allowNext: boolean
  allowBack: boolean
  setCurrent(key: number): void
  submit: Form['submit']
  next(): void
  back(): void
}

export interface IFormStepProps extends StepsProps {
  formStep?: IFormStep
}

type SchemaStep = {
  name: SchemaKey
  props: any
  schema: Schema
}

type FormStepEnv = {
  form: Form
  field: VoidField
  steps: SchemaStep[]
}

const parseSteps = (schema: Schema) => {
  const steps: SchemaStep[] = []
  schema.mapProperties((schema, name) => {
    if (schema['x-component']?.indexOf('StepPane') > -1) {
      steps.push({
        name,
        props: schema['x-component-props'],
        schema
      })
    }
  })
  return steps
}

const createFormStep = (defaultCurrent = 0): IFormStep => {
  const env: FormStepEnv = observable({
    form: null,
    field: null,
    steps: []
  })

  const setDisplay = action.bound((target: number) => {
    const currentStep = env.steps[target]
    env.steps.forEach(({ name }) => {
      env.form.query(`${env.field.address}.${name}`).take((field) => {
        if (name === currentStep.name) {
          field.setDisplay('visible')
        } else {
          field.setDisplay('hidden')
        }
      })
    })
  })

  const next = action.bound(() => {
    if (formStep.allowNext) {
      setDisplay(formStep.current + 1)
      formStep.setCurrent(formStep.current + 1)
    }
  })

  const back = action.bound(() => {
    if (formStep.allowBack) {
      setDisplay(formStep.current - 1)
      formStep.setCurrent(formStep.current - 1)
    }
  })

  const formStep: IFormStep = model({
    connect(steps, field) {
      env.steps = steps
      env.form = field?.form
      env.field = field
    },
    current: defaultCurrent,
    setCurrent(key: number) {
      formStep.current = key
    },
    get allowNext() {
      return formStep.current < env.steps.length - 1
    },
    get allowBack() {
      return formStep.current > 0
    },
    async next() {
      try {
        await env.form.validate()
        next()
      } catch {}
    },
    async back() {
      back()
    },
    async submit(onSubmit) {
      return env.form?.submit?.(onSubmit)
    }
  })
  return formStep
}

const FormStepInner = observer(
  defineComponent({
    name: 'FormStep',
    props: {
      formStep: {
        type: Object as PropType<IFormStep>,
        default() {
          return {
            current: 0
          }
        }
      },
      current: {
        type: Number
      }
    },
    setup(props, { attrs }) {
      const field = useField<VoidField>().value
      const prefixCls = usePrefixCls('formily-form-step', attrs.prefixCls as string)
      const fieldSchemaRef = useFieldSchema()

      const steps = parseSteps(fieldSchemaRef.value)

      props.formStep.connect?.(steps, field)

      return () => {
        const current = props.current || props.formStep?.current || 0

        const renderSteps = (
          steps: SchemaStep[],
          callback: (value: SchemaStep, index: number, array: SchemaStep[]) => any
        ) => {
          return steps.map(callback)
        }
        return (
          <div class={prefixCls}>
            <Steps current={current} {...attrs} style={{ marginBottom: '10px' }}>
              {renderSteps(steps, ({ props }, key) => {
                return <Step key={key} {...props}></Step>
              })}
            </Steps>
            {renderSteps(steps, ({ name, schema }, key) => {
              if (key !== current) return
              return <RecursionField key={key} schema={schema} name={name} />
            })}
          </div>
        )
      }
    },
    inheritAttrs: false
  })
)

const StepPane = defineComponent<StepProps>({
  name: 'FormStepPane',
  setup(_props, { slots }) {
    return () => <>{slots.default?.()}</>
  }
})

export const FormStep = composeExport(FormStepInner, {
  StepPane,
  createFormStep
})

export default FormStep
