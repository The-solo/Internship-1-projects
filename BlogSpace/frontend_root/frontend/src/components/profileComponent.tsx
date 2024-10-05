import { Link } from "react-router-dom"

export function ProfileComponent({name, email} : {name : string, email : string}) {
   return(
        <div className="flex px-20 py-24 h-screen  justify-center flex-col bg-gray-100">
            <div className="flex flex-col max-w-md p-12 sm:flex bg-violet-200 dark:text-gray-800 items-center">
                <div className="flex-shrink-0 w-full h-44 sm:h-32 sm:w-32 sm:mb-0 flex justify-center">
                    <Avatar name={`${name}`}/>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="items-center">
                        <div className="flex justify-center text-sm dark:text-gray-600 ml">Author</div>
                        <h2 className="text-2xl font-semibold flex justify-center">{name}</h2>
                        <div className="dark:text-black text-xl py-5 ">{email}</div>
                    </div>
                </div> 
            </div> 
            <div className="mt-10">   
                <Link to="/blogs"
                    className="py-2.5 px-5 me-2 mb-2 text-lg text-white  rounded-full border hover:bg-slate-700 focus:z bg-black  font-sans mx-16 mt-4 underline underline-offset-2 border-cyan-900"
                    >
                    Go back
                </Link>
            </div> 
        </div> 
    )  
} 


function Avatar({name} :{name : string}) {
    return <div className="">
        <div className="relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-zinc-700">
            <span className="font-extrabold text-gray-600 dark:text-gray-300 text-6xl">
                {name[0]}
            </span>
        </div>
    </div>
}