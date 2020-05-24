'use strict'

const hash = use('Hash');
const User = use('App/Models/User');
const Mail = use('Mail')
const { validate, validations } = use('Validator')

class AuthController {

  async login({auth, request, response, session}) {
    const { email, password } = request.all()

    try {
      await auth.attempt(email, password)
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

  async register({request, response, session}) {
    const params = request.all();
    try {

      const rules = {
        name: 'required',
        email: 'required|email|unique:users,email',
        password: 'confirmed'
      }
      const messages = {
        'name.required': 'Please provide your name',
        'email.required': 'Please provide your email',
        'email.unique': 'This email has been taken',
        'password.required': 'Your password is required',
        'password.confirmed': 'Your passwords do not match'
      }

      const validation = await validate(request.all(), rules, messages)

      if (validation.fails()) {
        session
          .withErrors(validation.messages())
          .flashExcept(['password'])

        return response.redirect('back')
      }

      const user = new User();

      user.name = params.name;
      user.email = params.email;
      user.password = params.password;
      user.status = 0;
      user.privilege = 'user';


      await user.save();

      var x = await this.sendWelcomeEmail(params.name, params.email);
      console.log(x)
      session.flash({
        message: 'Thank you for signing up. Please check your email to activate your account.'
      })
      response.redirect('/register')
    } catch(e) {
      console.log(e.toString())
      session.flash({
        message: e.message
      })
      response.redirect('/register')
    }
  }

  async sendWelcomeEmail(name, email) {
    try {
      await Mail.send('emails.welcome', {name: name}, (message, email) => {
        message.subject('Welcome to Social Network')
        message.from('ashikdnd@gmail.com')
        message.to(email)
        message.cc('ashik.b1989@gmail.com')
      })
      return 'success';
    } catch(e) {
      return e.message;
    }
  }

  async logout({auth, response}) {
    await auth.logout();
    response.redirect('/login')
  }


}

module.exports = AuthController
