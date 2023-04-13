import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { successMessage } from "../../utils/NotifyToastHelper";
import createNewPost from "../../utils/actions/CreatePostAction";
import { errorMessage } from "../../utils/NotifyToastHelper";
import { useForm } from "react-hook-form";
import "./home.css";

function Home() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode : "onSubmit"});
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

   

    useEffect(() => {
        async function getUser() {
            try {
                setUserName(localStorage.getItem("activePerson"))
                dispatch({
                    type: "change-sign-out-true"
                })
                dispatch({
                    type : "add-user",
                    payload : {
                        name : userName
                    }
                });
                  
            } catch(e) {
                if(e.response.status === 401){
                    errorMessage("You are not accessed rad exeq!")
                    localStorage.clear()
                    navigate("/login")
                }
            }       
        }

        getUser()
    }, [])

    const onSubmitPostData = (data) => {
        createNewPost(data.name, data.description)
        successMessage("Posted!")
        reset()
    }

    return (        
        <div>
            <h2 className="online">Online</h2>
            <h1>{userName}</h1>

            <div className="create-post">
                <h1>Create new post</h1>
                <form onSubmit={handleSubmit(onSubmitPostData)}>
                    <input 
                    placeholder="Name"
                    {
                        ...register("name", {
                            required : {
                                value : true,
                                message : "Post title should not be empty"
                            } 
                        })
                    }
                />
                <div>
                    {errors?.name && <p className='error'>{errors?.name?.message}</p>}
                </div>
                <input 
                    placeholder="Description"
                    {
                        ...register("description", {
                            required : {
                                value : true,
                                message : "Post description should not be empty"
                            } 
                        })
                    }
                />
                <div>
                    {errors?.description && <p className='error'>{errors?.description?.message}</p>}
                </div>
                <input type="submit" value="Create" />
                </form>
            </div>
        </div>
    ) 
}

export default Home