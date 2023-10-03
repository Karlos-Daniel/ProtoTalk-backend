const { exec } = require("child_process");


const pythonScriptPath = "./controllers/red.py"

function processedText (output) {
    return new Promise((resolve, reject) => {
      exec(
        `python ${pythonScriptPath} "${output}"`,
        { encoding: "latin1" },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al ejecutar el script de Python: ${error}`);
            reject(error);
            return;
          }
          resolve(stdout);
        }
      );
    });
  }

let GLOSA = []

const socketController = (socket)=>{
        console.log("Un cliente se ha conectado");

        socket.on("disconnect", () => {
          GLOSA = []
          console.log("Un cliente se ha desconectado");
        });

        socket.on("TextOutput", async (output) => {
          var textoProcesado = await processedText(output);
          GLOSA = [];
          GLOSA.push(textoProcesado);
          console.log(textoProcesado);
          console.log(GLOSA);
          /* socket.emit("ProcessedText", textoProcesado); */
          socket.emit("ProcessedText",GLOSA)
        });
      
}

module.exports = {
    socketController
}