module.exports = function(app, UserModel) {

    app.get("/api/assignment/user/username/:username", getUserByUsername);
    app.get("/api/assignment/user/email/:email", getUserByEmail);
    app.post("/api/assignment/user", register);
    app.put("/api/assignment/user/:userId", updateUser);
    app.post("/api/assignment/user/:username", login);

    function getUserByUsername(req, res) {
        UserModel.getUserByUsername(req.params.username)
            .then(function (response) {
                res.json(response);
            });
    }

    function getUserByEmail(req, res) {
        UserModel.getUserByEmail(req.params.email)
            .then(function (response) {
                res.json(response);
            });
    }

    function register(req, res) {
        UserModel.register(req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function login(req, res) {
        UserModel.login(req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function updateUser(req, res) {
        UserModel.updateUser(req.params.userId, req.body)
            .then(function (response) {
                res.json(response);
            });
    }


};


