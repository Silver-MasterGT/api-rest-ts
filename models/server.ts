import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';

import db from '../db/connection';



class Server {
    
    private app: Application;
    private port: string ;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
            this.app = express();
            this.port = process.env.PORT || '8000';

            // Definir mis rutas
            this.dbconnection();
            this.middlewares();
            this.routes()
            
    }

    async dbconnection() {

        try {
            await db.authenticate();
            console.log('database online')
        } catch (error) {
            throw new Error( error ); 
        }

    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        //Lectura del Body
        this.app.use( express.json() );
        //Carpeta Publica
        this.app.use( express.static('public') )
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ' + this.port);
        })
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

}

export default Server;