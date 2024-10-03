import { BlogComponent } from "../components/blogComponent";
import { Appbar } from "../components/appbarComponent";
import { useBlogs } from "../hooks/blogHook";

export const Blogs = () => {

    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>Loading.....</div>;
    }

    if(blogs.length === 0) {
        return <div>
            No Published Blogs available.
        </div>
    }

    return (
        <div>
            <Appbar/>
            <div className="flex justify-center items-center max-w-10xl">
                <div>
                    {blogs.map(blog => (
                        <BlogComponent
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
