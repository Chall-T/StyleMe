import express from "express";

import { random, authentication, newSessionId } from "../helpers";
import * as dotenv from 'dotenv';
import {get, merge} from 'lodash';
import { createUser, getUserByEmail } from "../database/users";
import { createSession, getSessionById, getSessionsByUserId } from "../database/sessions";
import { createProfile } from "../database/profiles";
import metadata from "gcp-metadata";
import { OAuth2Client } from "google-auth-library";
import { Prisma } from '@prisma/client';

dotenv.config({ path: __dirname+'/../.env' });

const oAuth2Client = new OAuth2Client();

export const login = async(req: express.Request, res: express.Response) =>{
    try{
        const {email, password} = req.body;
        const ip = req.socket.remoteAddress || String(req.headers['x-forwarded-for']);
        const userAgent = req.get('User-Agent');
        if (!email || !password){
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email)
        if (!user){
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.salt, password);
        if (user.password !== expectedHash){
            return res.sendStatus(403);
        }
        const sessionId = newSessionId()
        const session = await createSession({
            id: sessionId,
            userId: user.id,
            ipAddress: ip,
            userAgent,
        })
        
        const domain = process.env.DOMAIN || 'localhost';
        res.cookie('SessionId', session.id, { domain: domain, path: '/', httpOnly: true, secure: true})

        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register =async (req: express.Request, res: express.Response) =>{
    try{
        const {email, password, firstName, lastName} = req.body;

        if (!email || !password){
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const userData: Prisma.UserCreateInput = {
            email,
            salt,
            password: authentication(salt, password),
        }
        if (lastName){
            userData.lastName = lastName
        }
        if (firstName){
            userData.firstName = firstName
        }
        const user = await createUser(userData);
        if (!user){
            return res.status(500).json({message: "DB user creation failed"});
        }
        const profile = await createProfile({
            userId: user.id,
            name: user.firstName || "",
            genderId: 0,
            silhouetteId: 0,
            styles: {}
        });
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

let aud: string;

const audience = async () =>{
    if (!aud && (await metadata.isAvailable())) {
      let project_number = await metadata.project('numeric-project-id');
      let project_id = await metadata.project('project-id');
  
      aud = '/projects/' + project_number + '/apps/' + project_id;
    }
  
    return aud;
  }
  

const validateAssertion = async (assertion:string) =>{
    if (!assertion) {
      return {};
    }
  
    // Check that the assertion's audience matches ours
    const aud = await audience();
  
    // Fetch the current certificates and verify the signature on the assertion
    const response = await oAuth2Client.getIapPublicKeys();
    const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
      assertion,
      response.pubkeys,
      aud,
      ['https://cloud.google.com/iap']
    );
    const payload = ticket.getPayload();
  
    // Return the two relevant pieces of information
    return {
      email: payload.email,
      sub: payload.sub,
    };
}

export const googleLogin =async (req: express.Request, res: express.Response) =>{
    try{
        const assertion = req.header('X-Goog-IAP-JWT-Assertion');

        const info = await validateAssertion(assertion);
        const email = info.email;


        if (!email){
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser){
            const ip = req.socket.remoteAddress || String(req.headers['x-forwarded-for']);
            const userAgent = req.get('User-Agent');
            if (!email){
                return res.sendStatus(400);
            }
            const user = await getUserByEmail(email)
            if (!user){
                return res.sendStatus(400);
            }

            const sessionId = newSessionId()
            const session = await createSession({
                id: sessionId,
                userId: user.id,
                ipAddress: ip,
                userAgent,
            })
            
            const domain = process.env.DOMAIN || 'localhost';
            res.cookie('SessionId', session.id, { domain: domain, path: '/', httpOnly: true, secure: true})

            return res.status(200).json(user).end();
        }

        const salt = random();
        const userData: Prisma.UserCreateInput = {
            email,
            salt,
            password: authentication(salt, salt),
        }

        const user = await createUser(userData);
        if (!user){
            return res.status(500).json({message: "DB user creation failed"});
        }
        const profile = await createProfile({
            userId: user.id,
            name: user.firstName || "",
            genderId: 0,
            silhouetteId: 0,
            styles: {}
        });
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}