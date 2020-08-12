
app.directive('correlacao', function (database) {
    return {
        restrict: 'E',
        css: 'app/correlacao/correlacao.css',
        scope: {},

        link: function (scope) {

            var width = 1280
            var margin = 400
            var pad = margin / 2
            var radius = 4
            var yfixed = pad + radius
            var dimensions = angular.element(window)

            function getWindowDimensions() {
                return {
                    h: dimensions[0].innerHeight,
                    w: dimensions[0].innerWidth
                }
            }

            function arcDiagram(graph) {
                d3.select('svg').remove()

                var svg = d3.select('correlacao')
                    .append('svg')
                    .style('width', width-30+'px')
                    .style('height', 140+width*720/1280+'px')

                var plot = svg.append('g')
                    .attr('id', 'plot')
                    .attr('transform', 'translate(' + pad + ', ' + pad + ')')

                plot.append('text')
                    .attr('x', width/ 2 - pad)
                    .attr('y', 0 - pad/2 - 20)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '30px')
                    .style('fill', '#494949')
                    .style('font-weight', 'bold')
                    .text('Cursou alguma dessas?')

                plot.append('text')
                    .attr('x', width/ 2 - pad)
                    .attr('y', 0 - pad/2 + 10)
                    .attr('text-anchor', 'middle')
                    .style('font-size', '20px')
                    .style('fill', '#494949')
                    .text('Duas disciplinas estão ligadas se o desempenho em uma é um bom indicativo do desempenho na outra.')

                linearLayout(graph.disciplinas)
                drawLinks(graph.correlacoes)
                drawNodes(graph.disciplinas)

                // Fade In
                /*d3.select('correlacao')
                    .style('opacity', 0)
                    .transition()
                    .duration(1000)
                    .style('opacity', 100)*/
            }

            function linearLayout(disciplinas) {
                var xscale = d3.scale.linear()
                    .domain([0, disciplinas.length - 1])
                    .range([radius, width - margin - radius])

                disciplinas.forEach(function (d, i) {
                    d.x = xscale(i)
                    d.y = yfixed
                })
            }

            function drawNodes(disciplinas) {
                var color = d3.scale.category20()

                d3.select('#plot').selectAll('.disciplina')
                    .data(disciplinas)
                    .enter()
                    .append('circle')
                    .attr('class', 'disciplina')
                    .attr('id', function (d) {
                        return d.nome
                    })
                    .attr('cx', function (d) {
                        return d.x
                    })
                    .attr('cy', function (d) {
                        return d.y
                    })
                    .attr('r', function () {
                        return 5.5
                    })
                    .style('fill', function (d) {
                        return color(d.periodo)
                    })
                    .on('mouseover', function () {
                        var self = this
                        var ids = []

                        d3.select('#plot').selectAll('.arco').filter(function (d, i) {
                            if (d.source.nome == self.id || d.target.nome == self.id) {
                                ids.push(i)
                                return true
                            }
                        }).style('stroke', function(d) {
                            return d.valor >= 0? 'green' : 'red'
                        })

                        ids.forEach(function (i) {
                            d3.selectAll('#valorCorr' + i)
                                .attr('display', 'block')
                        })
                    })
                    .on('mouseout', function () {
                        var self = this
                        var ids = []

                        d3.select('#plot').selectAll('.arco').filter(function (d, i) {
                            if (d.source.nome == self.id || d.target.nome == self.id) {
                                ids.push(i)
                                return true
                            }
                        }).style('stroke', null)

                        ids.forEach(function (i) {
                            d3.selectAll('#valorCorr' + i)
                                .attr('display', 'none')
                        })
                    })

                d3.select('#plot').selectAll('.tooltip')
                    .data(disciplinas)
                    .enter()
                    .append('text')
                    .text(function (d) {
                        return d.nome
                    })
                    .attr('transform', function (d) {
                        return 'translate(' + d.x + ',' + d.y + ') rotate(-60)'
                    })
                    .attr('dx', 10)
                    .attr('class', 'tooltip')
            }

            function drawLinks(correlacoes) {
                var radians = d3.scale.linear()
                    .range([3 * Math.PI / 2, Math.PI / 2])

                var arc = d3.svg.line.radial()
                    .interpolate('basis')
                    .tension(0)
                    .angle(function (d) {
                        return radians(d)
                    })

                d3.select('#plot').selectAll('.arco')
                    .data(correlacoes)
                    .enter()
                    .append('path')
                    .attr('class', 'arco')
                    .attr('transform', function (d) {
                        var xshift = d.source.x + (d.target.x - d.source.x) / 2
                        var yshift = yfixed
                        return 'translate(' + xshift + ', ' + yshift + ')'
                    })
                    .attr('d', function (d) {
                        var xdist = Math.abs(d.source.x - d.target.x)

                        arc.radius(xdist / 2)

                        var points = d3.range(0, Math.ceil(xdist / 3))

                        radians.domain([0, points.length - 1])

                        return arc(points)
                    })
                    .attr('stroke-width', function (d) {
                        return Math.pow(Math.abs(d.valor) * 8, 1.4)
                    })
                    .attr('source', function (d) {
                        return d.source.nome
                    })
                    .attr('target', function (d) {
                        return d.target.nome
                    })
                    .attr('id', function (d, i) {
                        return 'arco' + i
                    })

                d3.select('#plot').selectAll('.valorCorr')
                    .data(correlacoes)
                    .enter()
                    .append('text')
                    .style('text-anchor', 'middle')
                    .attr('dy', 17)
                    .append('textPath')
                    .attr('xlink:href', function (d, i) {
                        return '#arco' + i
                    })
                    .attr('startOffset', '50%')
                    .text(function (d) {
                        return d.valor < 0.20? "Muito fraca" : d.valor < 0.4? "Fraca" : d.valor < 0.6? "Média" : d.valor < 0.8? "Forte" : "Muito forte"
                    })
                    .attr('class', 'valorCorr')
                    .attr('id', function (d, i) {
                        return 'valorCorr' + i
                    })
                    .attr('display', 'none')
            }

            database.ready('correlacao').then(function() {

                // Correlações passam a apontar para os objetos de disciplinas ao invés de índices
                database.correlacao
                    .correlacoes.forEach(function (d) {
                        d.source = isNaN(d.source) ? d.source : database.correlacao.disciplinas[d.source]
                        d.target = isNaN(d.target) ? d.target : database.correlacao.disciplinas[d.target]
                    })

                database.correlacao.disciplinas
                    .sort(function (a, b) {
                        return a.periodo - b.periodo
                    })

                // Watch for resize
                scope.$watch(getWindowDimensions, function (newValue) {
                    width = Math.min(Math.max(800, newValue.w), 1280)
                    arcDiagram(database.correlacao)
                }, true)

                // Resize
                dimensions.bind('resize', function () {
                    if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                        scope.$apply()
                    }
                })
            })
        }
    }
})
