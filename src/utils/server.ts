
import bodyParser from 'body-parser';
import compression from 'compression';
import express, { response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from '../router';

export const server = () =>{
    const app = express();
    // app.use(cors({
    //     credentials: true,
    // }))
    app.use(cors())
    app.use(express.json());
    app.use(compression())
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use('/', router());
    
    return app
}
