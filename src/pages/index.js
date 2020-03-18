import React from "react";
import { Link } from "gatsby";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";
import PostPreview from "../components/postpreview";
import "./index.css";
import user from "./../images/user.png";

const IndexPage = () => (
  <Layout>
    <PostPreview
      description="ahoj toto je test post"
      meta="on 21.1.22 by Adam Petro"
      title="should be the first post man"
      image={user}
    />
    <PostPreview />
    <PostPreview />
    <PostPreview />
  </Layout>
);

export default IndexPage;
