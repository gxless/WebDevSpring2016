(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope, $location, UserService) {

        var currentUser = UserService.getCurrentUser();
        if(!currentUser) {
            $location.url("/");
        }

        $scope.click = click;

        function click() {
            $scope.input = ".";
            $scope.input = "";

        }
    }
})();