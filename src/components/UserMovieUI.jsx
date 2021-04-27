import React, { Component } from 'react';
import { Link } from "react-router-dom";
//Material-UI
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
class UserMovieUI extends Component {
    state = {  }

    handleOpen = (jobId, role) => {
            this.props.handleOpen(jobId, role);
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
                    />
                    <CardActionArea component={Link} to={`/movies/user/${movieId}`}>
                        <CardContent>
                            <Typography variant="h4">{year}</Typography>
                            <Typography variant="h6" ><b>Description</b>: {description}</Typography>
                            <Typography variant="body1" ><b>Total Run Time</b>: {duration}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={() => this.handleOpen(movieId, name)}>Post a Review</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
 
export default withStyles(styles)(UserMovieUI);