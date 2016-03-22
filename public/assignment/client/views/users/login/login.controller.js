(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {

        $scope.loginMessage = null;
        $scope.login = login;

        function login(user) {

            $scope.loginMessage = null;

            if($scope.loginForm.$valid) {

                UserService.findUserByCredentials(user.username, user.password)
                    .then(function (response) {
                        if(response != null) {
                            UserService.setCurrentUser(response);
                            $location.url("/profile");
                        } else {
                            $scope.loginMessage = "Username or password not correct!";
                        }

                    });


            }

        }
    }
})();