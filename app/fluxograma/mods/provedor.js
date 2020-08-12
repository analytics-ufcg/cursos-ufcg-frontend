
app.service('modProvider', function($location, $q, $timeout, database, page, request, facebook) {
    var self = this
    var modules = {}

    this.current = modules['none'] = {
        init: function () {},
        cleanup: function () {}
    }

    this.switch = function (id) {
        var leave = self.current.leave
        var promise = leave? leave() : $q.resolve()

        return promise.then(function() {
            self.current = modules[id]
            self.done = 0
        })
    }

    modules['requisitos'] = {
        css: 'app/fluxograma/mods/requisitos.css',

        init: function(scope, element) { element.addClass('clickable') },
        cleanup: function(scope, element) { element.removeClass('clickable') },

        hover: function(mode) {
            return function(scope, element) {
                element[mode]('selecionado')
                page.forEach(scope.data.all, function(cell) {
                    cell[mode]('requisito')
                })
            }
        },

        get mouseenter() { return this.hover('addClass') },
        get mouseleave() { return this.hover('removeClass') },

        click: function(scope) { page.overlay('<info-disciplina data="data">')(scope.data) }
    }

    modules['minha-grade'] = {
        css: 'app/fluxograma/mods/minha-grade.css',
        overlay: 'app/fluxograma/mods/minha-grade.html',

        shared: function() {
            var _self = this

            this.filter = function(type) {
                var result = new Array()

                page.forEach(self.disciplinas, function(cell) {
                    if(cell.hasClass(type) == true)
                        result.push(cell.data('scope').data.codigo_disciplina)
                })

                return result
            }

            this.reset = function() {
                $timeout.cancel(_self.timer)
                _self.timer = $timeout(_self.update, 2000)
                _self.visible = false
                _self.showRecomendacao = false
            }

            this.update = function() {
                var escolhas = _self.filter('vou-cursar')
                var historico = _self.filter('cursei')
                var nao_cursei = _self.filter('nao-cursei')

                if(escolhas.length == 0) return

                var url = database.schema + '/analise?' + $.param({
                    escolhas: JSON.stringify(escolhas),
                    historico: JSON.stringify(historico)
                })

                var direita = request(url).then(function(data) {
                    _self.dificuldade = data.risco_reprovacao
                    _self.popularidade = data.frequencia_matricula
                    _self.probabilidade = Math.round(data.probabilidade_matricula * 100) + '%'
                    _self.completude = Math.round(data.taxa_complecao * 100) + '%'
                })

                var urlRecomendacao = database.schema + '/recomendacao?' + $.param({
                        disciplinas: JSON.stringify(escolhas),
                        historico: JSON.stringify(historico),
                        nao_cursei: JSON.stringify(nao_cursei)
                })

                if (urlRecomendacao.includes("ciencia_da_computacao_d_cg") || urlRecomendacao.includes("engenharia_eletrica_cg")){
                    var esquerda = request(urlRecomendacao).then(function(data) {
                        _self.recomendacoes = []

                        data.forEach(function (disciplina) {
                            var cell = page.find(disciplina.codigo_disciplina)
                            if (cell){
                                _self.recomendacoes.push({
                                    nome_disciplina: cell.data('scope').data.disciplina,
                                    probabilidade: Math.round(disciplina.probabilidade * 100) + '%',
                                    vou_cursar: function() {
                                        var cell = page.find(disciplina.codigo_disciplina)
                                        if (cell)
                                            cell.data('scope')[cell.hasClass('vou-cursar') ? 'nao_cursei' : 'vou_cursar']()
                                    },
                                    classe: cell.hasClass('vou-cursar') ? 'vou-cursar' : null
                                })
                            }
                        })
                    })

                    $q.all([esquerda, direita]).then(function() {
                        _self.visible = true
                        _self.showRecomendacao = true
                    })

                }

                else{
                    $q.all([direita]).then(function() {
                        _self.visible = true
                        _self.showRecomendacao = false
                    })
                }
            }

            this.getImage = function() {
                var element = angular.element('fluxograma .table')

                return domtoimage.toPng(element.get(0), {
                    bgcolor: '#ddd'
                })
            }

            this.share = function() {
                var escolhas = _self.filter('vou-cursar')
                var historico = _self.filter('cursei')

                var url = $location.absUrl().split('?')[0] + '?' + $.param({
                    escolhas: JSON.stringify(escolhas),
                    historico: JSON.stringify(historico)
                })

                _self.getImage().then(function(image) {
                    facebook.share({
                        url: url,
                        image: image
                    })
                })
            }

            this.download = function() {
                _self.getImage().then(function(url) {
                    var link = document.createElement('a')
                    link.download = 'fluxograma.png'
                    link.href = url

                    if(document.createEvent) {
                        var event = document.createEvent('MouseEvents')
                        event.initEvent('click', true, true)
                        link.dispatchEvent(event)
                    }

                    else if(link.click) {
                        link.click()
                    }
                })
            }
        },

        ready: function() {
            var escolhas = JSON.parse($location.search().escolhas || '[]')
            var historico = JSON.parse($location.search().historico || '[]')

            page.forEach(escolhas, function(cell) {
                cell.data('scope').vou_cursar()
            })

            page.forEach(historico, function(cell) {
                cell.data('scope').cursei()
            })
        },

        init: function(scope, element) {
            var pre = scope.data.pre_requisitos
            var pos = scope.data.pos_requisitos

            element.addClass(pre.length > 0? 'bloqueada' : 'nao-cursei')
            element.addClass('clickable')

            var target = {}
            function register(name, state, recursion, direction, condition) {
                target[name] = direction

                scope[name] = function() {
                    if(condition && condition() == false) return

                    $timeout(scope.shared.reset)

                    element.removeClass('cursei nao-cursei vou-cursar bloqueada')
                    element.addClass(state)

                    recursion.split(' ').forEach(function(operation) {
                        page.forEach(target[operation], function(cell) {
                            cell.data('scope')[operation]()
                        })
                    })
                }
            }


            register('nao_cursei', 'nao-cursei', 'bloqueio', pos)
            register('vou_cursar', 'vou-cursar', 'cursei bloqueio')

            register('cursei', 'cursei', 'cursei desbloqueio', pre,
                function() { return !element.hasClass('cursei') })

            register('bloqueio', 'bloqueada', 'bloqueio', pos,
                function() { return !element.hasClass('bloqueada') })

            register('desbloqueio', 'nao-cursei', 'desbloqueio', pos,
                function() {
                    var condition = element.hasClass('bloqueada')
                    page.forEach(pre, function(cell) { condition &= cell.hasClass('cursei') })
                    return condition
                })
        },

        cleanup: function(scope, element) {
            element.removeClass('nao-cursei clickable')
            scope.cursei = scope.nao_cursei = scope.vou_cursar = undefined
        },

        leave: function() {
            page.forEach(self.disciplinas, function(cell) {
                cell.removeClass('cursei vou-cursar bloqueada')
            })

            return $q(function(resolve) {
                $timeout(resolve, 300)
            })
        },

        click: function(scope, element) {
            scope[element.hasClass('cursei') ? 'nao_cursei' : 'cursei']()
        },

        altclick: function(scope, element) {
            scope[element.hasClass('vou-cursar') ? 'nao_cursei' : 'vou_cursar']()
        },

        column: function(disciplinas) {
            var tudoMarcado = true
            page.forEach(disciplinas, function(cell) {
                tudoMarcado &= cell.hasClass('cursei')
            })

            page.forEach(disciplinas, function(cell) {
                cell.data('scope')[tudoMarcado? 'nao_cursei' : 'cursei']()
            })
        },

        altcolumn: function(disciplinas) {
            var algoMarcado = false
            page.forEach(disciplinas, function(cell) {
                algoMarcado |= cell.hasClass('cursei') || cell.hasClass('vou-cursar')
            })

            page.forEach(disciplinas, function(cell) {
                if(algoMarcado == false) cell.data('scope').cursei()
                else if(cell.hasClass('bloqueada') == false) cell.data('scope').nao_cursei()
            })
        }
    }

    modules['taxa-sucesso'] = {
        css: 'app/fluxograma/mods/aprovacao.css',
        html: 'app/fluxograma/mods/aprovacao.html',

        init: function (scope) {
            scope.setInfo = function (aprovados, total) {
                scope.width = aprovados / total * 100 + '%'
                scope.aprovados = aprovados
                scope.total = total
                scope.porcentagem = Math.round(aprovados / total * 100) + '%'
            }

            scope.clearInfo = function (full) {
                scope.width = full ? '100%' : '0%'
                scope.aprovados = scope.total = 0
                scope.porcentagem = 'NA'
            }
        },

        cleanup: function (scope) {
            scope.setInfo = scope.clearInfo = undefined
            scope.aprovados = scope.total = scope.porcentagem = undefined
            scope.width = undefined
        },

        leave: function () {
            page.forEach(self.disciplinas, function(cell) {
                cell.data('scope').clearInfo(false)
            })

            return $q(function(resolve) {
                $timeout(resolve, 300)
            })
        },

        update: function (interval) {
            database.ready('aprovados').then(function() {

                page.forEach(self.disciplinas, function (cell) {
                    cell.addClass('no-data ready')
                    cell.data('scope').clearInfo(true)
                })

                var mapa = {}

                database.aprovados.forEach(function (d) {
                    var codigo = d.codigo_disciplina

                    if (page.find(codigo) == undefined) return
                    if (d.periodo < interval[0] || interval[1] < d.periodo)
                        return

                    if (mapa[codigo] == undefined) mapa[codigo] = {
                        aprovados: 0, total: 0
                    }

                    mapa[codigo].aprovados += d.aprovados
                    mapa[codigo].total += d.total
                })

                for (var codigo in mapa) {
                    apr = mapa[codigo].aprovados
                    tot = mapa[codigo].total

                    var cell = page.find(codigo)
                    cell.removeClass('no-data')
                    cell.data('scope').setInfo(apr, tot)
                }
            })
        }
    }
})
