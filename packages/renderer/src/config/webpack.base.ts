import path from 'path'
import fs from 'fs-extra'
import { GlobSync } from 'glob'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
//import { getThemeVariables } from 'antd/dist/theme'

const getWorkspaceAlias = () => {
  const basePath = path.resolve(__dirname, '../../../../')
  const pkg = fs.readJSONSync(path.resolve(basePath, 'package.json')) || {}
  const results = {}
  const workspaces = pkg.workspaces
  if (Array.isArray(workspaces)) {
    workspaces.forEach((pattern) => {
      const { found } = new GlobSync(pattern, { cwd: basePath })
      found.forEach((name) => {
        const pkg = fs.readJSONSync(
          path.resolve(basePath, name, './package.json')
        )
        results[pkg.name] = path.resolve(basePath, name, './src')
      })
    })
  }
  return results
}
// fs.remove(
//   path.resolve(__dirname, '../../../../docs/.vuepress/public/designer'),
//   () => {
//     console.log('删除成功')
//     console.log(path.resolve(__dirname, '../../../../node_modules/ant-design-vue'))
//   }
// )
const alias = getWorkspaceAlias()
export default {
  mode: 'development',
  devtool: 'inline-source-map', // 嵌入到源文件中
  stats: {
    entrypoints: false,
    children: false,
  },
  entry: {
    playground: path.resolve(__dirname, '../main'),
  },
  output: {
    path: path.resolve(__dirname, '../../../../docs/.vuepress/public/designer'),
    filename: '[name].[hash].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.json', '.js', '.jsx'],
    alias: {
      '@designable/core': require.resolve(`@designable/core`),
      '@formily/reactive-vue': require.resolve(`@formily/reactive-vue`),
      '@formily/reactive': require.resolve(`@formily/reactive`),
      '@formily/core': require.resolve(`@formily/core`),
      '@formily/shared': require.resolve(`@formily/shared`),
      '@vue/composition-api': require.resolve(`@vue/composition-api`),
      'ant-design-vue': path.resolve(
        __dirname,
        '../../../../node_modules/ant-design-vue'
      ),
      '@formily/antdv/esm/__builtins__': path.resolve(
        __dirname,
        '../../../components/src/__builtins__/index.ts'
      ),
      '@formily/antdv/lib/__builtins__': path.resolve(
        __dirname,
        '../../../components/src/__builtins__/index.ts'
      ),
      ...alias,
    },
  },
  externals: {
    // '@formily/reactive': 'Formily.Reactive',
    moment: 'moment',
    vue: 'Vue',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense',
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: getThemeVariables({
              //   dark: true // 开启暗黑模式
              // }),
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.html?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
}
