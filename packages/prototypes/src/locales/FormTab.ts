export const FormTab = {
  'zh-CN': {
    title: '选项卡',
    addTabPane: '添加选项卡',
    settings: {
      'x-component-props': {
        animated: {
          title: '使用动画切换',
          tooltip: '在 tabPosition=top|bottom 时有效'
        },
        hideAdd: {
          title: '隐藏加号',
          tooltip: '在 type="editable-card" 时有效'
        },
        type: {
          title: '类型',
          dataSource: ['Line', 'Card', 'Editable Card']
        },
        size: {
          title: '大小',
          dataSource: ['大', '小', '默认']
        },
        tabPosition: '选项卡所在位置',
        tabBarGutter: '选项卡之间的间隙'
      }
    }
  },
  'en-US': {
    title: 'Tabs',
    addTabPane: 'Add Panel',
    settings: {
      'x-component-props': {
        animated: {
          title: 'Animation',
          tooltip: 'Only works while tabPosition="top"|"bottom"'
        },
        hideAdd: {
          title: 'Hide plus icon',
          tooltip: 'Only works while type="editable-card"'
        },
        type: {
          title: 'Type',
          dataSource: ['Line', 'Card', 'Editable Card']
        },
        size: {
          title: 'Size',
          dataSource: ['Large', 'Samll', 'Default']
        },
        tabPosition: 'Position',
        tabBarGutter: 'Gap between tabs'
      }
    }
  }
}

export const FormTabPane = {
  'zh-CN': {
    title: '选项卡面板',
    settings: {
      'x-component-props': {
        label: '面板标题',
        disabled: '禁用',
        name: {
          title: '列表中的顺序值',
          tooltip: `该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'`
        },
        closable: '标签是否可关闭',
        lazy: '标签是否延迟渲染'
      }
    }
  },
  'en-US': {
    title: 'Tab Panel',
    settings: {
      'x-component-props': {
        label: '面板标题',
        disabled: '禁用',
        name: {
          title: '列表中的顺序值',
          tooltip: `该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'`
        },
        closable: '标签是否可关闭',
        lazy: '标签是否延迟渲染'
      }
    }
  }
}
