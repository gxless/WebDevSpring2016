(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $http, UserService) {
        $scope.logout = logout;
        $scope.collapseNav = collapseNav;

        function logout() {
            $http.post("/api/assignment/logout")
                .success(function()
                {
                    UserService.setCurrentUser(null);
                    angular.element(".navbar-collapse").collapse("hide");
                    $location.url("/");
                });
        }

        function collapseNav() {
            angular.element(".navbar-collapse").collapse("hide");
        }

    }
})();