import { getCell, celltStyle } from '../../lib/config'
import { fillData } from '../../lib/common'

const getAllColumns = columns => {
  const result = []
  columns.forEach(column => {
    let { value, style } = getCell({ value: column.title }).setStyle(
      celltStyle.head
    )
    column.value = value
    column.style = style
    if (column.children) {
      result.push(column)
      result.push.apply(result, getAllColumns(column.children))
    } else {
      result.push(column)
    }
  })
  return result
}

// 获取表头数据
export function getColumnsReal(originColumns = [], arr = []) {
  for (var i = 0; i < originColumns.length; i++) {
    if (originColumns[i].children) {
      getColumnsReal(originColumns[i].children, arr)
    } else {
      arr.push(originColumns[i])
    }
  }
  return arr
}

// 格式化标题
export function formatColumns(originColumns = []) {
  let maxLevel = 1
  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1
      if (maxLevel < column.level) {
        maxLevel = column.level
      }
    }
    if (column.children) {
      let colSpan = 0
      column.children.forEach(subColumn => {
        traverse(subColumn, column)
        colSpan += subColumn.colSpan
      })
      column.colSpan = colSpan
    } else {
      column.colSpan = 1
    }
  }
  originColumns.forEach(column => {
    column.level = 1
    traverse(column)
  })
  const rows = []
  for (let i = 0; i < maxLevel; i++) {
    rows.push([])
  }
  const allColumns = getAllColumns(originColumns)
  allColumns.forEach(column => {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1
    } else {
      column.rowSpan = 1
    }
    rows[column.level - 1].push(column)
  })
  return fillData(rows)
}

// 获取单元格合并规则
const getSpan = function(row, column, rowIndex, columnIndex, fn) {
  let rowSpan = 1
  let colSpan = 1
  if (typeof fn === 'function') {
    const result = fn({
      row,
      column,
      rowIndex,
      columnIndex
    })
    if (Array.isArray(result)) {
      rowSpan = result[0]
      colSpan = result[1]
    } else if (typeof result === 'object') {
      rowSpan = result.rowspan
      colSpan = result.colspan
    }
  }
  return { rowSpan, colSpan }
}
// 获取单元格格式化规则
const getFormat = function(prop, value, fn) {
  let formatValue = value
  if (typeof fn === 'function') {
    const result = fn({ prop, value })
    formatValue = result
  }
  return formatValue
}
// 获取单元格样式
const getCellStyle = function(prop, value, fn) {
  let style = {}
  if (typeof fn === 'function') {
    const result = fn({ prop, value })
    style = result
  }
  return style
}
// 格式话数据
export function formatData(
  data = [],
  columns = [],
  { cellStyle, cellMerge, cellFormat }
) {
  const allColumns = getAllColumns(columns)
  let cells = []
  // 数据
  for (let i = 0; i < data.length; i++) {
    let row = []
    for (let j = 0; j < allColumns.length; j++) {
      if (typeof allColumns[j].prop != 'undefined') {
        let cell = getCell({ value: data[i][allColumns[j].prop] })
        cell.value = getFormat(allColumns[j].prop, cell.value, cellFormat)
        cell.setStyle(getCellStyle(allColumns[j].prop, cell.value, cellStyle))
        let span = getSpan(data[i], cell.value, i, j, cellMerge)
        if (typeof span !== 'undefined') {
          cell.rowSpan = span.rowSpan == undefined ? cell.rowSpan : span.rowSpan
          cell.colSpan = span.colSpan == undefined ? cell.colSpan : span.colSpan
        }
        if (cell.rowSpan > 1 && data.length - i < cell.rowSpan) {
          cell.rowSpan = data.length - i
        }
        row.push(cell)
      }
    }
    cells.push(row)
  }
  return cells
}
