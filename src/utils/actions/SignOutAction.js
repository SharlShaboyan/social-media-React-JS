export function changeSignOut(state={}, action) {
    if(action.type === "change-sign-out-true") {
        return {
            ...state,
            isLogged: true
        }
    } else if(action.type === "change-sign-out-false") {
        return {
            ...state,
            isLogged: false
        }
    }

    return state
}