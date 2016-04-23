(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, FormService, FieldService, UserService) {

        var currentUser = UserService.getCurrentUser();

        FormService.getAllFormsForUser(currentUser._id)
            .then(function (response) {
                $scope.forms = response;
            });

        var formName = null;
        $scope.selectedIndex = -1;
        $scope.formMessage = null;
        $scope.formName = null;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.visitForm = visitForm;

        function addForm(formName) {

            if(formName) {
                var hasFormName = FormService.findFormByName(-1, formName, $scope.forms);

                if(!hasFormName) {

                    var form = {
                        title: $scope.formName,
                        userId: currentUser._id
                    };

                    FormService.createFormForUser(currentUser._id, form)
                        .then(function (response) {
                            $scope.forms.push(response);
                        });

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
            $scope.formMessage = null;
            var hasFormName = FormService.findFormByName(index, $scope.formName, $scope.forms);
            if(!hasFormName) {
                var newForm = {
                    _id: $scope.forms[index]._id,
                    title: $scope.formName,
                    userId: currentUser._id
                };

                FormService.updateFormById(newForm._id, newForm)
                    .then(function (response) {
                        $scope.forms[index] = response;
                    });

                $scope.selectedIndex = -1;
                $scope.formName = "";
            } else {
                $scope.formMessage = "Form name already exists";
            }

        }


        function deleteForm(index) {
            $scope.formMessage = null;
            var formId = $scope.forms[index]._id;
            var selectedIndex = $scope.selectedIndex;

            FormService.deleteFormById(formId)
                .then(function (response) {
                    if(response) {
                        $scope.forms.splice(index, 1);
                    }
                });

            if(index < selectedIndex) {
                $scope.selectedIndex--;
            } else if(index == selectedIndex) {
                $scope.selectedIndex = -1;
                $scope.formName = "";
            }
        }

        function selectForm(index) {
            formName = $scope.forms[index].title;
            $scope.formName = formName;
            $scope.selectedIndex = index;
            $scope.formMessage = null;
        }

        function visitForm(formId) {
            FieldService.setFormId(formId);
            $location.url("/form/" + formId + "/field");
        }

    }
})();