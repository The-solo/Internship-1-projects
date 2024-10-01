
interface BlogCardProps {
    authorName : string,
    title : string,
    content : string,
    publishedDate : string,
}

export const BlogComponent = ({
    authorName,
    title,
    content,
    publishedDate,
}: BlogCardProps) => {
    return(
        <div className="mt-10 flex justify-center flex-col border-b">
            <div className="text-sm font-xs flex flex-col-2 text-black mb-3">
                <Avatar name={authorName}/> {authorName}
                    <div className="font-slate-100 ml-2 font-thin text-sm">
                        {publishedDate}
                    </div>
                </div>
                <div >
                <div className="text-xl font-bold">
                    {title}
                </div>
                <div className="text-md font-light text-slate-700 mb-5">
                    {content.slice(0,100)}
                </div>
                <div className="text-slate-400 text-xs">
                    {`${Math.floor(Math.random() * (6 - 1 + 1)) + 1} minutes read`}
                </div>
            </div>
        </div>
    )
}

function Avatar({name} :{name : string}) {
    return <div className="mr-1">
        <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
                {name[0]}
            </span>
        </div>
    </div>
}
