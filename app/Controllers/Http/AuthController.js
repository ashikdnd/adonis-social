'use strict'

const hash = use('Hash');
const user = use('App/Models/User');

class AuthController {

  async login({auth, request, response, session}) {
    const { email, password } = request.all()

    try {
      const user = await auth.attempt(email, password)
      response.redirect('/')
    } catch(e) {
      const emsg = e.message;
      let msg = '';
      if(emsg.indexOf('E_USER_NOT_FOUND') > -1) {
        msg = 'Invalid Login'
      } else if(emsg.indexOf('E_PASSWORD_MISMATCH') > -1) {
        msg = 'Invalid Login'
      } else {
        msg = 'We are unable to authenticate you at the moment. Please try again later.'
      }
      session
        .withErrors({ authentication: msg })
        .flashAll()
      response.redirect('/login')
    }
  }
}

module.exports = AuthController
