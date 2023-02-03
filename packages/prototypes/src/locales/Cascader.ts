export const Cascader = {
  'zh-CN': {
    title: '联级选择',
    settings: {
      'x-component-props': {
        allowClear: '是否支持清除',
        autoFocus: '自动获取焦点',
        placeholder: '占位提示',
        size: {
          title: '尺寸',
          dataSource: ['大', '小', '默认'],
        },
        popupPlacement: {
          title: '浮层位置',
          dataSource: ['左下', '右下', '左上', '右上'],
        },
        showSearch: '显示搜索框',
        changeOnSelect: {
          title: '选择时改变',
          tooltip: '当此项为 true 时，点选每级菜单选项值都会发生变化',
        },
        displayRender: {
          title: '显示渲染函数',
          tooltip: '选择后展示的渲染函数, 默认是 label => label.join(" / ")',
        },
        fieldNames: {
          title: '自定义字段',
          tooltip:
            '自定义 options 中 label name children 的字段, 默认：{ label: "label", value: "value", children: "children" }',
        },
      },
    },
  },
  'en-US': {
    title: 'Cascader',
    settings: {
      'x-component-props': {
        allowClear: 'Allow clear',
        autoFocus: 'Auto focus',
        placeholder: 'Placeholder',
        size: {
          title: 'Size',
          dataSource: ['Large', 'Small', 'Default'],
        },
        popupPlacement: {
          title: 'Popup placement',
          dataSource: ['Bottom left', 'Bottom right', 'Top left', 'Top right'],
        },
        showSearch: 'Show search',
        changeOnSelect: {
          title: 'Change On Select',
          tooltip: 'Click on each level of menu option value will change',
        },
        displayRender: {
          title: 'Display Render',
          tooltip:
            'The rendering function displayed after selection, the default is label => label.join(" / ")',
        },
        fieldNames: {
          title: 'Field Names',
          tooltip:
            'Defaults：{ label: "label", value: "value", children: "children" }',
        },
      },
    },
  },
}
