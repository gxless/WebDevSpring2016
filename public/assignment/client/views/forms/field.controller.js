(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, $scope, $location, UserService, FieldService, FormService) {

        var currentUser = UserService.getCurrentUser();

        if(currentUser == null) {
            $location.url("/home");
        }

        $scope.fieldType = "TEXT";
        $scope.editShownIndex = -1;
        $scope.fieldMessage = null;
        $scope.hasError = false;
        $scope.message = null;
        $scope.addField = addField;
        $scope.editField = editField;
        $scope.updateField = updateField;
        $scope.removeField = removeField;
        $scope.cloneField = cloneField;
        $scope.sortField = sortField;
        $scope.addOption = addOption;
        $scope.deleteOption = deleteOption;

        var formId = $routeParams.formId || FieldService.getFormId();

        if (formId == null) {
            $scope.fieldMessage = "No form is selected"
        } else {
            $scope.fieldMessage = null;
            FormService.getFormById(formId)
                .then(function (response) {
                    $scope.model = response;
                });
        }

        function addField(fieldType) {
            $scope.hasError = false;

            var field = {};
            switch (fieldType) {
                case "TEXT": field = {"_id": null, "label": "New Text Field",
                    "type": "TEXT", "placeholder": "New Field"}; break;
                case "TEXTAREA": field = {"_id": null, "label": "New Text Field",
                    "type": "TEXTAREA", "placeholder": "New Field"}; break;
                case "DATE": field = {"_id": null, "label": "New Date Field",
                    "type": "DATE", value: FieldService.getTodayDate()}; break;
                case "OPTIONS": field = {"_id": null, "label": "New Dropdown",
                    "type": "OPTIONS", "options":[{"label":"Option", "value":"OPTION"}]}; break;
                case "CHECKBOXES": field = {"_id": null, "label": "New Checkboxes",
                    "type": "CHECKBOXES", "options":[{"label":"Option", "value":"OPTION"}]}; break;
                case "RADIOS": field = {"_id": null, "label": "New Radio Buttons",
                    "type": "RADIOS", "options":[{"label":"Option", "value":"OPTION"}]};
            }

            FieldService.createFieldForForm(formId, field)
                .then(function (response) {
                    $scope.model.fields.push(response);
                });
        }

        function updateField(fieldId, index) {
            $scope.hasError = false;
            if($scope.model.fields[index].label) {
                var field = $scope.model.fields[index];
                FieldService.updateField(formId, fieldId, field)
                    .then(function (response) {
                        $scope.model.fields[index] = response;
                        $scope.editShownIndex = -1;
                    });
            } else {
                $scope.hasError = true;
                $scope.message = "Label cannot be empty";
            }
        }

        function removeField(fieldId, index) {
            $scope.hasError = false;
            FieldService.deleteFieldFromForm(formId, fieldId)
                .then(function (response) {
                    $scope.model.fields = response;
                });
            if(index < $scope.editShownIndex) {
                $scope.editShownIndex--;
            } else if(index == $scope.editShownIndex) {
                $scope.editShownIndex = -1;
            }
        }

        function cloneField(fieldId, newPosition) {
            $scope.hasError = false;
            FieldService.cloneFieldForForm(formId, fieldId, newPosition)
                .then(function (response) {
                    $scope.model.fields = response;
                });

        }

        function editField(index) {
            $scope.hasError = false;
            $scope.editShownIndex = index;
        }


        function sortField(oriPosition, newPosition) {
            $scope.hasError = false;
            if(oriPosition != newPosition) {
                var fieldId = $scope.model.fields[oriPosition]._id;
                FieldService.changeFieldOrder(formId, fieldId, newPosition)
                    .then(function (response) {
                        $scope.model.fields = response;
                        if($scope.editShownIndex == oriPosition) {
                            $scope.editShownIndex = newPosition;
                        } else if($scope.editShownIndex > oriPosition && $scope.editShownIndex <= newPosition) {
                            $scope.editShownIndex--;
                        } else if($scope.editShownIndex < oriPosition && $scope.editShownIndex >= newPosition) {
                            $scope.editShownIndex++;
                        }
                    });
            }

        }

        function addOption(fieldIndex) {
            var option = {label: "Option", value: "OPTION"};
            $scope.model.fields[fieldIndex].options.push(option);
            $scope.hasError = false;
            $scope.message = "";
        }

        function deleteOption(fieldIndex, optionIndex, options) {
            $scope.hasError = false;
            if(options > 1) {
                $scope.model.fields[fieldIndex].options.splice(optionIndex, 1);
            } else {
                $scope.message = "Options cannot be less than one";
                $scope.hasError = true;
            }
        }

    }
})();