import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const key_secret = process.env.secret_key

interface CustomRequest extends Request {
    user?: any; // Change 'any' to the actual type of your user object if available
  }

function authorization(req: CustomRequest,res: Response,next: NextFunction){
    const token = req.header('x-auth-token');
    if(!token) return res.status(502).json({msg:'no token access denied'});

    try{
        const decoded = jwt.verify(token, key_secret!);
        req.user = decoded;
        next();
    }
    catch(e){
        next(e);
    }
}

export default authorization;