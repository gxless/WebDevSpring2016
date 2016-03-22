module.exports = function(app) {

    var formModel = require("./../models/form.model.js")();

    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", cloneFieldForForm);
    app.post("/api/assignment/form/:formId/field", addFieldForForm);
    app.post("/api/assignment/form/:formId", changeFieldOrder);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId/option", createOptionForField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId/option/:optionId", deleteOptionForField);


    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = formModel.getFieldsForForm(formId);
        res.json(fields);
    }

    function addFieldForForm(req, res) {
        var formId = req.params.formId;
        var fields = formModel.addFieldForForm(formId, req.body);
        res.json(fields);
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldFromForm(formId, fieldId);
        res.json(fields);
    }

    function updateFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.updateFieldFromForm(formId, fieldId, req.body);
        res.json(fields);
    }

    function cloneFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.cloneFieldForForm(formId, fieldId);
        res.json(fields);
    }

    function changeFieldOrder(req, res) {
        var formId = req.params.formId;
        var fields = formModel.changeFieldOrder(formId, req.body);
        res.json(fields);
    }

    function createOptionForField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var options = formModel.createOptionForField(formId, fieldId);
        res.json(options);
    }

    function deleteOptionForField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var optionIndex = req.params.optionId;
        var options = formModel.deleteOptionForField(formId, fieldId, optionIndex);
        res.json(options);
    }

};


