export interface IBuilderConfig {
  externals?: Record<string, string>
  //当前仓库核心依赖的三方组件库名称
  targetLibName?: string
  //核心三方库cjs目录名
  targetLibCjsDir?: string
  //核心三方库es目录名
  targetLibEsDir?: string
  //是否打包全量类型文件
  bundleDts?: boolean
}
