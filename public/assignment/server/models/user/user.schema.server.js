module.exports = function (mongoose, bcrypt) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        facebook: {
            id: String,
            token: String
        }
    }, {collection: "user"});


    return UserSchema;
};