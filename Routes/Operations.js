
import express from 'express'
 import {
        create,
        getAll,
        getOne,
        update,
        remove,
 } from '../Controller/Operations.js'
import NgoMiddleware from '../Middleware/NgoMiddleware.js'
    const router = express.Router()

router.post('/create',NgoMiddleware,create)
router.get('/get',NgoMiddleware,getAll)
router.get('/get/:id',NgoMiddleware,getOne)
router.patch('/:id',NgoMiddleware,update)
router.delete('/:id',NgoMiddleware,remove)


export default router