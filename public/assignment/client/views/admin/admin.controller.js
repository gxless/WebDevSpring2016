(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $filter, UserService) {

        var currentUser = UserService.getCurrentUser();

        var users = [];
        UserService.findAllUsers()
            .then(function (response) {
                $scope.users = response;
                users = angular.copy(response);
            });

        $scope.selectedIndex = -1;
        $scope.UserMessage = null;
        $scope.sortType = "username";
        $scope.sortReverse = false;
        $scope.sort = sort;

        $scope.selectUser = selectUser;
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;

        function sort(sortType) {
            $scope.sortType = sortType;
            $scope.sortReverse = !$scope.sortReverse;
            $scope.users = $filter("orderBy")(users, sortType, $scope.sortReverse);
            users = angular.copy($scope.users);
            $scope.selectedIndex = -1;
            $scope.editUser = null;
        }

        function selectUser(index) {
            $scope.UserMessage = null;
            $scope.selectedIndex = index;
            $scope.editUser = angular.copy($scope.users[index]);
        }

        function addUser(addUser) {
            var newUser = angular.copy(addUser);
            if(newUser && newUser.username && newUser.password) {
                var valid = true;
                UserService.findUserByUsername(newUser.username)
                    .then(function (response) {
                        if(response) {
                            valid = false;
                            $scope.UserMessage = "Username already exists";
                        } else {
                            if(newUser.roles !== undefined) {
                                newUser.roles = newUser.roles.split(",");
                                for(var i in newUser.roles) {
                                    var element = newUser.roles[i].trim();
                                    if(element == "student" || element == "admin" || element == "faculty") {
                                        newUser.roles[i] = element;
                                    } else {
                                        valid = false;
                                    }
                                }
                                if(valid) {
                                    UserService.createUserByAdmin(newUser)
                                        .then(function (response) {
                                            delete response.password;
                                            $scope.users.push(response);
                                            users.push(response);
                                            $scope.UserMessage = null;
                                            $scope.editUser = null;
                                        });
                                    $scope.UserMessage = null;

                                } else {
                                    $scope.UserMessage = "Roles format is not correct";
                                }
                            } else {
                                newUser.roles = ["student"];
                                UserService.createUserByAdmin(newUser)
                                    .then(function (response) {
                                        delete response.password;
                                        $scope.users.push(response);
                                        users.push(response);
                                        $scope.UserMessage = null;
                                        $scope.editUser = null;
                                    });
                            }
                        }
                    });

            } else {
                $scope.UserMessage = "New user should have at least username and password";
            }
        }

        function deleteUser(userId, index) {
            if(userId == currentUser._id) {
                $scope.UserMessage = "Admin user cannot remove himself";
            } else {
                UserService.deleteUserByAdmin(userId)
                    .then(function (response) {
                        if(response) {
                            $scope.users.splice(index, 1);
                            users.splice(index, 1);
                            if(index < $scope.selectedIndex) {
                                $scope.selectedIndex--;
                            } else if(index == $scope.selectedIndex) {
                                $scope.selectedIndex = -1;
                                $scope.editUser = null;

                            }
                        }
                    });
            }
        }

        function updateUser() {
            var valid = true;
            var updatedUser = $scope.editUser;
            updatedUser.roles = $scope.editUser.roles.toString();
            updatedUser.roles = updatedUser.roles.split(",");
            for(var i in updatedUser.roles) {
                var element = updatedUser.roles[i].trim();
                if(element == "student" || element == "admin" || element == "faculty") {
                    updatedUser.roles[i] = element;
                } else {
                    valid = false;
                }
            }
            if(valid) {
                if(updatedUser.username != $scope.users[$scope.selectedIndex].username) {
                    UserService.findUserByUsername(updatedUser.username)
                        .then(function (response) {
                            if(response) {
                                $scope.UserMessage = "Username already exists";
                            } else {
                                $scope.UserMessage = null;
                                if(updatedUser.password === ""){
                                    delete updatedUser.password;
                                }
                                if(updatedUser.password) {
                                    updatedUser.changePass = true;
                                }
                                UserService.updateUserByAdmin(updatedUser._id, updatedUser)
                                    .then(function (response) {
                                        delete response.password;
                                        $scope.users[$scope.selectedIndex] = response;
                                        users[$scope.selectedIndex] = response;
                                        $scope.selectedIndex = -1;
                                        $scope.editUser = null;
                                        $scope.UserMessage = null;
                                    });
                            }
                        });
                } else {
                    $scope.UserMessage = null;
                    if(updatedUser.password === ""){
                        delete updatedUser.password;
                    }
                    if(updatedUser.password) {
                        updatedUser.changePass = true;
                    }
                    UserService.updateUserByAdmin(updatedUser._id, updatedUser)
                        .then(function (response) {
                            delete response.password;
                            $scope.users[$scope.selectedIndex] = response;
                            users[$scope.selectedIndex] = response;
                            $scope.selectedIndex = -1;
                            $scope.editUser = null;
                            $scope.UserMessage = null;
                        });
                }
            } else {
                $scope.UserMessage = "Roles format is not correct";
            }
        }
    }
})();