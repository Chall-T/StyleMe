import express from 'express';
import {get, merge} from 'lodash';
import { getProfileByUserId, updateProfileByUserId, removeStyleToProfileByUserId, addStyleToProfileByUserId } from '../database/profiles';

export const getUserTest = async(req: express.Request, res: express.Response) =>{
    try{
        const user = {'username': "test"}

        return res.status(200).json(user);
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}
export const changeProfile = async(req: any, res: express.Response) =>{
    try{
        const { id } = req.params;
        const updatedProfile = req.body;

        if (updatedProfile.id || updatedProfile.userId || updatedProfile.email || updatedProfile.createdAt || updatedProfile.updatedAt){
            return res.sendStatus(400);
        }
        const profile = await updateProfileByUserId(id, updatedProfile)
        if (!profile){
            return res.status(500).json({message: "DB profile fetch failed"});
        }
        return res.status(200).json(profile)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}


export const getUserProfile = async(req: any, res: express.Response) =>{
    try{
        const { id } = req.params;
        const profile = await getProfileByUserId(id)
        if (!profile){
            return res.status(500).json({message: "DB profile fetch failed"});
        }
        return res.status(200).json(profile)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}

export const removeStyle =async(req: any, res: express.Response) =>{
    try{
        const { id, styleId } = req.params;

        if (!styleId){
            return res.sendStatus(400);
        }
        const profile = await removeStyleToProfileByUserId(id, styleId)
        if (!profile){
            return res.status(500).json({message: "DB profile style update failed"});
        }
        return res.status(200).json(profile)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}

export const addStyle =async(req: any, res: express.Response) =>{
    try{
        const { id, styleId } = req.params;

        if (!styleId){
            return res.sendStatus(400);
        }
        const profile = await addStyleToProfileByUserId(id, styleId)
        if (!profile){
            return res.status(500).json({message: "DB profile style update failed"});
        }
        return res.status(200).json(profile)
    }catch (error){
        console.log(error);
        return res.sendStatus(500);
    }
}