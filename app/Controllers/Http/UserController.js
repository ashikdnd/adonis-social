'use strict'

const Mail = use('Mail')

class UserController {

  async sendEmail() {
    try {
      await Mail.send('emails.welcome', {username: 'Esther'}, (message) => {
        message.from('ashikdnd@gmail.com')
        message.to('leethi4444@gmail.com')
        message.cc('ashik.b1989@gmail.com')
      })
      return 'success';
    } catch(e) {
      return e.message;
    }
    // await Mail.raw('Hello this is an email from Social Network app', (message) => {
    //   message.subject('Social Network')
    //   message.from('leethi4444@gmail.com')
    //   message.to('leethi4444@gmail.com')
    //   message.cc('ashik.b1989@gmail.com')
    // })
    return 'Email sent';
  }
}

module.exports = UserController
