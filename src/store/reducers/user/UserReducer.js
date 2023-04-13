export function userReducer(state={}, action) {
    if(action.type === "add-user") {
        return {
                name : action.payload.name,
                login : action.payload.login,
                pass : action.payload.pass
               }     
    } else if(action.type === "delete-user") {
        return {}
    }

    return state
}