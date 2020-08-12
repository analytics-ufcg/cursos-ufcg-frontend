
app.directive('slider', function() {
    return {
        restrict: 'E',
        scope: {ngModel: '=', states: '=', width: '@'},
        templateUrl: 'app/slider/slider.html',
        css: 'app/slider/slider.css',

        controller: function($scope, $element, $document, $timeout, arrayUtils, page) {
            var width = parseFloat($scope.width) || 452
            $element.css('min-width', width + 40 + 'px')

            function handle(dom, position) {
                var self = this

                var pos = snap(position * width)
                var start = null

                var element = angular.element(dom)
                element.css('left', pos + 'px')

                element.on('mousedown', function(event) {
                    event.preventDefault()
                    $document.on('mousemove', move)
                    $document.on('mouseup', release)

                    element.css('transition-duration', '0s')
                    start = event.pageX - pos
                })

                element.on('mousedown', function() {
                    animate(self)

                    $document.on('mousemove mouseup', function updater(event) {
                        if(event.type == 'mouseup')
                            $document.off('mouseup mousemove', updater);

                        animate(self)
                        updateModel()
                    })
                })

                function move(event) {
                    pos = event.pageX - start
                    element.css('left', limit() + 'px')
                }

                function release() {
                    $document.off('mousemove')
                    $document.off('mouseup')

                    element.css({
                        'left': snap(pos) + 'px',
                        'transition-duration': '0.5s'
                    })
                }

                function limit() {
                    pos = Math.max(self.min(), pos)
                    pos = Math.min(self.max(), pos)
                    return pos
                }

                function snap(position) {
                    var segment_len = width / ($scope.states.length - 1)
                    return pos = segment_len * Math.round(position/segment_len)
                }

                this.min = function() { return 0 }
                this.max = function() { return width }
                this.x = function() { return pos }

                this.setOverlap = function(value) {
                    if(value == 2) element.addClass('hide')
                    if(value == 1) element.addClass('push'), element.removeClass('hide')
                    if(value == 0) element.removeClass('push'), element.removeClass('hide')
                }

                this.selection = function() {
                    var segments = $scope.states.length - 1
                    return $scope.states[Math.round(pos/width*segments)]
                }

                this.reset = function() {
                    pos = position * width
                    element.removeClass('hide')
                    element.removeClass('push')
                    release()
                }
            }

            var left = page.find('left')
            var right = page.find('right')

            left = new handle(left, 0)
            right = new handle(right, 1)

            left.max = right.x
            right.min = left.x

            left.other = right
            right.other = left

            $scope.leftLabel = left.selection
            $scope.rightLabel = right.selection

            $scope.$watch('ngModel', function(interval) {
                if(interval == undefined)
                    left.reset(), right.reset()
            })

            $scope.calcPos = function(index) {
                return index * width / ($scope.states.length-1)
            }

            var animate = function(handle) {
                if(Math.abs(handle.x() - handle.other.x()) < 50)
                    handle.setOverlap(0), handle.other.setOverlap(1)
                else handle.other.setOverlap(0)

                if(left.selection() == right.selection())
                    handle.other.setOverlap(2)
            }

            var updateModel = function() {
                $timeout(function() {
                    var newModel = [left.selection(), right.selection()]
                    if(!arrayUtils.equals($scope.ngModel, newModel) || $scope.ngModel == undefined)
                        $scope.ngModel = newModel
                })
            }
        }
    }
})
