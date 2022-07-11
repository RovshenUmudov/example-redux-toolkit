import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postsAPI} from "../../../api";

export interface IPost {
    id: number,
    title: string,
    body: string
}

export type IPostKeys = keyof IPost

interface InitialState {
    posts: IPost[],
    loading: boolean,
    error: string,
}

const initialState: InitialState = {
    posts: [],
    loading: false,
    error: ''
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        removePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.filter(el => el.id !== action.payload)
        }
    },
    extraReducers: builder => {
        //fetch posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPosts.rejected, (state) => {
            state.loading = false
            state.error = "Oops! Looks like we have error"
        })
        builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
            state.loading = false
            state.error = ''
            state.posts = action.payload
        })

        //fetch more posts
        builder.addCase(fetchMorePosts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMorePosts.rejected, (state) => {
            state.loading = false
            state.error = "Oops! Looks like we have error"
        })
        builder.addCase(fetchMorePosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
            state.loading = false
            state.error = ''
            state.posts = state.posts.concat(action.payload)
        })
    }
})

export const {removePost} = postsSlice.actions

//fetch posts
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (count: number) => {
        return await postsAPI.fetchPosts(count)
    }
)

//load more
export const fetchMorePosts = createAsyncThunk(
    "posts/fetchMorePosts",
    async ({offset, limit}: { offset: number, limit: number }) => {
        return await postsAPI.fetchMorePosts(offset, limit)
    }
)

export default postsSlice.reducer

