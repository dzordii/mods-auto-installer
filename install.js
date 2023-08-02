const fs = require('fs');
const path = require('path');
const readline = require('readline');


function excluirPasta(pasta) {
  if (fs.existsSync(pasta)) {
    const files = fs.readdirSync(pasta);
    files.forEach((file) => {
      const filePath = path.join(pasta, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        // Se for uma pasta, chamar recursivamente a função para excluir seus arquivos
        excluirPasta(filePath);
      } else {
        // Se for um arquivo, excluí-lo
        fs.unlinkSync(filePath);
      }
    });
    fs.rmdirSync(pasta); // Excluir a própria pasta após excluir todos os arquivos
  }
}

// INSTALATION FUNCTIONS --------------------------------
function realizarInstalacao(instalacoes) {
  instalacoes.forEach((instalacao) => {
    const { origem, destino } = instalacao;

    try {
      fs.copyFileSync(origem, destino);
      console.log(`Instalação realizada com sucesso!!`);
    } catch (error) {
      console.error('Ocorreu um erro: abra um ticket em https://discord.gg/dzordi para ter suporte!');
    }
  });
}

// Função para exibir a barra de carregamento
function exibirBarraDeCarregamento() {
  const totalFrames = 30; // Número total de frames na animação
  const tempoTotal = 2000; // Tempo total da animação em milissegundos (2 segundos)
  let frameAtual = 0;
  let porcentagemAtual = 0;

  const interval = setInterval(() => {
    // Calcular a porcentagem atual e atualizar o frame da animação
    porcentagemAtual = (frameAtual / totalFrames) * 100;
    frameAtual = (frameAtual + 1) % (totalFrames + 1);

    // Limpar a linha e imprimir a barra de carregamento
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Iniciando a instalação... [${gerarBarraDeProgresso(porcentagemAtual)}] ${porcentagemAtual.toFixed(0)}%`);
  }, tempoTotal / totalFrames);

  setTimeout(() => {
    clearInterval(interval);
    // Limpar a linha e imprimir a barra de carregamento completa (100%)
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Iniciando a instalação... [${gerarBarraDeProgresso(100)}] 100%\n`);
    console.log();
    console.log();
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
  // Local da pasta que será excluída
  const pastaCitizen = path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'citizen');
  excluirPasta(pastaCitizen); // Excluir a pasta "citizen" antes de iniciar a instalação

  exibirBarraDeCarregamento(); // Exibir a barra de carregamento

  // Aguardar 2 segundos antes de iniciar a instalação
  setTimeout(() => {
    realizarInstalacao(instalacoes);

    // Habilitar o modo bruto para capturar eventos de tecla
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    // Aguardar a pressão de qualquer tecla
    console.log('Pressione qualquer tecla para sair.');
    console.log();
    console.log('Lottus v2 By Dzordi');
    process.stdin.on('keypress', (str, key) => {
      // Verificar se alguma tecla foi pressionada
      if (key && key.name !== undefined) {
        // Restaurar configurações padrão do terminal
        process.stdin.setRawMode(false);
        process.stdin.pause();
      }
    });
  }, 2000);
}

// Exemplo de uso:
const instalacoes = [
  {
    origem: './mods/Graphics Lottus by Dzordi.rpf',
    destino: path.join(process.env.LOCALAPPDATA, 'FiveM', 'FiveM.app', 'mods', 'Graphics Lottus by Dzordi.rpf'),
  }
];

main()


















// Comando para criar somente o arquivo de desintalação abaixo:
// pkg uninstall.js --output uninstall.exe --target win


// ESTE COMANDO ABAIXO É ESSENCIAL PARA ALTERAÇÃO DO ICONE
// npx resedit --in install.exe --out auto-install.exe --icon 1,icon.ico --no-grow

// npx resedit --in uninstall.exe --out Uninstall.exe --icon 1,iconu.ico --no-grow
