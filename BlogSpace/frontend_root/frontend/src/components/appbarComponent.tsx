
import { Link } from "react-router-dom"

export const Appbar  = () => {

    const name = localStorage.getItem("username"); 

    return <div className="border-b flex justify-between px-20 my-4">
            <Link to="/">
                <div className="font-black text-3xl">
                    Blogspace
                </div>
            </Link>
            <div className="flex flex-row justify-end items-center">
                <div className="flex mx-5 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" strokeWidth={1.5} stroke="currentColor" className="size-8 mt-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>
                    <Link to="/publish">
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300
                                 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ml-3 mt-1">
                        New</button>
                    </Link>
                </div>
                <div className="mb-4 text-xl">
                    <Avatar name = {`${name}`}/>
                </div>
            </div>
        </div>
}   

function Avatar({name} :{name : string}) {
    return <div className="mr-1">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-semibold text-gray-600 dark:text-gray-300">
                {name[0]}
            </span>
        </div>
    </div>
}