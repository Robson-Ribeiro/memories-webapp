import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';

import useStyles from './styles';
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3} >
                {
                    posts.map((post) => (
                        <Grid key={ post._id } xs={12} sm={12} md={6} lg={4} item>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts;
