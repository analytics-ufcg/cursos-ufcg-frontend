
app.controller('curso', function($scope, $state, $timeout, $location, $cookies, $q, cursos, database, page, modProvider) {
    $scope.schema = $state.params.schema
    $scope.color = cursos.getCor($state.params.schema)
    $scope.periodos = []

    database.load($scope.schema)

    database.ready('curso').then(function() {
        $scope.curso = database.curso
    })

    database.ready('periodos').then(function() {
        var min = parseFloat(database.periodos.min_periodo)
        var max = parseFloat(database.periodos.max_periodo)

        for(var p=min; p.toFixed(1) <= max; p = (p%1).toFixed(1) == 0.1? p+0.1 : p+0.9)
            $scope.periodos.push(p.toFixed(1))
    })

    $scope.display_info = page.overlay('<info-curso data="data">')
    $scope.display_ajuda = page.overlay('<ajuda anchor="data">')

    $scope.switch_view = function(mode) {
        if(mode == $scope.mode) return

        if($scope.mode == 'taxa-aprovacao') {
            page.hide('slider'), page.show('busca')
            $scope.interval = undefined
            modProvider.unwatch()
        }

        if(mode == 'taxa-aprovacao') {
            $scope.interval = ['0000.1', '3000.2']
            page.hide('busca'), page.show('slider')

            var promise = modProvider.switch('taxa-sucesso').then(function() {
                $timeout(function() { modProvider.unwatch = $scope.$watch('interval', modProvider.current.update) }, 500)
            })
        }

        if(mode == 'requisitos' || mode == 'minha-grade')
            var promise = modProvider.switch(mode)

        if(mode == 'correlacao' || mode == 'raio-x')
            var promise = $q.resolve()

        $scope.show_menu = false
        $scope.mode = mode

        promise.then(function() {
            $location.path('/'+$scope.schema+'/'+mode).replace()
        })
    }

    function MenuItem(name, id, required) {
        var self = this

        this.name = name
        this.id = id

        database.ready(required).then(function() {
            self.available = true
        })
    }

    $scope.menu = [
        new MenuItem('Fluxograma', 'requisitos', 'disciplinas'),
        new MenuItem('Minha Grade', 'minha-grade', 'disciplinas'),
        new MenuItem('Taxa de Aprovação', 'taxa-aprovacao', 'aprovados periodos'),
        new MenuItem('Correlação', 'correlacao', 'correlacao'),
        new MenuItem('Raio-X', 'raio-x', 'formandos')
    ]

    $scope.switch_view($state.params.mode)


    //TEMPORARY
    var curStep = $cookies.get('minhaGradeTour')
    if(typeof curStep === 'string')
        curStep = parseInt(curStep)

    $scope.currentStep = curStep || 0

    $scope.tourEnded = function() {
        $scope.currentStep = 3
        $cookies.put('minhaGradeTour', '3', {
            expires: (function() {
                var today = new Date()
                return new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
            }())
        })
    }
})
