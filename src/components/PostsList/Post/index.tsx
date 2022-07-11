import {Button, Typography} from '@mui/material';
import React, {FC} from 'react';
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {removePost} from "../../../redux/reducers/postsReducer";
import './index.scss';

interface IPostProps {
    id: number,
    title: string,
    body: string
}

const Post: FC<IPostProps> = ({id, body, title}) => {

    const dispatch = useAppDispatch()

    const handleRemove = (id: number) => {
        dispatch(removePost(id))
    }

    return (
        <div className={"post"} id={`${id}`}>
            <div>
                <Typography variant={"h5"} className={"title"}>{title}</Typography>
                <Typography>{body}</Typography>
            </div>
            <div className="btn-wrap">
                <Button variant={"outlined"} onClick={() => handleRemove(id)}>Remove</Button>
            </div>
        </div>
    )
};

export default Post;