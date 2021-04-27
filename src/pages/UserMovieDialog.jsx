import React, { Component, Fragment } from 'react';
import axios from "axios";
import MovieReviewUI from "../components/MovieReviewUI"
import UserAppBar from "../components/UserAppBar";

//Material-UI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from "@material-ui/core/Grid";
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card:{
        marginTop: 20
    }
}

class AdminMovieDialog extends Component {
    state = {
        movie: {},
        reviews:[]
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        const movieId = params.movieId;
        var auth = localStorage.getItem('userAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

        axios.get(`https://moviereview-raj.herokuapp.com/api/review/user/${movieId}`, config)
        .then(result =>{
            console.log(result)
            this.setState({movie: result.data.movie,
                reviews: result.data.reviews})
        })
        .catch(err=>{
            console.log(err.code)
        })
    }
    render() {
        const {classes, history} = this.props;
        const movies = this.state.movie;
        const reviews = this.state.reviews;
        const moviePost = !movies ? (
            <p>No Movie to show</p>
        ):( 
        <Card className={classes.card}>
            <CardHeader 
                title={<Typography color="primary">{movies.name}</Typography>} 
                subheader={movies.genre}
            />
                <CardContent>
                <Typography variant="h4">{movies.year}</Typography>
                            <Typography variant="h6" ><b>Description</b>: {movies.description}</Typography>
                            <Typography variant="body1" ><b>Total Run Time</b>: {movies.duration}</Typography>
                </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        );

        const reviewPost = !reviews ? (
            <p>No review to show</p>
        ) : (
            reviews.map(review => <MovieReviewUI key={review.reviewId} review={review} />)
            
        )
        return (
            <Fragment>
                <UserAppBar history={history}/>
                <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                {moviePost}
                <br />
                <b>Reviews:</b>
                {reviewPost}
                </Grid>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
            </Fragment>
            
        );
    }
}
 
export default withStyles(styles)(AdminMovieDialog);