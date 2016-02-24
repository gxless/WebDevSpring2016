(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, UserService) {

        $scope.selectedIndex = -1;
        $scope.formMessage = null;
        $scope.formName = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var currentUser = UserService.getCurrentUser();
        FormService.findAllFormsForUser(currentUser._id, callback);

        function callback(data) {
            $scope.forms = data;
        }

        function addForm(formName) {
            if(formName) {
                var hasFormName = FormService.findFormByName(formName);
                if(!hasFormName) {
                    var callback = function(data) {
                        $scope.forms.push(data);
                    };
                    var form = {
                        _id: (new Date).getTime(),
                        title: $scope.formName,
                        userId: currentUser._id
                    };
                    FormService.createFormForUser(currentUser._id, form, callback);
                    $scope.formName = null;
                    $scope.formMessage = null;
                } else {
                    $scope.formMessage = "Form name already exists";
                }
            } else {
                $scope.formMessage = "Form name cannot be empty";
            }
        }

        function updateForm(index) {
            var callback = function(data) {
                $scope.forms[index] = data;
            };
            var newForm = {
                _id: $scope.forms[index]._id,
                title: $scope.formName,
                userId: currentUser._id
            };
            FormService.updateFormById(newForm._id, newForm, callback);
            $scope.selectedIndex = -1;
            $scope.formName = "";
        }

        function deleteForm(index) {
            var callback =function(data) {
                $scope.forms = data;
            };
            $scope.forms.splice(index, 1);
            //FormService.deleteFormById($scope.forms[index]._id, callback);
            var selectedIndex = $scope.selectedIndex;
            if(index < selectedIndex) {
                $scope.selectedIndex--;
            } else if(index == selectedIndex) {
                $scope.selectedIndex = -1;
                $scope.formName = "";
            }
        }

        function selectForm(index) {
            $scope.formName = $scope.forms[index].title;
            $scope.selectedIndex = index;
            $scope.formMessage = null;
        }

    }
})();