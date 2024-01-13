import express from 'express';

import { getUserProfile, getUserTest, changeProfile } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/users', isAuthenticated, isOwner, getUserTest);
    router.get('/users/:id/profile', isAuthenticated, isOwner, getUserProfile)
    router.put('/users/:id/profile', isAuthenticated, isOwner, changeProfile)
};