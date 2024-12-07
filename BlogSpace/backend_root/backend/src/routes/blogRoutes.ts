import  express, { response }  from "express";
import { PrismaClient } from '@prisma/client';
import { createBlogInput, updateBlogInput} from "../validation/schemas.js";
import  auth from "../middlewares/auth.js";
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

//Initilizing the global prisma client.
const prisma = new PrismaClient({
    datasources : {
        db :{
            url : process.env.DATABASE_URL
        },
    },
});

//Blogs feed 
router.get("/feed", auth, async (req, res) => {
    try {
        const allBlogs = await prisma.post.findMany({
            where: {
                published: true,
            },
            select: {
                id : true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true || null,
                    },
                },
            },
        });

        res.status(200).json({
            allBlogs
        });
        
    } catch (error) {
        return res.status(500).json({
            msg: "Error! Internal server error.",
        });
    }
});

//Route to create/initialize the new blog post.
router.post("/create", auth, async(req, res) => {
    const body = req.body;
    const isValid = createBlogInput.safeParse(body);
    if(!isValid.success) {
        return res.status(400).json({
            message : "Invalid inputs"
        });
    }
    try {
        const post = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content, 
                published : body.published,
                authorId : req.userId as string,
            }
        });

        const {authorId, ...responseData} = post;

        return res.status(201).json({
            responseData
        });

    } catch(error) {
        return res.status(500).json({
            message : "Error!! Something went wrong.",
            error
        });
    }
});


//Route to get the specific post by authorID
router.get("/:id", auth, async(req, res) => {

    const reqId = req.params.id;
    try{
        const blog = await prisma.post.findUnique({
            where : {
                id : reqId,

            }, select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : { 
                        name : true || "Anonymous-User",
                    }
                }
            }
        });

        if (!blog) {
            return res.status(404).json({ 
                message: "Post not found" 
            });
        }
        
        return res.status(200).json({
            blog
        });

    } catch(error) {
        return res.status(500).json({
            message : "Problem fetching the posts.",
            error
        });
    }
});

//Route to update the content of the blog.
router.put("/update", auth, async(req, res) => {

    const body = req.body;
    
    try {
        const isValid = updateBlogInput.safeParse(body);
        if(!isValid.success) {
            return res.status(400).json({
                message : "Error!! Invalid inputs",
            });
        }

        const existingPost = await prisma.post.findUnique({ 
            where: {
                id: body.id,
                authorId: req.userId,
            },
        });
        
        if (!existingPost) {
            return res.status(404).json({
                    message: "Post not found."
            });
        }

        const updatedContent = await prisma.post.update({
            where : {
                id : body.id,
                authorId : req.userId
            },
            data : {
                title : body.title,
                content : body.content,
                published : body.published,            }
        });

        const { authorId, ...responseData } = updatedContent;

        return res.status(200).json({
            message : "Blog updated successfully.",
            responseData
        });

    } catch (error){
        console.error(error);
        return res.status(500).json({
            message : "Something went wrong!!",
            error
        });
    }
});


//Route to delete specific post.
router.delete("/delete/:id", auth, async(req, res) =>{
    
});


export default router;




