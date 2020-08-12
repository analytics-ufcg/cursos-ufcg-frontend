
app.directive('formandos', function(database) {
    return {
        restrict: 'E',
        scope: {color: '='},
        templateUrl: 'app/raio-x/graficos/formandos.html',
        css: 'app/raio-x/graficos/formandos.css',

        controller: function($scope) {

            $scope.options = {
                chart: {
                    type: 'lineChart',
                    height: 340,
                    width: 600,
                    x: function(d){ return d.x },
                    y: function(d){ return d.y },
                    useInteractiveGuideline: true,
                    xAxis: {
                        axisLabel: 'Período',
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Alunos',
                        showMaxMin: false,
                        axisLabelDistance: -15,
                        tickPadding: 8
                    }
                }
            }

            database.ready('formandos').then(function() {

                function format(x, y) {
                    var result = new Array()

                    database.formandos.forEach(function(e) {
                        result.push({ x: e[x], y: e[y] })
                    })

                    return result
                }

                $scope.data = [
                    {
                        values: format('periodo', 'ingressos'),
                        key: 'Ingressos',
                        color: 'lawngreen'
                    },{
                        values: format('periodo', 'formandos'),
                        key: 'Formandos',
                        color: 'red'
                    }
                ]
            })
        }
    }
})
