// Create slug
const path = require("path");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = node.frontmatter.title.split(" ").join("-");
    slug.replace(/[^\w\s-]/g, "");
    createNodeField({
      node,
      name: "slug",
      value: "posts/" + slug.toLowerCase()
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/post.js"),
      context: {
        slug: node.fields.slug
      }
    });
  });
};
