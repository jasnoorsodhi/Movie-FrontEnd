import React, { Component, Fragment } from 'react';
import axios from "axios";
import UserMovieUI from "../components/UserMovieUI"
import UserAppBar from "../components/UserAppBar"

//Material-UI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = {
    
    button: {
        marginTop: 20,
      },
      textField: {
        margin: '10px auto 10px auto',
      },
      
      customError: {
        color: 'red',
        fontSize: '0.8rem'
      },
};
var auth = localStorage.getItem('userAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

class UserHome extends Component {
    state = {
        movies: [],
        error: '',
        open: false,
        selectedId: '',
        selectedName: '',
        review: '',
     }

    componentDidMount(){
        axios.get('https://moviereview-raj.herokuapp.com/api/movies')
        .then(result =>{
            this.setState({
            movies: result.data
         })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleOpen = (id, role) => {
        this.setState({
            open: true,
            selectedId: id,
            selectedRole: role
        });
      };

      handleClose = () => {
        this.setState({
            open: false,
            error: '',
        review: ''
    })
      };

      handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit =() =>{
        var newReview={
            review: this.state.review
        }

            axios.post(`https://moviereview-raj.herokuapp.com/api/review/${this.state.selectedId}`, newReview, config)
            .then(result=>{
                if(result.data.error){
                    this.setState({error: result.data.error})
                } else{
                    this.handleClose()
                }
            })
            .catch(err =>{
                console.log(err)
            })
    }

    render() { 
        const movies = this.state.movies;
        const { history, classes } = this.props;
        let error= this.state.error;

        const movieDisplay = !movies ? (
            <div>
                <p>No movie to display!</p>
            </div>
        ): (
            movies.map(movie =>
                <UserMovieUI movie={movie} key={movie.movieId} handleOpen={this.handleOpen}/>
                )
            
        )
        return (
            <Fragment>
                <UserAppBar history={history}/>
            <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                    {movieDisplay}
                </Grid>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review for {this.state.selectedRole}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="review" 
            name="review" 
            type="text" 
            label="Review" 
            className={classes.textField}
            value={this.state.review}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          {error.length !== 0 ? (
                            <Typography variant="body2" className={classes.customError}>
                            {error}
                            </Typography>
                        ): ('')}
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
            </Fragment>
        );
    }
}
 
export default withStyles(styles)(UserHome);