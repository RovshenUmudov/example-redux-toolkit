import React from 'react';
import PostsList from "../../components/PostsList";
import {Container} from "@mui/material";

const Home = () => {
    return (
        <Container>
            <PostsList />
        </Container>
    );
};

export default Home;