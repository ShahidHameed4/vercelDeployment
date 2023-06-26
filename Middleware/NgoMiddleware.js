

import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import NGO from '../Model/NGO.js'


const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)
            req.ngo = await NGO.findById(decoded.ngo.id).select('-passcode')
            console.log(req.ngo)
            next()
        } catch (error) {
                console.error(error)
            res.status(401)
            throw new Error('Not authorized')
        }   
    }
    if(!token){
        res.status(401)
        console.log('Not authorized, no token')
        throw new Error('Not authorized, no token')
    }
})

export default protect;

