
app.directive('fluxograma', function($timeout, page, database, modProvider) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/fluxograma/fluxograma.html',
        css: 'app/fluxograma/fluxograma.css',

        link: function(scope) {
            scope.mods = modProvider

            database.ready('disciplinas').then(function() {
                var last = -1
                modProvider.disciplinas = []
                scope.table = []

                scope.$watch('mods.current', function(next) {
                    scope.shared = next.shared? new next.shared() : null
                })

                database.disciplinas.forEach(function(obj) {
                    if(obj.semestre == null) return
                    if(obj.semestre > last + 1) scope.table[last = obj.semestre - 1] = []
                    modProvider.disciplinas.push(obj.codigo_disciplina)
                    scope.table[last].push(obj)
                })
            })

            scope.column = function(index, alt) {
                var method = modProvider.current[alt? 'altcolumn' : 'column']
                var disciplinas = []

                scope.table[index].forEach(function(cell) {
                    disciplinas.push(cell.codigo_disciplina)
                })

                if(method != undefined) method(disciplinas)
            }
        }
    }
})

app.directive('cell', function(modProvider) {
    return {
        restrict: 'E',
        scope: {data: '=', shared: '='},
        templateUrl: 'app/fluxograma/cell.html',

        controller: function($scope, $element) {
            var pre = $scope.data.pre_requisitos
            var pos = $scope.data.pos_requisitos

            $element.data('scope', $scope)
            $element.attr('id', $scope.data.codigo_disciplina)

            $scope.data.all = pre.concat(pos)
            $scope.mods = modProvider
        },

        link: function(scope, element) {
            scope.$watch('mods.current', function(next, old) {
                old.cleanup(scope, element)
                next.init(scope, element)

                modProvider.done += 1
                if(modProvider.done == modProvider.disciplinas.length)
                    if(next.ready) next.ready()
            })

            scope.forward = function(method) {
                var method = scope.mods.current[method]
                if(method != undefined) method(scope, element)
            }

            element.bind('mouseenter mouseleave', function(event) {
                scope.forward(event.type)
            })
        }
    }
})
