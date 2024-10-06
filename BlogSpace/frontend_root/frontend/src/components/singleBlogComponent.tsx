import { Appbar } from "./appbarComponent";
import { Blog } from "../hooks/blogHook";
import { AvatarSmall } from "./blogComponent";

export const SingleBlog = ({ oneBlog }: { oneBlog: Blog }) => {

    const DefaultName : string = "Anonymous";
    if (!oneBlog) {
        return <div>No Blog found.</div>;
    }

    return (
        <div className="">
            <Appbar />
            <div className="relative grid grid-cols-12 w-full py-28 px-32">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">{oneBlog.title}</div>
                    <div className="text-lg font-light pt-10">{oneBlog.content}</div>
                </div>

                {/* Author Section */}
                <div className="absolute top-0 right-0 flex items-center pr-56 pt-28">
                    <div className="text-slate-600 text-md font-serif">Author:</div>
                    <div className="pl-2">
                        <AvatarSmall name={oneBlog.author.name || DefaultName} />
                    </div>
                    <div className="text-2xl font-bold pl-2">{oneBlog.author.name || DefaultName}</div>
                </div>
            </div>
        </div>
    );
};
