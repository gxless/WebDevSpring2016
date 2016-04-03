(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var api = {
            getAllFormsForUser: getAllFormsForUser,
            getFormById: getFormById,
            createFormForUser: createFormForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormByName: findFormByName
        };

        return api;

        function getAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userId + "/form")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFormById(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + userId + "/form", form)
                .success(function (response) {
                   deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, newForm)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
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