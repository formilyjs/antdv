# ArrayTable

> 自增表格，对于数据量超大的场景比较适合使用该组件，虽然数据量大到一定程度会有些许卡顿，但是不会影响基本操作
>
> 注意：该组件只适用于 Schema 场景，且只能是对象数组

## Markup Schema 案例

<dumi-previewer demoPath="guide/array-table/markup-schema" />

## JSON Schema 案例

<dumi-previewer demoPath="guide/array-table/json-schema" />

## Effects 联动案例

<dumi-previewer demoPath="guide/array-table/effects-markup-schema" />

## JSON Schema 联动案例

<dumi-previewer demoPath="guide/array-table/effects-json-schema" />

## API

### ArrayTable

> 表格组件

参考 [https://antdv.com/components/table-cn/](https://antdv.com/components/table-cn/)

### ArrayTable.Column

> 表格列

参考 [https://antdv.com/components/table-cn/](https://antdv.com/components/table-cn/)

### ArrayTable.Addition

> 添加按钮

扩展属性

| 属性名       | 类型                  | 描述     | 默认值   |
| ------------ | --------------------- | -------- | -------- |
| title        | string                | 文案     |          |
| method       | `'push' \| 'unshift'` | 添加方式 | `'push'` |
| defaultValue | `any`                 | 默认值   |          |

其余参考 [https://antdv.com/components/button-cn/](https://antdv.com/components/button-cn/)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.Remove

> 删除按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://antdv.com/components/icon-cn/](https://antdv.com/components/icon-cn/)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.MoveDown

> 下移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://antdv.com/components/icon-cn/](https://antdv.com/components/icon-cn/)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.MoveUp

> 上移按钮

| 属性名 | 类型   | 描述 | 默认值 |
| ------ | ------ | ---- | ------ |
| title  | string | 文案 |        |

其余参考 [https://antdv.com/components/icon-cn/](https://antdv.com/components/icon-cn/)

注意：title 属性可以接收 Field 模型中的 title 映射，也就是在 Field 上传 title 也是生效的

### ArrayTable.Index

> 索引渲染器

无属性

### ArrayTable.useIndex

> 读取当前渲染行索引的 Hook

### ArrayTable.useRecord

> 读取当前渲染记录的 Hook
