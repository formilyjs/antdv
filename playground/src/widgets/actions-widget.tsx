import { GithubOutlined } from '@ant-design/icons-vue'
import { GlobalRegistry } from '@pind/designable-core'
import { TextWidget, useDesigner, useEffect } from '@formily/antdv-designable'
import { Button, Radio, Space } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { loadInitialSchema, saveSchema } from '../service'

function useI18n() {
  const language = ref<string>(
    String.prototype.toLocaleLowerCase.call(GlobalRegistry.getDesignerLanguage())
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
    useEffect(() => {
      loadInitialSchema(designerRef.value)
    }, [])

    const { language, handleChangeLanguage } = useI18n()
    const supportLocales = ['zh-cn', 'en-us', 'ko-kr']
    useEffect(() => {
      if (!supportLocales.includes(language.value)) {
        GlobalRegistry.setDesignerLanguage('zh-cn')
      }
    }, [])

    return () => (
      <Space style={{ marginRight: '10px' }}>
        <Radio.Group
          value={language.value}
          // TODO: emit('input') 也会触发这里的 onChange
          onChange={(e) => e.target && handleChangeLanguage(e.target.value)}
        >
          <Radio.Button value="en-us">English</Radio.Button>
          <Radio.Button value="zh-cn">简体中文</Radio.Button>
        </Radio.Group>
        <Button type="primary" ghost href="https://github.com/formilyjs/antdv" target="_blank">
          <GithubOutlined />
          Github
        </Button>
        <Button onClick={() => saveSchema(designerRef.value)}>
          <TextWidget>Save</TextWidget>
        </Button>
        <Button type="primary" onClick={() => saveSchema(designerRef.value)}>
          <TextWidget>Publish</TextWidget>
        </Button>
      </Space>
    )
  }
})
