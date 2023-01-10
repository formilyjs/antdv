import path from 'path'
// import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import postcss from 'rollup-plugin-postcss'
import NpmImport from 'less-plugin-npm-import'
import ignoreImport from 'rollup-plugin-ignore-import'
import externalGlobals from 'rollup-plugin-external-globals'
import dts from 'rollup-plugin-dts'
import css from 'rollup-plugin-import-css'
import { rollup } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import { paramCase } from 'param-case'
import { pascalCase } from 'pascal-case'
import { cwd, pkg, builderConfigs } from '@formily/template/lib/constants'
import { DEFAULT_EXTENSIONS } from '@babel/core'

import type { OutputOptions, RollupOptions } from 'rollup'

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx']

const parseName = () => {
  const name = String(pkg?.name || '')
  const scope = paramCase(name.match(/@([^\/]+)\//)?.[1])
  const moduleName = paramCase(name.replace(/@[^\/]+\//, ''))
  const filename = scope ? `${scope}.${moduleName}` : moduleName
  const rootName = scope
    ? `${pascalCase(scope)}.${pascalCase(moduleName)}`
    : pascalCase(moduleName)
  return { name, filename, scope, moduleName, rootName }
}

const buildAll = async (inputs: RollupOptions[]) => {
  for (const input of inputs) {
    const { output, ...options } = input
    const bundle = await rollup(options)
    await bundle.write(output as OutputOptions)
  }
}

const presets = () => {
  const externals = {
    antd: 'antd',
    vue: 'Vue',
    react: 'React',
    moment: 'moment',
    'react-is': 'ReactIs',
    '@alifd/next': 'Next',
    'react-dom': 'ReactDOM',
    'element-ui': 'Element',
    'ant-design-vue': 'antd',
    vant: 'vant',
    '@ant-design/icons': 'icons',
    '@vue/composition-api': 'VueCompositionAPI',
    '@formily/reactive-react': 'Formily.ReactiveReact',
    '@formily/reactive-vue': 'Formily.ReactiveVue',
    '@formily/reactive': 'Formily.Reactive',
    '@formily/path': 'Formily.Path',
    '@formily/shared': 'Formily.Shared',
    '@formily/validator': 'Formily.Validator',
    '@formily/core': 'Formily.Core',
    '@formily/json-schema': 'Formily.JSONSchema',
    '@formily/react': 'Formily.React',
    '@formily/vue': 'Formily.Vue',
    ...builderConfigs.externals,
  }
  return [
    // 使用 @babel/preset-typescript
    // typescript({
    //   tsconfig: './tsconfig.build.json',
    //   tsconfigOverride: {
    //     compilerOptions: {
    //       module: 'ESNext',
    //       declaration: false,
    //     },
    //   },
    // }),
    css(),
    resolve({
      browser: true,
      extensions,
    }),
    commonjs(),
    babel({
      // https://babeljs.io/docs/en/options#rootMode
      rootMode: 'upward', // 向上级查找 babel.config.js
      exclude: [/\/@babel\//, /\/core-js\//],
      babelHelpers: 'runtime',
      extensions,
    }),
    externalGlobals(externals),
  ]
}

const createEnvPlugin = (env = 'development') => {
  return injectProcessEnv(
    {
      NODE_ENV: env,
    },
    {
      exclude: '**/*.{css,less,sass,scss}',
      verbose: false,
    }
  )
}

export const buildUmd = async () => {
  const { name, filename, moduleName, rootName } = parseName()
  function onwarn(warning, warn) {
    // ignoer 'this' rewrite with 'undefined' warn
    if (warning.code === 'THIS_IS_UNDEFINED') return
    warn(warning) // this requires Rollup 0.46
  }
  const configs: RollupOptions[] = [
    {
      input: 'src/index.ts',
      output: {
        format: 'umd',
        file: path.resolve(cwd, `dist/${filename}.umd.development.js`),
        name: rootName,
        sourcemap: true,
        amd: {
          id: name,
        },
      },
      external: ['react', 'react-dom', 'react-is'],
      plugins: [
        ignoreImport({
          extensions: ['.scss', '.css', '.less'],
          body: 'export default undefined;',
        }),
        ...presets(),
        createEnvPlugin(),
      ],
      onwarn,
    },
    {
      input: 'src/index.ts',
      output: {
        format: 'umd',
        file: path.resolve(cwd, `dist/${filename}.umd.production.js`),
        name: rootName,
        sourcemap: true,
        amd: {
          id: name,
        },
      },
      external: ['react', 'react-dom', 'react-is'],
      plugins: [
        postcss({
          extract: path.resolve(cwd, `dist/${moduleName}.css`),
          minimize: true,
          sourceMap: true,
          use: {
            less: {
              plugins: [new NpmImport({ prefix: '~' })],
              javascriptEnabled: true,
            },
            sass: {},
            stylus: {},
          },
        }),
        ...presets(),
        terser(),
        createEnvPlugin('production'),
      ],
      onwarn,
    },
  ]
  if (builderConfigs.bundleDts) {
    configs.push(
      {
        input: 'esm/index.d.ts',
        output: {
          format: 'es',
          file: `dist/${filename}.d.ts`,
        },
        plugins: [dts()],
      },
      {
        input: 'esm/index.d.ts',
        output: {
          format: 'es',
          file: `dist/${filename}.all.d.ts`,
        },
        plugins: [
          dts({
            respectExternal: true,
          }),
        ],
      }
    )
  }
  await buildAll(configs)
}
