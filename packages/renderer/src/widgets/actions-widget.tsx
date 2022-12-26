import { defineComponent, ref } from 'vue-demi'
import { GlobalRegistry } from '@designable/core'
import { useDesigner, useTree } from '@formily/antdv-designable'
import { Radio, Button } from 'ant-design-vue'
import { loadInitialSchema, saveSchema } from '../service'

function useI18n() {
  const language = ref(
    String.prototype.toLocaleLowerCase.call(
      GlobalRegistry.getDesignerLanguage()
    )
  )
  function handleChangeLanguage(value) {
    language.value = value
    GlobalRegistry.setDesignerLanguage(value)
  }
  return { language, handleChangeLanguage }
}

export default defineComponent({
  setup() {
    const designerRef = useDesigner()
    // TODO::tree node has reaction problems
    useTree()
    loadInitialSchema(designerRef.value)

    function handleSaveSchema() {
      saveSchema(designerRef.value)
    }
    const { language, handleChangeLanguage } = useI18n()
    return () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Radio.Group value={language.value} onChange={handleChangeLanguage}>
          <Radio.Button label="en-us">English</Radio.Button>
          <Radio.Button label="zh-cn">简体中文</Radio.Button>
        </Radio.Group>
        <Button style={{ marginLeft: '10px' }} onClick={handleSaveSchema}>
          保存
        </Button>
        <Button onClick={handleSaveSchema}>发布</Button>
      </div>
    )
  },
})
