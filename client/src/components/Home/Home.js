import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Container, Grow, Grid, Paper } from '@material-ui/core';

import { getPosts } from '../../actions/posts';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import Pagination from '../Pagination';

import useStyles from './styles';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    useEffect(() => {
        const getter = async () => {
            await sleep(1000);
            dispatch(getPosts());
         }
        getter();
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid items xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid items xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;