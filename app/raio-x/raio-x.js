
app.directive('raioX', function(database) {
    return {
        restrict: 'E',
        templateUrl: 'app/raio-x/raio-x.html',
        css: 'app/raio-x/raio-x.css',
        scope: {color: '='},

        controller: function($scope) {
            database.ready('aprovados disciplinas').then(function() {
                var dados = {}

                database.aprovados.forEach(function (d) {
                    var codigo = d.codigo_disciplina

                    if (dados[codigo] == undefined) dados[codigo] = {
                        reprovados: 0, total: 0
                    }

                    dados[codigo].reprovados += d.total - d.aprovados
                    dados[codigo].total += d.total
                })

                var conversor = {}
                database.disciplinas.forEach(function(d) {
                    conversor[d.codigo_disciplina] = d.disciplina;
                })

                $scope.reprovacoes = []
                for (var codigo in dados) {
                    if(codigo in conversor) $scope.reprovacoes.push({
                        taxa: dados[codigo].reprovados / dados[codigo].total,
                        nome: conversor[codigo],
                    })
                }
            })
        }
    }
})
