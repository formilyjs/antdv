import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'
import App from './app'
import WidgetsInstaller from './widgets'

export function mount(id: string) {
  const app = createApp(App)
  app.use(WidgetsInstaller)
  app.mount(`#${id}`)
  return app
}
