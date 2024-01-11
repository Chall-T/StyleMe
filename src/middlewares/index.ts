import express from 'express';
import {get, merge} from 'lodash';
import { getSessionById } from '../database/sessions';
import { getUserByIdNoPassword } from '../database/users';


export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try{
        const sessionToken = req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined || req.cookies['SessionId'];
        if (!sessionToken){
            return res.status(401).json({message: "Missing SessionId!"}).end();
        }
        const session = await getSessionById(sessionToken);
        const user = await getUserByIdNoPassword(session.userId);
        
        if (!user){
            return res.status(403).json({message: "Invalid SessionId!"}).end();
        }
        merge(req, {identity: user});

        return next();
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}

// export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) =>{
//     try{
//         let sessionToken = req.cookies['NEO-AUTH'] || req.headers.authorization.split(" ")[1];
//         if (!sessionToken){
//             return res.sendStatus(403);
//         }
//         const existingUser = await getUserBySessionToken(sessionToken);

//         if (!existingUser){
//             return res.sendStatus(403);
//         }
//         merge(req, {identity: existingUser});

//         return next();
//     }catch (error){
//         console.log(error);
//         return res.sendStatus(400);
//     }
// }
