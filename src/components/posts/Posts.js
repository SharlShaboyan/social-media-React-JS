import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiInstance from "../../utils/api"
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../../utils/NotifyToastHelper";
import "../posts/posts.css";

const api = apiInstance();

function Posts() {
    const [post, setPost] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try{
                const posts = await api.get("/user/post");
                setPost(posts)
                dispatch({
                    type: "change-sign-out-true"
                })
            } catch(e) {
                if(e.response.status === 401){
                    localStorage.clear();
                    navigate("/login")
                } else {
                    errorMessage("Xndir ka!")
                }
            }            
        })()
    }, [])

    return (
        <div className="posts">
            {
                post&&post.map((eachPost, index) => {
                    return (
                        <div className="post" key={eachPost.id} onClick={() => {
                            navigate(`/post/${eachPost.id}`)
                        }}>
                            <h1>{index+1}</h1>
                            <h1>{eachPost.name}</h1>
                            <h1>{eachPost.description}</h1>
                        </div>
                    )
                })
            }            
        </div>
    )
}

export default Posts