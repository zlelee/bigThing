const joi = require('@hapi/joi')
// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username: joi.string().alphanum().min(1).max(10).required(),
    password: joi
      .string()
      .pattern(/^[\S]{6,12}$/)
      .required()
  }
}
// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}
