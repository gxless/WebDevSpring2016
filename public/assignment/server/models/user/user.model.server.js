module.exports = function (mongoose, q) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        register: register,
        updateUser: updateUser,
        login: login
    };

    return api;

    function getUserByUsername(username) {
        var deferred = q.defer();
        UserModel
            .find({username: username}, function (err, docs) {
                if(docs.length) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });
        return deferred.promise;
    }

    function getUserByEmail(email) {
        var deferred = q.defer();
        UserModel
            .find({email: email}, function (err, docs) {
                if(docs.length) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });
        return deferred.promise;
    }

    function register(newUser) {
        var deferred = q.defer();
        newUser = new UserModel(newUser);

        newUser.save(function (err, results) {
            deferred.resolve(results);
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel
            .findById(userId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log(user);
                    doc = new UserModel(user);
                    doc.isNew = false;
                    console.log(doc);
                    doc.save(function (err) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }

                    });
                }
            });
        return deferred.promise;
    }

    function login(credential) {
        var deferred = q.defer();
        UserModel.findOne({username: credential.username, password: credential.password},
            function (err, doc) {
                deferred.resolve(doc);
            });
        return deferred.promise;

    }

};