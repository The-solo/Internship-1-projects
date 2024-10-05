import { Link, useNavigate } from "react-router-dom"
import { LabeledInput } from "./labelComponent"; 
import { signupInput } from '../validation/schema';
import { useState } from 'react';
import axios from "axios";
import { BACKEND_URL} from '../config';

const signUpAuth = () => {
    //state varible that uses defined types for inputs.(frontend typecheking.)
    const navigate = useNavigate();
    const [postInputs, setPosstInputs] = useState<signupInput>({
        name : "",
        email : "",
        password : "",
    });

    async function sendRequest(){
        try{
            await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs); //sending the body
            navigate("/signin");
        } catch(error) {
            console.log("Error while signing up." + error);
        }
    }

    return (
        <div>
            <div className="grid bg-white bg-blend-screen justify-center mt-12">
                <div className="text-3xl font-black">
                    Create an account {/* mentioning the type here for both signUp and SignIn*/}
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex text-slate-700 text-md">
                        Already have an account.
                    </div>
                    <div>
                        <Link to="/signin" className="text-slate-700 hover:text-slate-500 text-md ml-2 underline underline-offset-1">
                        SignIn
                        </Link>
                    </div> 
                </div>
                <div>
                    <div className="grid  justify-center mt-8">
                                <LabeledInput label='username' placeholder='Enter the username' onChange={(e => {
                                    setPosstInputs({
                                        ...postInputs, //retaining existing username and password
                                        name : e.target.value //updating the name value here
                                    });
                            })}/>
                    </div> 
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
                    <button onClick={sendRequest} type="button" className="py-2.5 px-7 me-2 mb-2 text-lg text-white  rounded-full border hover:bg-slate-600 focus:z-10 dark:bg-black font-sans mx-4 mt-5 ">
                        Sign up
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}


export default signUpAuth;