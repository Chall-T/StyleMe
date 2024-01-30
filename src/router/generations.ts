import express from 'express';

import { generateOutfits } from '../controllers/textggeneration';
import { isAuthenticated, isOwner } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/outfits/:count', isAuthenticated, generateOutfits);
};