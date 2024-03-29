const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {socketController} = require('../controllers/socketController')
const fileUpload = require('express-fileupload');
const {dbConnection} = require('../database/config');
const routesCategory = require('../routes/category.routes')
const socketIO = require("socket.io");
const routesWord = require('../routes/words.routes')

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST','PUT','DELETE','PATCH'],
  };
class server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = socketIO(this.server,{
            cors: {
                origin: "*",
              },
        })

        //DB
        this.conectarDB();

        //Middlewares
        this.middlewares();
                
        //Rutas de mi aplicacion
        this.routes();

        this.sockets();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
       
        this.app.use(cors(corsOptions));//cors
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
        
        this.app.use(routesCategory);
        this.app.use(routesWord);
        
        
    }

    sockets(){
        this.io.on('connection',socketController)
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log(`SERVIDOR CORRIENDO EN http://localhost:${this.port}/`);
        });
    }

}

module.exports=server;