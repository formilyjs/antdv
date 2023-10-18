import { GlobalRegistry } from '@pind/designable-core'

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    Previews: {
      droppable: '可以拖入组件',
      addTabPanel: '添加选项卡',
      addCollapsePanel: '添加手风琴卡片',
      addTableColumn: '添加表格列',
      addTableSortHandle: '添加排序',
      addIndex: '添加索引',
      addOperation: '添加操作'
    }
  },
  'en-US': {
    Previews: {
      droppable: 'Droppable',
      addTabPanel: 'Add tab panel',
      addCollapsePanel: 'Add collapse panel',
      addTableColumn: 'Add table column',
      addTableSortHandle: 'Add table sort',
      addIndex: 'Add index',
      addOperation: 'Add operation'
    }
  }
})

export const ArrayAddition = {
  'zh-CN': {
    title: '添加按钮',
    settings: {
      'x-component-props': {
        title: '标题',
        method: {
          title: '方式',
          dataSource: ['末尾', '开始'],
          tooltip: '追加至列表方式'
        },
        defaultValue: '默认值'
      }
    }
  },
  'en-US': {
    title: 'Addition',
    settings: {
      'x-component-props': {
        title: 'Title',
        method: {
          title: 'Method',
          dataSource: ['Push', 'Unshift']
        },
        defaultValue: 'Default value'
      }
    }
  }
}

export const ArrayRemove = {
  'zh-CN': {
    title: '删除按钮'
  },
  'en-US': {
    title: 'Remove'
  }
}

export const ArrayMoveUp = {
  'zh-CN': {
    title: '上移按钮'
  },
  'en-US': {
    title: 'Move Up'
  }
}

export const ArrayMoveDown = {
  'zh-CN': {
    title: '下移按钮'
  },
  'en-US': {
    title: 'Move Down'
  }
}

export const ArrayIndex = {
  'zh-CN': {
    title: '索引标识'
  },
  'en-US': {
    title: 'Index'
  }
}

export const ArraySortHandle = {
  'zh-CN': {
    title: '排序标识'
  },
  'en-US': {
    title: 'Sort Handle'
  }
}
