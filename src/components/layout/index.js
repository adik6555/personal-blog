import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Card,
  Icon,
  Image,
  Menu,
  Grid,
  Container,
  Responsive,
  Sidebar,
  SidebarPusher,
  Button,
  Input,
  Divider,
  Dimmer,
  List,
  Header
} from "semantic-ui-react";
import NoSSR from "react-no-ssr";
import { Link } from "gatsby";

class DesktopNavigation extends React.Component {
  render() {
    const activeItem = this.props.active;
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Menu pointing secondary>
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
        {this.props.children}
      </Responsive>
    );
  }
}

class MobileNavigation extends React.Component {
  state = {};

  handleOpen = () => this.setState({ active: true });
  handleClose = () => this.setState({ active: false });
  render() {
    const activeItem = this.props.active;
    const { active } = this.state;
    return (
      <Responsive maxWidth={Responsive.onlyTablet.minWidth - 1}>
        <Dimmer page active={active} style={{ padding: "0", margin: "0" }}>
          <Icon onClick={this.handleClose} name="close"></Icon>

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

        <Menu secondary>
          <Menu.Item onClick={this.handleOpen}>
            <Icon name="bars"></Icon>
          </Menu.Item>
          {this.props.search && (
            <Menu.Item position="right">
              <Input icon="search" placeholder="search" />
            </Menu.Item>
          )}
        </Menu>

        {this.props.children}
      </Responsive>
    );
  }
}

class Layout extends React.Component {
  render() {
    return (
      <NoSSR>
        <div style={{ maxWidth: "100%" }}>
          <MobileNavigation {...this.props}>
            {this.props.children}
          </MobileNavigation>
          <DesktopNavigation {...this.props}>
            {this.props.children}
          </DesktopNavigation>
        </div>
      </NoSSR>
    );
  }
}

export default Layout;
