//导入 express 模块
const express = require('express')
//实例化 express 对象
const app = express()
//导入cors
const cors = require('cors')
//导入用户路由
const user = require('./router/user')
