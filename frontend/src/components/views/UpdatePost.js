import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useParams, useHistory } from "react-router-dom";
import ErrorModal from "../ShowError/ErrorModal";

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
  const postId = useParams().postId;
  const [error, setError] = useState();
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const Data = await fetch(`http://localhost:5000/api/posts/${postId}`);

        const responseData = await Data.json();

        setTitle(responseData.postdetails.title);
        setDetails(responseData.postdetails.details);

        if (!Data.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        throw err;
      }
    };
    fetchUser();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const update = { title, details };
    try {
      if (title && details) {
        const response = await fetch(
          `http://localhost:5000/api/posts/update/${postId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(update)
          }
        );
        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.message);
        }
        if (response.ok) {
          history.push("/posts");
        }
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} />
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
            onSubmit={handleUpdate}
          >
            <TextField
              className={classes.field}
              label="Post Title"
              InputLabelProps={{shrink: true}}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              className={classes.field}
              label="Post Details"
              InputLabelProps={{shrink: true}}
              variant="outlined"
              color="secondary"
              multiline
              rows={6}
              fullWidth
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
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
    </React.Fragment>
  );
};

export default UpdatePost;
