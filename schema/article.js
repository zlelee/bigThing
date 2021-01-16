const jio = require('@hapi/joi')
const name = jio.string().required()
const alias = jio.string().alphanum().required()
const id = jio.number().integer().min(1).required()
exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}
exports.delete_cate_schema = { params: { id } }
exports.get_cate_schema = { params: { id } }
exports.update_cate_schema = { body: { Id: id, name, alias } }
