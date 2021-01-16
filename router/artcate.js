const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')
const expressJio = require('@escook/express-joi')
const { add_cate_schema } = require('../schema/article')
//获取文章分类列表
router.get('/cates', artcate_handler.getArticleCates)
//新增文章
router.post('/addcates', expressJio(add_cate_schema), artcate_handler.addArticleCates)
module.exports = router
