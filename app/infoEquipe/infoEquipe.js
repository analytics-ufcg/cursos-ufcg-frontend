
app.directive('infoEquipe', function(){
    return {
        restrict : 'E',
        scope: {equipe: '='},
        templateUrl: 'app/infoEquipe/infoEquipe.html',
        css: 'app/infoEquipe/infoEquipe.css'
    }
})
