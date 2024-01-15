import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/../.env' });
import {server} from "./utils/server"


const app = server()

const API = http.createServer(app)
const port = process.env.PORT || 8080;
const domain = process.env.DOMAIN || 'localhost';
API.listen(port, () =>{
    console.log(`Server started: http://${domain}:${port}/`)
});
