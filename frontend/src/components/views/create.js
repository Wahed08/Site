import React, { useState } from "react";
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

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [author, setAuthor] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [category, setCategory] = useState("photography");

  const handleSubmit = (e) => {
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
      if (title && details && author) {
        fetch("http://localhost:5000/api/posts/create", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ title, details, author, category }),
        }).then(() => history.push("/posts"));
      }
    } catch (err) {
      throw err;
    }
  };

  return (
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

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
  );
}
