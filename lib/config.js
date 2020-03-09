const defaultStyle = {
  fontSize: 12,
  verticalAlignment: 'center',
  horizontalAlignment: 'right',
  border: true,
  borderColor: 'CCCCCC',
  fontColor: '000000',
  fill: 'ffffff'
}

export const celltStyle = {
  default: defaultStyle,
  title: Object.assign({}, defaultStyle, {
    bold: true,
    italic: true,
    horizontalAlignment: 'center',
    fontSize: 14
  }),
  head: Object.assign({}, defaultStyle, {
    bold: true,
    horizontalAlignment: 'center',
    verticalAlignment: 'center'
  }),
  small: Object.assign({}, defaultStyle, {
    fontSize: 9,
    horizontalAlignment: 'left'
  })
}
// 默认合并方法
export function defaultMergeMethod() {
  return {
    rowSpan: 1,
    colSpan: 1
  }
}
// 默认表格样式
export function defaultCellStyle() {
  return celltStyle.default
}

// 默认格式化方法
export function defaultFormatMethod(option) {
  return option.value
}
// 构建数据单元格
export function getCell(option) {
  let value = option.value || ''
  let rowSpan = option.rowSpan || 1
  let colSpan = option.colSpan || 1
  let width = option.width || 100
  return {
    value: value,
    style: celltStyle.default,
    rowSpan: rowSpan,
    colSpan: colSpan,
    width: width,
    setStyle(style) {
      this.style = Object.assign({}, this.style, style)
      return this
    }
  }
}
