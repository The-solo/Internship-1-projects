import { Blog, useSingleBlog} from "../hooks/blogHook"
import { useParams } from "react-router-dom";
import { SingleBlog } from "../components/singleBlogComponent";

export const BlogPage = () => {
    const { id } = useParams();
    const { loading, blog }  = useSingleBlog({
        id : id || ""
    });

    if(loading) {
        return <div>Loading.....</div>;
    }

    return <div>
        <SingleBlog oneBlog={blog as Blog}/>
     </div>
}
