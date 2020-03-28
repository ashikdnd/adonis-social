'use strict'

import * as auth from "@adonisjs/auth/src/Schemes/Session";

class AuthController {
  async login({request, response, session}) {
    var params = request.all();
    console.log(params)
    response.redirect('/')
  }
}

module.exports = AuthController
