(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);


    function FieldService($rootScope, $http, $q) {

        var api = {
            createFieldForForm: createFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            cloneFieldForForm: cloneFieldForForm,
            changeFieldOrder: changeFieldOrder,
            setFormId: setFormId,
            getFormId: getFormId,
            getTodayDate: getTodayDate
        };

        return api;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();
            delete field._id;
            $http.post("/api/assignment/form/" + formId + "/field", field)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
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

        function cloneFieldForForm(formId, fieldId, newPosition) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId + "/position/" + newPosition)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function changeFieldOrder(formId, fieldId, newOrder) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId + "/order/" + newOrder)
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