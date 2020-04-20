import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Icon,
  Menu,
  Responsive,
  Input,
  Dimmer,
  Header,
  Transition
} from "semantic-ui-react";
import NoSSR from "react-no-ssr";
import { Link } from "gatsby";
import MobileShareMenu from "../mobileShareMenu";
import { MDXProvider } from "@mdx-js/react";
import * as CustomComponents from "./../mdxComponents/CustomComponents";
import CodeBlock from "../mdxComponents/CodeBlock";

class DesktopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  sendSearchInput = event => {
    this.props.searchInput(event);
  };
  render() {
    console.log(this.props);
    const activeItem = this.props.active;
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
              <Input
                value={this.props.searchValue}
                onChange={this.sendSearchInput}
                icon="search"
                placeholder="search"
              />
            </Menu.Item>
          )}
        </Menu>
        <div style={{ paddingTop: "65px" }}>{this.props.children}</div>
      </Responsive>
    );
  }
}

class MobileNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  sendSearchInput = event => {
    this.props.searchInput(event);
  };

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
              <Input
                value={this.props.searchValue}
                onChange={this.sendSearchInput}
                icon="search"
                placeholder="search"
              />
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
            h1: CustomComponents.Header2,
            h2: CustomComponents.Header3,
            h3: CustomComponents.Header4,
            h4: CustomComponents.Header5,
            h5: CustomComponents.Header6,
            h6: CustomComponents.Header6,
            p: CustomComponents.Paragraph,
            pre: CodeBlock,
            ul: CustomComponents.UnorderedList,
            ol: CustomComponents.OrderedList,
            table: CustomComponents.CustomTable,
            td: CustomComponents.TableCell,
            tr: CustomComponents.TableRow,
            code: CustomComponents.Code
          }}
        >
          <>
            <MobileNavigation {...this.props}>
              {this.props.children}
            </MobileNavigation>
            <DesktopNavigation {...this.props}>
              {this.props.children}
            </DesktopNavigation>
          </>
        </MDXProvider>
      </NoSSR>
    );
  }
}

export default Layout;
