
app.directive('listDisplay', function() {
    return {
        restrict: 'E',
        scope: {cursos: '='},
        templateUrl: 'app/busca/listDisplay.html',
        css: 'app/busca/listDisplay.css',

        controller: function($scope, cursos) {
            $scope.getCor = function(schema, index) {
                return {
                    color: cursos.getCor(schema),
                    background: index % 2? '#fbfbfb' : '#eee'
                }
            }
        }
    }
})
