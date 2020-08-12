
app.directive('gridDisplay', function() {
    return {
        restrict: 'E',
        scope: {cursos: '='},
        templateUrl: 'app/busca/gridDisplay.html',
        css: 'app/busca/gridDisplay.css',

        controller: function($scope, cursos) {
            $scope.getCor = function(schema) {
                return {background: cursos.getCor(schema)}
            }

            $scope.test = function(delta) {
                $scope.index += delta
                if($scope.index >= $scope.cursos.length) $scope.index = 0
                if($scope.index < 0) $scope.index = 6 * Math.floor(($scope.cursos.length - 1) / 6)
            }

            $scope.$watch('cursos', function() {
                $scope.index = 0;
            })
        }
    }
})
