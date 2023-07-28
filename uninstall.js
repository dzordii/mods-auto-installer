const fs = require('fs');
const path = require('path');

function removerArquivo(destino) {
  try {
    const destinoCompleto = path.resolve(destino);

    fs.unlinkSync(destinoCompleto);

    console.log(`Arquivo ${destino} removido com sucesso!`);
  } catch (error) {
    console.error(`Erro ao remover o arquivo ${destino}:`, error);
  }
}

function realizarDesinstalacao(desinstalacoes) {
  desinstalacoes.forEach((desinstalacao) => {
    const { destino } = desinstalacao;
    removerArquivo(destino);
  });
}

// Exemplo de uso:
const desinstalacoes = [
  {
    destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'fpsplus.rpf')
  }
  // {
  //   destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'outro_arquivo.txt')
  // }
];

realizarDesinstalacao(desinstalacoes);
