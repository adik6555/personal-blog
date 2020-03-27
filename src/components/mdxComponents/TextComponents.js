import React from "react";
import { Header } from "semantic-ui-react";

const HeaderStyles = {};

export function Header1(props) {
  return (
    <Header style={HeaderStyles} as="h1" {...props}>
      {props.children}
    </Header>
  );
}
