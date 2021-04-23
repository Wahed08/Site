import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  align: {
    marginLeft: "20px",
  },
});

const UpdatePost = () => {
  const classes = useStyles();

  return (
    <div className="container">
      <Container size="sm">
        <Typography
          variant="h4"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Update Post
        </Typography>

        <form
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
          //   onSubmit={handleSubmit}
        >
          <TextField
            className={classes.field}
            // onChange={(e) => setTitle(e.target.value)}
            label="Post Title"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            // error={titleError}
          />
          <TextField
            className={classes.field}
            // onChange={(e) => setDetails(e.target.value)}
            label="Post Details"
            variant="outlined"
            color="secondary"
            multiline
            rows={6}
            fullWidth
            required
            // error={detailsError}
          />

          <Button
            className={classes.align}
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Update
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default UpdatePost;
