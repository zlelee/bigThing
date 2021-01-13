const joi = require('@hapi/joi')

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
