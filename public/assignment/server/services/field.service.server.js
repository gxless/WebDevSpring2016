module.exports = function(app, FieldModel) {

    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId/position/:newPosition", cloneFieldForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId/order/:newOrder", changeFieldOrder);


    function createFieldForForm(req, res) {
        FieldModel.createFieldForForm(req.params.formId, req.body)
            .then(function (response){
                res.json(response);
            });
    }

    function deleteFieldFromForm(req, res) {
        FieldModel.deleteFieldFromForm(req.params.formId, req.params.fieldId)
            .then(function (response) {
                res.json(response);
            });
    }

    function updateFieldForForm(req, res) {
        FieldModel.updateFieldForForm(req.params.formId, req.params.fieldId, req.body)
            .then(function (response) {
                res.json(response);
            });
    }

    function cloneFieldForForm(req, res) {
        FieldModel.cloneFieldForForm(req.params.formId, req.params.fieldId, req.params.newPosition)
            .then(function (response) {
                res.json(response);
            });
    }

    function changeFieldOrder(req, res) {
        FieldModel.changeFieldOrder(req.params.formId, req.params.fieldId, req.params.newOrder)
            .then(function (response) {
                res.json(response);
            });
    }


};


