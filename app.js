//导入 express 模块
const express = require('express')
//实例化 express 对象
const app = express()
//导入cors
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//对res.send进行优化
app.use(require('./middleware/optimizeSend'))

//导入用户路由
const user = require('./router/user')
app.use('/api', user)
//导入mysql模块
const mysql = require('./db/index')

// 错误中间件
app.use(require('./middleware/errorHandlers'))
//开启服务器
app.listen(800, () => console.log('your server running at http://127.0.0.1:800'))
