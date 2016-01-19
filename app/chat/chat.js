(function (angular) {
  "use strict";

  var app = angular.module('myApp.chat', ['ngRoute', 'firebase.utils', 'firebase']);

  app.controller('ChatCtrl', ['$scope', 'messageList', function($scope, messageList) {
      $scope.messages = messageList;
      $scope.addMessage = function(newMessage) {
        if( newMessage ) {
          $scope.messages.$add({text: newMessage});
        }
      };
    }]);

  app.factory('messageList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('messages').limitToLast(10);
    return $firebaseArray(ref);
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {
      templateUrl: 'chat/chat.html',
      controller: 'ChatCtrl'
    });
  app.directive('script', function() {
   return {
     restrict: 'E',
     scope: false,
     link: function(scope, elem, attr) 
     {
       if (attr.type==='text/javascript-lazy') 
       {
         var s = document.createElement("script");
         s.type = "text/javascript";                
         var src = elem.attr('src');
         if(src!==undefined)
         {
             s.src = src;
         }
         else
         {
             var code = elem.text();
             s.text = code;
         }
         document.head.appendChild(s);
         elem.remove();
         }
       }
     };
   });
  }]);

})(angular);
