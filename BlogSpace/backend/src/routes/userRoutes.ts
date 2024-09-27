import  express, { response }  from "express";
import { PrismaClient } from '@prisma/client';
import * as argon2 from "argon2";
import { userSchema } from "../validation/schema.js";
import  auth from "../middlewares/auth.js";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET : string | undefined = process.env.SUPER_SECRET_PASSWORD;
const router = express.Router();


//Initilizing the global prisma client.
const prisma = new PrismaClient({
    datasources : {
        db :{
            url : process.env.POOLING_DB_URL,
        },
    },
});

//SignUp route
router.post('/signup', async(req, res) => {

    const body = await req.body;
    try {
        const valid = userSchema.safeParse(body);

        if(!valid.success) {
            return res.status(400).json({
                Error : "Error! Invalid Input."
            });
        };
        const ifExist = await prisma.user.findUnique({
            where : {
                email : body.email,
            },
        });
    
        if(ifExist) {
            return res.status(400).json({
                Error : "The email already in use."
            });
        };
        //Hashing the password.
        const hashedPassword = await argon2.hash(body.password);
        const newUser = await prisma.user.create({
            data :{
                email : body.email,
                password : hashedPassword,
                name : body.name
            }
        });

        const token = JWT.sign({id : newUser.id}, JWT_SECRET as string);
        return res.status(201).json({
            Msg : "User created successfully.",
            token
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Something went wrong.",
            error
        });
    }
});

//SignIn route.
router.post('/signin', async(req, res) => {

    const body = await req.body;
    try{
        const isValid = userSchema.safeParse(body);
        if(!isValid.success) {
            return res.status(400).json({
                error : "Invalid inputs!"
            });
        };

        const hashedPassword = await argon2.hash(body.password);
        const user = await prisma.user.findUnique({
            where : {
                email : body.email,
                password : hashedPassword, 
            },
        });

        if(!user) {
            return res.status(401).json({
                error : "User not found!"
            });
        };

        const token = JWT.sign({id : user.id}, JWT_SECRET as string);
        console.log("Welcome to Blogspace.");
        return res.status(202).json({
            token
        });

    } catch(error) {
        console.error(error);
        res.status(401).json({
            message : error 
        });
    }
});

//Route to updated the userInfo.
router.put('/update/info', auth, async(req, res) => {

    const userId = req.userId;
    const newInfo = req.body;
    const isValid = userSchema.safeParse(newInfo);
    if(!isValid.success) {
        return res.status(400).json({
            message : "Error! Invalid input format."
        });
    }
    try {
        const hashedPassword = await argon2.hash(newInfo.password);
        const updatedInfo  = await prisma.user.update({

            where : {id : userId},
            data : {
                email : newInfo.email,
                password : hashedPassword,
                name : newInfo.name
            },
        });

        const { password, ...responseData } = updatedInfo;
        //excluding the password field for security purposes.
        return res.status(200).json({
            message : "User info updated successfully.",
            responseData //returning updated info without password.
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Error while updating the userInfo",
            error
        });
    }
});


export default router;
