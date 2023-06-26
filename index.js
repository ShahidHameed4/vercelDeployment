
import express from 'express'
import cors from 'cors' // important for recieving api calls

import * as dotenv from 'dotenv';
import userRouter from './Routes/User.js'
import ArticleRouter from './Routes/ArticleRoute.js'
dotenv.config();
import upload from 'express-fileupload'

import job from './Routes/JobRoutes.js'
import jobApp from './Routes/JobAppRoute.js'
import AppReview from './Routes/AppReviewRoutes.js'
import connectDB from './database/db.js'
import ngoRoutes from './Routes/NGORoutes.js'
import OperationRouter from './Routes/Operations.js'
import TransactionRouter from './Routes/Transactions.js'
import FinanceRouter from './Routes/Finance.js'
import AdovocacyRouter from './Routes/Adovocacy.js'
connectDB();
const app = express()
app.use(cors()) // important for recieving api calls
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(upload());

app.use('/api/ngo', ngoRoutes)
app.use('/api/operations', OperationRouter)
app.use('/api/transactions',TransactionRouter)
app.use('/api/finance',FinanceRouter)
app.use('/api/advocacy',AdovocacyRouter)


app.get('/',(req,res)=>{
    res.send('Welcome to NGO LAB')
})



const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
