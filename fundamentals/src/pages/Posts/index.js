import React from "react";

import { Container } from "./styles";
import Post from "./../../Components/Post";

const posts = [
  { id: Math.random(), title: "Title 01", subtitle: "Subtitle 01", likes: 10 },
  { id: Math.random(), title: "Title 02", subtitle: "Subtitle 02", likes: 0 },
  { id: Math.random(), title: "Title 03", subtitle: "Subtitle 03", likes: 20 },
];

function Posts() {
  return (
    <Container>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={{
            title: post.title,
            subtitle: post.subtitle,
          }}
          likes={post.likes}
        />
      ))}
    </Container>
  );
}

export default Posts;
