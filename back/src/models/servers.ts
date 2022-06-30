import express, {Application} from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import path from 'path';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import db from '../db/connection';
import bp from 'body-parser';

// const bp = require('body-parser')

// import bodyParser from 'body-parser';
// import ExpressHandlebars from 'express-handlebars';


class Server{
    private app: Application;
    private port: string;

    private apipaths = {
        user:'/api/'
    }

    constructor(){
        this.app=express();
        this.app.use(cors());
        this.app.use(bp.json())
        this.app.use(bp.urlencoded({ extended: true }))
        this.port = (process.env.port || '8000');
        //definir las rutas
        this.routes();
        this.middlewares();
        this.dbConnection();
        
        // this.settings();
    }

    // settings(){
    //     this.app.set('views',path.join(__dirname,'views'));
    //     const exphbs = require('express-handlebars');
    //     const handlebars = exphbs.create({
    //         layoutsDir: path.join(this.app.get('views'),'layouts'),
    //         partialsDir: path.join(this.app.get('views'),'partials'),

    //         defaultLayout: 'main',extname: '.hbs',});

    //     this.app.engine('.hbs', handlebars.engine);
    
    //     this.app.set('view engine','.hbs');
    // }

    middlewares(){

        //CORS
        this.app.use(cors());
        //Lectura del body
        // this.app.use(express.json());
        // this.app.use(express.json());
        // this.app.use(express.urlencoded({extended:true}));
        // this.app.use(morgan('dev'));

        //carpeta publica
        this.app.use(express.static('src/public'));


    }

    routes(){

        this.app.use(this.apipaths.user,userRoutes)

    }


    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database Online');
        } catch (msg) {
            throw new Error('error en la conexión a la base de datos');
        }
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log ('Servidor corriendo en puerto '+ this.port);

        })
    }


}
export default Server;