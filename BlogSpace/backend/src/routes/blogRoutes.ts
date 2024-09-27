import  express  from "express";
import { PrismaClient } from '@prisma/client';
import { blogSchema } from "../validation/schema.js";
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

//Route to search the blog by title.
router.get("/search/:title", auth, async (req, res) =>{
    const { Title } = await req.params;

    if(!Title) {
        return res.status(400).json({
            message : "Error!!! name is required"
        });
    }

    try{
        const blogs = await prisma.post.findMany({
            where: {
                title: {
                    contains: Title as string, //partial search.
                    mode: 'insensitive'
                }
            },
            include : {author : true} //include the author details to promote the blogs.
        });

        if(blogs.length === 0) {
            return res.status(404).json({
                message : `There are no posts titled ${Title}`,
            });
        }

        return res.status(200).json({
            blogs
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Something went wrong while fetching the blogs.",
            error
        });
    }
});

//Route to create/initialize the new blog post.
router.post('/', auth, async(req, res) => {

    const body = await req.body;
    const isValid = blogSchema.safeParse(body);
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
                authorId : req.userId as string,
            }
        });

        return res.status(201).json({
            message : "The post created successfully",
            data : post
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
router.get("/:id", auth, async(req, res) => {

    const reqId = await req.params;
    try{
        const allPosts = await prisma.post.findMany({
            where : { 
                id : reqId,
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

//Route to update the content of the blog.
router.put("/update", auth, async(req, res) => {

    const body = req.body;
    const isValid = blogSchema.safeParse(body);
    if(!isValid.success) {
        return res.status(400).json({
            message : "Error!! Invalid inputs",
        });
    }

    try {
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

        return res.status(200).json({
            message : "Blog updated successfully.",
            updatedContent
        });

    } catch (error){
        console.error(error);
        res.status(500).json({
            message : "Something went wrong!!",
            error
        });
    }
});


export default router;
