

const socketController = (socket)=>{
        console.log("Un cliente se ha conectado");

        socket.on("disconnect", () => {
          console.log("Un cliente se ha desconectado");
        });
        
        socket.on("TextOutput", async (output) => {
          var textoProcesado = await processedText(output);
          console.log(textoProcesado);
          socket.emit("ProcessedText", textoProcesado);
        });
      
}

module.exports = {
    socketController
}