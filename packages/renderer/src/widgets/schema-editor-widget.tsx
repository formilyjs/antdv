import { defineComponent, computed } from 'vue-demi'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { codemirror as CodeMirror } from 'vue-codemirror'
import _ from 'lodash-es'

// import base style
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

export default defineComponent({
  name: 'DnSchemaEditorWidget',
  props: ['tree'],
  emits: ['change'],
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
          onReady={cmReady}
          style="height:100%;width:100%;"
          value={code.value}
          props={{
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
