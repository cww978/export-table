// 数据合并填充

import { getCell } from './config'

// 填充数据
export function fillData(source) {
  let array = typeof source === 'object' ? source : []
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      // 列填充
      if (array[i][j].colSpan > 1) {
        for (let k = 1; k < array[i][j].colSpan; k++) {
          array[i].splice(j + k, 0, getCell())
        }
      }
      // 行填充
      if (array[i][j].rowSpan > 1) {
        for (let n = 1; n < array[i][j].rowSpan; n++) {
          if (i + n < array.length) {
            array[i + n].splice(j, 0, getCell())
          } else {
            array[i][j].rowSpan = n
            break
          }
        }
      }
    }
  }
  return array
}

export function drawExcel(sheet, datas) {
  let marginTop = sheet._rows.length === 0 ? 1 : sheet._rows.length
  datas.forEach(rows => {
    let realRow = sheet._rows.length === 0 ? 1 : sheet._rows.length
    rows.forEach((cell, cellIndex) => {
      sheet
        .range(realRow, cellIndex + 1, realRow, cellIndex + 1)
        .value(cell.value)
        .style(cell.style)
    })
  })
  // 合并数据
  datas.forEach((rows, rowIndex) => {
    rows.forEach((cell, cellIndex) => {
      if (cell.rowSpan > 1 || cell.colSpan > 1) {
        sheet
          .range(
            rowIndex + marginTop,
            cellIndex + 1,
            rowIndex + marginTop + cell.rowSpan - 1,
            cellIndex + cell.colSpan
          )
          .merged(true)
          .value(cell.value)
          .style(cell.style)
      }
    })
  })
  return sheet
}

// 设置列宽
export function sheetTableColumnWidth(sheet, rows) {
  rows.map(columns => {
    columns.map((item, index) => {
      sheet
        .column(String.fromCharCode(index + 65))
        .width(item.width / 6 || 18)
        .hidden(false)
    })
  })
  return sheet
}

export function downFile(blob, fileName) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    let url = window.URL.createObjectURL(blob)
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }
}

// rgb颜色转16进制
export function colorRGBtoHex(color = '') {
  if (color == '') {
    return ''
  }
  var rgb = color.split(',')
  var r = parseInt(rgb[0].split('(')[1])
  var g = parseInt(rgb[1])
  var b = parseInt(rgb[2].split(')')[0])
  var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return hex
}
