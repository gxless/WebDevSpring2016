module.exports = function (mongoose, q, bcrypt) {

    var UserSchema = require("./user.schema.server.js")(mongoose, bcrypt);
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        hasUsername: hasUsername,
        hasEmail: hasEmail,
        getUserById: getUserById,
        getUserByFacebookId: getUserByFacebookId,
        register: register,
        updateUser: updateUser,
        deleteUser: deleteUser,
        getUserByCredential: getUserByCredential,
        getAllUsers: getAllUsers
    };

    return api;

    function hasUsername(username) {
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

    function hasEmail(email) {
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

    function getUserById(userId) {
        var deferred = q.defer();
        UserModel
            .findById(mongoose.Types.ObjectId(userId), function (err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                deferred.resolve(doc);
            });
        return deferred.promise;
    }

    function getUserByFacebookId(facebookId) {
        var deferred = q.defer();
        UserModel
            .findOne({"facebook.id": facebookId}, function (err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                deferred.resolve(doc);
            });
        return deferred.promise;
    }


    function register(newUser) {
        var deferred = q.defer();
        newUser = new UserModel(newUser);
        newUser.password = bcrypt.hashSync(newUser.password);

        newUser.save(function (err, doc) {
            deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        userId = mongoose.Types.ObjectId(userId);
        delete user._id;
        if(user.changePass == true) {
            user.password = bcrypt.hashSync(user.password);
        }
        delete user.changePass;
        UserModel
            .findOneAndUpdate({_id: userId}, user, {new: true}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel
            .remove({_id: userId}, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(true);
                }
            });
        return deferred.promise;
    }

    function getUserByCredential(credential) {
        var deferred = q.defer();
        UserModel.findOne({username: credential.username}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            }
            if(doc) {
                if(bcrypt.compareSync(credential.password, doc.password)) {
                    deferred.resolve(doc);
                } else {
                    deferred.resolve(false);
                }
            } else {
                deferred.resolve(false);
            }

        });
        return deferred.promise;
    }

    function getAllUsers() {

        var deferred = q.defer();
        UserModel.find({}, {_id: 1, username: 1, firstName: 1, lastName: 1, email: 1, roles: 1}, function (err, docs) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }


};