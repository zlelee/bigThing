const express = require('express')
const router = express.Router()
// const db = require('../db/index')
// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
// 获取用户的基本信息
// console.log(userinfo_handler.getUserInfo)
router.get('/userinfo', userinfo_handler.getUserInfo)
module.exports = router
