const express = require('express')
const db = require('../db/index')
exports.reguser = (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: '用户名或密码不能为空'
    })
  }
  const sql = 'select * from ev_users where username=?'
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) return res.send({ status: 1, message: err.message })
    if (results.length > 0) {
      res.send({
        status: 1,
        message: '用户名被其他人占用,请更换用户名'
      })
    }
    res.send('可以注册')
  })
}
exports.login = (req, res) => {
  res.send('login ok')
}
