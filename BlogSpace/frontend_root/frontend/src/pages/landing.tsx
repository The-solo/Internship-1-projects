
import { Link } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Landing = () =>{

    const navigate = useNavigate();
    const handlePublishClick = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            navigate("/signin");
            return;
        }
    
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/verifyToken`, {
                 token
             });
            if (response.status === 200) {
                navigate("/blogs"); 

            } else {
                alert("Access denied! Please log in.");
                navigate("/signin");
            }

        } catch (error) {
            console.error("Error verifying token:", error);
            navigate("/signin");
        }
    };

    return (
        <div className="bg-purple-100 h-screen">
            <div className="flex text-6xl py-8 ml-36 font-black">Blogspace</div>
            <div className="flex flex-row absolute top-0 right-0 mr-36 pt-8 pl-6">
                <button 
                    className="hover:text-slate-500 font-sans text-lg mt-6 mr-4 underline underline-offset-1 mb-1"
                    onClick={handlePublishClick}
                    >Explore 
                </button>
                <div className="flex mt-3">
                    <Link to={"/signin"}className="hover:text-slate-500 text-lg mt-3 ml-1 underline underline-offset-1">Sign In</Link>
                </div>
                <Link to="/signup"className="py-2.5 px-5 text-white text-sm rounded-full border hover:bg-slate-600 focus:z-10 dark:bg-black font-sans mx-4 mt-4">
                    Get Started
                </Link>
            </div>
            <div className="border-t border-black"></div>
            <div className="flex flex-col pt-36">
                <div className="flex flex-col pl-36">
                    <div className="text-5xl font-extrabold font-sans">Creativity knows no bounds.</div>
                    <div className="text-2xl italic font-medium mt-2 pt-5">Embrace the freedom to share your ideas, connect with others, and let your voice inspire.</div>
                    <div className="text-2xl italic font-medium mt-2">Your blog is your canvas - create without limits.</div>
                 </div>
                <div className="flex pl-32 pt-5">   
                    <Link to="/signup"className="py-2.5 px-5 me-2 mb-2 text-lg text-white  rounded-full border hover:bg-slate-600 focus:z-10 dark:bg-black font-sans mx-4 mt-5 "
                    >Start Blogging</Link>
                </div>
            </div> 
            <div className="flex flex-row mr-36 mt-24 text-pretty justify-end ">
                <button className="hover:text-slate-500 text-slate-800 font-sans text-md mt-5 mr-4">Help</button>
                <button className="hover:text-slate-500 text-slate-800 font-sans text-md mt-5 mr-4">About</button>
                <button className="hover:text-slate-500 text-slate-800 font-sans text-md mt-5 mr-4">Press</button>
                <button className="hover:text-slate-500 text-slate-800 font-sans text-md mt-5 mr-4">Blog</button>
                <button className="hover:text-slate-500 text-slate-800 font-sans text-md mt-5 mr-4">Privacy</button>
                <button className="hover:text-slate-500 text-slate-800 font-sans text-md mt-5 mr-4">Terms</button>
                <button className="hover:text-slate-500 text-slate-800 font-sans text-md mt-5 mr-4">Report</button>
            </div>        
         </div>
    )
}
