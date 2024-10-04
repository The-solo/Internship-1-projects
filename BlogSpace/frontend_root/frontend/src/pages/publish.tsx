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
    const [loading, setLoading] = useState(false); // Initial state set to false.

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
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

            const ID = response.data.responseData.id;
            navigate(`/blogs/${ID}`);

        } catch (error) {
            console.log("Error while creating the post.", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-50">
            <Appbar />
            <div className="flex justify-center">
                <div>
                    <label
                        htmlFor="title"  // Ensure this matches the input's id
                        className="block mb-2 text-2xl font-medium text-gray-500"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"       // Changed id to "title" for consistency
                        name="title"     // Added name attribute
                        className="bg-gray-100 border border-gray-400 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-96"
                        placeholder="Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <TextForm onChange={(e) => setContent(e.target.value)} />   
            </div>

            <div className="flex justify-center mt-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)} // Toggle for the publishing
                        className="form-checkbox size-4"
                    />
                    <span className="ml-2 text-xl font-black text-gray-500 mt-1">
                        Publish Post
                    </span>
                </label>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-100 font-medium rounded-full text-lg px-10 py-2"
                    onClick={CreatePost}
                    disabled={loading} //loading should be disabled after the post has been created.
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
            <div className="mt-4">
                <hr className="my-4 h-px border-0 bg-slate-400 mx-20" />
            </div>
        </div>
    );
}

// TextForm Component
function TextForm({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <form className="w-full max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
            <label
                htmlFor="content"   // Updated for attribute to match the textarea's id
                className="block mb-2 text-2xl font-medium text-gray-500"
            >
                Article
            </label>

            <textarea
                id="content"        // Changed id to "content" for clarity
                name="content"      // Added name attribute for the textarea
                rows={12}
                className="block p-2.5 w-full text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-400"
                placeholder="Write your thoughts here..."
                onChange={onChange}
            />
        </form>
    );
}
