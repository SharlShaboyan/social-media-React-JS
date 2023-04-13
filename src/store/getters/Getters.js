export function selectUser(state) {
    return state.currentUser
}

export function getSignOut(state) {
    return state.signOut.isLogged
}