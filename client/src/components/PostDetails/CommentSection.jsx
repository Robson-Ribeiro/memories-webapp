import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const stringfyedComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(stringfyedComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    { comments.length > 0 ?
                        comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant="subtitle1" >
                                <strong>{c.split(': ')[0]}:</strong>{c.split(':')[1]}
                            </Typography>
                        )) :
                        <Typography  gutterBottom variant="subtitle1" >
                                { user?.result?.name ? 'Be the first to interact with this comment section!' : 'No comments were made!'}
                        </Typography>
                    }
                    <div ref={commentsRef} />
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
