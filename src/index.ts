import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/../.env' });
import router from './router';



export const app = express();
app.use(cors({
    credentials: true,
}))
app.use(express.json());
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app)
const port = process.env.PORT || 8080;
const domain = process.env.DOMAIN || 'localhost';
server.listen(port, () =>{
    console.log(`Server started: http://${domain}:${port}/`)
});


app.use('/', router());
