module.exports = function(app) {

    var formModel = require("./../models/form.model.js")();

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    //app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.createFormForUser(userId, req.body);
        res.json(forms);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.updateFormById(formId, req.body);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormById(formId);
        res.json(forms);
    }
};


