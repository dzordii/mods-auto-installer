const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function criarDiretorioSeNaoExistir(diretorio) {
  if (!fs.existsSync(diretorio)) {
    fs.mkdirSync(diretorio, { recursive: true });
  }
}

function copiarArquivos(origem, destino) {
  criarDiretorioSeNaoExistir(destino);

  const files = fs.readdirSync(origem);

  files.forEach((file) => {
    const origemCompleta = path.join(origem, file);
    const destinoCompleto = path.join(destino, file);

    if (fs.statSync(origemCompleta).isDirectory()) {
      copiarArquivos(origemCompleta, destinoCompleto);
    } else {
      fs.copyFileSync(origemCompleta, destinoCompleto);
    }
  });
}

function removerPastaCitizen(destino) {
  const pastaCitizen = path.join(destino);
  if (fs.existsSync(pastaCitizen)) {
    rimraf.sync(pastaCitizen);
    console.log(`Pasta "citizen" existente em ${destino} foi removida com sucesso!`);
  }
}

function realizarInstalacao(instalacoes) {
  instalacoes.forEach((instalacao) => {
    const { origem, destino } = instalacao;

    try {
      removerPastaCitizen(destino);
      copiarArquivos(path.resolve(origem), path.resolve(destino));
      console.log(`Pasta ${origem} instalada em ${destino} com sucesso!`);
    } catch (error) {
      console.error('Ocorreu um erro:', error.message);
    }
  });
}

// Exemplo de uso:
const instalacoes = [
  {
    origem: './mods/citizen',
    destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'citizen')
  }
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
