
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Appbar  = () => {
    
    const navigate = useNavigate();
    const name = localStorage.getItem("username"); 

    function Logout (){
        try{
            localStorage.clear();
            navigate("/signin")
    
        } catch (error) {
            console.error("logout failed");
            throw error;
        }
           
    }

    return <div className="border-b flex justify-between px-20 py-4 bg-emerald-50 items-center">
                <Link to="/blogs">
                    <div className="font-black text-3xl">
                        Blogspace
                    </div>
                </Link>
            <div className="flex flex-row items-end px-5">
                <div className="flex px-2 py-2 mr-2">
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-8 mt-1 mr-2">
                            <path strokeLinecap="round" 
                                strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                    </Link>
                    <Link to="/publish">
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300
                                 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ml-3">
                        New</button>
                    </Link>
                </div>
                <Link to="/profile"className="mb-4 text-xl">
                    <Avatar name = {`${name}`}/>
                </Link>
                <button className="flex ">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 ml-5 mb-5"                            
                        onClick={Logout}>
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                </button>
            </div>
        </div>
}   



function Avatar({name} :{name : string}) {
    const DefaultName : string = "Anonymous";
    return <div className="mr-1">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-zinc-800 rounded-full">
            <span className="font-semibold text-white">
                {name[0] || DefaultName[0]}
            </span>
        </div>
    </div>
}