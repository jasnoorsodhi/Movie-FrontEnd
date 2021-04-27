import React, { Component } from 'react';

//Material-UI
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card:{
        marginTop: 20
    }
}

class MovieReviewUI extends Component {
    state = {  }
    render() { 
        const {classes,
        review:{firstName, lastName, userName, review}} = this.props;
        const ShowApps = !this.props.review ? (
            <p>No review to show</p>
        ) : (
            <Card className={classes.card}>
            <CardHeader 
                title={<Typography color="primary">{firstName} {lastName}</Typography>} 
                subheader={<Typography>{userName}</Typography>}
            />
                <CardContent>
                    <Typography variant="body2" >{review}</Typography>
                </CardContent>
        </Card>
        )
        return (
        <div>
            {ShowApps}
        </div>
        );
    }
}
 
export default withStyles(styles)(MovieReviewUI);