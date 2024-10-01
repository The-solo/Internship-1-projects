import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import JWT from 'jsonwebtoken';
const JWT_SECRET : string | undefined = process.env.SUPER_SECRET_PASSWORD;

//making the userId global so we can access it outside the middleware function and inside other routes.
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

//User authentication middleware.
export default function auth(req : Request, res : Response, next: NextFunction) { 
    
    const header = req.headers.authorization;
    if(!header || !header.startsWith('Bearer')) {
        return res.status(406).json({
            msg : "Authorization token not found or have format mismatch."
        });
    }

    const token = header.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message : "Access denied!, no token provided."
        });
    }
    
    try {   
        const response  = JWT.verify(token, JWT_SECRET as string) as {id : string};
        if(response && response.id) {
        //storing the response id in req object here for the furthur authentication.
            req.userId = response.id;
            next();
            
        } else {
            return res.status(401).json({
                msg : "Invalid authorization token." 
            });
        }
       
    } catch (error) {
        console.error("You are not logged in.");
        res.status(403).json({
            Msg : "forbidden" + error
        });
    }
};

