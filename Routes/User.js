
import express from 'express'
import { registerUser,
    loginUser,
    getMe,profile,getAllUsers} from '../Controller/UserController.js'

import protect from "../Middleware/Middleware.js"
const router = express.Router()

router.post('/create', registerUser)
router.get('/get/',protect, getAllUsers )
router.post('/login', loginUser )
router.get('/profile', profile )







export default router;