import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { Grid, Segment, Header, Menu, Icon } from "semantic-ui-react";
import Img from "gatsby-image";

export default function Post({ data }) {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Grid textAlign="justified" style={{ justifyContent: "center" }}>
        <Grid.Column widescreen={6} computer={8} tablet={12} mobile={15}>
          <Segment>
            <Img fluid={post.frontmatter.thumbnail.childImageSharp.fluid} />
            <Header as="h1">{post.frontmatter.title}</Header>
            <Header as="h2"> {post.frontmatter.description}</Header>
          </Segment>
          <div style={{ position: "fixed", bottom: "75%" }}>
            <Menu vertical icon>
              <Menu.Item icon="twitter" />
              <Menu.Item icon="facebook" />
              <Menu.Item icon="linkedin" />
            </Menu>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

export const PostQuery = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
