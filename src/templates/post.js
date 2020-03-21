import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { useMediaQuery } from "../hooks";
import {
  Grid,
  Segment,
  Header,
  Menu,
  Icon,
  Responsive
} from "semantic-ui-react";
import Img from "gatsby-image";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from "react-share";

export default function Post({ data }) {
  const isMobile = useMediaQuery("(min-width: 320px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isBigLaptop = useMediaQuery("(min-width: 1440px)");
  const isDesktop = useMediaQuery("(min-width: 1920px)");
  const isUltraWide = useMediaQuery("(min-width: 2560px)");
  const shareMenuStyle = {
    position: "fixed",
    top: !(isTablet || isLaptop || isBigLaptop || isDesktop || isUltraWide)
      ? 0
      : "13%",
    right: !(isTablet || isLaptop || isBigLaptop || isDesktop || isUltraWide)
      ? 0
      : "auto",
    left: isUltraWide
      ? "29%"
      : isDesktop
      ? "28%"
      : isBigLaptop
      ? "20%"
      : isLaptop
      ? "18%"
      : isTablet
      ? "5%"
      : isMobile
      ? "auto"
      : "auto"
  };

  const post = data.markdownRemark;
  return (
    <Layout>
      <Grid textAlign="justified" style={{ justifyContent: "center" }}>
        <Grid.Column widescreen={6} computer={8} tablet={12} mobile={15}>
          <Segment style={{ textAlign: "right" }}>
            <Img fluid={post.frontmatter.thumbnail.childImageSharp.fluid} />
            <Header as="h1">{post.frontmatter.title}</Header>
            <Header as="h2"> {post.frontmatter.description}</Header>
          </Segment>

          <div style={shareMenuStyle}>
            <Menu
              vertical={isTablet || isLaptop || isDesktop || isUltraWide}
              style={{ width: "auto" }}
            >
              <Menu.Item style={{ padding: "0" }}>
                <TwitterShareButton
                  url={window.location.href}
                  style={{ padding: "13px", width: "100%" }}
                >
                  <Icon size="large" style={{ margin: "0" }} name="twitter" />
                </TwitterShareButton>
              </Menu.Item>
              <Menu.Item style={{ padding: "0" }}>
                <FacebookShareButton
                  url={window.location.href}
                  style={{ padding: "13px", width: "100%" }}
                >
                  <Icon size="large" style={{ margin: "0" }} name="facebook" />
                </FacebookShareButton>
              </Menu.Item>
              <Menu.Item style={{ padding: "0" }}>
                <LinkedinShareButton
                  url={window.location.href}
                  style={{ padding: "13px", width: "100%" }}
                >
                  <Icon size="large" style={{ margin: "0" }} name="linkedin" />
                </LinkedinShareButton>
              </Menu.Item>
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
