import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
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
});

const PostCard = ({post}) => {
  const classes = useStyles(post);

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
              <MoreVert />
            </IconButton>
          }
          title={post.title}
          subheader={post.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {post.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCard;
