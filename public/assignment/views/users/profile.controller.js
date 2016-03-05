(function () {
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService) {

        var currentUser = UserService.getCurrentUser();
        if(!currentUser) {
            $location.url("/");
        }

        $scope.updateMessage = null;
        $scope.currentUser = currentUser;
        $scope.update = update;

        function update(currentUser) {
            var callback = function(data) {
                $scope.currentUser = data;
            };

            if($scope.profileForm.$valid) {
                var userId = UserService.getCurrentUser()._id;
                $scope.updateMessage = "Update successfully";
                UserService.updateUser(userId, currentUser, callback);
            } else {
                $scope.updateMessage = null;
            }

        }


    }
})();