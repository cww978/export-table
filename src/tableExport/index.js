// 基于element-table导出成XLSX的表格文件
const XlsxPopulate = require('xlsx-populate')
import { celltStyle } from '../../lib/config'
import {
  fillData,
  drawExcel,
  downFile,
  sheetTableColumnWidth
} from '../../lib/common'
import { getCellFromTable } from './helper'

export default function table_export(element) {
  const state = this.state
  let headerWrapper = element.$el.querySelector('.el-table__header-wrapper')
  let bodyWrapper = element.bodyWrapper
  let headerTable = headerWrapper.querySelector('table')
  let bodyTable = bodyWrapper.querySelector('table')
  // 获取表格header的单元格
  state._columns = fillData(getCellFromTable(headerTable, 'header'))
  // 获取表格body的单元格
  state._data = fillData(getCellFromTable(bodyTable))
  state.rowsLength = state._data.length
  state.colsLength = state._columns[0].length
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
    // 填入表格标题数据
    sheet = drawExcel(sheet, state._columns)
    // 填入表格主体数据
    sheet = drawExcel(sheet, state._data)
    // 设置列宽
    sheet = sheetTableColumnWidth(sheet, state._columns)
    // 导出表格
    workbook.outputAsync().then(function(blob) {
      downFile(blob, state.saveFileName + '.xlsx')
    })
  })
}
