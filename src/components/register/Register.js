import "../register/register.css"
import React from 'react'
import { useForm } from "react-hook-form";
import apiInstance from "../../utils/api";
import { successMessage } from '../../utils/NotifyToastHelper';
import { useNavigate } from "react-router-dom";

const api = apiInstance();

function Register() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode : "onSubmit"});
    const navigate = useNavigate();

    const registerUser = async (name, email, password) => {
        const userRegiseriBody = {
            name,
            email,
            password
        }

        try{
            const addUser = await api.post(`/auth/register`, userRegiseriBody);
            localStorage.setItem("accessToken", addUser.token);
            localStorage.setItem("activePerson", addUser.name);
            localStorage.setItem("activePersonID", addUser.id);
            navigate("/");
        } catch(e) {}
    }

    const onSubmitRegister = (data) => {
        registerUser(data.name, data.email, data.password)
        successMessage("Registered!")
        reset()
    }
    
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmitRegister)}>
                <input 
                    placeholder="Name"
                    {
                        ...register("name", {
                            required : true,
                            minLength : {
                                value : 5,
                                message : "* Minimum 5 characters"
                            }
                        })
                    }
                />
                <div>{errors?.name && <p className='error'>{errors?.name?.message}</p>}</div>
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
                <div>{errors?.email && <p className='error'>{errors?.email?.message}</p>}</div>
                <input 
                    type="password"
                    placeholder="Password"
                    {
                        ...register("password", {
                            required : true,
                            pattern : {
                                value : /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                                message : `* Contain at least 8 characters, least 1 number, least 1 lowercase character (a-z), least 1 uppercase character (A-Z), only 0-9a-zA-Z`
                            },
                        })
                    }
                />
                <div>{errors?.password && <p className='error'>{errors?.password?.message}</p>}</div>
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register