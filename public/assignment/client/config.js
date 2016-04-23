(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {loggedin: checkCurrentUser}
                })
                .when("/register", {
                    templateUrl: "views/users/register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile/profile.view.html",
                    controller: "ProfileController",
                    resolve: {loggedin: checkLoggedin}
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {loggedin: checkAdmin}
                })
                .when("/forms", {
                    templateUrl: "views/forms/form.view.html",
                    controller: "FormController",
                    resolve: {loggedin: checkLoggedin}
                })
                .when("/fields", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    resolve: {loggedin: checkLoggedin}
                })
                .when("/form/:formId/field", {
                    templateUrl: "views/forms/field.view.html",
                    controller: "FieldController",
                    resolve: {loggedin: checkLoggedin}
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get("/api/assignment/loggedin").success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get("/api/assignment/loggedin").success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get('/api/assignment/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();