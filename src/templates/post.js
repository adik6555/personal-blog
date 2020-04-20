import React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import {
  Grid,
  Segment,
  Header,
  Menu,
  Icon,
  Label,
  Ref,
  Sticky,
  Visibility
} from "semantic-ui-react";
import Img from "gatsby-image";
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import Commento from "../components/commento";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function Post({ data, location }) {
  const url = location.href ? location.href : "";
  const post = data.mdx;
  const contextRef = React.useRef();
  return (
    <Layout share>
      <Grid textAlign="justified" style={{ justifyContent: "center" }}>
        <Grid.Column widescreen={6} computer={8} tablet={12} mobile={15}>
          <Ref innerRef={contextRef}>
            <Visibility>
              <Segment attached>
                <Header as="h1" style={{ fontSize: "220%" }}>
                  {post.exports.metadata.title}
                  <Header.Subheader style={{ margin: "10px 0" }}>
                    {post.exports.metadata.description}
                  </Header.Subheader>
                </Header>

                <Label size="large">
                  <Icon name="calendar" />
                  {post.exports.metadata.date}
                </Label>
                {post.exports.metadata.tags && (
                  <Label.Group style={{ marginTop: "15px" }}>
                    {post.exports.metadata.tags.map(tag => (
                      <Label style={{ fontStyle: "italic" }} basic>
                        <Link to={`?search=${tag}`}>#{tag}</Link>
                      </Label>
                    ))}
                  </Label.Group>
                )}
              </Segment>
              <Segment attached style={{ marginBottom: "3em" }}>
                <Img
                  fluid={post.exports.metadata.thumbnail.childImageSharp.fluid}
                />
              </Segment>

              <MDXRenderer>{post.body}</MDXRenderer>
              <Segment style={{ marginTop: "2em" }}>
                <Header as="h3">Join the discussion</Header>
                <div style={{ marginTop: "2em" }}>
                  <Commento id={url} />
                </div>
              </Segment>
            </Visibility>
          </Ref>
        </Grid.Column>

        <Grid.Column width={1} only="computer tablet">
          <Sticky offset={50} context={contextRef}>
            <Menu vertical style={{ width: "51px" }}>
              <Menu.Item style={{ padding: "0" }}>
                <TwitterShareButton
                  url={url}
                  style={{ padding: "13px", width: "100%" }}
                >
                  <Icon size="large" style={{ margin: "0" }} name="twitter" />
                </TwitterShareButton>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  var dummy = document.createElement("input"),
                    text = window.location.href;
                  document.body.appendChild(dummy);
                  dummy.value = text;
                  dummy.select();
                  document.execCommand("copy");
                  document.body.removeChild(dummy);
                }}
                style={{ width: "49px", height: "47px", padding: "0" }}
              >
                <Icon
                  size="large"
                  style={{ padding: "13px", width: "100%", margin: "0" }}
                  name="copy"
                />
              </Menu.Item>
              <Menu.Item style={{ padding: "0" }}></Menu.Item>
              <Menu.Item style={{ padding: "0" }}>
                <LinkedinShareButton
                  url={url}
                  style={{ padding: "13px", width: "100%" }}
                >
                  <Icon size="large" style={{ margin: "0" }} name="linkedin" />
                </LinkedinShareButton>
              </Menu.Item>
            </Menu>
          </Sticky>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

export const PostQuery = graphql`
  query PostQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fileAbsolutePath
      fields {
        slug
      }
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
    }
  }
`;
