import {
    getAllTransactions,

} from '../Controller/Transactions.js'
import protect from '../Middleware/NgoMiddleware.js';

import express from 'express'
const router =express.Router()

router.get('/get',protect,getAllTransactions);

export default router;