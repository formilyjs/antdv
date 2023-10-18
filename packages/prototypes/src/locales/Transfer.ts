export const Transfer = {
  'zh-CN': {
    title: '穿梭框',
    settings: {
      'x-component-props': {
        titles: '标题',
        operations: '操作符',
        lazy: '懒加载',
        render: {
          title: '渲染函数',
          tooltip:
            '每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 element。或者返回一个普通对象，其中 label 字段为 element，value 字段为 title'
        },
        showSearch: '显示搜索框',
        showSelectAll: '展示全选勾选框'
      }
    }
  },
  'en-US': {
    title: 'Transfer',
    settings: {
      'x-component-props': {
        titles: 'Titles',
        operations: 'Operations',
        lazy: 'Lazy',
        render: {
          title: 'Render',
          tooltip:
            'The function to generate the item shown on a column. Based on an record (element of the dataSource array), this function should return a element which is generated from that record. Also, it can return a plain object with value and label, label is a element and value is for title'
        },
        showSearch: 'Show search',
        showSelectAll: 'Show select all'
      }
    }
  }
}
