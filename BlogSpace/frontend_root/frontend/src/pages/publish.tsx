import { Appbar } from "../components/appbarComponent";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

// Publish Component
export const Publish = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(true); // Initial state true.

    async function CreatePost() {
        if (!title || !content) {
            alert("Title and content can't be empty.");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blogs/create`, {
                title,
                content,
                published,
            },
            { headers: { 
                Authorization: `Bearer ${localStorage.getItem("token")}`
                } 
            });

            const ID = response.data.responseData.id;
            navigate(`/blogs/${ID}`);
            setLoading(false);

        } catch (error) {
            console.log("Error while creating the post.", error);
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <Appbar />
            <div className="flex justify-center mt-8">
                <div className="w-full max-w-2xl px-4">
                    {/*Title Input*/}
                    <div className="pb-4">
                        <label
                            htmlFor="title"
                            className="block mb-2 text-xl font-medium text-gray-500"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="bg-gray-100 border border-gray-400 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-400 block w-full p-2.5"
                            placeholder="Title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
    
                    <div className="pb-4">
                        <TextForm onChange={(e) => setContent(e.target.value)} />
                    </div>
    
                    <div className="flex items-center justify-between mt-4">
                        
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={published}
                                onChange={(e) => setPublished(e.target.checked)}
                                className="form-checkbox h-6 w-6 text-green-600"
                            />
                            <span className="ml-2 text-xl font-black text-gray-500">
                                Publish Post
                            </span>
                        </label>
    
                        <button
                            type="submit"
                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-100 font-medium rounded-full text-lg px-10 py-2"
                            onClick={CreatePost}
                        >
                            {loading ? "Save" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
    
            {/* Divider */}
            <div className="mt-8">
                <hr className="my-4 h-px border-0 bg-slate-400 mx-auto w-11/12" />
            </div>
        </div>
    );
}    

// TextForm Component
function TextForm({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <form className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20"> 
            <label
                htmlFor="content"
                className="block mb-2 text-2xl font-medium text-gray-500"
            >
                Article
            </label>

            <textarea
                id="content"
                name="content"
                rows={12}
                className="block p-2.5 w-full text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-400"
                placeholder="Write your thoughts here..."
                onChange={onChange}
            />
        </form>
    );
}

