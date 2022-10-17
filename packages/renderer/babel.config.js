module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@vue/babel-preset-jsx',
      {
        vModel: true,
        vOn: true,
        injectH: true,
        functional: true,
        compositionAPI: true,
      },
    ],
    '@babel/typescript',
  ],
  plugins: ['@babel/transform-runtime'],
}
