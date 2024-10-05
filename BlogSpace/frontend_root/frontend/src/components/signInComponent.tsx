import { Link,  useNavigate } from "react-router-dom"
import { LabeledInput } from "./labelComponent"; 
import { signinInput } from '../validation/schema';
import { useState } from 'react';
import axios from "axios";
import { BACKEND_URL} from '../config';


export const signInAuth = () => {

    //state varible that uses defined types for inputs.(frontend typecheking.)
    const navigate = useNavigate();
    const [postInputs, setPosstInputs] = useState<signinInput>({
        email : "",
        password : "",
    });

    //sending the backend request.
    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs); //passing the body.
            const jwt =  response.data.token;
            localStorage.setItem("token", jwt);
            localStorage.setItem("username", response.data.username);
            navigate("/Blogs");
        } catch(error) {
            console.log("Error while signing in."+ error);
        }
    }
    
    return (
        <div>
             <Link to="/"
                    className="">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                    </svg>
                </Link>
            <div className="grid bg-white bg-blend-screen justify-center mt-24">
               
                <div className="text-3xl font-black mt-5">
                Let's dive into blogging!{/* mentioning the type here for both signUp and SignIn*/}
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex text-slate-700 text-md ml-6">
                        Don't have an account
                    </div>
                    <div>
                        <Link to="/signup" className="text-slate-700 hover:text-slate-500 text-md underline underline-offset-1 ml-3">
                        sign up
                        </Link>
                    </div> 
                </div>
                <div>
                    <div className="grid  justify-center mt-8">
                                <LabeledInput label='email' placeholder='example@email.com' onChange={(e => {
                                    setPosstInputs({
                                        ...postInputs, 
                                        email : e.target.value
                                    });
                            })}/>
                    </div> 
                    <div className="grid  justify-center mt-8">
                                <LabeledInput type="password" label='password' placeholder='password' onChange={(e => {
                                    setPosstInputs({
                                        ...postInputs,
                                        password : e.target.value 
                                    });
                            })}/>
                    </div> 
                </div>
                <div>
                <div className="flex mt-4 justify-center">
                    <button onClick={sendRequest}type="button" className="py-2.5 px-7 me-2 mb-2 text-lg text-white  rounded-full border hover:bg-slate-600 focus:z-10 dark:bg-black font-sans mt-5 ">
                        Sign in
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

