import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from "@material-ui/core";
// import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    paddingTop: "20px"
  },
});

const PostCard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.avatar}>
    <Card elevation={6}>
      <CardHeader
        action={
          <IconButton onClick={() => props.handleDelete(props.key)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={props.title}
        subheader={"By " + props.author}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          { props.postdetails }
        </Typography>
      </CardContent>
    </Card>
  </div>
  );
};

export default PostCard;
