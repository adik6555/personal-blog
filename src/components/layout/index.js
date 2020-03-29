import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Icon,
  Menu,
  Responsive,
  Input,
  Dimmer,
  Header,
  Transition,
  Grid
} from "semantic-ui-react";
import NoSSR from "react-no-ssr";
import { Link } from "gatsby";
import MobileShareMenu from "../mobileShareMenu";
import { MDXProvider } from "@mdx-js/react";
import * as TextComponents from "./../mdxComponents/TextComponents";

class DesktopNavigation extends React.Component {
  render() {
    const activeItem = this.props.active;
    console.log(this.props);
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Menu
          style={{ background: "white", zIndex: "3" }}
          fixed="top"
          pointing
          secondary
        >
          <Menu.Item header>Adam Petro </Menu.Item>

          <Menu.Item active={activeItem === "home"} href="/" link name="home">
            Home
          </Menu.Item>

          <Menu.Item active={activeItem === "other"} href="/" link name="other">
            Other
          </Menu.Item>

          <Menu.Item
            active={activeItem === "about me"}
            href="/"
            link
            name="about me"
          >
            About me
          </Menu.Item>
          {this.props.search && (
            <Menu.Item position="right">
              <Input icon="search" placeholder="search" />
            </Menu.Item>
          )}
        </Menu>
        <div style={{ paddingTop: "65px" }}>{this.props.children}</div>
      </Responsive>
    );
  }
}

class MobileNavigation extends React.Component {
  state = {};

  handleOpen = () => this.setState({ active: true });
  handleClose = () => this.setState({ active: false });
  render() {
    const url = window.location.href ? window.location.href : "";
    const { active } = this.state;
    return (
      <Responsive maxWidth={Responsive.onlyTablet.minWidth - 1}>
        <Transition.Group duration={500} animation="fade right">
          {active && (
            <Dimmer
              page
              onClickOutside={this.handleClose}
              active={active}
              style={{ padding: "0", margin: "0" }}
            >
              <Link to="/">
                <Header style={{ marginTop: "33%" }} inverted as="h2">
                  Home
                </Header>
              </Link>
              <Link to="/page-2">
                <Header style={{ marginTop: "33%" }} inverted as="h2">
                  Other
                </Header>
              </Link>
              <Link to="/">
                <Header style={{ marginTop: "33%" }} inverted as="h2">
                  About me
                </Header>
              </Link>
            </Dimmer>
          )}
        </Transition.Group>

        <Menu
          style={{
            background: "white",
            borderBottom: "2px solid rgb(0,0,0,0.2)"
          }}
          fixed="top"
          secondary
        >
          <Menu.Item position="left" onClick={this.handleOpen}>
            <Icon size="large" name="bars"></Icon>
          </Menu.Item>
          {this.props.search && (
            <Menu.Item position="right">
              <Input icon="search" placeholder="search" />
            </Menu.Item>
          )}
          {this.props.share && (
            <Menu.Item position="right">
              <MobileShareMenu url={url} />
            </Menu.Item>
          )}
        </Menu>
        <div style={{ marginTop: "75px" }}>{this.props.children}</div>
      </Responsive>
    );
  }
}

class Layout extends React.Component {
  render() {
    return (
      <NoSSR>
        <MDXProvider
          components={{
            h1: props => <TextComponents.Header1 {...props} />,
            h2: props => (
              <Header as="h3" {...props} style={{ textAlign: "initial" }} />
            ),
            h3: props => (
              <Header as="h4" {...props} style={{ textAlign: "initial" }} />
            ),
            h4: props => (
              <Header as="h5" {...props} style={{ textAlign: "initial" }} />
            ),
            h5: props => (
              <Header as="h6" {...props} style={{ textAlign: "initial" }} />
            ),
            h6: props => (
              <Header as="h6" {...props} style={{ textAlign: "initial" }} />
            ),
            p: props => <p {...props} style={{ color: "red" }} />,
            pre: props => (
              <div style={{ background: "grey" }}>{props.children} </div>
            )
          }}
        >
          <div style={{ maxWidth: "100%" }}>
            <MobileNavigation {...this.props}>
              {this.props.children}
            </MobileNavigation>
            <DesktopNavigation {...this.props}>
              {this.props.children}
            </DesktopNavigation>
          </div>
        </MDXProvider>
      </NoSSR>
    );
  }
}

export default Layout;
