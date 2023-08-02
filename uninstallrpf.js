const fs = require('fs');
const path = require('path');

const pastaMods = path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods');

function desinstalarArquivosRpf(diretorio) {
  fs.readdir(diretorio, (err, files) => {
    if (err) {
      console.error(`Erro ao listar arquivos no diretório ${diretorio}: ${err}`);
      return;
    }

    files.forEach((file) => {
      const caminhoArquivo = path.join(diretorio, file);

      fs.stat(caminhoArquivo, (err, stats) => {
        if (err) {
          console.error(`Erro ao obter informações do arquivo ${caminhoArquivo}: ${err}`);
          return;
        }

        if (stats.isFile() && file === 'Graphics Lottus by Dzordi.rpf') {
          fs.unlink(caminhoArquivo, (err) => {
            if (err) {
              console.error(`Erro ao remover o arquivo ${caminhoArquivo}: ${err}`);
            } else {
              console.log(`Arquivo ${caminhoArquivo} removido com sucesso!`);
            }
          });
        } else if (stats.isDirectory()) {
          desinstalarArquivosRpf(caminhoArquivo); // Desinstalar arquivos dentro de subdiretórios (recursivamente)
        }
      });
    });
  });
}

desinstalarArquivosRpf(pastaMods);
