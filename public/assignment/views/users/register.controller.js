(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {

        $scope.registerMessage = null;
        $scope.user = {_id:"", firstName:"", lastName:"",
            username:"", password:"", roles:[], email:""};
        $scope.register = register;

        function register(user) {
            var hasUsername = UserService.findUserByUsername(user.username);
            var hasEmail = UserService.findUserByEmail(user.email);
            var callback = function(data) {
                UserService.setCurrentUser(data);
                $location.url("/profile");
            };

            if($scope.registerForm.$valid && (user.password == $scope.verPassword)) {
                if(!hasUsername && !hasEmail) {
                    user._id = (new Date).getTime();
                    UserService.createUser(user, callback);
                } else {
                    if(hasUsername && !hasEmail) {
                        $scope.registerMessage = "Username already exists";
                    } else if(hasEmail && !hasUsername) {
                        $scope.registerMessage = "Email already registered";
                    } else {
                        $scope.registerMessage = "User already registered";
                    }
                }
            } else {
                $scope.registerMessage = null;
            }

        }

    }
})();