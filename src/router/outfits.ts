import express from 'express';

import { outfits } from '../controllers/textggeneration';
import { isAuthenticated, isOwner } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/outfits', isAuthenticated, outfits);
};