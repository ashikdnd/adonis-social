'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // newsfeed routes
  Route.get('/', 'FeedController.home').as('newsfeed')
  Route.post('post', 'FeedController.post').as('makepost')
  Route.get('getPosts', 'FeedController.getPosts').as('getposts')
  Route.post('comment', 'FeedController.comment').as('makecomment')
  Route.post('delComment', 'FeedController.deleteComment').as('deletecomment')
  Route.post('delPost','FeedController.deletePost').as('deletepost')

  //profile routes
  Route.get('profile', 'ProfileController.home').as('profile')
  Route.post('updateProfile', 'ProfileController.update').as('updateprofile')

  Route.get('logout', 'AuthController.logout').as('logout')
}).middleware(['auth'])


Route.group(() => {
  Route.get('email', 'UserController.sendEmail').as('sendEmail')
  Route.on('login').render('auth.login').as('login')
  Route.post('login', 'AuthController.login').as('doLogin')
  Route.on('register').render('auth.register').as('register')
  Route.post('register', 'AuthController.register').as('doRegister')
}).middleware(['guest'])
