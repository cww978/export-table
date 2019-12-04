export default function Store() {
  return {
    state: {
      colsLength: 0, // 树蕨列数
      rowsLength: 0, // 数据行数
      _data: [], // 数据
      _columns: [], // 数据标题列
      title: '',
      describe: '',
      saveFileName: '表格'
    }
  }
}
