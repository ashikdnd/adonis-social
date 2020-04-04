$(function() {
  autosize($('textarea'));

  $('textarea').on('keyup', function() {
    if($(this).val() == 'hello') {
      $(this).addClass('error');
    }
  })

  $(document).on('keypress', '.post-comment textarea', function(e) {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
    }
  })

  $(document).on('keyup', '.post-comment textarea', function(e) {
    console.log(e)
    if(e.keyCode === 13 && !e.shiftKey) {
      var comment = $(this).val();
      console.log(comment)
    }
  })
})

app.controller('feedCtrl', function($scope) {
  $scope.postMsg = 'hello'
  $scope.name = 'Johnny Doe';

  $scope.posts = [{
    "name": "John Doe",
    time: "an hour ago",
    photo: "https://themesground.com/modern/demo3/HTML/img/profileimg.png",
    text: $scope.postMsg
  }];

  $scope.makePost = function() {
    console.log($scope.postMsg)
    var postData = {
      name: "John Doe",
      time: "an hour ago",
      photo: "https://themesground.com/modern/demo3/HTML/img/profileimg.png",
      text: $scope.postMsg
    };

    $scope.posts.push(postData);

    console.log($scope.posts)
  }
})
