const express = require('express')
const router = express.Router()

const routerHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
router.post('/reguser', expressJoi(reg_login_schema), routerHandler.reguser)
router.post('/login', routerHandler.login)
//向外部暴露router
module.exports = router
