const Server = require('./models/server');
require('dotenv').config();
// Define el comando que deseas ejecutar
const comandos = [
    'pip install -U pip setuptools wheel',
    'pip install -U spacy',
    'python -m spacy download es_core_news_sm'
  ];
  
  async function ejecutarComandosEnSecuencia(comandos) {
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
  await ejecutarComandosEnSecuencia(comandos);



const server = new Server();

server.listen();