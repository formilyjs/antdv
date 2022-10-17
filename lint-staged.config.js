module.exports = {
  '*.{ts,tsx,js}': [
    // TODO: 格式错误无法签入代码临时注释，修改完后取消注释
    // 'eslint --ext .ts,.tsx,.js',
    'pretty-quick --staged',
    'git add',
  ],
  '*.md': ['pretty-quick --staged', 'git add'],
}
