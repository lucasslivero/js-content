import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

function Post({ post, likes }) {
  return (
    // O Fragment é usado somente para fins de exemplo
    <Fragment>
      <Container>
        <h2>{post.title}</h2>
        <small>{post.subtitle}</small>
        <small>❤️ {likes}</small>
      </Container>
    </Fragment>
  );
}

export default Post;

Post.propTypes = {
  likes: PropTypes.number,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};

Post.defaultProps = {
  likes: 0,
};
