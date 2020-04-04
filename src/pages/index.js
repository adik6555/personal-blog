import React from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";
import PostPreview from "../components/postpreview";
import "./index.css";
import { Grid, Container, Header } from "semantic-ui-react";

export default function IndexPage({ data }) {
  return (
    <Layout active="home" search>
      <Grid centered>
        {data.allMdx.edges.map(({ node }) => (
          <PostPreview
            title={node.exports.metadata.title}
            date={node.exports.metadata.date}
            description={
              node.exports.metadata.description
                ? node.exports.metadata.description
                : node.excerpt
            }
            link={node.fields.slug}
            image={node.exports.metadata.thumbnail.childImageSharp.fluid}
          />
        ))}
      </Grid>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [exports___metadata___date], order: DESC }) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 350)
          id
          exports {
            metadata {
              date
              description
              title
              tags
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
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
