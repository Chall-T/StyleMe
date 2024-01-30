import express from 'express';
import {get, merge} from 'lodash';
import { getAllGenders, getAllSilhouettes, getAllStyles, createGender, createSilhouette, createStyle } from '../database/profiles';

export const getStyles =async(req: any, res: express.Response) =>{
    try{
        const result = await getAllStyles()
        if (!result){
            return res.sendStatus(500);
        }
        return res.status(200).json(result)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}
export const getGenders =async(req: any, res: express.Response) =>{
    try{
        const result = await getAllGenders()
        if (!result){
            return res.sendStatus(500);
        }
        return res.status(200).json(result)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}
export const getSilhouettes =async(req: any, res: express.Response) =>{
    try{
        const result = await getAllSilhouettes()
        if (!result){
            return res.sendStatus(500);
        }
        return res.status(200).json(result)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}


export const addStyle =async(req: any, res: express.Response) =>{
    try{
        const body = req.body;
        const result = await createGender(body)
        if (!result){
            return res.sendStatus(500);
        }
        return res.status(200).json(result)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}
export const addGender =async(req: any, res: express.Response) =>{
    try{
        const body = req.body;
        const result = await createGender(body)
        if (!result){
            return res.sendStatus(500);
        }
        return res.status(200).json(result)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}
export const addSilhouette =async(req: any, res: express.Response) =>{
    try{
        const body = req.body;
        const result = await createSilhouette(body)
        if (!result){
            return res.sendStatus(500);
        }
        return res.status(200).json(result)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}