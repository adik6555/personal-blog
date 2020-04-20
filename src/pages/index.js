import React, { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/layout";
import PostPreview from "../components/postpreview";
import "./index.css";
import { Grid, Container, Header } from "semantic-ui-react";

export default function IndexPage({ data, location }) {
  const posts = data.allMdx.edges;
  const [state, setState] = React.useState({
    query: location.search
      ? location.search.substring(location.search.indexOf("=") + 1)
      : "",
    filteredPosts: filterPosts(
      location.search
        ? location.search.substring(location.search.indexOf("=") + 1)
        : ""
    )
  });

  function handleSearchChange(childEvent) {
    const query = childEvent.target.value;
    const filteredPosts = filterPosts(query);
    setState({
      filteredPosts,
      query
    });
  }
  function filterPosts(query) {
    const filteredPosts = posts.filter(({ node }) => {
      const { description, tags, title } = node.exports.metadata;
      const excerpt = node.excerpt;
      return (
        (description
          ? description.toLowerCase().includes(query.toLowerCase())
          : excerpt.toLowerCase().includes(query.toLowerCase())) ||
        (title && title.toLowerCase().includes(query.toLowerCase())) ||
        (tags &&
          tags
            .join("") // convert tags from an array to string
            .toLowerCase()
            .includes(query.toLowerCase()))
      );
    });
    return filteredPosts;
  }

  const postsToMap = state.query.length === 0 ? posts : state.filteredPosts;
  return (
    <Layout
      active="home"
      search
      searchInput={handleSearchChange}
      searchValue={state.tempQuery || state.query}
    >
      <Grid centered>
        {postsToMap.length !== 0 ? (
          postsToMap.map(({ node }, i) => (
            <PostPreview
              title={node.exports.metadata.title}
              date={node.exports.metadata.date}
              description={
                node.exports.metadata.description
                  ? node.exports.metadata.description
                  : node.excerpt
              }
              key={i}
              link={node.fields.slug}
              image={node.exports.metadata.thumbnail.childImageSharp.fluid}
            />
          ))
        ) : (
          <Container style={{ height: "75vh", width: "100vw" }}>
            <Header color="grey" as="h1" style={{ marginTop: "100px" }}>
              Sorry, no results match your query
            </Header>
          </Container>
        )}
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
