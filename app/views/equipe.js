
app.controller('equipe', function($scope, cursos) {
    $scope.color = cursos.getRandomCor()

    $scope.equipe = [
        {
            nome: 'Nazareno Andrade',
            funcao: 'Coordenador',
            imagem: 'assets/img/team/nazareno.jpg'
        },{
            nome: 'João Arthur',
            funcao: 'Líder Técnico',
            imagem: 'assets/img/team/joao.jpg'

        },{
            nome: 'Leandro Balby',
            funcao: 'Cliente',
            imagem: 'assets/img/team/leandro.jpg'
        },{
            nome: 'Arthur Costa',
            funcao: 'Desenvolvedor',
            imagem: 'assets/img/team/arthur-costa.jpg'
        },{
            nome: 'Arthur Sena',
            funcao: 'Desenvolvedor',
            imagem: 'assets/img/team/arthur-sena.jpg'
        },{
            nome: 'Antonio Marques',
            funcao: 'Desenvolvedor',
            imagem: 'assets/img/team/antonio.jpg'
        },{
            nome: 'Clara Moraes Dantas',
            funcao: 'Desenvolvedora',
            imagem: 'assets/img/team/clara.jpg'
        },{
            nome: 'Diego Coelho',
            funcao: 'Scrum Master',
            imagem: 'assets/img/team/diego.jpg'
        },{
            nome: 'Tales Pimentel',
            funcao: 'Desenvolvedor',
            imagem: 'assets/img/team/tales.jpg'
        },{
            nome: 'Victor Andrade',
            funcao: 'Desenvolvedor',
            imagem: 'assets/img/team/victor.jpg'
        },{
            nome: 'Pâmela Dutra',
            funcao: 'Designer',
            imagem: 'assets/img/team/pamela.jpg'
        }
    ]

    $scope.equipe_antiga = [
        {
            nome: 'Allan Sales',
            funcao: 'Scrum Master',
            imagem: 'assets/img/team/allan.jpg'
        },{
            nome: 'Tatiana Saturno',
            funcao: 'Desenvolvedora',
            imagem: 'assets/img/team/tatiana.jpg'
        },{
            nome: 'Roberto Soares',
            funcao: 'Desenvolvedor',
            imagem: 'assets/img/team/roberto.jpg'
        },{
            nome: 'Caio Santos',
            funcao: 'Scrum Master',
            imagem: 'assets/img/team/caio.jpg'
        },{
            nome: 'David Lima',
            funcao: 'Designer',
            imagem: 'assets/img/team/david.jpg'
        },{
            nome: 'Vitória Azevedo',
            funcao: 'Designer',
            imagem: 'assets/img/team/vitoria.jpg'
        }
    ]
})
