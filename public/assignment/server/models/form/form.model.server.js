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
            .find({userId: mongoose.Types.ObjectId(userId)}, function (err, docs) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(docs);
                }
            });
        return deferred.promise;
    }

    function getFormById(formId) {
        var deferred = q.defer();
        FormModel
            .findById(mongoose.Types.ObjectId(formId), function (err, doc){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
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
        var formId = mongoose.Types.ObjectId(form._id);
        FormModel.findById(formId, function (err, doc) {
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
        FormModel.remove({_id : mongoose.Types.ObjectId(formId)}, function (err) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(true);
            }
        });
        return deferred.promise;
    }


};