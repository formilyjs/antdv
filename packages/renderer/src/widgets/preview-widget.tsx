import { defineComponent, computed } from '@vue/composition-api'
import { transformToSchema } from '@designable/formily-transformer'
import { createForm } from '@formily/core'
import { Form } from '@formily/antdv'
import * as ElementUI from '@formily/antdv'
import { createSchemaField } from '@formily/vue'
import { Text } from '@formily/antdv-prototypes'
const SchemaFields = createSchemaField({
  components: { Text, ...ElementUI },
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
