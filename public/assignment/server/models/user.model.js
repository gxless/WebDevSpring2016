var mock = require("./user.mock.json");

module.exports = function() {

    var api = {
        findAllUsers : findAllUsers,
        findUserByUsername : findUserByUsername,
        findUserByEmail : findUserByEmail,
        findUserByCredentials : findUserByCredentials,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUserById : updateUserById
    };

    return api;


    function findUserByUsername(username) {
        for(var i in mock) {
            if(mock[i].username === username) {
                return true;
            }
        }
        return false;
    }

    function findUserByEmail(email) {
        for(var i in mock) {
            if(mock[i].email === email) {
                return true;
            }
        }
        return false;
    }


    function findAllUsers() {
        return mock;
    }

    function findUserByCredentials(username, password) {
        for(var i in mock) {
            if(mock[i].username === username && mock[i].password === password) {
                return mock[i];
            }
        }
        return null;
    }

    function createUser(user) {

        var newUser = {
            "_id": (new Date).getTime(),
            "firstName":"",
            "lastName":"",
            "username":user.username,
            "password":user.password,
            "roles": [],
            "email":user.email };

        mock.push(newUser);
        return newUser;
    }

    function deleteUserById(userId) {
        for(var i in mock) {
            if(mock[i]._id == userId) {
                mock.splice(i, 1);
                return mock;
            }
        }
    }

    function updateUserById(userId, user) {
        for(var i in mock) {
            if(mock[i]._id == userId) {
                mock[i] = user;
                return mock[i];
            }
        }
    }


};