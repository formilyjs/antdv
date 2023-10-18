export const ArrayTable = {
  'zh-CN': {
    title: '自增表格',
    addSortHandle: '添加排序',
    addColumn: '添加列',
    addIndex: '添加索引',
    addOperation: '添加操作',
    settings: {
      'x-component-props': {
        bordered: {
          title: '展示边框',
          tooltip: '展示外边框和列边框'
        },
        showHeader: { title: '显示表头' },
        size: {
          title: '尺寸',
          dataSource: ['中', '小', '默认']
        }
      }
    }
  },
  'en-US': {
    title: 'Array Table',
    addSortHandle: 'Add Sort Handle',
    addColumn: 'Add Column',
    addIndex: 'Add Index',
    addOperation: 'Add Operations',
    settings: {
      'x-component-props': {
        bordered: { title: 'Bordered' },
        showHeader: { title: 'Show header' },
        size: {
          title: 'Size',
          dataSource: ['Middle', 'Small', 'Default']
        }
      }
    }
  }
}

export const ArrayTableColumn = {
  'zh-CN': {
    title: '表格列',
    settings: {
      'x-component-props': {
        title: '标题',
        key: '字段名称',
        align: {
          title: '内容对齐',
          dataSource: ['左', '中', '右']
        },
        width: '宽度',
        fixed: {
          title: '固定',
          dataSource: ['左', '右']
        },
        sorter: '排序',
        sortOrder: {
          title: '排序方式',
          dataSource: ['正序', '倒序']
        }
      }
    }
  },
  'en-US': {
    title: 'Column',
    settings: {
      'x-component-props': {
        title: 'Title',
        key: 'Key',
        align: {
          title: 'Align',
          dataSource: ['Left', 'Center', 'Right']
        },
        width: 'Width',
        fixed: {
          title: 'Fixed',
          dataSource: ['Left', 'Right']
        },
        sorter: 'Sort',
        sortOrder: {
          title: 'Sort order',
          dataSource: ['Asc', 'Desc']
        }
      }
    }
  }
}
