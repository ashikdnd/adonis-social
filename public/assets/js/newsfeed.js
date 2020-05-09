$(function() {
  autosize($('textarea'));
})

app.controller('feedCtrl', function($scope, $timeout, $http) {
  $scope.postMsg = '';
  $scope.posts = [];

  $http.get('/getPosts').then(function(res) {
    $scope.posts = res.data.data;
  }, function(e) {
    console.log(e)
  })

  $scope.makePost = function() {

    console.log($scope.postMsg)

    $http.post('/post', {postText: $scope.postMsg}).then(function(res) {
      if(res.data.success) {
        $scope.postMsg = '';
        $scope.posts.unshift(res.data.data);
        $timeout(function() {
          autosize($('textarea'));
        }, 500);
      } else {
        alert('Unable to post')
      }
    }, function(e) {
      console.log(e)
      alert('Unable to post')
    })
  }

  $scope.deleteComment = function(comment, ind, pind) {
    console.log(comment)
    console.log(ind)

    var con = confirm('Are you sure to delete this comment?');
    if(con) {
      $http.post('/delComment', {id: comment._id}).then(function(res) {
        console.log(res)
        if(res.data.success) {
          $scope.posts[pind].comments.splice(ind, 1);
        }
      }, function(e) {
        alert('Unable to delete comment');
      })

    }
  }

  $scope.addComment = function(e, pind) {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      $http.post('/comment', {commentText: e.target.value, pid: $scope.posts[pind]['_id']}).then(function(res) {
        console.log(res.data)
        if(res.data.success) {
          $scope.posts[pind].comments.unshift(res.data.data);
          e.target.value = '';
        }
      }, function (e) {
        console.log(e)
        alert('Unable to post comment')
      })
    }
  }
  $scope.onDelete = function(pind){
    var con= confirm("Do you wish to delete the post??");
    if (con){
      $scope.posts.splice(pind,1);
    }
  }
});
