(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService) {

        if(UserService.getCurrentUser() == null) {
            $location.url("/home");
        }

        $scope.currentUser = UserService.getCurrentUser();
        $scope.updateMessage = null;
        $scope.update = update;


        function update(currentUser) {
            if($scope.profileForm.$valid) {
                var userId = UserService.getCurrentUser()._id;
                UserService.updateUserById(userId, currentUser)
                    .then(function (response) {
                        $scope.currentUser = response;
                        UserService.setCurrentUser($scope.currentUser);
                    });
                $scope.updateMessage = "Update successfully";
            } else {
                $scope.updateMessage = null;
            }

        }


    }
})();