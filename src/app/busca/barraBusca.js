
app.directive('barraBusca', function() {
    return {
        restrict: 'E',
        scope: {ngModel: '=', campus: '='},
        templateUrl: 'app/busca/barraBusca.html',
        css: 'app/busca/barraBusca.css',

        controller: function($scope, cursos, stringUtils) {
            $scope.campi = ['CG', 'CZ', 'SS', 'PT', 'CT', 'SM', 'PL']
            $scope.campus = $scope.campus || 'CG'
            $scope.input = ''

            $scope.filter = function() {
                $scope.ngModel = []
                $scope.ngModel.input = $scope.input
                if(cursos.all == undefined) return

                cursos.all.forEach(function(curso) {
                    var nome_curso = ' ' + stringUtils.normaliza(curso.nome_comum)
                    var input = ' ' + stringUtils.normaliza($scope.input)

                    if(nome_curso.indexOf(input) > -1)
                        if(curso.campus == $scope.campus)
                            $scope.ngModel.push(curso)
                })
            }

            cursos.ready().then($scope.filter)
        }
    }
})
