const jio = require('@hapi/joi')
const name = jio.string().required()
const alias = jio.string().alphanum().required()
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}
