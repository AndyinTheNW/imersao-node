// Importa os módulos necessários
const https = require('https'); // para fazer solicitações HTTPS
const JsonParser = require('./jsonParser'); // para analisar o JSON
const fs = require('fs'); // para trabalhar com o sistema de arquivos
const path = require('path'); // para trabalhar com caminhos de arquivo
const Jimp = require('jimp'); // para editar as imagens

// Define a URL do arquivo JSON que contém informações sobre os filmes
const url = 'https://raw.githubusercontent.com/alura-cursos/imersao-java-2-api/main/TopMovies.json';

// Faz uma solicitação GET à URL especificada usando o módulo https
https.get(url, (response) => {
  let data = '';
  response.on('data', (chunk) => {
    data += chunk;
  });
  response.on('end', () => {
    try {
      // Analisa o JSON recebido em um array de objetos
      const listaDeFilmes = JsonParser.parse(data);

      // Verifica se o diretório de imagens existe e, caso contrário, cria-o
      if (!fs.existsSync('./images')) {
        fs.mkdirSync('./images');
      }

      // Para cada objeto no array de filmes, baixa a imagem e adiciona um texto
      listaDeFilmes.forEach((filme) => {

        // Exibe informações sobre o filme no console
        console.log(filme.title);
        console.log(filme.imDbRating);
        console.log(filme.image);

        // Cria um nome de arquivo a partir do título do filme e salva como JPG
        const fileName = `${filme.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
        const filePath = path.join('./images', fileName);
        const file = fs.createWriteStream(filePath);

        // Faz o download da imagem do filme usando a URL especificada no arquivo JSON
        https.get(filme.image, (response) => {
          response.pipe(file).on('close', async () => {

            // Abre a imagem usando o módulo Jimp
            try {
              const image = await Jimp.read(filePath);

              // Carrega uma fonte e adiciona o título e a classificação do filme na imagem

              const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
              image.print(
                font,
                40,
                40,
                {
                  text: `${filme.title} - Rating: ${filme.imDbRating}`,
                  alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
                  alignmentY: Jimp.VERTICAL_ALIGN_TOP
                },
                image.bitmap.width,
                image.bitmap.height
              );

              // Salva a imagem editada
              await image.writeAsync(filePath);
              console.log(`${fileName} saved successfully!`);
            } catch (error) {
              console.error(`Failed to add text to ${fileName}:`, error);
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
  response.on('error', (error) => {
    console.error(error);
  });
});
