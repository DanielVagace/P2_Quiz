const readline = require('readline');

/**
*console.log(chalk.green.bold(
*        figlet.textSync('"CORE Quiz"', {horizontalLayout: 'full'})
*        )
*);
*/

const model = require('./model');
const {log,biglog,errlog,colorize} = require('./out');
const cmds = require ('./cmds');


biglog("CORE_Quiz",'green');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: colorize('quiz> ', 'blue'),
    completer: (line)=> {
    const completions = 'h help add delete edit list test p play credits quit q'.split(' ');
    const hits = completions.filter((c) => c.startsWith(line));
    // show all completions if none found
    return [hits.length ? hits : completions, line];
}
});

rl.prompt();

rl.on('line', (line) => {

    let args = line.split(" ");
    let cmd = args[0].toLowerCase().trim();

    switch (cmd) {
        case'':
            rl.prompt();
            break;
        case 'h':
        case'help':
           cmds.helpCmd(rl);
            break;
        case'q':
        case'quit':
            rl.close(rl);
            break;
        case 'add':
            cmds.addCmd(rl);
            break;
        case 'list':
            cmds.listCmd(rl);
            break;
        case 'show':
            cmds.showCmd(rl,args[1]);
            break;
        case 'test':
            cmds.testCmd(rl, args[1]);
            break;
        case'p':
        case'play':
            cmds.playCmd(rl);
            break;
        case'delete':
            cmds.deleteCmd(rl,args[1]);
            break;
        case 'edit':
            cmds.editCmd(rl,args[1]);
            break;
        case 'credits':
            cmds.creditsCmd(rl);
            break;
        default:
            console.log(`Comando desconocido: '${colorize (cmd,'red')}'`);
            console.log(`Use ${colorize('help','green')} para ver todos los comandos disponibles`);
            rl.prompt();
            break;
    }

}).on('close', () => {
    log('Adios!');
    process.exit(0);
});


