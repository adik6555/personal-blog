import React, { useState } from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import {
  Grid,
  Segment,
  Header,
  Menu,
  Icon,
  Label,
  Ref,
  Sticky,
  Responsive,
  Visibility,
  Button
} from "semantic-ui-react";
import Img from "gatsby-image";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton
} from "react-share";
import RehypeReact from "rehype-react";
import { H1, H2, H3, H4, H5, H6 } from "../components/textComponents";
import Commento from "../components/commento";
import MobileShareMenu from "../components/mobileShareMenu";

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: H2,
    h2: H3,
    h3: H4,
    h4: H5,
    h5: H6,
    h6: H6
  }
}).Compiler;

export default function Post({ data, location }) {
  const url = location.href ? location.href : "";
  const post = data.markdownRemark;
  const contextRef = React.useRef();
  return (
    <Layout share>
      <Grid textAlign="justified" style={{ justifyContent: "center" }}>
        <Grid.Column widescreen={6} computer={8} tablet={12} mobile={15}>
          <Ref innerRef={contextRef}>
            <Visibility>
              <Segment attached>
                <H1>
                  {post.frontmatter.title}
                  <Header.Subheader>
                    {post.frontmatter.description}
                  </Header.Subheader>
                </H1>

                <Label size="large">
                  <Icon name="calendar" />
                  {post.frontmatter.date}
                </Label>
              </Segment>
              <Segment attached style={{ marginBottom: "3em" }}>
                <Img fluid={post.frontmatter.thumbnail.childImageSharp.fluid} />
              </Segment>

              <div>{renderAst(post.htmlAst)}</div>
              <Segment style={{ marginTop: "2em" }}>
                <H3>Join the discussion</H3>
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
              <Menu.Item style={{ padding: "0" }}>
                <FacebookShareButton
                  url={url}
                  style={{ padding: "13px", width: "100%" }}
                >
                  <Icon size="large" style={{ margin: "0" }} name="facebook" />
                </FacebookShareButton>
              </Menu.Item>
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fileAbsolutePath
      fields {
        slug
      }
      frontmatter {
        title
        description
        date
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
