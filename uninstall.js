const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function removerArquivoOuPasta(destino) {
  try {
    const destinoCompleto = path.resolve(destino);

    if (fs.existsSync(destinoCompleto)) {
      if (fs.statSync(destinoCompleto).isDirectory()) {
        rimraf.sync(destinoCompleto); // Remover pasta com rimraf
      } else {
        fs.unlinkSync(destinoCompleto); // Remover arquivo
      }

      console.log(`Arquivo ou pasta ${destino} removido com sucesso!`);
    } else {
      console.log(`Arquivo ou pasta ${destino} não encontrado.`);
    }
  } catch (error) {
    console.error(`Erro ao remover o arquivo ou pasta ${destino}:`, error);
  }
}

function realizarDesinstalacao(desinstalacoes) {
  desinstalacoes.forEach((desinstalacao) => {
    const { destino } = desinstalacao;
    removerArquivoOuPasta(destino);
  });
}

// Exemplo de uso:
const desinstalacoes = [
  {
    destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'citizen')
  }
  // Adicione outras desinstalações de arquivos ou pastas aqui, se necessário
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

