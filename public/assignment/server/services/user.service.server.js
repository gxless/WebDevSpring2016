module.exports = function(app) {

    var userModel = require("./../models/user.model.js")();

    app.get("/api/assignment/user/:username", findUserByUsername);
    app.get("/api/assignment/user/email/:email", findUserByEmail);
    app.post("/api/assignment/user", register);
    app.post("/api/assignment/user/:username", login);
    app.put("/api/assignment/user/:id", update);


    function register(req, res) {
        var newUser = req.body;
        var currentUser = userModel.createUser(newUser);
        res.json(currentUser);
    }

    function login(req, res) {
        var credentials = req.body;
        var currentUser = userModel.findUserByCredentials(credentials.username, credentials.password);
        res.json(currentUser);
    }

    function update(req, res) {
        var userId = req.params.id;
        var updatedUser = req.body;
        var currentUser = userModel.updateUserById(userId, updatedUser);
        res.json(currentUser);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var hasUsername = userModel.findUserByUsername(username);
        res.json(hasUsername);
    }
    function findUserByEmail(req, res) {
        var email = req.params.email;
        var hasEmail = userModel.findUserByEmail(email);
        res.json(hasEmail);
    }


};


