
const user = require("./cmds_user.js");
const quiz = require("./cmds_quiz.js");
const favs = require("./cmds_favs.js");
const readline = require('readline');


//paquete readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});
//primer metodo
rl.log = (msg) => console.log(msg);  // Add log to rl interface
//segundo metodo
rl.questionP = function (string) {   // Add questionP to rl interface
  return new Promise ( (resolve) => {
    this.question(`  ${string}: `, (answer) => resolve(answer.trim()))
  })//muestra la info y epsera que el usuario escriba la respuesta y lo introduzca por teclado
};

rl.prompt();

//diferentes comandos que puede introducir el usuario
rl.on('line', async (line) => {
  try{
    let cmd = line.trim()

    if      ('' ===cmd)   {}
    else if ('h' ===cmd)  { user.help(rl);}

    else if (['lu', 'ul', 'u'].includes(cmd)) { await user.list(rl);} //voy a user.list que es una funcion de user
    else if (['cu', 'uc'].includes(cmd))      { await user.create(rl);}
    else if (['ru', 'ur', 'r'].includes(cmd)) { await user.read(rl);}
    else if (['uu'].includes(cmd))            { await user.update(rl);}
    else if (['du', 'ud'].includes(cmd))      { await user.delete(rl);}

    else if (['lq', 'ql', 'q'].includes(cmd)) { await quiz.list(rl);}
    else if (['cq', 'qc'].includes(cmd))      { await quiz.create(rl);}
    else if (['tq', 'qt', 't'].includes(cmd)) { await quiz.test(rl);}
    else if (['uq', 'qu'].includes(cmd))      { await quiz.update(rl);}
    else if (['dq', 'qd'].includes(cmd))      { await quiz.delete(rl);}

    else if (['lf', 'fl', 'f'].includes(cmd)) { await favs.list(rl);}
    else if (['cf', 'fc'].includes(cmd))      { await favs.create(rl);}
    else if (['df', 'fd'].includes(cmd))      { await favs.delete(rl);}

    else if (['p'].includes(cmd))      { await quiz.play(rl);}//jugar con todas las preguntas en aleatorio
    else if (['ls'].includes(cmd))      { await quiz.listScore(rl);}//list score de la BBDD

    else if ('e'===cmd)  { rl.log('Bye!'); process.exit(0);}
    else                 {  rl.log('UNSUPPORTED COMMAND!');
                            user.help(rl);
                         };
    } catch (err) { rl.log(`  ${err}`);}
    finally       { rl.prompt(); }
  });