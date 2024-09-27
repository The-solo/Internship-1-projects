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

//Route to create/initialize the new blog post.
router.post("/", auth, async(req, res) => {
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
                published : body.publised,
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
router.get("/user/:id", auth, async(req, res) => {

    const { id } = req.params;
    try{
        const allPosts = await prisma.post.findMany({
            where : { 
                authorId : id as string,
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


//Route to search the blog by title of it.
router.get("/search/:title", auth, async (req, res) =>{
    const { title } = req.params;

    if(!title || title.trim() === " "){
        return res.status(400).json({
            message : "Error!!! title is required"
        });
    }

    try{
        const blogs = await prisma.post.findMany({
            where: {
                published : true,
                title: {
                    contains: title as string, //partial search.
                    mode: 'insensitive',
                }
            },
        });

        const responseData = blogs.map(({ authorId, id, ...blog }) => blog);

        if(responseData.length === 0) {
            return res.status(404).json({
                message : `There are no posts titled ${title}`,
            });
        }

        return res.status(200).json({
            responseData
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Something went wrong while fetching the blogs.",
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

        const { authorId,...responseData } = updatedContent;

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


export default router;




