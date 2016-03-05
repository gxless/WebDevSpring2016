(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService, UserService) {

        var currentUser = UserService.getCurrentUser();
        if(!currentUser) {
            $location.url("/");
            currentUser = {_id: null};
        }

        $scope.selectedIndex = -1;
        $scope.formMessage = null;
        $scope.formName = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        FormService.findAllFormsForUser(currentUser._id, callback);

        function callback(data) {
            $scope.forms = data;
        }

        function addForm(formName) {
            if(formName) {
                var hasFormName = FormService.findFormByName(-1, formName, $scope.forms);
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
            var hasFormName = FormService.findFormByName(index, $scope.formName, $scope.forms);

            if(!hasFormName) {
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
            } else {
                $scope.formMessage = "Form name already exists";

            }

        }

        function deleteForm(index) {
            var selectedIndex = $scope.selectedIndex;
            var callback =function(data) {
                var forms = [];
                for(var i in data) {
                    if(data[i].userId == currentUser._id) {
                        forms.push(data[i]);
                    }
                }
                $scope.forms = forms;
            };

            FormService.deleteFormById($scope.forms[index]._id, callback);

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