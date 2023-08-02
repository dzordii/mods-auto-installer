const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pastaMods = path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods');

function desinstalarArquivosRpf(diretorio, callback) {
  fs.readdir(diretorio, (err, files) => {
    if (err) {
      console.error(`Erro ao listar arquivos no diretório ${diretorio}: ${err}`);
      return;
    }

    let remainingFiles = files.length;

    files.forEach((file) => {
      const caminhoArquivo = path.join(diretorio, file);

      fs.stat(caminhoArquivo, (err, stats) => {
        if (err) {
          console.error(`Erro ao obter informações do arquivo.`);
          return;
        }

        if (stats.isFile() && file === 'Graphics Lottus by Dzordi.rpf') {
          fs.unlink(caminhoArquivo, (err) => {
            if (err) {
              console.error(`Erro ao remover o arquivo.`);
            } else {
              console.log(`Desinstalação concluida com sucesso!`);
            }

            remainingFiles--;

            if (remainingFiles === 0) {
              callback(); // Chamando a função de callback quando a desinstalação estiver concluída
            }
          });
        } else if (stats.isDirectory()) {
          desinstalarArquivosRpf(caminhoArquivo, () => {
            remainingFiles--;
            if (remainingFiles === 0) {
              callback(); // Chamando a função de callback quando a desinstalação estiver concluída
            }
          }); // Desinstalar arquivos dentro de subdiretórios (recursivamente)
        }
      });
    });
  });
}

// Função para exibir a barra de desinstalação
function exibirBarraDeDesinstalacao() {
  const totalFrames = 30; // Número total de frames na animação
  const tempoTotal = 2000; // Tempo total da animação em milissegundos (2 segundos)
  let frameAtual = 0;
  let porcentagemAtual = 0;

  const interval = setInterval(() => {
    // Calcular a porcentagem atual e atualizar o frame da animação
    porcentagemAtual = (frameAtual / totalFrames) * 100;
    frameAtual = (frameAtual + 1) % (totalFrames + 1);

    // Limpar a linha e imprimir a barra de desinstalação
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Estou desinstalando a citizen Lottus v2... [${gerarBarraDeProgresso(porcentagemAtual)}] ${porcentagemAtual.toFixed(0)}%`);
  }, tempoTotal / totalFrames);

  setTimeout(() => {
    clearInterval(interval);
    // Limpar a linha e imprimir a barra de desinstalação completa (100%)
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Estou desinstalando a citizen Lottus v2... [${gerarBarraDeProgresso(100)}] 100%\n`);
    console.log();
    process.stdin.resume(); // Adicionar esta linha para manter o CMD aberto
  }, tempoTotal);
}

// Função para gerar a barra de progresso com caracteres especiais
function gerarBarraDeProgresso(porcentagem) {
  const tamanhoBarra = 20; // Tamanho total da barra de progresso em caracteres
  const progresso = Math.floor((porcentagem / 100) * tamanhoBarra);
  const barra = '█'.repeat(progresso) + '-'.repeat(tamanhoBarra - progresso);
  return barra;
}

// Exemplo de uso:
function main() {
  // Exibir a barra de desinstalação
  exibirBarraDeDesinstalacao();

  // Aguardar 2 segundos antes de iniciar a desinstalação
  setTimeout(() => {
    desinstalarArquivosRpf(pastaMods, () => {
      // Habilitar o modo bruto para capturar eventos de tecla
      readline.emitKeypressEvents(process.stdin);
      process.stdin.setRawMode(true);

      // Aguardar a pressão de qualquer tecla
      console.log('Desinstalação concluída. Pressione qualquer tecla para sair.');
      process.stdin.on('keypress', (str, key) => {
        // Verificar se alguma tecla foi pressionada
        if (key && key.name !== undefined) {
          // Restaurar configurações padrão do terminal
          process.stdin.setRawMode(false);
          process.stdin.pause();
        }
      });
    });
  }, 2000);
}

main();
