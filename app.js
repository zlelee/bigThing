//导入 express 模块
const express = require('express')
//实例化 express 对象
const app = express()
//导入cors
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

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
