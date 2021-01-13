const express = require('express')
const router = express.Router()

const routerHandler = require('../router_handler/user')

router.post('/reguser', reguser)
router.post('/login', login)
//向外部暴露router
module.exports = router
