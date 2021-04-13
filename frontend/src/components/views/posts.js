import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import PostCard from "./PostCard";
import LoadingSpinner from "../util/LoadingSpinner";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    await fetch("http://localhost:5000/api/posts/" + id, {
      method: "DELETE",
    });
    const newPost = posts.filter((post) => post.id !== id);
    setPosts(newPost);
  };

  if (posts.length === 0) {
    return (
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <h2>Oops!! Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
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
                  title={post.title}
                  postdetails={post.details}
                  category={post.category}
                  author={post.author}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Posts;
