import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../img/Farhad.jpg";

const useStyles = makeStyles({
  root: {
    display: "responsive",
    maxWidth: 400,
    marginLeft: "350px",
    marginTop: "30px"
  },
  media: {
    height: 200,
  },
});

const Account = ({user, handleDelete, userId}) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={image}
            title="User"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             {user.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" size="small" color="primary">
            Edit
          </Button>
          <Button size="small"  variant="contained" color="secondary" onClick={()=>handleDelete(userId)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Account;
