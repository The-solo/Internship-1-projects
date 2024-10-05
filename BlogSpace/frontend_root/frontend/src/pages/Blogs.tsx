import { BlogComponent } from "../components/blogComponent";
import { Appbar } from "../components/appbarComponent";
import { useBlogs } from "../hooks/blogHook";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {

    const navigate = useNavigate();
    const { loading, blogs } = useBlogs();

    if (loading || blogs.length === 0) {
        navigate("/publish");
    }

    return (
        <div>
            <Appbar/>
            <div className="flex justify-center items-center max-w-10xl">
                <div>
                    {blogs.map(blog => (
                        <BlogComponent
                            key={blog.id}
                            id={blog.id}
                            author={blog.author || "Anonymyous"} 
                            title={blog.title}  
                            content={blog.content}/>
                    ))}
                </div>
            </div>
        </div>
    );
};
