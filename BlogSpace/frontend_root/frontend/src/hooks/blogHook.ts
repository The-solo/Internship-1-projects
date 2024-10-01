import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Author {
    name: string;
}

interface Blog {
    id : string,
    title: string;
    content: string;
    author: Author;
}

interface BlogResponse {
    allBlogs: Blog[]; 
}

//for singel blog route with id : 
export const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog[]>([]);
    // Function to fetch blogs
    const fetchBlogs = async() => {
        try {
            const response = await axios.get<BlogResponse>(`${BACKEND_URL}/api/v1/blogs/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`

                 }  // Authorization header
            });
            
            // Access blog here
            setBlog(response.data.allBlogs || []);
            setLoading(false)
            
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } 
        
    };

    useEffect(() => {
        fetchBlogs();
        const intervalId = setInterval(fetchBlogs); 
        return () => clearInterval(intervalId);
    }, [id]);

    return { loading, blog }; 
}



//To get the preview of all the blogposts availabel
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    // Function to fetch blogs
    const fetchBlogs = async() => {
        try {
             const response = await axios.get<BlogResponse>(`${BACKEND_URL}/api/v1/blogs/feed`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` 
                    
                 }  // Authorization header
            });
            // Access allBlogs instead of blog
            setBlogs(response.data.allBlogs || []);
            setLoading(false)
            
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }  
    };

    useEffect(() => {
        fetchBlogs();
        const intervalId = setInterval(fetchBlogs, 600000); // Fetch every 10 minutes
        return () => clearInterval(intervalId);
    }, []);
    
    return { loading, blogs}; 
}
