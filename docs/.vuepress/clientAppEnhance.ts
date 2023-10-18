import { defineClientAppEnhance } from '@vuepress/client'
import AntDesign from 'ant-design-vue'
import 'prismjs/themes/prism-tomorrow.css'
import DumiPreviewer from './components/dumi-previewer.vue'
import './styles/index.styl'

export default defineClientAppEnhance(({ app }) => {
  app.use(AntDesign)
  app.component('dumi-previewer', DumiPreviewer)
})
