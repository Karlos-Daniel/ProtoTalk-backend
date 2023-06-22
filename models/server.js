const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {socketController} = require('../controllers/socketController')
const fileUpload = require('express-fileupload');
const {dbConnection} = require('../database/config');
const routesCategory = require('../routes/category.routes')
const routesWord = require('../routes/words.routes')

class server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

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
        
        this.app.use(cors());//cors
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