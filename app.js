//导入 express 模块
const express = require('express')
//实例化 express 对象
const app = express()
//导入cors
const cors = require('cors')
app.use(cors())
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//对res.send进行优化
app.use(require('./middleware/optimizeSend').fn)
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
//导入用户路由
const userinfo = require('./router/userinfo')
app.use('/my', userinfo)
const user = require('./router/user')
app.use('/api', user)
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
const articleRouter = require('./router/articles')
app.use('/my/article', articleRouter)
// 错误中间件
app.use(require('./middleware/errorHandlers').fn)
//开启服务器
app.listen(800, () => console.log('your server running at http://127.0.0.1:800'))
