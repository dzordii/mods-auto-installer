const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const readline = require('readline-sync');

// KEYS FUNCTIONS --------------------------------
function obterChave() {
  const chave = readline.question('Digite a chave ou senha: ', {
    hideEchoBack: true,
  });
  return chave;
}

function verificarChave(chaveDigitada) {
  const chaveValida = 'chave123'; // Substitua pela chave válida que você deseja usar
  return chaveDigitada === chaveValida;
}

// INSTALATION FUNCTIONS --------------------------------
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

function realizarInstalacao(instalacoes, chaveDigitada) {
  if (!verificarChave(chaveDigitada)) {
    console.log('Chave inválida. A instalação não será realizada.');
    return;
  }

  instalacoes.forEach((instalacao) => {
    const { origem, destino } = instalacao;

    try {
      removerPastaCitizen(destino);
      copiarArquivos(path.resolve(origem), path.resolve(destino));
      console.log(`Sua citizen foi instalada com sucesso! Bom game!`);
    } catch (error) {
      console.error('Ocorreu um erro:', error.message);
    }
  });
}

// Exemplo de uso:
function main() {
  const chave = obterChave();

  // Chamada para realizarInstalacao será feita somente se a chave for válida
  realizarInstalacao(instalacoes, chave);

  // Pausa manual para manter o terminal aberto
  console.log('Pressione qualquer tecla para sair.');
  readline.keyInPause();
}

// Exemplo de uso:
const instalacoes = [
  {
    origem: './mods/citizen',
    destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'citizen'),
  }
];

main();











// Comando para criar somente o arquivo de desintalação abaixo:
// pkg uninstall.js --output uninstall.exe --target win


// ESTE COMANDO ABAIXO É ESSENCIAL PARA ALTERAÇÃO DO ICONE
// npx resedit --in install.exe --out out.exe --icon 1,icon.ico --no-grow
