
app.directive('overlay', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'app/overlay/overlay.html',
        css: 'app/overlay/overlay.css',

        controller: function($scope, $element, $animate,  $timeout) {
            $scope.close = function() {
                $timeout(function() {
                    $animate.leave($element)
                })
            }

            $element.on('click', $scope.close)
        }
    }
})

app.directive('infoDisciplina', function () {
    return {
        restrict: 'E',
        scope: {data: '='},
        templateUrl: 'app/overlay/infoDisciplina.html'
    }
})

app.directive('infoCurso', function() {
    return {
        restrict: 'E',
        scope: {data: '='},
        templateUrl: 'app/overlay/infoCurso.html'
    }
})

app.directive('ajuda', function () {
    return {
        restrict: 'E',
        scope: {anchor: '='},
        templateUrl: 'app/overlay/ajuda.html',

        link: function(scope, element) {
            scope.goto = function(id) {
                var anchor = element[0].querySelector('#'+id)
                var container = element[0].querySelector('.body')
                container.scrollTop = anchor.offsetTop - 51
            }
        }
    }
})
