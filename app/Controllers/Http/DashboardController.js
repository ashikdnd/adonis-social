'use strict'

const User = use('App/Models/User')

class DashboardController {

  async home({view}) {
    const ageAvg = await User.where('privilege', 'user').avg('age', 'gender')
    // return ageAvg;
    const genderRatio = await User.where('privilege', 'user').count('gender')
    // return genderRatio;
    return view.render('dashboard', {
      ratio: genderRatio,
      avg: ageAvg
    })
  }
}

module.exports = DashboardController
