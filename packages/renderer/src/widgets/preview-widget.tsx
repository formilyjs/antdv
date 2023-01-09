import { defineComponent, computed } from 'vue-demi'
import { transformToSchema } from '@designable/formily-transformer'
import { createForm } from '@formily/core'
import { Form } from '@formily/antdv'
import * as Antdv from '@formily/antdv'
import { createSchemaField } from '@formily/vue'
import { Text } from '@formily/antdv-prototypes'
import type { Component } from 'vue'
import type { SchemaVueComponents } from '@formily/vue'

const SchemaFields = createSchemaField({
  components: {
    Text: Text as Component,
    ...(Antdv as SchemaVueComponents),
  },
})

export default defineComponent({
  name: 'DnPreviewWidget',
  props: ['tree'],
  setup(props) {
    const form = createForm()
    const treeSchema = computed(() => transformToSchema(props.tree))

    return () => {
      const { form: formProps, schema } = treeSchema.value
      return (
        <div style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
          <Form props={{ ...formProps, form: form }}>
            <SchemaFields.SchemaField schema={schema} />
          </Form>
        </div>
      )
    }
  },
})
