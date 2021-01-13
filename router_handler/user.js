const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db/index')
exports.reguser = (req, res) => {
  const userinfo = req.body
  //检测是否为空
  //   if (!userinfo.username || !userinfo.password) {
  //     return res.cc('用户名或密码不能为空')
  //   }
  const sql = 'select * from ev_users where username=?'
  db.query(sql, [userinfo.username], (err, results) => {
    // if (err) return res.send({ status: 1, message: err.message })
    if (err) return res.cc(err)
    //检测用户名是否被占用
    if (results.length > 0) {
      //   res.send({status: 1,message: '用户名被其他人占用,请更换用户名'})
      return res.cc('用户名被占用,请更换用户名')
    }
    //给密码加密, 10代表随机盐的长度
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    const sql = 'insert into ev_users set ?'
    db.query(
      sql,
      {
        username: userinfo.username,
        password: userinfo.password
      },
      (err, results) => {
        // if (err) return res.send({ status: 1, message: err.message })
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('注册失败,请再试一次')
        res.send({ status: 0, message: '注册成功' })
      }
    )
  })
}
exports.login = (req, res) => {
  res.send('login ok')
}
