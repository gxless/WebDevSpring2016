(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService) {

        $scope.currentUser = UserService.getCurrentUser();
        $scope.updateMessage = null;
        $scope.update = update;


        function update(currentUser) {
            if($scope.profileForm.$valid) {
                var userId = UserService.getCurrentUser()._id;
                if($scope.password) {
                    currentUser.password = $scope.password;
                    currentUser.changePass = true;
                }
                UserService.updateUserById(userId, currentUser)
                    .then(function (response) {
                        $scope.currentUser = response;
                        UserService.setCurrentUser(response);
                    });

                $scope.updateMessage = "Update successfully";
            } else {
                $scope.updateMessage = null;
            }

        }


    }
})();