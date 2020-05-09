'use strict'

const Profile = use('App/Models/Profile')
const Comment = use('App/Models/Comment')
const Post = use('App/Models/Post')
const Database = use('Database')

class FeedController {

  async home({auth, view}) {
    const data = await auth.user
    data.profile = await Profile.where("user_id", data._id).first()
    return view.render('newsfeed', {
      userData: data.toJSON()
    })
  }

  async post({auth, request, response}) {
    const params = request.all();
    try {
      const post = new Post();
      post.name = auth.user.name;
      post.text = params.postText;
      post.user_id = auth.user._id;
      post.photo = null;
      const profile = await Profile.where('user_id', auth.user._id).first();
      if(profile) {
        post.photo = profile.profile_picture;
      }
      await post.save();

      response.json({
        success: true,
        data: post
      })
    } catch(e) {
      response.json({
        success: false,
        error: e.message
      })
    }
  }

  async getPosts({auth, response}) {
    const posts = await Post.with('comments').where('user_id', auth.user._id).orderBy('created_at', 'DESC').fetch()
    response.json({
      success: true,
      data: posts
    })
  }

  async comment({auth, request, response}) {
    const params = request.all();
    try {
      const cmt = new Comment();
      cmt.post_id = params.pid;
      cmt.name = auth.user.name;
      cmt.text = params.commentText;
      cmt.user_id = auth.user._id;
      cmt.photo = null;
      const profile = await Profile.where('user_id', auth.user._id).first();
      if(profile) {
        cmt.photo = profile.profile_picture;
      }
      await cmt.save();

      response.json({
        success: true,
        data: cmt
      })
    } catch(e) {
      response.json({
        success: false,
        error: e.message
      })
    }
  }

  async deleteComment({request, response}) {
    const params = request.all();
    try {
      await Comment.where('_id', params['id']).delete();
      response.json({
        success: true
      })
    } catch(e) {
      response.json({
        success: false,
        error: e.message
      })
    }
  }

 
  async deletePost({request, response}) {

    const params = request.all();
    const trx = await Database.beginTransaction()
    try {

      await Comment.where('post_id', params['key_postid']).delete(trx);
      await Post.where('_id', params['key_postid']).delete(trx);
      trx.commit()

      response.json({
        success: true
      })
    } catch(e) {
      await trx.rollback()
      response.json({
        success: false,
        error: e.message
      })
    }
  }

}

module.exports = FeedController
