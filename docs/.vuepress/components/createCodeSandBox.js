import { getParameters } from 'codesandbox/lib/api/define'

const CodeSandBoxHTML = '<div id="app"></div>'
const CodeSandBoxJS = `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
`

const TsconfigContent = `{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "noImplicitAny": false,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
`
const ShimsVueContent = `declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
`

const createForm = ({ method, action, data }) => {
  const form = document.createElement('form') // 构造 form
  form.style.display = 'none' // 设置为不显示
  form.target = '_blank' // 指向 iframe

  // 构造 formdata
  Object.keys(data).forEach((key) => {
    const input = document.createElement('input') // 创建 input

    input.name = key // 设置 name
    input.value = data[key] // 设置 value

    form.appendChild(input)
  })

  form.method = method // 设置方法
  form.action = action // 设置地址

  document.body.appendChild(form)

  // 对该 form 执行提交
  form.submit()

  document.body.removeChild(form)
}

export function createCodeSandBox(codeStr) {
  const parameters = getParameters({
    files: {
      'sandbox.config.json': {
        content: {
          template: 'node',
          infiniteLoopProtection: true,
          hardReloadOnChange: false,
          view: 'browser',
          container: {
            port: 8080,
            node: '14'
          }
        }
      },
      'package.json': {
        content: {
          scripts: {
            serve: 'vue-cli-service serve',
            build: 'vue-cli-service build',
            lint: 'vue-cli-service lint'
          },
          dependencies: {
            '@formily/core': 'latest',
            '@formily/vue': 'latest',
            '@formily/antdv': 'latest',
            'core-js': '^3.8.3',
            'ant-design-vue': '^3.2.6',
            vue: '^3.2.37'
          },
          devDependencies: {
            '@vue/cli-plugin-babel': '~5.0.0',
            '@vue/cli-service': '~5.0.0',
            '@vue/cli-plugin-typescript': '~5.0.0',
            less: 'latest',
            'less-loader': 'latest',
            typescript: '~4.5.5'
          },
          babel: {
            presets: ['@vue/cli-plugin-babel/preset']
          },
          vue: {
            devServer: {
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              host: '0.0.0.0',
              allowedHosts: 'all'
            },
            css: {
              loaderOptions: {
                less: {
                  lessOptions: {
                    javascriptEnabled: true
                  }
                }
              }
            }
          }
        }
      },
      'src/App.vue': {
        content: codeStr
      },
      'src/main.ts': {
        content: CodeSandBoxJS
      },
      'src/shims-vue.d.ts': {
        content: ShimsVueContent
      },
      'public/index.html': {
        content: CodeSandBoxHTML
      },
      'tsconfig.json': {
        content: TsconfigContent
      }
    }
  })

  createForm({
    method: 'post',
    action: 'https://codesandbox.io/api/v1/sandboxes/define',
    data: {
      parameters,
      query: 'file=/src/App.vue'
    }
  })
}
