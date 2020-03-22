import React from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";
import PostPreview from "../components/postpreview";
import "./index.css";

export default function IndexPage({ data }) {
  return (
    <div>
      hey hey hey
      <Layout>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostPreview
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            description={node.frontmatter.description}
            link={node.fields.slug}
            image={node.frontmatter.thumbnail.childImageSharp.fluid}
          />
        ))}
      </Layout>
    </div>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
