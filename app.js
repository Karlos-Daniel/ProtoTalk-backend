const Server = require('./models/server');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('dotenv').config();
// Define el comando que deseas ejecutar
const comandos = [
    'pyhton -m info spacy',
    'python -m spacy info en_core_web_sm'
  ];
  
 function ejecutarComandosEnSecuencia(comandos) {
    if (comandos.length === 0) {
      console.log('Todos los comandos se han ejecutado.');
      return;
    }
  
    const comandoActual = comandos.shift();
    console.log(`Ejecutando: ${comandoActual}`);
  
    exec(comandoActual, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el comando: ${error.message}`);
      } else if (stderr) {
        console.error(`Comando generó errores: ${stderr}`);
      } else {
        console.log(`Resultado del comando:\n${stdout}`);
      }
  
      // Llama recursivamente a la función para ejecutar el siguiente comando
      ejecutarComandosEnSecuencia(comandos);
    });
  }
  
  // Inicia la ejecución de comandos en secuencia
  ejecutarComandosEnSecuencia(comandos);



const server = new Server();

server.listen();