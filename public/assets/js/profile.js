app.controller('profileCtrl', function($scope, $timeout, $http, $rootScope) {
  $scope.userProfile = userProfile;
  $scope.save = function() {
    console.log($scope.userProfile)
    $scope.userProfile.profile.dob = new Date($scope.userProfile.profile.dob)
    $http.post('/updateProfile', $scope.userProfile).then(function(res) {
      console.log(res)
      if(res.data.success) {
        $rootScope.user = $scope.userProfile;
      }

    }, function(e) {
      console.log('Error: ', e)
    })
  }
});
