
app.factory('request', function($http) {

    return function(resource) {
        return $http({
            url: 'http://analytics.ufcg.edu.br/pre/' + resource,
            method: 'GET'
        })
            .then(function(resp) {
                return resp.data
            })
    }
})
