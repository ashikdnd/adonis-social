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

  async update({request, response, auth,session}) {
    console.log("from Update profile:" )
    const params = request.all();
    const name = params.name;
    const profile = params.profile;


     
   console.dir("params:" + (request))

    // const trx = await Database.beginTransaction()

    try {

      // update user collection
     //  response.implicitEnd = false
      let msg= "Profile updated successfully"
      await User.where('_id', auth.user._id).update({
        name: name
      })

      // update user profile
      const prf = await Profile.where('user_id', auth.user._id).first()
      if(prf) {
        console.log('has profile' )
        await Profile.where('_id', profile._id).update(profile)
      } else {
        console.log('no profile')
        profile.user_id = auth.user._id;
        await Profile.create(profile)
      }

      // trx.commit()
      console.log(msg)

      response.json({
       success: true,
       message: msg
      })
     
    } 

    catch(e) {
      // trx.rollback()
      let msg= "Profile update failed.."
      response.json({
        success: false,
        error: e,
        message: msg
      })
       console.log(e)
       session
        .flash({ notification: 'update failed' })
              response.redirect('/profile')
    }

  }

}

module.exports = ProfileController
