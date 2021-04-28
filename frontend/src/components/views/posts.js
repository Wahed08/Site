import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PostCard from "./PostCard";
import LoadingSpinner from "../util/LoadingSpinner";
import { AuthContext } from "../context/auth-context";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchPost = async () => {
      try {
        const Data = await fetch("http://localhost:5000/api/posts");
        const responseData = await Data.json();
        setPosts(responseData.All_post);

        if (!Data.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        throw err;
      }
    };
    fetchPost();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    const newPost = posts.filter((post) => post.id !== id);
    setPosts(newPost);
    history.push("/posts");
  };

  return (
    <Container>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <Grid container spacing={4}>
        {!isLoading &&
          posts &&
          posts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
              <PostCard
                post={post}
                handleDelete={handleDelete}
                image={post.image}
              />
            </Grid>
          ))}
        {!isLoading && !posts.length && (
          <div className="container">
            <div className="row align-items-center justify-content-center p-4">
              <h2>Oops!! Not Found</h2>
            </div>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default Posts;
