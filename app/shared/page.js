
app.service('page', function($document, $compile, $rootScope, $animateCss) {
    var self = this

    this.find = function(id) {
        var dom = $document[0].getElementById(id)
        return dom? angular.element(dom) : undefined
    }

    this.forEach = function(list, func) {
        list.forEach(function(element) {
            element = self.find(element)
            if(element != undefined) func(element)
        })
    }

    function insert(html, scope) {
        var element = $compile(html)(scope)
        self.find('view').append(element)
    }

    this.overlay = function(template) {
        return function(data) {
            var scope = $rootScope.$new(true); scope.data = data
            insert('<overlay>'+template+'</overlay>', scope)
        }
    }

    var visible = {opacity: 1, visibility: 'visible'}
    var invisible = {opacity: 0, visibility: 'hidden'}

    this.hide = function(id) {
        $animateCss(self.find(id), {
            from: visible, to: invisible,
            duration: 0.2
        }).start()
    }

    this.show = function(id) {
        $animateCss(self.find(id), {
            from: invisible, to: visible,
            duration: 0.2, delay: 0.2
        }).start()
    }
})
