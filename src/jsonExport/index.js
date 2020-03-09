// 根据JSON数据格式导出成XLSX的表格文件
const XlsxPopulate = require('xlsx-populate')
import {
  celltStyle,
  defaultMergeMethod,
  defaultCellStyle,
  defaultFormatMethod
} from '../../lib/config'
import { formatColumns, formatData, getColumnsReal } from './helper'
import { drawExcel, downFile, sheetTableColumnWidth } from '../../lib/common'

export default function json_export(
  data = [],
  columns = [],
  { cellStyle, cellMerge, cellFormat } = {}
) {
  const state = this.state
  cellStyle = typeof cellStyle === 'function' ? cellStyle : defaultCellStyle // 默认表格样式
  cellMerge = typeof cellMerge === 'function' ? cellMerge : defaultMergeMethod // 默认合并方法
  cellFormat =
    typeof cellFormat === 'function' ? cellFormat : defaultFormatMethod // 默认合并方法
  state._columns = formatColumns(columns)
  state._data = formatData(data, columns, { cellStyle, cellMerge, cellFormat })
  state.rowsLength = state._data.length
  state.colsLength = getColumnsReal(columns).length
  XlsxPopulate.fromBlankAsync().then(workbook => {
    let sheet = workbook.sheet('Sheet1')
    // 添加自定义标题
    if (state.title != '') {
      sheet
        .range(1, 1, 1, state.colsLength)
        .merged(true)
        .value(state.title)
        .style(celltStyle.title)
    }
    // 添加自定义描述
    if (state.describe != '') {
      sheet
        .range(sheet._rows.length, 1, sheet._rows.length, state.colsLength)
        .merged(true)
        .value(state.describe)
        .style(celltStyle.small)
    }
    sheet = drawExcel(sheet, state._columns)
    sheet = drawExcel(sheet, state._data)
    // 设置列宽
    sheet = sheetTableColumnWidth(sheet, state._columns)
    // 导出表格
    workbook.outputAsync().then(function(blob) {
      downFile(blob, state.saveFileName + '.xlsx')
    })
  })
}
