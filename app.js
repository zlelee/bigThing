//导入 express 模块
const express = require('express')
//实例化 express 对象
const app = express()
//导入cors
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//对res.send进行优化
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
const joi = require('@hapi/joi')
//导入用户路由
const user = require('./router/user')
app.use('/api', user)
//导入mysql模块
const mysql = require('./db/index')
const joi = require('@hapi/joi')

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})
//开启服务器
app.listen(800, () => {
  console.log('your server running at http://127.0.0.1:800')
})
