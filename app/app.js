
var app = angular.module('app', [
    'ngSanitize', 'ngResource', 'ngCss', 'ngAnimate', 'angular-loading-bar',  'angular-tour',
    'ui.router', 'door3.css', 'angulartics', 'angulartics.google.analytics', 'ngCookies', 'nvd3'
])

app.config(function($stateProvider, $urlRouterProvider, $cssProvider) {

    $urlRouterProvider
        .when('', '/')

        .when(/(\/(?:[a-z]+_)+[a-z]{2})\/?$/, function($match) {
            return $match[1] + '/requisitos'
        })

        .otherwise('/404')

    $stateProvider
        .state('home', {
            url: '/',
            css: 'app/views/home.css',
            templateUrl: 'app/views/home.html'
        })

        .state('equipe', {
            url: '/equipe',
            css: 'app/views/curso.css',
            templateUrl: 'app/views/equipe.html',
            controller: 'equipe'
        })

        .state('blog', {
            url: '/blog?post',
            params: { color: null, page: 1 },
            css: 'app/views/blog.css',
            templateUrl: 'app/views/blog.html',
            controller: 'blog'
        })

        .state('curso', {
            url: '/{schema:(?:[a-z]+_)+[a-z]{2}}',
            templateUrl: 'app/views/curso.html',
            controller: 'curso',
            abstract: true
        })

        .state('curso.fluxograma', {
            url: '/{mode:(?:requisitos|minha-grade|taxa-aprovacao)}',
            css: 'app/views/curso.css',
            template: '<fluxograma>'
        })

        .state('curso.correlacao', {
            url: '/{mode:(?:correlacao)}',
            css: 'app/views/curso.css',
            template: '<div><ng-include src="\'app/correlacao/manual.html\'"></ng-include> <correlacao></correlacao></div>'
        })

        .state('curso.raio-x', {
            url: '/{mode:(?:raio-x)}',
            css: 'app/views/curso.css',
            template: '<raio-x color="color">'
        })

        .state('not-found', {
            url: '/404',
            css: 'app/views/not-found.css',
            templateUrl: 'app/views/not-found.html'
        })

    angular.extend($cssProvider.defaults, {
        persist: true,
        preload: true
    })
})
