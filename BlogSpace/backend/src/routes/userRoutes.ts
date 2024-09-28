import  express, { response }  from "express";
import { PrismaClient } from '@prisma/client';
import * as argon2 from "argon2";
import { signinInput, signupInput, updateUser } from "../validation/schemas.js";
import  auth from "../middlewares/auth.js";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET : string | undefined = process.env.SUPER_SECRET_PASSWORD;
const pepper : string | undefined = process.env.SECRET_PEPPER;
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

    const body = req.body;
    try {
        const valid = signupInput.safeParse(body);

        if(!valid.success) {
            return res.status(400).json({
                Error : "Error! Invalid Input.",
                details: valid.error.format(), 
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
        //Hashing the password with added pepper = extra security.
        const hashedPassword = await argon2.hash(body.password + pepper);
        const newUser = await prisma.user.create({
            data :{
                email : body.email,
                password : hashedPassword,
                name : body.name
            }
        });

        return res.status(201).json({
            Msg : "User created successfully.",
            email : newUser.email,
            name : newUser.name
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

    const body = req.body;
    try{
        const isValid = signinInput.safeParse(body);
        if(!isValid.success) {
            return res.status(400).json({
                error : "Invalid inputs!",
            });
        };

        const User = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!User) {
            return res.status(401).json({
                error: "User not found!"
            });
        }
        const isPasswordValid = await argon2.verify(User.password, body.password + pepper);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid password!"
            });
        }

        const token = JWT.sign({id : User.id}, JWT_SECRET as string);
        console.log("Welcome to Blogspace.");
        return res.status(202).json({
            message : "Welcome to Blogspace",
            Token : `${token}`
        });

    } catch(error) {
        console.error(error);
        res.status(401).json({
            message : error 
        });
    }
});

//Route to updated the userInfo.
router.put('/user/update', auth, async(req, res) => {

    const userId = req.userId;
    const newInfo = req.body;
    const isValid = updateUser.safeParse(newInfo);
    if(!isValid.success) {
        return res.status(400).json({
            message : "Error! Invalid input format."
        });
    }
    try {

        let hashedPassword;
        if (newInfo.password) {
            hashedPassword = await argon2.hash(newInfo.password + pepper);
        }

        const updatedInfo  = await prisma.user.update({
            where : {id : userId},
            data : {
                email : newInfo.email? newInfo.email : undefined,
                password : hashedPassword?  hashedPassword : undefined,
                name : newInfo.name? newInfo.name : undefined
            },
        });
        //excluding the password field for security purposes.
        const { password, ...responseData } = updatedInfo;
        
        return res.status(200).json({
            message : "User info updated successfully.",
            responseData
        });

    } catch(error : any) {
        console.error(error);
        if(error.code === 'P2002') {  
            return res.status(409).json({
                message: "Email already in use."
            });
        }
        res.status(500).json({
            message : "Error while updating the userInfo",
            error
        });
    }
});


export default router;
