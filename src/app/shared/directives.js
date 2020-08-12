
app.directive('stopPropagation', function() {
    return {
        restrict: 'A',

        link: function(scope, element, attrs) {
            element.on(attrs.stopPropagation, function(event) {
                event.stopPropagation()
            })
        }
    }
})

app.directive('multiClick', function($timeout) {
    return {
        scope: {multiClick: '&'},

        link: function(scope, element) {
            var DELAY = 200
            var timer = undefined

            function call (alt) {
                scope.multiClick({$alt: alt})
            }

            element.bind('contextmenu', function(event) {
                scope.$apply(function () {
                    event.preventDefault()
                })
            })

            if('ontouchstart' in window) {
                element.bind('touchstart', function() {
                    timer = $timeout(call, DELAY, true, true)
                })

                element.bind('mouseup', function() {
                    $timeout.cancel(timer)
                    if(timer == undefined) return
                    if(timer.$$state.status == 2) call(false)
                })
            }

            else element.bind('mouseup', function(event) {
                call(event.button == 2)
            })
        }
    }
})

app.directive('scrollTo', function($timeout) {
    return {
        restrict: 'A',

        link: function(scope, element, attrs) {
            $timeout(function() {
                var anchor = element[0].querySelector('#'+attrs.scrollTo)
                element[0].scrollTop = anchor.offsetTop - 54
            }, 50)
        }
    }
})
