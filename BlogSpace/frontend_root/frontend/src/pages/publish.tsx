import { Appbar } from "../components/appbarComponent"
import { Link } from "react-router-dom";

export const Publish =() => {
    return(
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center">
                <div className="">
                    <label htmlFor="title" className="block mb-2 text-2xl font-medium text-gray-500">Title</label>
                    <input type="text" id="default-input" className="bg-gray-100 border border-gray-200  text-xl rounded-full
                    focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"/>
                </div>
            </div>
            <div className="flex justify-center">
                <TextForm/>
            </div>
            <div className="flex justify-center mt-10">
                <Link to="/profile">
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300
                                 font-medium rounded-full text-lg px-10 py-3 text-center me-2 mb-2 ml-3 mt-1">
                        Publish</button>
                </Link>
            </div>
        </div>
    )
}

function TextForm() {
    return (
        <form action="" className="w-full max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
            <label htmlFor="message" className="block mb-2 text-2xl font-medium text-gray-500">
                Article
            </label>
            <textarea
                id="message"
                rows={12}
                className="block p-2.5 w-full text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-200"
                placeholder="Write your thoughts here..."
            />
        </form>
    );
}


