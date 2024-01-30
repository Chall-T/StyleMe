import express from 'express';
import users from './users';
import authentication from './authentication';
import outfits from './outfits';

export const router = express.Router();

export default(): express.Router =>{
    users(router);
    authentication(router)
    outfits(router)
    return router;
};