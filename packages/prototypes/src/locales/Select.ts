export const Select = {
  'zh-CN': {
    title: '选择框',
    settings: {
      'x-component-props': {
        mode: {
          title: '模式',
          dataSource: ['多选', '标签', '下拉列表', '默认'],
        },
        allowClear: '可以清空选项',
        autoFocus: '默认获取焦点',
        placeholder: '占位提示',
        size: {
          title: '尺寸',
          dataSource: ['大', '小', '默认'],
        },
        maxTagCount: {
          title: '最多标签数量',
          tooltip: '最多显示多少个 tag，响应式模式会对性能产生损耗',
        },
        maxTagPlaceholder: {
          title: '最多标签占位',
          tooltip: '隐藏 tag 时显示的内容',
        },
        maxTagTextLength: '最大显示的tag文本长度',
        notFoundContent: '为空时显示内容',
        labelInValue: {
          title: '标签值',
          tooltip:
            '是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: vNodes} 的格式',
        },
        optionFilterProp: {
          title: '搜索时过滤字段',
          tooltip:
            '搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索，默认是：value',
        },
        optionLabelProp: {
          title: '回填到选择框字段',
          tooltip:
            '回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。',
        },
        showSearch: '单选模式可搜索',
        showArrow: '显示下拉小箭头',
      },
    },
  },
  'en-US': {
    title: 'Select',
    settings: {
      'x-component-props': {
        mode: {
          title: 'Mode',
          dataSource: ['Multiple', 'Tags', 'Combobox', 'Default'],
        },
        allowClear: 'Allow clear',
        autoFocus: 'Auto focus',
        placeholder: 'Placeholder',
        size: {
          title: 'Size',
          dataSource: ['Large', 'Small', 'Default'],
        },
        maxTagCount: 'Max Tag Count',
        maxTagPlaceholder: {
          title: 'Max Tag Placeholder',
          tooltip: 'Content displayed when tag is hidden',
        },
        maxTagTextLength: 'Max Tag Text Length',
        notFoundContent: 'Not found content',
        labelInValue: {
          title: 'Label in value',
          tooltip:
            'whether to embed label in value, turn the format of value from string to {key: string, label: vNodes}',
        },
        optionFilterProp: {
          title: 'Prop for filter',
          tooltip:
            'Which prop value of option will be used for filter if filterOption is true, default is: value',
        },
        optionLabelProp: {
          title: 'prop for select display',
          tooltip:
            'Which prop value of option will render as content of select',
        },
        showSearch: 'Show search',
        showArrow: 'Show arrow',
      },
    },
  },
}
