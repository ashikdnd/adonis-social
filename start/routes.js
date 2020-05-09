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
  Route.get('/', 'FeedController.home').as('newsfeed')
  Route.post('post', 'FeedController.post').as('makepost')
  Route.get('getPosts', 'FeedController.getPosts').as('getposts')
  Route.post('comment', 'FeedController.comment').as('makecomment')
}).middleware(['auth'])


Route.group(() => {
  Route.on('login').render('auth.login').as('login')
  Route.post('login', 'AuthController.login').as('doLogin')
}).middleware(['guest'])
