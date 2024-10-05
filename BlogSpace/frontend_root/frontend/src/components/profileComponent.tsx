import { Link } from "react-router-dom";

export function ProfileComponent({ name, email }: { name: string; email: string }) {

    return (<div>
                <div className="flex flex-col pt-32 px-24 bg-slate-100 h-screen items-center">
                    <div className="flex flex-col max-w-md p-12 bg-violet-200 dark:text-gray-800 items-center ">
                        <div className="flex-shrink-0 w-full h-40 sm:h-32 sm:w-32 sm:mb-0 justify-center">
                            <Avatar name={name} />
                        </div>
                        <div className="flex flex-col">
                            <div className="justify-center">
                                <div className="flex justify-center text-md dark:text-gray-700 mt-2">Author</div>
                                <h2 className="text-2xl font-semibold flex justify-center">{name}</h2>
                                <div className="dark:text-black text-xl py-5">{email}</div>
                            </div>
                        </div>
                    </div>
                    <Link to="/blogs" className="flex mx-5 justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" 
                            viewBox="0 0 24 24"
                            strokeWidth={1.5} 
                            type="button"
                            stroke="currentColor" 
                            className="size-6 bg-black mt-6 text-white rounded-full w-20 h-10 ">
                            <path strokeLinecap="round" 
                                strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                </div>
            </div>   
    );
}

function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full dark:bg-zinc-700">
            <span className="font-extrabold text-gray-600 dark:text-gray-300 text-6xl">
                {name[0]}
            </span>
        </div>
    );
}
