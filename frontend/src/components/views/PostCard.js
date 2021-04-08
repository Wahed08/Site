import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
// import { makeStyles } from "@material-ui/core";
// import { blue } from "@material-ui/core/colors";

// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue,
//   },
// });

const PostCard = (props) => {
  //const classes = useStyles();

  return (
    <div>
    <Card elevation={5}>
      <CardHeader
        action={
          <IconButton onClick={() => props.handleDelete(props.key)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={props.title}
        subheader={props.author}
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
