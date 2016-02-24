(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);


    function LoginController($scope, $rootScope, $location, UserService) {

        $scope.loginMessage = null;
        $scope.login = login;

        function login(user) {
            $scope.loginMessage = null;
            if($scope.loginForm.$valid) {
                var callbackUser;
                var callback = function(data) {
                    callbackUser = data;
                };

                UserService.findUserByCredentials(user.username, user.password, callback);

                if(callbackUser) {
                    $rootScope.currentUser = callbackUser;
                    UserService.setCurrentUser(callbackUser);
                    $location.url("/profile");
                } else {
                    $scope.loginMessage = "Username or password not correct!";
                }
            }

        }
    }
})();