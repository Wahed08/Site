import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import ErrorModal from "../ShowError/ErrorModal";
import { AuthContext } from "../context/auth-context";

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

const Create = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [author, setAuthor] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [category, setCategory] = useState("photography");
  const [error, setError] = useState();
  const [file, setFile] = useState();

  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    setAuthorError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (author === "") {
      setAuthorError(true);
    }
    try {
      if (title && details && author && file) {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("details", details);
        formData.append("author", author);
        formData.append("category", category);
        formData.append("image", file);

        await fetch("http://localhost:5000/api/posts/create", {
          method: "POST",
          body: formData,
          headers:{
            Authorization: "Bearer " + auth.token
          }
        }).then((response) => {
          if (!response.ok) {
            setError("Invalid inputs passed, please check your data.");
          } else {
            history.push("/posts");
          }
        });
      }
    } catch (err) {
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
            Share a Post
          </Typography>

          <form
            noValidate
            autoComplete="off"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <TextField
              className={classes.field}
              onChange={(e) => setTitle(e.target.value)}
              label="Post Title"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={titleError}
            />
            <TextField
              className={classes.field}
              onChange={(e) => setDetails(e.target.value)}
              label="Post Details"
              variant="outlined"
              color="secondary"
              multiline
              rows={4}
              fullWidth
              required
              error={detailsError}
            />

            <TextField
              className={classes.field}
              onChange={(e) => setAuthor(e.target.value)}
              label="Author"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={authorError}
            />

            <FormControl className={classes.field}>
              <FormLabel>Post Category</FormLabel>
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <FormControlLabel
                  value="recipe"
                  control={<Radio />}
                  label="Recipe"
                />
                <FormControlLabel
                  value="photography"
                  control={<Radio />}
                  label="Photograpy"
                />
                <FormControlLabel
                  value="buy_Sell"
                  control={<Radio />}
                  label="Buy & Sell"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                name="image"
                accept=".jpg,.png,.jpeg"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </Button>

            <Button
              className={classes.align}
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Create;
