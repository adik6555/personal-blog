import React from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";
import PostPreview from "../components/postpreview";
import "./index.css";
import { Grid } from "semantic-ui-react";

export default function IndexPage({ data }) {
  return (
    <Layout active="home" search>
      <Grid centered>
        {data.allMdx.edges.map(({ node }) => (
          <PostPreview
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            description={node.frontmatter.description}
            link={node.fields.slug}
            image={node.frontmatter.thumbnail.childImageSharp.fluid}
          />
        ))}
      </Grid>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
