import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

const router   = express.Router();


// Router  for signUp ...
router.post("/signup",signup )



// Router  for login ...
router.post("/login", login)



// Router  for  logout ....
router.post("/logout", logout)

export default router;