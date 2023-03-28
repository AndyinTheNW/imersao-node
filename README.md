# Imersão Java da Alura, segunda edição. Desafio: Refazer em Node.JS

## Quando a Alura anunciou que a imersão Java desse ano seria a mesma coisa do ano passado, eu fiquei triste, mas então tive a idéia de me desafiar e fazer topa a imersão em uma outra linguagem, que eu não domino no back-end, o javascript.

O código é dividido em dois arquivos:

- `index.js`: faz a requisição HTTP e realiza o parsing dos dados recebidos;
- `JsonParser.js`: define a classe `JsonParser`, responsável pelo parsing do JSON.

Para rodar o exemplo, basta executar o comando `node index.js`. O resultado da execução será uma lista dos filmes com título, imagem e nota IMDB, presentes no arquivo JSON `TopMovies.json`, disponível neste repositório.

## Como funciona o código

O arquivo `index.js` começa chama o módulo `https` e o módulo `JsonParser`. Em seguida, define a URL da API externa que será consultada. Após isso, ele consome a API retornando o Titulo, o Rating e um link com a imagem de poster do filme.
Depois de colher essas informações, ele cria uma pasta chamada `image` onde armazena todas as imagens.
Com a utilização da biblioteca `Jimp`, adicionei em cada imagem um texto com a nota imbd e o titulo do filme.


## Como rodar o código

1. Clone o repositório para o seu computador;
2. Abra o terminal na pasta raiz do projeto;
3. Execute o comando `node index.js`.

O resultado da execução será uma lista dos filmes com título, imagem e nota IMDB, presentes no arquivo JSON `TopMovies.json`, além da criação da pasta com as imagens consultadas armazenas e modificadas.
