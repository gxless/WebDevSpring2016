(function () {
    "use strict";
    angular
        .module("editDialog", [])
        .directive("editDialog", editDialog);

    function editDialog() {
        return {
            restrict: "E",
            templateUrl: "views/edit/editDialog.view.html"
        };

    }
})();