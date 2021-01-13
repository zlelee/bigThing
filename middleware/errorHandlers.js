module.exports = (err, req, res, next) => {
  const joi = require('@hapi/joi')
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
}
