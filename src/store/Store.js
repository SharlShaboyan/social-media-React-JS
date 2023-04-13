import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/user/UserReducer";
import { changeSignOut } from "../utils/actions/SignOutAction";

export const store = createStore(combineReducers({
    currentUser : userReducer,
    signOut : changeSignOut
}), {
    currentUser: {},
    signOut : {
        isLogged: false  
    }
})