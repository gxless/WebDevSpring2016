(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, $scope, $location, UserService, FieldService) {

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
        $scope.editCancel = editCancel;
        $scope.cloneField = cloneField;
        $scope.sortField = sortField;
        $scope.addOption = addOption;
        $scope.deleteOption = deleteOption;

        var formId = $routeParams.formId || FieldService.getFormId();

        if (formId == null) {
            $scope.fieldMessage = "No form is selected"
        } else {
            $scope.fieldMessage = null;
        }

        FieldService.getFieldsForForm(formId)
            .then(function (response) {
                $scope.model = response;
            });


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
                    $scope.model = response;
                });
        }

        function updateField(fieldId, index, collapse) {
            $scope.hasError = false;
            if($scope.model.fields[index].label) {
                var field = $scope.model.fields[index];
                FieldService.updateField(formId, fieldId, field)
                    .then(function (response) {
                        $scope.model.fields[index] = response;
                        if(collapse === true) {
                            $scope.editShownIndex = -1;
                        }
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

        function cloneField(fieldId) {
            $scope.hasError = false;
            FieldService.cloneFieldForForm(formId, fieldId)
                .then(function (response) {
                    $scope.model.fields = response;
                });

        }

        function editField(index) {
            $scope.hasError = false;
            $scope.editShownIndex = index;
        }

        function editCancel() {
            $scope.hasError = false;
            $scope.editShownIndex = -1;
        }

        function sortField(oriPosition, newPosition) {
            $scope.hasError = false;
            var changedOrder = [oriPosition, newPosition];
            if(oriPosition != newPosition) {
                FieldService.changeFieldOrder(formId, changedOrder)
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

        function addOption(fieldId, index) {
            FieldService.createOptionForField(formId, fieldId)
                .then(function (response) {
                    $scope.model.fields[index].options = response;
                });
        }

        function deleteOption(fieldId, fieldIndex, optionIndex, options) {
            $scope.hasError = false;
            if(options.length > 1) {
                FieldService.deleteOptionForField(formId, fieldId, optionIndex)
                    .then(function (response) {
                        $scope.model.fields[fieldIndex].options = response;
                    });
            } else {
                $scope.message = "Options cannot be less than one";
                $scope.hasError = true;
            }

        }

    }
})();