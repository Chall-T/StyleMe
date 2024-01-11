import express from 'express';

import { getUserProfile, getUserTest } from '../controllers/users';
import { isAuthenticated } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/user', isAuthenticated, getUserTest);
    router.get('/profile', isAuthenticated, getUserProfile)
};