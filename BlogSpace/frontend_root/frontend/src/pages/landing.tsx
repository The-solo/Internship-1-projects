
import { Link } from "react-router-dom"
export const Landing = () =>{
    return (
        <div className="bg-purple-100 h-screen">
            <div className="flex text-6xl py-10 ml-36 font-black pt-13">Blogspace</div>
            <div className="flex flex-row absolute top-0 right-0 mr-36 pt-8">
                <button className="hover:text-slate-500 font-sans text-lg mt-3 mr-4">Membership</button>
                <button className="hover:text-slate-500 font-sans text-lg mt-3 mr-4">Write</button>
                <div className="flex mt-3">
                    <Link to={"/signin"}className="hover:text-slate-500 text-lg mt-3 ml-2 underline underline-offset-1">Sign In</Link>
                </div>
                <Link to="/signup"className="py-2.5 px-5 me-2 mb-2 text-white text-sm rounded-full border hover:bg-slate-600 focus:z-10 dark:bg-black font-sans mx-4 mt-4">Get Started</Link>
            </div>
            <div className="flex flex-col pt-36">
                <div className="flex flex-col pl-36">
                    <div className="text-5xl font-extrabold font-sans">Creativity knows no bounds.</div>
                    <div className="text-2xl italic font-medium mt-2 pt-5">Embrace the freedom to share your ideas, connect with others, and let your voice inspire.</div>
                    <div className="text-2xl italic font-medium mt-2">Your blog is your canvas - create without limits.</div>
                 </div>
                <div className="flex pl-36 pt-5">   
                    <Link to="/signup"className="py-2.5 px-5 me-2 mb-2 text-lg text-white  rounded-full border hover:bg-slate-600 focus:z-10 dark:bg-black font-sans mx-4 mt-5 "
                    >Start Blogging</Link>
                </div>
            </div> 
            <div className="flex flex-row mr-36 mt-24 text-pretty justify-end ">
                <button className="hover:text-slate-400 text-slate-700 font-sans text-md mt-5 mr-4">Help</button>
                <button className="hover:text-slate-400 text-slate-700 font-sans text-md mt-5 mr-4">About</button>
                <button className="hover:text-slate-400 text-slate-700 font-sans text-md mt-5 mr-4">Press</button>
                <button className="hover:text-slate-400 text-slate-700 font-sans text-md mt-5 mr-4">Blog</button>
                <button className="hover:text-slate-400 text-slate-700 font-sans text-md mt-5 mr-4">Privacy</button>
                <button className="hover:text-slate-400 text-slate-700 font-sans text-md mt-5 mr-4">Terms</button>
                <button className="hover:text-slate-400 text-slate-700 font-sans text-md mt-5 mr-4">Report</button>
            </div>        
         </div>
    )
}