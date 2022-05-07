
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '150',
    // customRender: (value, row, index) => {
    //   const obj = {
    //     children: value,
    //     attrs: {},
    //   };
    //   if (index === 2) {
    //     obj.attrs.rowSpan = 2;
    //   }
    //   // These two are merged into above cell
    //   if (index === 3) {
    //     obj.attrs.rowSpan = 0;
    //   }
    //   if (index === 4) {
    //     obj.attrs.colSpan = 0;
    //   }
    //   return obj;
    // },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '150',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: '150',
  },
];
const data = [
  {
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    rowspan: { name: '3' },
  },
  {
    name: 'John Brown',
    age: 42,
    address: 'London No. 1 Lake Park',
    rowspan: { name: '0' },
  },
  {
    name: 'John Brown',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    rowspan: { name: '0' },
  },
];
Page({
  data: {
    columns,
    data,
    nodes: [
      {
        name: 'table',
        attrs: {
          class: 'table',
          style: ''
        },
        children: [
          {
            name: 'thead',
            attrs: {
              class: 'thead'
            },
            children: [
              {
                name: 'tr',
                attrs: {
                  class: 'tr',
                  style: ''
                },
                children: []
              },
            ]
          },
          {
            name: 'tbody',
            attrs: {
              class: 'tbody'
            },
            children: []
          },
          {
            name: 'colgroup',
            children: []
          },
        ]
      },
    ]
  },
  onLoad: function (options) {
    const { columns, nodes } = this.data;
    // 生成列头
    const ths = columns.map((column) => {
      const { title } = column;
      return {
        name: 'th',
        attrs: {
          class: 'th',
          style: '',
        },
        children: [{
          type: 'text',
          text: title
        }]
      };
    })
    // 生成列样式
    const cols = columns.map((column) => {
      const { width } = column;
      let style = '';
      if (width) {
        style += 'width:' + width + 'px';
      }
      return {
        name: 'col',
        attrs: {
          class: 'col',
          style
        },
      };
    })
    const tbodyRows = data.map((item) => {
      const tds = [];
      for (let property in item) {
        if (property === 'rowspan') {
          continue;
        }
        let rowspan = 1;
        if (item?.rowspan) {
          rowspan = item?.rowspan[property] === undefined ? rowspan : item.rowspan[property];
        }
        if (rowspan != 0) {
          tds.push({
            name: 'td',
            attrs: {
              class: 'td',
              style: '',
              rowspan: rowspan + '',
            },
            children: [{
              type: 'text',
              text: item[property] + ''
            }]
          });
        }
      }
      return {
        name: 'tr',
        attrs: {
          class: 'tr',
          style: ''
        },
        children: tds
      }
    })
    nodes[0].children[1].children = tbodyRows;
    nodes[0].children[0].children[0].children = ths;
    nodes[0].children[2].children = cols;
    // 设置所有元素样式
    this.setAllNodesStyle();
    this.setData({ nodes });
  },
  setAllNodesStyle(children = []) {
    const style = 'box-sizing: border-box';
    const attrs = {
      style,
    }
    let nodes = children.length ? children : this.data.nodes;
    for (let node of nodes) {
      if (node?.attrs?.style) {
        node.attrs.style = node.attrs.style + ';' + style;
      } else if (node?.attrs) {
        Object.assign(node.attrs, attrs)
      } else {
        Object.assign(node, { attrs })
      }
      if (node?.children?.length && node?.children[0]?.type !== 'text') {
        this.setAllNodesStyle(node.children);
      }
    }
  },
  // setNodeTextByClass(classProperty, value, setDataParentKey = '', children = []) {
  //   let nodes;
  //   let index = 0;
  //   if (children.length) {
  //     nodes = children;
  //   } else {
  //     nodes = this.data.nodes;
  //   }
  //   let success = false;
  //   let setDataKey = '';
  //   for (let node of nodes) {
  //     setDataKey = '';
  //     if (!setDataParentKey) {
  //       setDataParentKey = 'nodes[' + index + '].';
  //       setDataKey = setDataParentKey + 'children[0].text';
  //     } else {
  //       setDataKey = setDataParentKey + 'children[' + index + '].' + 'children[0].text';
  //     }
  //     index++;
  //     const { attrs, children } = node;
  //     if (!attrs) {
  //       return false;
  //     }
  //     if (attrs.class === classProperty) {
  //       this.setData({ [setDataKey]: value });
  //       return true;
  //     }
  //     if (!children[0].text) {
  //       success = this.setNodeTextByClass(classProperty, value, setDataKey.replace('children[0].text', ''), children);
  //       if (success) {
  //         break;
  //       }
  //     }
  //   }
  //   return success;
  // },
  tap() {
    console.log('tap')
  }
})