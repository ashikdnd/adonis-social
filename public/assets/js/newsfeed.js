$(function() {
  autosize($('textarea'));
})

app.controller('feedCtrl', function($scope, $timeout) {
  $scope.postMsg = '';
  $scope.posts = [];
  $scope.makePost = function() {
    console.log($scope.postMsg)
    var postData = {
      name: "John Doe",
      time: new Date(),
      photo: "https://themesground.com/modern/demo3/HTML/img/profileimg.png",
      text: $scope.postMsg,
      comments: [
        {
          name: "Willim Smith",
          text: "I am the second commentator",
          photo: "https://themesground.com/modern/demo3/HTML/img/profileimg.png",
          time: new Date()
        },
        {
          name: "James Colorado",
          text: "I am the first commentator",
          photo: "https://themesground.com/modern/demo3/HTML/img/profileimg.png",
          time: new Date()
        }
      ]
    };

    $scope.postMsg = '';

    $scope.posts.unshift(postData);

    $timeout(function() {
      autosize($('textarea'));
    }, 500);
  }

  $scope.deleteComment = function(comment, ind, pind) {
    console.log(comment)
    console.log(ind)

    var con = confirm('Are you sure to delete this comment?');
    if(con) {
      $scope.posts[pind].comments.splice(ind, 1);
    }
  }

  $scope.addComment = function(e, pind) {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      $scope.posts[pind].comments.unshift(
        {
          name: "James Colorado",
          text: e.target.value,
          photo: "https://themesground.com/modern/demo3/HTML/img/profileimg.png",
          time: new Date()
        }
      );
      e.target.value = '';
    }
  }
  $scope.onDelete = function(pind){
    var con= confirm("Do you wish to delete the post??");
    if (con){
      $scope.posts.splice(pind,1);
    }
  }
});
