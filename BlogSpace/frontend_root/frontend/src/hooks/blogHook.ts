import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Author {
    name: string;
}

export interface Blog {
    id : string,
    title: string;
    content: string;
    author: Author;
}


interface BlogResponse {
    allBlogs: Blog[]; //type here is Array of Blogs which isn't required in the useSingleBlog hook.
}



//for singel blog route with id : 
export const useSingleBlog = ({id} : {id : string}) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlogs] = useState<Blog | null>(null); //The type of blog is either a single blog or null.

    const fetchBlogs = async() => {
        try {
                    //Making sure the type of the response here is just Blog and not Blog[] 
             const response = await axios.get<{blog : Blog}>(`${BACKEND_URL}/api/v1/blogs/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` 
                    
                 } 
            });
            setBlogs(response.data.blog);
            setLoading(false);
            
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }  
    };

    useEffect(() => {
        fetchBlogs();
    }, [id]);
    
    return { loading, blog}; 
  
}


//To get the preview of all the blogposts availabel
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async() => {
        try {
             const response = await axios.get<BlogResponse>(`${BACKEND_URL}/api/v1/blogs/feed`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` 
                    
                 } 
            });
            setBlogs(response.data.allBlogs || []);
            setLoading(false)
            
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }  
    };

    useEffect(() => {
        fetchBlogs();
        const intervalId = setInterval(fetchBlogs, 600000); // Fetch every 10 minutes should be something like 1 min.
        return () => clearInterval(intervalId);
    }, []);
    
    return { loading, blogs}; 
}
