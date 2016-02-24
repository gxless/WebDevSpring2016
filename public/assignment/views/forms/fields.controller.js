(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope) {

        $scope.click = click;

        function click() {
            $scope.input = ".";
            $scope.input = "";

        }
    }
})();