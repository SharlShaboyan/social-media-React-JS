import React, { Suspense } from 'react'
import { Link, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { getSignOut } from "../store/getters/Getters";

const Home = React.lazy(() => import('../components/home/Home'));
const Login = React.lazy(() => import('../components/login/Login'));
const Register = React.lazy(() => import('../components/register/Register'));
const Posts = React.lazy(() => import('../components/posts/Posts'));
const EachPost = React.lazy(() => import('../components/posts/eachPost/EachPost'));

export function Routing() {
    const signOut = useSelector(getSignOut)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <nav>
                <h2 className="title">Одноклассники</h2>
                {signOut && <Link to="/">Home</Link>}
                {signOut && <Link to="/newsFeed">News Feed</Link>}
                {!signOut && <Link to="/login">Login</Link>}
                {!signOut && <Link  to="/register">Register</Link>}
                {signOut && <button onClick={() => {
                    dispatch({
                        type: "change-sign-out-false"
                    })
                    dispatch({
                        type : "delete-user"
                    })
                    localStorage.clear()
                    navigate("/login");
                }}>Sign out</button>}
            </nav>
            <Suspense fallback={<div>Loading...</div>}> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/newsFeed" element={<Posts />} />
                    <Route path="/post/:id" element={<EachPost />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />        
                </Routes>
            </Suspense>
        </>
    )
}