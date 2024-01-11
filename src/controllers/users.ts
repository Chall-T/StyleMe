import express from 'express';
import {get, merge} from 'lodash';

export const getUserTest = async(req: express.Request, res: express.Response) =>{
    try{
        const user = {'username': "test"}

        return res.status(200).json(user);
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserProfile = async(req: any, res: express.Response) =>{
    const user = get(req, 'identity');
    return res.status(200).json(user)
}