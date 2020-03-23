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
  Divider
} from "semantic-ui-react";
import NoSSR from "react-no-ssr";

class DesktopNavigation extends React.Component {
  render() {
    const activeItem = this.props.active;
    return (
      <NoSSR>
        <Responsive minWidth={Responsive.onlyTablet.minWidth + 1}>
          <Menu pointing secondary>
            <Menu.Item header>Adam Petro </Menu.Item>

            <Menu.Item active={activeItem === "home"} href="/" link name="home">
              Home
            </Menu.Item>

            <Menu.Item
              active={activeItem === "other"}
              href="/"
              link
              name="other"
            >
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
      </NoSSR>
    );
  }
}

class MobileNavigation extends React.Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { sidebarOpened } = this.state;
    const activeItem = this.props.active;
    return (
      <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
        <Sidebar
          animation="overlay"
          onHide={this.handleSidebarHide}
          visible={sidebarOpened}
          vertical
          pushable
          as={Menu}
        >
          <Menu.Item header> Adam Petro </Menu.Item>

          <Menu.Item
            href="/page-2/"
            link
            name="home"
            active={activeItem === "home"}
          >
            Home
          </Menu.Item>

          <Menu.Item
            href="/page-2/"
            link
            name="other"
            active={activeItem === "other"}
          >
            Other
          </Menu.Item>

          <Menu.Item
            href="/page-2/"
            link
            name="about me"
            active={activeItem === "about me"}
          >
            About me
          </Menu.Item>
          {this.props.search && (
            <Menu.Item position="bottom">
              <Input icon="search" placeholder="search" />
            </Menu.Item>
          )}
        </Sidebar>

        <SidebarPusher dimmed={sidebarOpened}>
          <Menu secondary>
            <Menu.Item onClick={this.handleToggle}>
              <Icon name="bars"></Icon>
            </Menu.Item>
          </Menu>

          {this.props.children}
        </SidebarPusher>
      </Responsive>
    );
  }
}

class Layout extends React.Component {
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MobileNavigation {...this.props}>
          {this.props.children}
        </MobileNavigation>
        <DesktopNavigation {...this.props}>
          {this.props.children}
        </DesktopNavigation>
      </div>
    );
  }
}

export default Layout;
