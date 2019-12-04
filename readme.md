### 一、安装引用

```shell
#安装
npm i export-table -S
#引入
import ExportPlus from 'export-table'
```

### 二、创建导出对象

```javascript
 new ExportPlus(exportOptions)
```

##### 参数exportOptions

| 名称         | 类型   | 必填 | 描述           |
| ------------ | ------ | ---- | -------------- |
| title        | String | 否   | 表格标题       |
| describe     | String | 否   | 表格描述       |
| saveFileName | String | 否   | 保存的文件名称 |

##### 实列

```javascript
const ExportTable = new ExportPlus({ title: '中烟大盘', describe: '查询条件' })
```

### 三、table导出表格

```javascript
ExportTable.table_xlsx(VueComponent)
```

##### 参数

| 名称         | 类型         | 必填 | 描述 |
| ------------ | ------------ | ---- | ---- |
| VueComponent | VueComponent | 是   | dom  |
|              |              |      |      |

##### 实列

```html
<div>
    <el-table
          :cell-style="cellStyle"
          :span-method="objectSpanMethod"
          ref="el-table"
          :data="tableData"
          style="width: 100%"
        >
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
    const ExportTable = new ExportPlus({ title: '中烟大盘', describe: '查询条件' })
    ExportTable.table_xlsx(this.$refs['el-table'])
</script>
```

### 四、json导出表格

```javascript
ExportTable.json_xlsx(tableData, columns, options)
```

##### 参数

| 名称      | 类型   | 必填 | 描述                     |
| --------- | ------ | ---- | ------------------------ |
| tableData | Array  | 是   | 数据                     |
| columns   | Array  | 是   | 表头                     |
| options   | Object | 否   | 合并、字体样式的回调方法 |

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
      const ExportTable = new ExportPlus({ title: '中烟大盘', describe: '查询条件' })
      // 导出表格
      ExportTable.json_xlsx(this.tableData, columns, {
        cellMerge({ rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              }
            }
          }
        }
      })
```

