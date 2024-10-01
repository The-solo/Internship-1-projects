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
            url : process.env.POOLING_DB_URL,
        },
    },
});

//Blogs feed 
router.get("/feed", async(req, res) =>{
    try{
        const allBlogs = await prisma.post.findMany({
            where : {
                published : true,
            }, 
            select : {
                title : true,
                content : true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
        });

        if(!allBlogs){
            return res.status(401).json({
                msg : "Error while loading the blogs. "
            });
        }
        
        res.status(200).json({
            allBlogs,
        });

    } catch(error) {
        console.error(error);
        res.status(401).json({
            msg : "Error!! Internal server error."
        });
    }
});

//Route to create/initialize the new blog post.
router.post("/create-post", auth, async(req, res) => {
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
            message : "The post created successfully",
            responseData
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Error!! Something went wrong.",
            error
        });
    }
});


//Route retrive all posts published by logged in user.
router.get("/posts", auth, async(req, res) => {

    const authorID = req.userId;
    try{
        const allPosts = await prisma.post.findMany({
            where : { 
                authorId : authorID,
            }
        });

        if(allPosts.length === 0) { 
            return res.status(400).json({
                message : "You haven't published any blogs yet."
            });
        }
        
        return res.status(200).json({
            posts : allPosts
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Problem fetching the posts.",
            error
        });
    }
});


//Route to search the blog post by ID
router.get("/search/:id", auth, async (req, res) =>{
    const body = req.params;

    if(!body.id) {
        return res.status(401).json({
            msg : "Id not provided."
        });
    }

    try{
        const blogs = await prisma.post.findMany({
            where: {
                id : body.id,
            },
            select : {
                title : true,
                content : true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
        });

        if(blogs.length === 0) {
            return res.status(404).json({
                message : `There are no posts.`,
            });
        }

        return res.status(200).json({
            blogs
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Error!! Something went wrong.",
            error
        });
    }
});


//Route to update the content of the blog.
router.put("/update", auth, async(req, res) => {

    const body = req.body;
    const isValid = updateBlogInput.safeParse(body);
    if(!isValid.success) {
        return res.status(400).json({
            message : "Error!! Invalid inputs",
        });
    }
    try {
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
        res.status(500).json({
            message : "Something went wrong!!",
            error
        });
    }
});


//Route to delete specific post.
router.delete("/delete/:id", auth, async(req, res) =>{
    
});


export default router;




