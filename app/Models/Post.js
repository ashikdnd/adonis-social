'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  static get table () {
    return 'posts'
  }

  comments() {
    return this.hasMany('App/Models/Comment', '_id', 'post_id')
  }
}

module.exports = Post
