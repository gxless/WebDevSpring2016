(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormByName: findFormByName
        };

        return api;

        function createFormForUser(userId, form, callback) {
            //there is no need to use userId in this case,
            //cause the form passed in has already included userId
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var formIndex;
            var formsForUser = [];
            for(formIndex in forms) {
                if(forms[formIndex].userId === userId) {
                    formsForUser.push(forms[formIndex]);
                }
            }
            callback(formsForUser);
        }

        function deleteFormById(formId, callback) {
            var formIndex;
            for(formIndex in forms) {
                if(forms[formIndex]._id === formId) {
                    forms.splice(formIndex, 1);
                    callback(forms);
                    break;
                }
            }
        }

        function updateFormById(formId, newForm, callback) {

            var formIndex;
            for(formIndex in forms) {
                if(forms[formIndex]._id === formId) {
                    forms[formIndex] = newForm;
                    callback(newForm);
                    break;
                }
            }
        }

        function findFormByName(index, formName, forms) {
            for(var i in forms) {
                if(forms[i].title === formName && (index != i)) {
                    return true;
                }
            }
            return false;
        }

    }
})();