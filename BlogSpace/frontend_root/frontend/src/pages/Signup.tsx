
import signUpAuth from "../components/signUpComponent";

export const Signup = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-100">
            <div className="bg-white shadow-lg rounded-lg p-20 grid grid-cols-1 gap mx-auto">
                <div className="flex">
                    {signUpAuth()} 
                </div>
            </div>
        </div>
    )
}
