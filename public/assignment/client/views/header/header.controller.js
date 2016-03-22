(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.logout = logout;
        $scope.collapseNav = collapseNav;

        function logout() {
            UserService.setCurrentUser(null);
            angular.element(".navbar-collapse").collapse("hide");
            $location.url('/');
        }

        function collapseNav() {
            angular.element(".navbar-collapse").collapse("hide");
        }

    }
})();