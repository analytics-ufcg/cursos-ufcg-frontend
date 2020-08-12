# Repositório do front-end do projeto Cursos UFCG 
* http://analytics.ufcg.edu.br/cursosufcg

# Estrutura de Pastas

A estrutura de pastas foi baseada nas seguintes sugestões:
* http://stackoverflow.com/questions/18542353/angularjs-folder-structure
* https://github.com/mgechev/angularjs-style-guide

<dl>
   <dt> app </dt>
   <dd> Cada feature deve ter uma pasta aqui que contenha todos os arquivos que só ela use. </dd>

   <dt> app/shared </dt>
   <dd> Contém serviços, factories e diretivas que por si só não constituem uma feature
   <br> ou que são usadas em multiplos lugares para diferentes fins. </dd>

   <dt> app/views </dt>
   <dd> Arquivos relacionados às páginas do sistema podem ser encontrados nessa pasta. </dd>

   <dt> assets </dt>
   <dd> Colocar aqui CSS gerais, imagens, fontes, GIFS, etc.  </dd>

   <dt> libs </dt>
   <dd> As bibliotecas externas que usamos ficam reunidas nessa pasta. </dd>
</dl>

# Perguntas

> Por que a pasta de uma feature tem mais de uma feature dentro?

Se existe uma subfeature que é usada exclusivamente por essa feature e não há perspectiva de que isso venha a
mudar, elas podem ser deixadas na mesma pasta. Caso contrário, dependendo da natureza da subfeature, deve-se
analisar se ela mereçe ficar em sua própria pasta ou em *shared*.

> Por que os CSSs estão espalhados?

Nós achamos mais intuitivo deixar o CSS dentro da pasta da feature que o usa, de forma que ela contenha
todos os arquivos que dizem respeito à feature em questão. Entretanto, se o CSS não está relacionado a
nenhuma feature em específico, ele deve ser colocado na pasta *assets*.

> Há algum motivo para tudo relacionado a cor do curso estar em um único CSS?

Essa é uma solução temporária que encontramos para conseguir acessar uma variável de escopo através do CSS.
Ela usa a biblioteca [ngCss](http://opensourcetaekwondo.com/ngcss/), e caso ela seja atualizada ou um jeito
mais organizado de fazer isso seja encontrado, fique a vontade para refatorar o código.

> Por que temos arquivos LESS, mas não usamos suas features?

Essa extensão foi escolhida arbitrariamente para executar o [Autoprefixer](https://github.com/postcss/autoprefixer),
que é uma ferramenta usada para adicionar os prefixos mais comuns ao CSS, maximizando a compatibilidade com os browsers.
Desse modo, não se deve alterar diretamente o CSS, e sim deixar que o Autoprefixer processe o arquivo LESS.

> O que é o arquivo *deploy.php*?

Nosso repositório do GitHub foi configurado para fazer uma requisição a esse arquivo sempre que for fechado um pull request.
Quando isso acontece, esse arquivo autentica a idendidade do GitHub e faz um pull no repositório localizado no servidor.
Isso permite que a versão dev do site seja atualizada automaticamente.

# Convenções

* Não manipular elementos do DOM fora de uma directive.
* Sempre tentar desenvolver dentro do padrão MVC, que é a uma das principais funções do Angular.
* Métodos que parecem não estar inseridos em um contexto são melhores servidos dentro de um service.
* Cuidado ao manipular o $scope, tenta não criar um spaghetti de $scopes que você não irá conseguir debugar.
* Deixe sua lógica nos controllers.

**AVISO: Essa documentação está em constante processo de modificação. Se percebermos que há algo errado ou mudarmos
alguma estrutura do sistema, entre outras coisas, ela deve ser atualizada.**
