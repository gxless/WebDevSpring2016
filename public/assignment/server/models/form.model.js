module.exports = function() {
    var mock = require("./form.mock.json");
    var uuid = require('node-uuid');

    var api = {
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        getFieldsForForm: getFieldsForForm,

        addFieldForForm: addFieldForForm,
        updateFieldFromForm: updateFieldFromForm,
        cloneFieldForForm: cloneFieldForForm,
        changeFieldOrder: changeFieldOrder,
        deleteFieldFromForm: deleteFieldFromForm,
        createOptionForField: createOptionForField,
        deleteOptionForField: deleteOptionForField

    };

    return api;

    function findAllFormsForUser(userId) {
        var forms = [];
        for(var i in mock) {
            if(mock[i].userId == userId) {
                forms.push(mock[i]);
            }
        }
        return forms;
    }

    function createFormForUser(userId, form) {

        var newForm = {
            "_id": uuid.v1(),
            "title": form.title,
            "userId": userId,
            "fields": []
        };
        mock.push(newForm);
        return findAllFormsForUser(userId);
    }

    function updateFormById(formId, newForm) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                mock[i].title = newForm.title;
                return mock[i];
            }
        }
    }

    function deleteFormById(formId) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                var userId = mock[i].userId;
                mock.splice(i, 1);
                return findAllFormsForUser(userId);
            }
        }
    }

    function getFieldsForForm(formId) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                return mock[i];
            }
        }
    }

    function addFieldForForm(formId, field) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                field._id = uuid.v1();
                mock[i].fields.push(field);
                return mock[i];
            }
        }
    }

    function updateFieldFromForm(formId, fieldId, field) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if(mock[i].fields[j]._id == fieldId) {
                        mock[i].fields[j] = field;
                        return mock[i].fields[j];
                    }
                }
            }
        }
    }

    function cloneFieldForForm(formId, fieldId) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if(mock[i].fields[j]._id == fieldId) {

                        var newField = JSON.parse(JSON.stringify(mock[i].fields[j]));
                        newField._id = uuid.v1();
                        mock[i].fields.splice([parseInt(j) + 1], 0 ,newField);

                        return mock[i].fields;
                    }
                }
            }
        }
    }


    function changeFieldOrder(formId, newOrder) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                var temp = JSON.parse(JSON.stringify(mock[i].fields[newOrder[0]]));
                mock[i].fields.splice(newOrder[0], 1);
                mock[i].fields.splice(newOrder[1], 0, temp);

                return mock[i].fields;
            }
        }
    }

    function deleteFieldFromForm(formId, fieldId) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if(mock[i].fields[j]._id == fieldId) {
                        mock[i].fields.splice(j, 1);
                        return mock[i].fields;
                    }
                }
            }
        }
    }

    function createOptionForField(formId, fieldId) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if (mock[i].fields[j]._id == fieldId) {
                        var option = {"label": "New Option", "value": "Value"};
                        mock[i].fields[j].options.push(option);
                        return mock[i].fields[j].options;
                    }
                }
            }
        }
    }

    function deleteOptionForField(formId, fieldId, optionIndex) {
        for(var i in mock) {
            if(mock[i]._id == formId) {
                for(var j in mock[i].fields) {
                    if (mock[i].fields[j]._id == fieldId) {
                        mock[i].fields[j].options.splice(optionIndex, 1);
                        return mock[i].fields[j].options;
                    }
                }
            }
        }
    }


};