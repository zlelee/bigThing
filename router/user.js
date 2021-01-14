const express = require('express')
const router = express.Router()

const routerHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
// 注册的路由
router.post('/reguser', expressJoi(reg_login_schema), routerHandler.reguser)
// 登录的路由
router.post('/login', expressJoi(reg_login_schema), routerHandler.login)

//向外部暴露router
module.exports = router
