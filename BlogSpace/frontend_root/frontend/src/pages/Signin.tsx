import { signInAuth } from './../components/signInComponent';
import blogging from "./../assets/blogging.jpg";

export const Signin = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-100">
            <div className="bg-white shadow-lg rounded-lg p-10 grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="flex justify-center">
                    {signInAuth()}
                </div>
                <div className="items-center justify-center">
                    <img src={blogging} alt="Typewriter" className="rounded-lg shadow-sm"/>
                </div>
            </div>
        </div>
    )
}
