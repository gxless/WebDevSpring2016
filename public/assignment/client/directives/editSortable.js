(function () {
    angular
        .module("editSortable", [])
        .directive("editSortable", editSortable);

    function editSortable() {

        var helper = function(e, tr) {
            var $originals = tr.children();
            var $helper = tr.clone();
            $helper.children().each(function(index)
            {
                $(this).width($originals.eq(index).width());
            });
            return $helper;
        };

        var oriPosition = "";

        function link(scope, element) {
            $(element).sortable({
                handle: ".sortableBtn",
                cancel: '',
                helper: helper,
                start: function(event, ui) {
                    oriPosition = ui.item.index();
                },
                stop: function(event, ui) {
                    var newPosition = ui.item.index();
                    scope.sortField(oriPosition, newPosition);
                }
            }).disableSelection();
        }

        return {
            link: link
        };

    }
})();