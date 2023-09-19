import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, CircularProgress, Divider, Grid, Card } from '@material-ui/core';
import moment from "moment";

import useStyles from './styles';

import { getPost, getPostsBySearch } from '../../actions/posts';

const PostDetails = () => {
    const classes = useStyles();
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        if(post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);    

    if(!post) return null;

    if(isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const openPost = (_id) => navigate(`/posts/${_id}`);

    const recommendedPosts = posts.filter(({ _id }) => _id !== id );

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>***Lugar adequado para uma nova feature</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            
            {recommendedPosts.length ? (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <Grid className={classes.recommendedPosts} display="flex" container flexDirection='row' alignItems="stretch" spacing={3} >
                        {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                            <Grid style={{ margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={ _id } xs={6} sm={6} md={3} lg={3} item >
                                <Card className={classes.recommendedCard} style={{ overflow: 'auto' }} raised elevation={6} >
                                    <Typography variant="h6" gutterBottom >{title}</Typography>
                                    <Typography variant="subtitle2" gutterBottom >{name}</Typography>
                                    <Typography variant="subtitle2" gutterBottom >{message}</Typography>
                                    <Typography variant="subtitle1" gutterBottom >Likes: {likes.length}</Typography>
                                    <img src={selectedFile} alt="recommendedPost" width="200px" />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : <></>}
        </Paper>
    );
};

export default PostDetails;
