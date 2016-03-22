(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);


    function FieldService($rootScope, $http, $q) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            cloneFieldForForm: cloneFieldForForm,
            changeFieldOrder: changeFieldOrder,
            createOptionForField: createOptionForField,
            deleteOptionForField: deleteOptionForField,
            setFormId: setFormId,
            getFormId: getFormId,
            getTodayDate: getTodayDate
        };

        return api;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            $http.post("/api/assignment/form/" + formId + "/field", field)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {

        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function cloneFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function changeFieldOrder(formId, newOrder) {
            var deferred = $q.defer();
            $http.post("/api/assignment/form/" + formId, newOrder)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createOptionForField(formId, fieldId) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId + "/field/" + fieldId + "/option")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteOptionForField(formId, fieldId, index) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId + "/option/" + index)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function setFormId(formId) {
            $rootScope.visitingFormId = formId;
        }

        function getFormId() {
            return $rootScope.visitingFormId;
        }

        function getTodayDate() {
            var today = new Date();
            var date = today.getDate();
            var month = today.getMonth()+1;
            var year = today.getFullYear();

            if(date < 10){
                date = "0" + date;
            }
            if(month < 10){
                month = "0" + month;
            }
            var today = month + "/" + date + "/" + year;
            return today;
        }


    }
})();