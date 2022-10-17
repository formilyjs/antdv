import { defineComponent, computed } from 'vue-demi'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { codemirror as CodeMirror } from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

export default defineComponent({
  name: 'DnSchemaEditorWidget',
  props: ['tree'],
  setup(props, { emit }) {
    const code = computed(() => {
      return JSON.stringify(transformToSchema(props.tree), null, 2)
    })

    const handleEmitChanges = _.debounce((cm) => {
      emit('change', transformToTreeNode(JSON.parse(cm.getValue())))
    }, 200)

    const cmReady = (mirror) => {
      mirror.setSize('100%', '100%')
      mirror.on('changes', handleEmitChanges)
    }

    return () => {
      return (
        <CodeMirror
          vOn:ready={cmReady}
          style="height:100%;width:100%;"
          props={{
            value: code.value,
            options: {
              tabSize: 4,
              lineNumbers: true,
              line: true,
              mode: 'text/javascript',
            },
          }}
        />
      )
    }
  },
})
