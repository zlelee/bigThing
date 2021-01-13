//导入 express 模块
const express = require('express')
//实例化 express 对象
const app = express()
//导入cors
const cors = require('cors')
//导入用户路由
const user = require('./router/user')
//导入mysql模块
const mysql = require('./db/index')

//测试数据库连接是否成功
mysql.query('select 1', (err, results) => {
  // mysql 模块工作期间报错了
  if (err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  console.log(results)
})
//开启服务器
app.listen(80, () => {
  console.log('your server running at http://127.0.0.1')
})
