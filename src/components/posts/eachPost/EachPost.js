import "./eachPost.css";
import apiInstance from '../../../utils/api';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams  } from "react-router-dom";
import createNewPost from "../../../utils/actions/CreatePostAction";
import { successMessage, errorMessage } from "../../../utils/NotifyToastHelper";

const api = apiInstance();

function EachPost({}) {
    const { register, handleSubmit, reset } = useForm({mode : "onSubmit"});
    const [likedSituation, setLikedSituation] = useState("like");
    const [postData, setPostData] = useState([]);
    const [liked, setLiked] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
         (async() => {
            try {
                const post = await api.get(`/user/post/${id}`)
                setPostData(post)
                setLiked(post.likes.filter(each => each.id == localStorage.getItem("activePersonID")));
                dispatch({
                    type: "change-sign-out-true"
                })          

                if(post.likes.filter(each => each.id == localStorage.getItem("activePersonID")).length!=0) {
                    setLikedSituation("liked")
                } else {
                    setLikedSituation("like")
                }
            } catch(e) {
                if(e.response.status === 401){
                    errorMessage("You are not accessed rad exeq!")
                    localStorage.clear()
                    navigate("/login")
                }
            }
        })()
    }, [])

    async function addCommentToPost(comment) {
        try{
            await api.post(`/user/post/${id}/comment`, {
                comment
            })

            setPostData({
                ...postData,
                comments: [
                    ...postData.comments,
                    {
                        comment
                    }
                ]
            })
            successMessage("Commented!");
        } catch(e) {
            if(e.response.status === 401){
                errorMessage("You are not accessed rad exeq!")
                localStorage.clear()
                navigate("/login")
            }
        }
    }

    async function addLikeToPost(like) {
        if(liked.length === 1) {
            setLikedSituation("liked")
        } else {
            try {
                await api.post(`/user/post/${id}/like`)
                setPostData({
                    ...postData,
                    likes : [
                        ...postData.likes,
                        {}
                    ]
                })
                successMessage("Liked!") 
                setLikedSituation("liked") 
            } catch(e) {
                if(e.response.status === 401){
                    errorMessage("You are not accessed rad exeq!")
                    localStorage.clear()
                    navigate("/login")
                }
            }
        }
    }

    const onSubmitCreateComment = (data) => {
        addCommentToPost(data.comment)
        reset()
    }
    
    return (
        <div className="each-post-container">
            <div className="each-post">
                <h1 className="post-title">{postData.name}</h1>
                <h1 className="post-descr">{postData.description}</h1>
                <div className="each-post-btns">
                        <button className={likedSituation} onClick={addLikeToPost}>{likedSituation}</button>
                        <form onSubmit={handleSubmit(onSubmitCreateComment)}>
                            <input 
                            placeholder="What's on your mind?"
                            {
                                ...register("comment", {
                                    required : true,
                                })
                            }
                            />
                            <input type="submit" value="Comment" />
                        </form>
                        <button onClick={() => {
                            createNewPost(postData.name, postData.description);
                            successMessage("Shared"); 
                        }}>Share</button>
                </div>
                <h1>Likes {postData.likes && postData.likes.length}</h1>
                <div className="comments">
                    <h2>Comments</h2>
                    {
                        postData.comments && postData.comments.map((comment) => {
                            return (
                                <div className="comment" key={Math.random()}>
                                    <h1>{comment.comment}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>   
        </div>
    )
}

export default EachPost