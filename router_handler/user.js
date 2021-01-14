const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db/index')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

//注册接口
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

//登录接口
exports.login = (req, res) => {
  const userinfo = req.body
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在,登录失败')
    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) {
      return res.cc('登录失败！')
    }

    // TODO：登录成功，生成 Token 字符串
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...results[0], password: '', user_pic: '' }
    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h' // token 有效期为 10 个小时
    })
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr
    })
  })
}
