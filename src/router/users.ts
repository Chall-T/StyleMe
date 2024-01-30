import express from 'express';

import { getUserProfile, getUserTest, changeProfile, addStyle, removeStyle } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/users', isAuthenticated, isOwner, getUserTest);
    router.get('/users/:id/profile', isAuthenticated, isOwner, getUserProfile)
    router.patch('/users/:id/profile', isAuthenticated, isOwner, changeProfile)
    router.patch('/users/:id/profile/style/:styleId', isAuthenticated, isOwner, addStyle)
    router.delete('/users/:id/profile/style/:styleId', isAuthenticated, isOwner, removeStyle)
};