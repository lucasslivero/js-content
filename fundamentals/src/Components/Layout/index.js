import React from "react";

import Header from "./../Header";
import Footer from "./../Footer";
import Routes from "./../../Routes";

import { Navigation } from "./stlyes";
import { Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <Navigation>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/posts/123">Post</Link>
      </Navigation>
      <Routes />
      <Footer />
    </>
  );
}

export default Layout;
