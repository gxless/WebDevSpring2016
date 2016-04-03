(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var api = {
            findUserByUsername : findUserByUsername,
            findUserByEmail : findUserByEmail,
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUserById : updateUserById,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser
        };

        return api;

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/username/" + username)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByEmail(email) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/email/" + email)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            var credentials = {
                username: username,
                password: password
            };

            $http.post("/api/assignment/user/" + username, credentials)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get('/api/assignment/user')
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post('/api/assignment/user', user)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete('/api/assignment/user/' + userId)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateUserById(userId, user) {
            var deferred = $q.defer();
            $http.put('/api/assignment/user/' + userId, user)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }

})();