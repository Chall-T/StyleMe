import express from "express";

import { random, authentication, newSessionId } from "../helpers";
import * as dotenv from 'dotenv';
import {get, merge} from 'lodash';
import { UserCreate, createUser, getUserByEmail } from "../database/users";
import { createSession, getSessionById, getSessionsByUserId } from "../database/sessions";
import { createProfile, Profile } from "../database/profiles";
dotenv.config({ path: __dirname+'/../.env' });


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
        const userData: UserCreate = {
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
            gender: 0,
            silhouette: 0,
            styles: []
        });
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}