const fs = require('fs');
const path = require('path');

function criarDiretorioSeNaoExistir(diretorio) {
  if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio, { recursive: true });
  }
}

function realizarInstalacao(instalacoes) {
  instalacoes.forEach((instalacao) => {
    const { origem, destino } = instalacao;

    try {
      const origemCompleta = path.resolve(origem);
      const destinoCompleto = path.resolve(destino);

      criarDiretorioSeNaoExistir(path.dirname(destinoCompleto));

      const readStream = fs.createReadStream(origemCompleta);
      const writeStream = fs.createWriteStream(destinoCompleto);

      readStream.pipe(writeStream);

      readStream.on('error', (err) => {
        console.error(`Erro ao ler o arquivo de origem ${origem}:`, err);
      });

      writeStream.on('error', (err) => {
        console.error(`Erro ao escrever o arquivo de destino ${destino}:`, err);
      });

      writeStream.on('finish', () => {
        console.log(`Arquivo ${origem} instalado em ${destino} com sucesso!`);
      });
    } catch (error) {
      console.error('Ocorreu um erro:', error.message);
    }
  });
}

// Exemplo de uso:
const instalacoes = [
  {
    origem: './mods/styles.rpf',
    destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'styles.rpf')
  }
  // {
  //   origem: './mods/hyperleds.rpf',
  //   destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'hyperleds.rpf')
  // },
  // {
  //   origem: './mods/hypervegetation1.rpf',
  //   destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'hypervegetation1.rpf')
  // },
  // {
  //   origem: './mods/hypervegetation2.rpf',
  //   destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'hypervegetation2.rpf')
  // },
  // {
  //   origem: './mods/hypervegetation3.rpf',
  //   destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'hypervegetation3.rpf')
  // }
];

realizarInstalacao(instalacoes);


// Comando para criar somente o arquivo de desintalação abaixo:
// pkg uninstall.js --output uninstall.exe --target win