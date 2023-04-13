import apiInstance from "../api";

const api = apiInstance()

async function createNewPost(name, descr) {
    try{
        await api.post(`/user/post/create`, {
            name : name,
            description : descr,
        })
    } catch(e) {}
}

export default createNewPost