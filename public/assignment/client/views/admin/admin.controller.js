(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService) {

        var currentUser = UserService.getCurrentUser();

        if(currentUser == null) {
            $location.url("/home");
        }

    }
})();