import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {fetchMorePosts, fetchPosts, IPostKeys} from "../../redux/reducers/postsReducer";
import {Button} from "@mui/material";
import Post from "./Post";
import PostSort from "./PostsSort";
import './index.scss'

const PostsList: FC = () => {
    const dispatch = useAppDispatch()
    const {posts, loading, error} = useAppSelector(state => state.postsReducer)
    const [sort, setSort] = useState<IPostKeys>()

    useEffect(() => {
        dispatch(fetchPosts(4))
    }, [dispatch])

    const handleLoadMore = () => {
        dispatch(fetchMorePosts({offset: posts.length, limit: 2}))
    }

    const getSortedPosts = () => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].toString().localeCompare(b[sort].toString()))
        }
        return posts
    }
    const sortedPosts = getSortedPosts()

    const handleSort = (value: IPostKeys) => {
        setSort(value)
    }

    if (!posts.length && loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <section className="section-posts">
            <PostSort
                handleSort={handleSort}
                options={[{value: "title", name: "By title"}, {value: "body", name: "By body"}]}
                value={sort}
            />
            <div className={"posts-list"}>
                {
                    sortedPosts && sortedPosts.map(el => (
                        <Post {...el} key={el.id}/>
                    ))
                }
            </div>
            <div className="btn-wrap">
                <Button variant={"contained"} onClick={handleLoadMore} disabled={loading}>Load More</Button>
            </div>
        </section>
    );
};

export default PostsList;