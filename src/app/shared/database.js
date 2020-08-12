
app.service('database', function($q, $location, request) {
    var self = this
    var resources = new Map()

    function register(id, url, optional) {
        resources.set(id, {
            url: url,
            promise: null,
            optional: optional
        })
    }

    register('curso', '')
    register('disciplinas', '/disciplinas')
    register('periodos', '/taxa-sucesso/periodos')
    register('aprovados', '/taxa-sucesso')
    register('correlacao', '/correlacao', true)
    register('formandos', '/formandos', true)

    this.load = function(schema) {
        self.schema = schema
        resources.forEach(function(val, key) {
            self[key] = undefined

            val.promise = request(schema + val.url).then(
                function(data) {
                    return self[key] = data
                },
                function() {
                    if(val.optional == false) $location.path('/404')
                    return $q.reject()
                }
            )
        })
    }

    this.ready = function(required) {
        var promises = new Array()

        if(required) required.split(' ')
            .forEach(function(id) {
                promises.push(resources.get(id).promise)
            })

        return $q.all(promises)
    }
})
