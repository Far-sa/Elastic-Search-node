const createHttpError = require('http-errors')
const elasticClient = require('../config/elastic.config')

exports.createNewIndex = async (req, res, next) => {
  try {
    const { indexName } = req.body
    if (!indexName) throw createHttpError.BadRequest('invalid index name')
    const result = await elasticClient.indices.create({ index: indexName })
    return res.json({
      result,
      message: 'index Created'
    })
  } catch (err) {
    next(err)
  }
}

exports.removeIndex = async (req, res, next) => {
  try {
    const { indexName } = req.params
    const result = await elasticClient.indices.delete({ index: indexName })
    if (!result) throw createHttpError.NotFound('index not found')
    return res.json({
      result
    })
  } catch (err) {
    next(err)
  }
}
exports.getIndices = async (req, res, next) => {
  try {
    const indices = await elasticClient.indices.getAlias()
    const regexp = /^\.+/
    return res.json({
      indices: Object.keys(indices).filter(item => !regexp.test(item))
    })
  } catch (err) {
    next(err)
  }
}
