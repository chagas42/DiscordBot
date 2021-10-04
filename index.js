
//imports
const { Client } = require('discord.js');
const config = require('./config.json');
const { join } = require('./src/commands/join.js');
const { leave } = require('./src/commands/leave.js');
const  { play }  = require('./src/commands/play.js');
const { reset } = require('./src/commands/reset.js');
const { skip } = require('./src/commands/skip.js');
const { help } = require('./src/commands/help.js');
const { pause } = require('./src/commands/pause.js');
const { resume } = require('./src/commands/resume.js');

const servers = {
  server: {
      connection: null,
      dispatcher: null,
      queue: [],
      playing:false
  }
}

const { PREFIX, TOKEN } = config;


const client = new Client();

//observers
client.on('guildCreate', () => {

})

client.on('ready',  () => {
    console.log('Estou online!');
});

client.on('message', async (msg) => {

    //filters
    if(!msg.guild) return;
    // verificando se a msg foi mandada de dentro de um servidor, caso contrario ignora esta msg

    if(!msg.content.startsWith(PREFIX)) return;
    // verificando se a msg contem um prefixo válido

    if(!msg.member.voice.channel){ 
    // verificando se quem chamou o bot esta dentro de um canal de voz
        msg.channel.send('Você precisa estar em um canal de voz!');
        return;
    };

    let args = msg.content.substring(PREFIX.length).split(" ");


    console.log(args)

    //comands
    switch(args[0]){
        case `join`: // >join
        //statement
          join(msg, servers);
          break;
        case `leave`: // >leave
        //statement
          leave(msg, servers);
          break;
        case `play`: // >play <link>
        //statement
          play(msg, servers)
          break;
        case `pause`: // >pause
        //statement
          pause(msg, servers)
          break;
        case `resume`: // >resume
        //statement
          resume(msg, servers)
          break;
        case `reset`: // >reset
        //statement
          reset(msg, servers);
          break;
        case `skip`: // >skip
        //statement
          skip(servers)
          break;
        case `help`:
        
          help(msg);
        
          break;
        case `ping`:
          msg.channel.send('pong! 😁')
          break;
        default:
          msg.channel.send('Comando inválido 😑');
          break;
    }

});

client.login(TOKEN);



//funcionalidades do bot:
    // 1. Entrar no canal de voz; [feito]
    // 2. Sair do canal de voz; [feito]
    // 3. Pesquisar uma música; [feito]
    // 4. Selecionar uma das músicas pesquisadas; [feito]
    // 5. Pausar  uma música; [feito]
    // 6. Tocar uma música atraves de um link; [feito]
    // 7. Cria uma fila de músicas; [feito]
    // 8. Passar entre as músicas da fila; [a fazer]
    // 9. Limpar a fila; [feito]