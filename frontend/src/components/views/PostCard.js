import React from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import { Button, makeStyles } from "@material-ui/core";
import { blue, yellow, green, pink } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  avatar: {
    paddingTop: "20px",
  },
  avatarIcon: {
    backgroundColor: (post) => {
      if (post.category === "recipe") {
        return yellow[700];
      }
      if (post.category === "photography") {
        return green[500];
      }
      if (post.category === "buy_Sell") {
        return pink[500];
      }
      return blue[500];
    },
  },
  media: {
    paddingTop: "55%",
  },
});

const PostCard = ({ post, handleDelete, image }) => {
  const classes = useStyles(post);

  const history = useHistory();

  return (
    <div className={classes.avatar}>
      <Card elevation={6}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatarIcon}>
              {post.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon /> */}
            </IconButton>
          }
          title={post.title}
          subheader={post.category}
        />
        <CardMedia
          className={classes.media}
          image={`https://source.unsplash.com/WLUHO9A_xik/1600x900`}
          title="Media"
        />
        <Button color="cyan">
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {post.details}
            </Typography>
          </CardContent>
        </Button>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Edit"
            onClick={() => history.push(`/post/${post._id}/update`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => handleDelete(post._id)}
          >
            <DeleteOutlined />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostCard;
