import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { updateProfilePic } from '../controllers/auth.controller.js';
 import { checkAuth } from '../controllers/auth.controller.js';
const router   = express.Router();


// Router  for signUp ...
router.post("/signup",signup )
// Router  for login ...
router.post("/login", login)
// Router  for  logout ....
router.post("/logout", logout)

// Router for  Updating Profile Pic ..
router.put("/updateProfilePic",protectRoute, updateProfilePic)


// Router for checking USer  whether  he/she is logged in or not ....

router.get("/check" , protectRoute , checkAuth);

export default router;