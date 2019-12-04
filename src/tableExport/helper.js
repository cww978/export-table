import { getCell, celltStyle } from '../../lib/config'
import { colorRGBtoHex } from '../../lib/common'

export function getCellFromTable(table, type = 'body') {
  let data = []
  for (let i = 0; i < table.rows.length; i++) {
    let cells = table.rows[i].cells
    let row = []
    for (let j = 0; j < cells.length; j++) {
      if (!cells[j].classList.contains('gutter')) {
        let { color, backgroundColor } = cells[j].style
        let style = {
          fontColor: colorRGBtoHex(color) || '000000',
          fill: colorRGBtoHex(backgroundColor) || 'FFFFFF'
        }
        let cell = getCell(cells[j].innerText, cells[j].rowSpan, cells[j].colSpan)
        if (type === 'header') {
          cell.setStyle(celltStyle.head)
        } else {
          cell.setStyle(style)
        }
        row.push(cell)
      }
    }
    data.push(row)
  }
  return data
}
