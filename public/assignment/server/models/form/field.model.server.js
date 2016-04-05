module.exports = function (mongoose, q) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model("FieldModel", FieldSchema);
    var FormModel = mongoose.model("FormModel");

    var api = {
        createFieldForForm: createFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateFieldForForm: updateFieldForForm,
        cloneFieldForForm: cloneFieldForForm,
        changeFieldOrder: changeFieldOrder
    };

    return api;

    function createFieldForForm(formId, field) {
        var deferred = q.defer();
        field = new FieldModel(field);
        FormModel
            .findByIdAndUpdate({_id: mongoose.Types.ObjectId(formId)}, {$push: {fields: field}},
                function (err) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(field);
                    }
            });
        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel
            .findOneAndUpdate({_id: mongoose.Types.ObjectId(formId)},
                {$pull: {fields: {_id: mongoose.Types.ObjectId(fieldId)}}}, {new: true},
                function (err, doc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc.fields);
                    }
            });
        return deferred.promise;
    }

    function updateFieldForForm(formId, fieldId, field) {
        var deferred = q.defer();
        delete field._id;
        field._id = mongoose.Types.ObjectId(fieldId);
        FormModel
            .findOneAndUpdate({_id: mongoose.Types.ObjectId(formId), "fields._id": mongoose.Types.ObjectId(fieldId)},
                {"fields.$": field}, {new: true},
                function (err) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        field._id = mongoose.Types.ObjectId(fieldId);
                        deferred.resolve(field);
                    }
                });
        return deferred.promise;
    }

    function cloneFieldForForm(formId, fieldId, newPosition) {
        var deferred = q.defer();
        formId = mongoose.Types.ObjectId(formId);
        fieldId = mongoose.Types.ObjectId(fieldId);
        newPosition = Number(newPosition) + 1;
        FormModel
            .findOne({_id: formId}, {fields: {$elemMatch: {_id: fieldId}}}, function (err, doc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        var field = JSON.parse(JSON.stringify(doc.fields[0]));
                        delete field._id;
                        field = new FieldModel(field);

                        FormModel.findOne({_id: formId}, function(err, doc) {
                            if(err) {
                                deferred.reject(err);
                            } else {
                                doc.fields.splice(newPosition, 0, field);
                                doc.save(function (err, doc) {
                                    if(err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc.fields);
                                    }
                                });
                            }

                        });

                    }
                });
        return deferred.promise;
    }

    function changeFieldOrder(formId, fieldId, newPosition) {
        var deferred = q.defer();
        formId = mongoose.Types.ObjectId(formId);
        fieldId = mongoose.Types.ObjectId(fieldId);
        FormModel
            .findOne({_id: formId}, {fields: {$elemMatch: {_id: fieldId}}}, function (err, doc) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        var field = JSON.parse(JSON.stringify(doc.fields[0]));
                        delete field._id;
                        field._id = fieldId;

                        FormModel.findOneAndUpdate({_id: formId}, {$pull: {fields: {_id: fieldId}}}, {new: true},
                                function (err, doc) {
                                    if(err) {
                                        deferred.reject(err);
                                    } else {
                                        doc.fields.splice(newPosition, 0, field);
                                        doc.save(function (err, doc) {
                                            if(err) {
                                                deferred.reject(err);
                                            } else {
                                                deferred.resolve(doc.fields);
                                            }
                                        });
                                    }
                            });
                    }

            });
        return deferred.promise;

    }


};