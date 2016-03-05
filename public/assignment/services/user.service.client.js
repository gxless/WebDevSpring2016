(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"], "email":"alice@alice.cn"},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"], "email":"bob@bob.edu"},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"], "email":"charlie@charlie.com"},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"], "email":"dan@dan.com"},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"], "email":"ed@ed.com"}
        ];

        var api = {
            findUserByCredentials : findUserByCredentials,
            findAllUsers : findAllUsers,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,

            findUserByUsername : findUserByUsername,
            findUserByEmail : findUserByEmail,
            setCurrentUser : setCurrentUser,
            getCurrentUser :getCurrentUser,
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            var userIndex;
            callback(null);
            for(userIndex in users) {
                if(username == users[userIndex].username && password == users[userIndex].password) {
                    callback(users[userIndex]);
                    break;
                }
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            var userIndex;
            for(userIndex in users) {
                if(users[userIndex]._id == userId) {
                    users.splice(userIndex, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            var userIndex;
            for(userIndex in users) {
                if(users[userIndex]._id == userId) {
                    users[userIndex] = user;
                    callback(users[userIndex]);
                    break;
                }
            }
        }

        function findUserByUsername(username) {
            var userIndex;
            var valid = false;
            for(userIndex in users) {
                if(users[userIndex].username == username) {
                    valid = true;
                    break;
                }
            }
            return valid;
        }

        function findUserByEmail(email) {
            var userIndex;
            var valid = false;
            for(userIndex in users) {
                if(users[userIndex].email == email) {
                    valid = true;
                    break;
                }
            }
            return valid;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

    }

})();