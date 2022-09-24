const elasticClient = require('../config/elastic.config')
const { EventEmitter } = require('events')
const { events } = require('@elastic/elasticsearch')

const event = new EventEmitter()
const indexBlog = 'blog'

exports.createBlog = async (req, res, next) => {
  try {
    const { title, author, text } = req.body
    //TODO validation
    //* use CQRS sample
    const mnResult = await Blog.create({ title, author, text })
    if (mnResult) {
      res.json({ message: 'successfully Done' })
      const finalData = await Blog.aggregate([
        { $match: {} },
        { $project: {} },
        { $lookup: {} },
        { $unwind: {} },
        { $map: {} }
      ])
      event.emit('saveToElastic', finalData)
      saveToElastic()
    }
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
exports.saveToElastic = async (req, res, next) => {
  try {
    event.on('saveToElastic', finalData => {
      elasticClient.index({
        index: indexBlog,
        document: finalData
      })
    })
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
