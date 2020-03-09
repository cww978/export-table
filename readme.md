### 安装引用

```shell
#安装
npm i export-table -S
#引入
import ExportPlus from 'export-table'
```

### 创建导出对象

```javascript
 new ExportPlus(exportOptions)
```

##### 参数

| 名称          | 类型   | 必填 | 描述                            |
| ------------- | ------ | ---- | ------------------------------- |
| exportOptions | Object | 否   | {title, describe, saveFileName} |

##### exportOptions

| 名称         | 类型   | 必填 | 描述           |
| ------------ | ------ | ---- | -------------- |
| title        | String | 否   | 表格标题       |
| describe     | String | 否   | 表格描述       |
| saveFileName | String | 否   | 保存的文件名称 |

##### 实列

```javascript
const ExportTable = new ExportPlus({ title: '表格标题', describe: '查询条件' })
```

### table导出表格

```javascript
ExportTable.table_xlsx(VueComponent)
```

##### 参数

| 名称         | 类型         | 必填 | 描述 |
| ------------ | ------------ | ---- | ---- |
| VueComponent | VueComponent | 是   | dom  |

##### 实列

```html
<div>
  <el-table :cell-style="cellStyle" :span-method="objectSpanMethod"
    ref="el-table"
    :data="tableData"
    style="width: 100%">
    <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column label="配送信息">
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column label="地址">
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
    	<el-table-column prop="city" label="市区" width="120"></el-table-column>
    	<el-table-column prop="address" label="地址" width="300"></el-table-column>
      </el-table-column>
    </el-table-column>
    <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
  </el-table>
</div>

<script>
    import ExportPlus from 'export-table'
    const ExportTable = new ExportPlus({ title: '表格标题', describe: '查询条件' })
    ExportTable.table_xlsx(this.$refs['el-table'])
</script>
```

### json导出表格

```javascript
ExportTable.json_xlsx(tableData, columns, options)
```

##### 参数

| 名称      | 类型   | 必填 | 描述                   |
| --------- | ------ | ---- | ---------------------- |
| tableData | Array  | 是   | 数据                   |
| columns   | Array  | 是   | 表头                   |
| options   | Object | 否   | {cellMerge, cellStyle} |

##### options

| 名称        | 描述       |                           |
| ----------- | ---------- | ------------------------- |
| *cellMerge* | 合并       | *rowIndex*，*columnIndex* |
| cellStyle   | 自定义样式 | value                     |

##### 实列

```javascript
// 数据     
let tableData = [
    {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '1518 弄',
        zip: 200333
    },
    {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '1518 弄',
        zip: 200333
    },
    {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '1518 弄',
        zip: 200333
    },
    {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '1518 弄',
        zip: 200333
    },
    {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '1518 弄',
        zip: 200333
    },
    {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '1518 弄',
        zip: 200333
    },
    {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '1518 弄',
        zip: 200333
    }
]
// 表头信息
let columns = [
    { prop: 'date', title: '日期' },
    {
        title: '配送信息',
        children: [
            { prop: 'name', title: '姓名' },
            {
                title: '地址',
                children: [
                    { prop: 'province', title: '省份' },
                    { prop: 'city', title: '市区' },
                    { prop: 'address', title: '地址' }
                ]
            }
        ]
    },
    { prop: 'zip', title: '邮编' }
]
// 创建导出对象
const ExportTable = new ExportPlus({ title: '表格标题', describe: '查询条件' })
// 导出表格
ExportTable.json_xlsx(tableData, columns)
```

##### cellStyle设置单元格样式

- cellStyle({ prop, value })返回值**style**

```javascript
function: cellStyle({prop, value}) {
	// 当是id列时设置字体颜色
    if (prop === 'id') {
        return {
            fontColor: 'ff0000'
        }
    } else {
        return {}
    }
}
let tableData = [] // 表单数据
let columns = [] // 表头
// 定义导出实列
const ExportTable = new ExportPlus()
// 导出表格
ExportTable.json_xlsx(tableData, columns, { cellStyle })
```

##### style

- fontSize --字体大小`Number`
- verticalAlignment --竖直方向对齐方式，可选`center`,`right`,`left`
- horizontalAlignment --横向对齐位置，可选`center`,`right`,`left`
- border --是否显示边框，可选`fasle`,`true`
- borderColor --边框颜色`CCCCCC`
- fontColor --字体颜色`000000`
- fill --单元格背景`FFFFFF`

##### cellFormat格式化单元格数据

- cellFormat({ prop, value })

```javascript
function: cellFormat({prop, value}) {
	// 当是id列时格式化数据
    if (prop === 'id') {
        value = 'id' + value
    }
	return value
}
let tableData = [] // 表单数据
let columns = [] // 表头
// 定义导出实列
const ExportTable = new ExportPlus()
// 导出表格
ExportTable.json_xlsx(tableData, columns, { cellFormat })
```

##### cellMerge合并表格数据

- cellMerge({rowIndex, columnIndex})

```javascript
function: cellMerge({rowIndex, columnIndex}) {
	// rowIndex 行标
    // columnIndex 列标
    // 第0列起向下合并两个单元格
    if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
            return {
                rowspan: 2,
                colspan: 1
            }
        }
    } else {
        return {
           rowspan: 1,
           colspan: 1 
        }
    }
}
let tableData = [] // 表单数据
let columns = [] // 表头
// 定义导出实列
const ExportTable = new ExportPlus()
// 导出表格
ExportTable.json_xlsx(tableData, columns, { cellMerge })
```

