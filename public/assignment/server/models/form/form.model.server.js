module.exports = function (mongoose, q) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel  = mongoose.model("FormModel", FormSchema);

    var api = {
        getAllFormsForUser: getAllFormsForUser,
        getFormById: getFormById,
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;


    function getAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel
            .find({userId: userId}, function (err, results) {
                deferred.resolve(results);
            });
        return deferred.promise;
    }

    function getFormById(formId) {
        var deferred = q.defer();
        FormModel
            .findById(formId, function (err, results){
            deferred.resolve(results);
        });
        return deferred.promise;
    }

    function createFormForUser(form) {
        var deferred = q.defer();
        form = new FormModel(form);

        FormModel.create(form, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFormById(form) {
        var deferred = q.defer();
        FormModel.findById(form._id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                doc.title = form.title;
                doc.updated = Date.now();
                doc.save(function (err) {
                   if(err) {
                       deferred.reject(err);
                   } else {
                       deferred.resolve(doc);
                   }
                });
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel.remove({_id : formId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                if(status.result.ok == 1) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            }
        });
        return deferred.promise;
    }


};