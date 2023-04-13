import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUserAPI } from "../../utils/api";
import { errorMessage } from '../../utils/NotifyToastHelper';

function Login() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode : "onSubmit"});
    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const loginUserBody = {
            email,
            password
        }

        try {
            const user = await loginUserAPI("/auth/login", loginUserBody)
            localStorage.setItem("accessToken", user.data.token);
            localStorage.setItem("activePerson", user.data.name);
            localStorage.setItem("activePersonID", user.data.id);    
            navigate("/"); 
        } catch(e) {
            if(e.response.status === 401){
                errorMessage("You are not accessed rad exeq!")
                localStorage.clear()
                navigate("/")
            } else if(e.response.status === 0) {
                errorMessage("Network error")
            } else if(e.response.status >= 500) {
                errorMessage("Server error")
            } else if(e.response.status === 406) {
                errorMessage("Wrong email or password!")
            } else {
                errorMessage("Xndir!! xndrum enq dimel dzer jeki petin!!!")
            }
        }
    }

    const onSubmitLogin = async(data) => {
        await loginUser(data.email, data.password); 
        reset();
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit(onSubmitLogin)}> 
                <input 
                    placeholder="Email"
                    {
                        ...register("email", {
                            required : true,
                            pattern : {
                                value : /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message : "* Email must be an email"
                            }
                        })
                    }
                />
                <div>
                    {errors?.email && <p className='error'>{errors?.email?.message}</p>}
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    {
                        ...register("password", {
                            required : true,
                            pattern : {
                                value : /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                                message : `
                                    * Contain at least 8 characters,
                                    least 1 number,
                                    least 1 lowercase character (a-z),
                                    least 1 uppercase character (A-Z),
                                    only 0-9a-zA-Z`
                            },
                        })
                    }
                />
                <div>
                    {errors?.password && <p className='error'>{errors?.password?.message}</p>}
                </div>
                <input type="submit" value="Sign in" />
            </form>
        </div>
    )   
}

export default Login