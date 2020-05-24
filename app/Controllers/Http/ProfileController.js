'use strict'

const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Database = use('Database')

class ProfileController {

  async home({auth, view}) {
    const data = await User.where('_id', auth.user._id).with('profile').first()
    return view.render('profile', {
      userData: data.toJSON()
    })
  }

  async update({request, response, auth}) {
    const params = request.all();
    const name = params.name;
    const profile = params.profile;

    // const trx = await Database.beginTransaction()

    try {
      // update user collection
      await User.where('_id', params._id).update({
        name: name
      })

      // update user profile
      const prf = await Profile.where('_id', auth.user._id).first()
      if(prf) {
        console.log('has profile')
        await Profile.where('_id', profile._id).update(profile)
      } else {
        console.log('no profile')
        profile.user_id = auth.user._id;
        await Profile.create(profile)
      }

      // trx.commit()

      response.json({
        success: true
      })
    } catch(e) {
      // trx.rollback()
      response.json({
        success: false,
        error: e
      })
    }

  }

}

module.exports = ProfileController
