(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {

        $scope.registerMessage = null;
        $scope.register = register;

        function register(user) {

            if($scope.registerForm.$valid && (user.password == $scope.verPassword)) {

                var counter = 2;
                var hasUsername = false;
                var hasEmail = false;

                UserService.findUserByUsername(user.username)
                    .then(function (response) {
                        hasUsername = response;
                        checkDuplicate();
                    });

                UserService.findUserByEmail(user.email)
                    .then(function (response) {
                        hasEmail = response;
                        checkDuplicate();
                    });

                var checkDuplicate = function () {
                    counter--;
                    if(counter == 0) {
                        if(!hasUsername && !hasEmail) {

                            UserService.createUser(user)
                                .then(function (response) {
                                    UserService.setCurrentUser(response);
                                    $location.url("/profile");
                                });

                        } else {
                            if(hasUsername && !hasEmail) {
                                $scope.registerMessage = "Username already exists";
                            } else if(hasEmail && !hasUsername) {
                                $scope.registerMessage = "Email already registered";
                            } else {
                                $scope.registerMessage = "User already registered";
                            }
                        }
                    }
                };


            } else {
                $scope.registerMessage = null;
            }

        }

    }
})();