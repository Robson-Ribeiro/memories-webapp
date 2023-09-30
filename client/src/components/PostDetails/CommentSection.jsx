import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';


const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const handleClick = () => {
        console.log(comment);
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
                    <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" onClick={ handleClick } >
                        Comment
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;
