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
    destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'styles.rpf')
  }
  // {
  //   destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'outro_arquivo.txt')
  // }
];

realizarDesinstalacao(desinstalacoes);


// O CODIGO ABAIXO DESINSTALA TODOS OS MODS EM FORMATO DE RPF

// const fs = require('fs');
// const path = require('path');

// const pastaMods = path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods');

// function desinstalarArquivosRpf(diretorio) {
//   fs.readdir(diretorio, (err, files) => {
//     if (err) {
//       console.error(`Erro ao listar arquivos no diretório ${diretorio}: ${err}`);
//       return;
//     }

//     files.forEach((file) => {
//       const caminhoArquivo = path.join(diretorio, file);

//       fs.stat(caminhoArquivo, (err, stats) => {
//         if (err) {
//           console.error(`Erro ao obter informações do arquivo ${caminhoArquivo}: ${err}`);
//           return;
//         }

//         if (stats.isFile() && path.extname(file) === '.rpf') {
//           fs.unlink(caminhoArquivo, (err) => {
//             if (err) {
//               console.error(`Erro ao remover o arquivo ${caminhoArquivo}: ${err}`);
//             } else {
//               console.log(`Arquivo ${caminhoArquivo} removido com sucesso!`);
//             }
//           });
//         } else if (stats.isDirectory()) {
//           desinstalarArquivosRpf(caminhoArquivo); // Desinstalar arquivos dentro de subdiretórios (recursivamente)
//         }
//       });
//     });
//   });
// }

// desinstalarArquivosRpf(pastaMods);

