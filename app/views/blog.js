app.controller('blog', function($scope, $http, $state, $stateParams, $sce, $q, tags, cursos) {

    $scope.current = $stateParams.post;
    $scope.color = $stateParams.color || cursos.getRandomCor();
    $scope.posts = new Array();
    $scope.barFilters = new Object();

    var promises = new Array();
    var index = [
        'grafos-pre-requisitos', 'raiox', 'evasao', 'mulheres-cc', 'uso-cursos', 'share-facebook', 'mulheres_centros'
    ];

    if($scope.current == undefined)
        index.forEach(function(url) {
            promises.push($http.get('blog/' + url + '.yaml').then(function(response) {
                var post = jsyaml.load(response.data)
                post['url'] = url, $scope.posts.push(post)
            }))
        });

    else $http.get('blog/' + $scope.current + '.yaml').then(function(response) {
        $scope.current = jsyaml.load(response.data)
    });

    $q.all(promises).then(function () {
        $scope.posts.forEach(function (post) {

            for (var tagType in post.tags) {

                if (tagType != "Tema") {

                    if (!(tagType in $scope.barFilters))
                        $scope.barFilters[tagType] = new Set()

                    post.tags[tagType].forEach(function (tag){
                        $scope.barFilters[tagType].add(tag)
                    })
                }
            }
            $scope.barFilters["Limpar Filtro"] = new Set()
        })

        injectBarFilters();
    });

    $scope.go = function(url) {
        $state.go('blog', {
            color: $scope.color,
            page: $scope.page,
            post: url
        })
    };


    // Tags

    injectBarFilters = function () {
      tags.injectBarFilters($scope.barFilters);
    };

    $scope.setThemeFilter = function(tag) {
        tags.setThemeFilter(tag);

        // back to 1 page
        $scope.change(1);
    };

    $scope.setTagType = function (values) {
        $scope.valuesTag = tags.setTagType(values);
    };

    $scope.setFilterTag = function (tag) {
        tags.setFilterTag(tag);

        // back to 1 page
        $scope.change(1);
    };

    $scope.filterByTag = function (post) {
        defineNumPages();
        return tags.filterByTag(post);
    };


    // Paginação

    $scope.change = function(page) {
        var result = []
        var start = Math.max(Math.min(page, $scope.num_pages-$scope.radius)-$scope.radius, 1)
        var end = Math.min(start + $scope.radius * 2, $scope.num_pages)

        for(var i=start; i<=end; ++i)
            result.push(i)

        $scope.range = result
        $scope.page = page

        angular.element('#content').scrollTop(0)
    };

    defineNumPages = function () {
        if (tags.noFilter()) {
            $scope.num_pages = Math.ceil(1.0 * index.length / $scope.num_posts);

        } else {
            $scope.num_pages = Math.ceil(1.0 * tags.getNumPosts() / $scope.num_posts)
        }
    };

    $scope.radius = 2
    $scope.num_posts = 4
    $scope.page = $stateParams.page

    $scope.trust = $sce.trustAsHtml

})