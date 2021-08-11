import { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [posts, setsPosts] = useState([]);

  const loadPosts = async () => {
    const res = axios.get(`http://localhost:3001/posts?_page=${page}`);
    setsPosts((await res).data);
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  return (
    <div className="App">
      <CssBaseline />
      <Container component={Box} py={3}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item sm={3} key={post.id}>
              <Card style={{height:250}}>
                <CardContent>
                  <Typography>
                    {post.id} {post.title}
                  </Typography>
                  <Typography>{post.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={10}
          color="secondary"
          variant="outlined"
          shape="rounded"
          // size="large"
          showFirstButton={true}
          showLastButton={true}
          // hideNextButton={true}
          // hidePrevButton={true}
          defaultPage={page}
          onChange={(event, value) => setPage(value)}
        />
      </Container>
    </div>
  );
}

export default App;
