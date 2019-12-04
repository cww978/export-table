/**
 * 基于element-table 和 xlsx-populate的表格导出
 * author: cww
 * endTime: 2019-12-03
 */
import Store from './lib/store'
import json_export from './src/jsonExport/index'
import table_export from './src/tableExport/index'

const exportPlus = function({ title, describe, saveFileName }) {
  const store = new Store()
  this.state = store.state
  this.state.title = title ? title : this.state.title
  this.state.describe = describe ? describe : this.state.describe
  this.state.saveFileName = saveFileName ? saveFileName : this.state.saveFileName
}
exportPlus.prototype.json_xlsx = json_export
exportPlus.prototype.table_xlsx = table_export

module.exports = exportPlus
