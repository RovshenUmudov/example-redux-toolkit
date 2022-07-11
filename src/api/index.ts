import axios from "axios";
import {IPost} from "../redux/reducers/postsReducer";

const instance = () => {
    return axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/"
    })
}

export const postsAPI = {
    //fetch posts
    fetchPosts: (count: number) => instance().get<IPost[]>(`posts?_limit=${count}`).then(res => res.data),
    //fetch more posts
    fetchMorePosts: (offset: number, limit: number) => instance().get<IPost[]>(`posts?_start=${offset}&_limit=${limit}`).then(res => res.data)
}