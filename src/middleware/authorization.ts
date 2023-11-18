import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const key_secret = process.env.secret_key

function authorization(req: Request,res: Response,next: NextFunction){
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