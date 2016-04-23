module.exports = function(app, UserModel, passport, bcrypt, LocalStrategy, FacebookStrategy) {

    var auth = authorized;

    var facebookConfig = {
        clientID: "1089057697813255",
        clientSecret: "89e78ae114ccbe7a70824bd4905841b6",
        callbackURL: "http://webdev2016-xianggao.rhcloud.com/auth/facebook/callback"
    };

    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .getUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var username = profile.displayName.replace(/ /g,"");
                        var email = profile.emails ? profile.emails[0].value:"";
                        var newFacebookUser = {
                            username: username,
                            firstName: names[0],
                            lastName: names[names.length - 1],
                            email: email,
                            roles: ["student"],
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return UserModel.register(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
        UserModel
            .getUserByCredential({username: username, password: password})
            .then(
                function (response) {
                    if (!response) {
                        return done(null, false);
                    } else {
                        return done(null, response);
                    }
                },
                function(err) {
                    if(err) {
                        return done(err);
                    }
                });
    }

    function authorized(req, res, next) {
        if(!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function isAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            UserModel
                .getUserById(req.user._id)
                .then(function(user){
                    delete user.password;
                    if(user.roles.indexOf("admin") > -1) {
                        return next();
                    } else {
                        res.send(403);
                    }
                })
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .getUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                });

    }

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use("local", new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //user endpoints
    app.post("/api/assignment/login", passport.authenticate("local"), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/register", register);
    app.put("/api/assignment/user/:userId", auth, updateUser);
    app.get("/api/assignment/user/username/:username", hasUsername);
    app.get("/api/assignment/user/email/:email", hasEmail);

    //google and facebook
    app.get("/auth/facebook", passport.authenticate("facebook", {scope : "email"}));

    app.get("/auth/facebook/callback",
        passport.authenticate("facebook", {
            successRedirect: "/#/profile",
            failureRedirect: "/#/login"
        }));

    //admin endpoints
    app.get("/api/assignment/admin/user", isAdmin, getAllUsers);
    app.get("/api/assignment/admin/user/:userId", isAdmin, getUserById);
    app.post("/api/assignment/admin/user", isAdmin, createUserByAdmin);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUserByAdmin);
    app.put("/api/assignment/admin/user/:userId", isAdmin, updateUserByAdmin);


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : "0");
    }

    function register(req, res) {
        UserModel.register(req.body)
            .then(function (user) {
                req.login(user, function(err)
                {
                    if(err) { return next(err); }
                    res.json(user);
                });
            });
    }

    function updateUser(req, res) {
        UserModel.updateUser(req.params.userId, req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function hasUsername(req, res) {
        UserModel.hasUsername(req.params.username)
            .then(function (response) {
                res.json(response);
            });
    }

    function hasEmail(req, res) {
        UserModel.hasEmail(req.params.email)
            .then(function (response) {
                res.json(response);
            });
    }


    //admin functions
    function getAllUsers(req, res) {
        UserModel.getAllUsers()
            .then(function (response) {
                res.json(response);
            });
    }

    function getUserById(req, res) {
        UserModel.getUserById(req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function createUserByAdmin(req, res) {
        UserModel.register(req.body)
            .then(function (user) {
                res.json(user);
            });
    }

    function deleteUserByAdmin(req, res) {
        UserModel.deleteUser(req.params.userId)
            .then(function (response) {
                res.json(response);
            });
    }

    function updateUserByAdmin(req, res) {
        UserModel.updateUser(req.params.userId, req.body)
            .then(function (response) {
                res.json(response);
            });
    }

};


