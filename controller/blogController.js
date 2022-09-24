const elasticClient = require('../config/elastic.config')

const indexBlog = 'blog'

exports.createBlog = async (req, res, next) => {
  try {
    const { title, author, text } = req.body
    //TODO validation
    const result = await elasticClient.index({
      index: indexBlog,
      document: {
        title,
        text,
        author
      }
    })
    return res.json(result)
  } catch (err) {
    next(err)
  }
}

exports.getAllBlog = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
exports.removeBlog = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
exports.searchByTitle = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
exports.searchByRegexp = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
exports.searchByMultiField = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
