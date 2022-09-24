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
    // const mnResult = await Blog.create({ title, author, text })
    // if (mnResult) {
    //   res.json({ message: 'successfully Done' })
    //   const finalData = await Blog.aggregate([
    //     { $match: {} },
    //     { $project: {} },
    //     { $lookup: {} },
    //     { $unwind: {} },
    //     { $map: {} }
    //   ])
    //   event.emit('saveToElastic', finalData)
    //   saveToElastic()
    // }
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
    const value = req.params.value
    const blogs = await elasticClient.search({
      index: indexBlog,
      q: value
    })
    res.json(blogs.hits.hits)
  } catch (err) {
    next(err)
  }
}
exports.removeBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedResult = await elasticClient.deleteByQuery({
      index: indexBlog,
      query: {
        match: {
          _id: id
        }
      }
    })
    return res.json(deletedResult)
  } catch (err) {
    next(err)
  }
}

exports.updateBlog = async (req, res, next) => {
  try {
    //* first plan
    // const { id } = req.params
    // const data = req.body
    // Object.keys(data).forEach(key => {
    //   if (!data[key]) delete data[key]
    // })

    // const blog = (
    //   await elasticClient.search({
    //     index: indexBlog,
    //     query: { match: { _id: id } }
    //   })
    // ).hits.hits?.[0]
    // const payload = blog._source || {}
    // const updatedBlog = await elasticClient.index({
    //   index: indexBlog,
    //   id,
    //   body: { ...payload, ...data }
    // })
    // return res.json(updatedBlog)

    //* Second plan
    const { id } = req.params
    const data = req.body
    Object.keys(data).forEach(key => {
      if (!data[key]) delete data[key]
    })

    const updatedBlog = await elasticClient.update({
      index: indexBlog,
      id,
      doc: data
    })
    return res.json(updatedBlog)
  } catch (err) {
    next(err)
  }
}

exports.searchByTitle = async (req, res, next) => {
  try {
    const { title } = req.query
    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        match: { title }
      }
    })
    res.json(result.hits.hits)
  } catch (err) {
    next(err)
  }
}

exports.searchByMultiField = async (req, res, next) => {
  try {
    const { search } = req.query
    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        multi_match: {
          query: search,
          fields: ['title', 'text', 'author']
        }
      }
    })
    const blogs = result.hits.hits
    res.json(blogs)
  } catch (err) {
    next(err)
  }
}

exports.searchByRegexp = async (req, res, next) => {
  try {
    const { search } = req.query
    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        regexp: {
          title: `.*${search}.*`
        }
      }
    })
    res.json(result.hits.hits)
  } catch (err) {
    next(err)
  }
}

exports.searchByMultiRegexp = async (req, res, next) => {
  try {
    const { search } = req.query
    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        bool: {
          should: [
            {
              regexp: { title: `.*${search}.*` }
            },
            {
              regexp: { text: `.*${search}.*` }
            },
            {
              regexp: { author: `.*${search}.*` }
            }
          ]
        }
      }
    })
    res.json(result.hits.hits)
  } catch (err) {
    next(err)
  }
}
