// 导入数据库操作模块
const db = require('../db/index')
//获取文章分类列表
exports.getArticleCates = (req, res) => {
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类列表成功',
      data: results
    })
  })
}
//新增文章
exports.addArticleCates = (req, res) => {
  const sql = 'select * from ev_article_cate where name=? or alias=?'
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('分类名称和别名被占用')
    if (results.length === 1 && (req.body.name === results[0].name) & (req.body.alias === results[0].alias)) return res.cc('分类名称和别名被占用')
    if (results.length === 1 && req.body.name === results[0].name) return res.cc('分类名称被占用')
    if (results.length === 1 && req.body.alias === results[0].alias) return res.cc('别名被占用')
    const sql = 'insert into ev_article_cate set ?'
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增文章失败')
      res.cc('新增文章成功', 0)
    })
  })
}
//删除文章
exports.deleteCateById = (req, res) => {
  const sql = 'update ev_article_cate set is_delete=1 where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章失败')
    res.cc('删除文章成功', 0)
  })
}
//根据id获取内容
exports.getArticleById = (req, res) => {
  const sql = 'select * from ev_article_cate where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    console.log(results)
    res.send({
      status: 0,
      message: '获取成功',
      data: results[0]
    })
  })
}
//根据id更新内容
exports.updateCateById = (req, res) => {
  const sql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)'
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 2) return res.cc('分类名称和别名被占用')
    if (results.length === 1 && req.body.name === results[0].name) return res.cc('分类名称被占用')
    if (results.length === 1 && req.body.alias === results[0].alias) return res.cc('别名被占用')
    const sql = `update ev_article_cate set ? where Id=?`
    db.query(sql, req.body.Id, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新分类失败')
      res.cc('更新分类成功')
    })
  })
}
