import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Material-UI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    card:{
        marginTop: 20
    },
    deleteIcon: {
            '&:hover': {
                color: 'red',
                cursor: 'pointer'
            }
    }
}

class MovieUI extends Component {
    state = {  }
    handleOpen = (jobId, role) => {
        this.props.handleOpen(jobId, role);
}
    deleteMovie = (movieId, name) => {
        if(window.confirm(`Are you sure you want to delete this post: ${name}`)){
            this.props.deleteMovie(movieId);
        }
    }
    render() { 
        const {classes,
        movie: { movieId,
            name,
            duration,
            year,
            description,
            genre}} = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader 
                        title={<Typography color="primary">{name}</Typography>} 
                        subheader={genre}
                        action={ <DeleteIcon onClick={() => this.deleteMovie(movieId, name)} className={classes.deleteIcon}/>}
                    />
                    <CardActionArea component={Link} to={`/movies/admin/${movieId}`}>
                        <CardContent>
                            <Typography variant="h4">{year}</Typography>
                            <Typography variant="h6" ><b>Description</b>: {description}</Typography>
                            <Typography variant="body1" ><b>Total Run Time</b>: {duration}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}
 
export default withStyles(styles)(MovieUI);