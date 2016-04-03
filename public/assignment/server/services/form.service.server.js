module.exports = function(app, FormModel) {

    app.get("/api/assignment/user/:userId/form", getAllFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);


    function getAllFormsForUser(req, res) {
        FormModel.getAllFormsForUser(req.params.userId)
            .then(function (response){
                res.json(response);
            });
    }

    function getFormById(req, res) {
        FormModel.getFormById(req.params.formId)
            .then(function (response) {
                res.json(response);
            });
    }

    function createFormForUser(req, res) {
        FormModel.createFormForUser(req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function updateFormById(req, res) {
        FormModel.updateFormById(req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function deleteFormById(req, res) {
        FormModel.deleteFormById(req.params.formId)
            .then(function (response) {
                res.json(response);
            });
    }
};


