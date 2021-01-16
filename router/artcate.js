const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')
const expressJio = require('@escook/express-joi')
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/article')
const expressJoi = require('@escook/express-joi')
//获取文章分类列表
router.get('/cates', artcate_handler.getArticleCates)
//新增文章
router.post('/addcates', expressJio(add_cate_schema), artcate_handler.addArticleCates)
//删除文章
router.get('/deletecate/:id', expressJio(delete_cate_schema), artcate_handler.deleteCateById)
//根据id获取内容
router.get('/cates/:id', expressJio(get_cate_schema), artcate_handler.getArticleById)
//根据id更新内容
router.post('/updatecate', expressJio(update_cate_schema), artcate_handler.updateCateById)
module.exports = router
