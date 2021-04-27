import React, { Component, Fragment } from 'react';
import axios from "axios";
import MovieUI from "../components/MovieUI"
import AdminAppBar from "../components/AdminAppbar"

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
var auth = localStorage.getItem('adminAuthToken')
        var config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'x-auth-token': auth
              }
           };

class AdminHome extends Component {
    state = {
        movies: [],
        error: '',
        name: '',
        description: '',
        year: '',
        genre: '',
        duration: '',
        open: false
     }

    componentDidMount(){
        axios.get('https://moviereview-raj.herokuapp.com/api/movies/admin', config)
        .then(result =>{
            this.setState({movies: result.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({
            error: '',
        name: '',
        description: '',
        year: '',
        genre: '',
        duration: '',
        open: false
    })
      };

      handleSubmit =() =>{
        var newMovie ={
            name: this.state.name,
            description: this.state.description,
            genre: this.state.genre,
            year: this.state.year,
            duration: this.state.duration
        };

            axios.post('https://moviereview-raj.herokuapp.com/api/movies', newMovie, config)
        .then(result=>{
            if(result.data.error){
                this.setState({error: result.data.error})
            } else {
                this.setState({error: ''});
                this.handleClose();
                this.componentDidMount();
            }
        })  
        .catch(err =>{
            console.log(err)
        });
      }

      handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    deleteMovie = (id) =>{
        axios.delete(`https://moviereview-raj.herokuapp.com/api/movies/admin/${id}`, config)
        .then(result=>{
            this.setState({movies: result.data})
        })
        .catch(err =>{
            console.log(err)
        });
        this.componentDidMount();
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
                <MovieUI movie={movie} key={movie.movieId} deleteMovie={this.deleteMovie}/>
                )
            
        )
        return (
            <Fragment>
                <AdminAppBar history={history}/>
            <Grid container>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                <Button color="primary" variant="contained" onClick={this.handleOpen} 
                            className={classes.button}>Add New Movie</Button>
                    {movieDisplay}
                </Grid>
                <Grid item md={3} sm={2} xs={12}>
                    
                </Grid>
            </Grid>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Movie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name" 
            name="name" 
            type="text" 
            label="Name" 
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="description" 
            name="description" 
            type="text" 
            label="Description" 
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="genre" 
            name="genre" 
            type="text" 
            label="Genre" 
            className={classes.textField}
            value={this.state.genre}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="duration" 
            name="duration" 
            type="text" 
            label="Duration" 
            className={classes.textField}
            value={this.state.duration}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            id="year" 
            name="year" 
            type="text" 
            label="Year of Release" 
            className={classes.textField}
            value={this.state.year}
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
            Save
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
 
export default withStyles(styles)(AdminHome);