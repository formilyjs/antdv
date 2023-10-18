import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { transformToSchema } from '@pind/designable-formily-transformer'
import * as Antdv from '@formily/antdv'
import { Form } from '@formily/antdv'
import { Text } from '@formily/antdv-prototypes'
import type { Component } from 'vue'
import { computed, defineComponent } from 'vue'

const { SchemaField } = createSchemaField({
  components: {
    Text: Text as Component,
    ...(Antdv as any)
  }
})

export default defineComponent({
  name: 'DnPreviewWidget',
  props: ['tree'],
  setup(props) {
    const form = createForm()
    const treeSchema = computed(() => transformToSchema(props.tree))

    return () => {
      const { form: { style, ...formProps } = {}, schema } = treeSchema.value
      return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
          <Form form={form} style={style} {...formProps}>
            <SchemaField schema={schema} />
          </Form>
        </div>
      )
    }
  }
})
