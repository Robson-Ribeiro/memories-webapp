import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = () => {
        const stringfyedComment = `${user.result.name}: ${comment}`;
        dispatch(commentPost(stringfyedComment, post._id));
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    { comments.length > 0 ?
                        comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1" >
                                {i}
                            </Typography>
                        )) :
                        <Typography  gutterBottom variant="subtitle1" >
                                Be the first to interact with this post's comment section!
                        </Typography>
                    }
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write your comment:</Typography>
                        <TextField 
                            fullWidth
                            minRows={4}
                            maxRows={5}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={ (e) => setComment(e.target.value) }
                        />
                        <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={ handleClick } >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentSection;
