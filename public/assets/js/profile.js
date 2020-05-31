app.controller('profileCtrl', function($scope, $timeout, $http, $rootScope) {
  $scope.userProfile = userProfile;
  $scope.msg = '';
  $scope.save = function() {
    console.log($scope.userProfile)
    // $scope.userProfile.profile.dob = new Date($scope.userProfile.profile.dob).toISOString()
    $http.post('/updateProfile', $scope.userProfile).then(function(res) {
      console.log("res:"+res.data)

      if(res.data.success) {
        $rootScope.user = $scope.userProfile;
        $scope.msg = res.data.message;
      }

    }, function(e) {
      console.log('Error: ', e)
    })
  }
});
 