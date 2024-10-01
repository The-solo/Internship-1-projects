import { useBlog } from "../hooks/blogHook"
import { useParams } from "react-router-dom";
import { singleBlog } from "../components/singleBlogComponent";

export const Blog = () => {

    const { id} = useParams();
    const { loading, blog } = useBlog({
        id : id || ""
    });

    if(loading) {
        return <div>Loading.....</div>;
    }

    return <div>
        The Single blog component is rendering here.
     </div>
}
