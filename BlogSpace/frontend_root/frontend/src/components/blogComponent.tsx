import { Link } from "react-router-dom"

interface BlogCardProps {
    id : string,
    author : {
        name : string
    },
    title : string,
    content : string,
}

export const BlogComponent = ({
    id,
    author,
    title,
    content,
   
}: BlogCardProps) => {
    return(
        <Link to={`/blogs/${id}`}>
         <div className="mt-4 flex justify-center flex-col border-b max-w-200 cursor-pointer">
            <div className="text-sm font-xs flex flex-col-2 text-black mb-3">
                <AvatarSmall name={author.name}/> {author.name}
            </div>
            <div>
                <div className="text-xl font-bold">
                    {title}
                </div>
                <div className="text-md font-light text-slate-700 mb-5">
                    {content.slice(0,100)}
                </div>
                <div className="text-slate-400 text-xs">
                    {`${Math.floor(Math.random() * (7 - 1 + 1)) + 1} minutes read`}
                </div>
            </div>
        </div>
        </Link>
    )      
}

export function AvatarSmall({ name }: {name : string}) {
    return (
        <div className="mr-1">
            <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                    {name[0]}
                </span>
            </div>
        </div>
    );
}