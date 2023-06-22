const brain = require('brain.js');
const fs = require('fs');
const csv = require('csv-parser');

const config = {
    inputSize: 20,
    inputRange: 20,
    hiddenLayers: [20, 20],
    outputSize: 20,
    learningRate: 0.01,
    decayRate: 0.999,
  };
  
  // create a simple recurrent neural network
  const net = new brain.recurrent.LSTM();
  
  // Definir la ruta del archivo CSV
const csvFilePath = 'frasesDataset.csv';

// Array para almacenar los datos de entrenamiento
const trainingData = [];

// Leer el archivo CSV y procesar los datos
fs.createReadStream(csvFilePath)
  .pipe(csv(['Oración', 'Corrección Glosa']))
  .on('data', (data) => {
    if (data['Corrección Glosa']) {
      trainingData.push({
        input: data['Oración'].split(' '), // Convertir la oración en un array de palabras
        output: data['Corrección Glosa'].split(' ') // Convertir la corrección en un array de palabras
      });
    }
  })
  .on('end', () => {
    // Entrenar la red neuronal
    console.log(trainingData);
    console.log("Procede a entrenar");
    net.train(trainingData);
    console.log("Fin entrenamiento");
    // Guardar el modelo entrenado en un archivo
    const modelJSON = net.toJSON();
    fs.writeFileSync('modelo.json', JSON.stringify(modelJSON));
  });

