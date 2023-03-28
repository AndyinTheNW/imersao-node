

class JsonParser {
  
  static parse(json) {

    // Expressão regular para encontrar a lista de itens dentro do JSON.
    const regexItems = /.*\[(.+)\].*/s;

    // Expressão regular para encontrar os atributos de cada item no formato "nome":"valor".
    const regexAtributos = /"(.+?)":"(.*?)"/g;

    // Extrai a lista de itens do JSON utilizando a expressão regular.
    const matchItems = regexItems.exec(json);

    if (!matchItems) {
      throw new Error('Não foi possível encontrar os itens no JSON');
    }
    
    // Separa cada item em um array.
    const items = matchItems[1].split('},{');

    // Mapeia cada item para um objeto JS com seus respectivos atributos e valores.
    const itensAnalizados = items.map((item) => {
      const atributos = {};
      let match;
      while ((match = regexAtributos.exec(item)) !== null) {
        atributos[match[1]] = match[2];
      }
      return atributos;
    });

    return itensAnalizados;
  }
}

module.exports = JsonParser;
